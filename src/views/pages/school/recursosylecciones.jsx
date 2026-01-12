import React, { useEffect, useState, useRef } from 'react';
import {
  CCard, CCardBody, CCardHeader, CForm, CFormInput, CFormSelect, CButton,
  CRow, CCol, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CContainer, CPagination, CPaginationItem, CModal, CModalHeader, CModalBody, CModalFooter, CAlert
} from '@coreui/react';

export default function CrudLecciones() {
  const [modulos, setModulos] = useState([]);
  const [lecciones, setLecciones] = useState([]);

  const [leccionForm, setLeccionForm] = useState({ id_modulo: '', nombre_leccion: '', descripcion: '' });
  const [leccionFormErrors, setLeccionFormErrors] = useState({ id_modulo: '', nombre_leccion: '', descripcion: '' });

  const [leccionEdit, setLeccionEdit] = useState(null);
  const [leccionEditErrors, setLeccionEditErrors] = useState({ id_modulo: '', nombre_leccion: '', descripcion: '' });
  const [permitCloseEdit, setPermitCloseEdit] = useState(false);

  const [leccionEliminar, setLeccionEliminar] = useState(null);
  const [permitCloseEliminar, setPermitCloseEliminar] = useState(false);

  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('success');

  const [filtroLeccionCrud, setFiltroLeccionCrud] = useState('');
  const [filtroModuloCrud, setFiltroModuloCrud] = useState('');
  const [filtroModuloForm, setFiltroModuloForm] = useState('');
  const [searchErrors, setSearchErrors] = useState({ filtroModuloForm: '', filtroModuloCrud: '', filtroLeccionCrud: '' });

  const itemsPerPage = 5;
  const [leccionPage, setLeccionPage] = useState(1);

  // bloqueo boton atrás para modales
  const popstateHandlerRef = useRef(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    fetch('http://localhost:4000/obtenermodulos')
      .then(res => res.json())
      .then(setModulos)
      .catch(() => setModulos([]));
    fetchLecciones();
    // eslint-disable-next-line
  }, []);

  const fetchLecciones = () => {
    fetch('http://localhost:4000/obtenerlecciones')
      .then(res => res.json())
      .then(setLecciones)
      .catch(() => setLecciones([]));
  };

  // VALIDADORES
  const validarModuloSeleccionado = (val) => {
    if (!val || val === '') return 'Seleccione un módulo.';
    return '';
  };
  const validarNombreLeccion = (val) => {
    if (!val || val.trim() === '') return 'El nombre de la lección es obligatorio.';
    if (val.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres.';
    return '';
  };
  const validarDescripcionLeccion = (val) => {
    if (!val || val.trim() === '') return 'La descripción es obligatoria.';
    if (val.trim().length < 5) return 'La descripción debe tener al menos 5 caracteres.';
    return '';
  };

  // validación en tiempo real formulario creación
  useEffect(() => {
    setLeccionFormErrors({
      id_modulo: validarModuloSeleccionado(leccionForm.id_modulo),
      nombre_leccion: validarNombreLeccion(leccionForm.nombre_leccion),
      descripcion: validarDescripcionLeccion(leccionForm.descripcion),
    });
  }, [leccionForm]);

  // validación en tiempo real edición
  useEffect(() => {
    if (!leccionEdit) {
      setLeccionEditErrors({ id_modulo: '', nombre_leccion: '', descripcion: '' });
      return;
    }
    setLeccionEditErrors({
      id_modulo: validarModuloSeleccionado(leccionEdit.id_modulo),
      nombre_leccion: validarNombreLeccion(leccionEdit.nombre_leccion),
      descripcion: validarDescripcionLeccion(leccionEdit.descripcion),
    });
  }, [leccionEdit]);

  // validación en tiempo real filtros / busquedas
  useEffect(() => {
    if (!filtroModuloForm) {
      setSearchErrors(prev => ({ ...prev, filtroModuloForm: '' }));
      return;
    }
    const matches = modulos.filter(m => m.nombre_modulo.toLowerCase().includes(filtroModuloForm.toLowerCase()));
    setSearchErrors(prev => ({ ...prev, filtroModuloForm: matches.length === 0 ? 'No se encontró ningún módulo válido.' : '' }));
  }, [filtroModuloForm, modulos]);

  useEffect(() => {
    if (!filtroModuloCrud && !filtroLeccionCrud) {
      setSearchErrors(prev => ({ ...prev, filtroModuloCrud: '', filtroLeccionCrud: '' }));
      return;
    }
    const matchesModulo = lecciones.filter(l => l.nombre_modulo.toLowerCase().includes(filtroModuloCrud.toLowerCase()));
    setSearchErrors(prev => ({ ...prev, filtroModuloCrud: matchesModulo.length === 0 ? 'No se encontraron lecciones para ese módulo.' : '' }));
    const matchesLeccion = lecciones.filter(l => l.nombre_leccion.toLowerCase().includes(filtroLeccionCrud.toLowerCase()));
    setSearchErrors(prev => ({ ...prev, filtroLeccionCrud: matchesLeccion.length === 0 ? 'No se encontró ninguna lección con ese nombre.' : prev.filtroLeccionCrud }));
  }, [filtroModuloCrud, filtroLeccionCrud, lecciones]);

  // BLOQUEO BACK BUTTON mientras modales abiertos
  useEffect(() => {
    const anyOpen = !!leccionEdit || !!leccionEliminar;
    if (anyOpen) {
      if (!pushedRef.current) {
        try { window.history.pushState({ modalOpen: true }, ''); pushedRef.current = true; } catch {}
      }
      const handler = () => { try { window.history.pushState({ modalOpen: true }, ''); } catch {} };
      popstateHandlerRef.current = handler;
      window.addEventListener('popstate', handler);
    } else {
      if (popstateHandlerRef.current) {
        window.removeEventListener('popstate', popstateHandlerRef.current);
        popstateHandlerRef.current = null;
      }
      if (pushedRef.current) {
        try { window.history.back(); } catch {}
        pushedRef.current = false;
      }
    }
    return () => {
      if (popstateHandlerRef.current) {
        window.removeEventListener('popstate', popstateHandlerRef.current);
        popstateHandlerRef.current = null;
      }
    };
  }, [leccionEdit, leccionEliminar]);

  // CREAR LECCIÓN
  const handleLeccionSubmit = async (e) => {
    e.preventDefault();
    const errModulo = validarModuloSeleccionado(leccionForm.id_modulo);
    const errNombre = validarNombreLeccion(leccionForm.nombre_leccion);
    const errDesc = validarDescripcionLeccion(leccionForm.descripcion);
    setLeccionFormErrors({ id_modulo: errModulo, nombre_leccion: errNombre, descripcion: errDesc });
    if (errModulo || errNombre || errDesc) {
      setMensaje('Corrija los errores antes de crear la lección.');
      setTipoMensaje('danger');
      return;
    }

    try {
      await fetch('http://localhost:4000/crearleccion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leccionForm)
      });
      setLeccionForm({ id_modulo: '', nombre_leccion: '', descripcion: '' });
      fetchLecciones();
      setMensaje('Lección creada correctamente');
      setTipoMensaje('success');
    } catch {
      setMensaje('Error al crear la lección');
      setTipoMensaje('danger');
    }
  };

  // EDITAR LECCIÓN
  const handleLeccionEdit = (leccion) => {
    setLeccionEdit({ ...leccion });
    setPermitCloseEdit(false);
  };

  const handleLeccionEditSave = async (e) => {
    e.preventDefault();
    const errModulo = validarModuloSeleccionado(leccionEdit.id_modulo);
    const errNombre = validarNombreLeccion(leccionEdit.nombre_leccion);
    const errDesc = validarDescripcionLeccion(leccionEdit.descripcion);
    setLeccionEditErrors({ id_modulo: errModulo, nombre_leccion: errNombre, descripcion: errDesc });
    if (errModulo || errNombre || errDesc) {
      setMensaje('Corrija los errores antes de guardar.');
      setTipoMensaje('danger');
      return;
    }

    try {
      await fetch(`http://localhost:4000/lecciones/${leccionEdit.id_leccion}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leccionEdit)
      });
      setPermitCloseEdit(true);
      setLeccionEdit(null);
      fetchLecciones();
      setMensaje('Lección editada correctamente');
      setTipoMensaje('success');
    } catch {
      setMensaje('Error al editar la lección');
      setTipoMensaje('danger');
    }
  };

  // ELIMINAR LECCIÓN
  const handleLeccionEliminar = (leccion) => {
    setLeccionEliminar(leccion);
    setPermitCloseEliminar(false);
  };
  const handleLeccionEliminarConfirm = async () => {
    try {
      await fetch(`http://localhost:4000/lecciones/${leccionEliminar.id_leccion}`, { method: 'DELETE' });
      setPermitCloseEliminar(true);
      setLeccionEliminar(null);
      fetchLecciones();
      setMensaje('Lección eliminada correctamente');
      setTipoMensaje('success');
    } catch {
      setMensaje('Error al eliminar la lección');
      setTipoMensaje('danger');
    }
  };

  // FILTRADO Y PAGINACIÓN (usamos filtroModuloCrud y filtroLeccionCrud si están)
  const leccionesFiltradas = lecciones
    .filter(l => (filtroModuloCrud ? l.nombre_modulo.toLowerCase().includes(filtroModuloCrud.toLowerCase()) : true))
    .filter(l => (filtroLeccionCrud ? l.nombre_leccion.toLowerCase().includes(filtroLeccionCrud.toLowerCase()) : true));

  const leccionesTotalPages = Math.ceil(leccionesFiltradas.length / itemsPerPage);
  const leccionesToShow = leccionesFiltradas.slice((leccionPage - 1) * itemsPerPage, leccionPage * itemsPerPage);

  const modalStyle = { maxWidth: 500, width: '100%' };
  const buttonStyle = { minWidth: 110, maxWidth: 110 };

  return (
    <CContainer className="py-4">
      {mensaje && <CAlert color={tipoMensaje} onClose={() => setMensaje('')}>{mensaje}</CAlert>}
      <CRow className="mb-4">
        <CCol md={12} xl={8} xxl={7} style={{ margin: '0 auto' }}>
          <CCard className="mb-4 shadow" style={{ minWidth: 600, maxWidth: 900, margin: '0 auto' }}>
            <CCardHeader style={{ background: '#070145', color: 'white' }}>
              <strong>Nueva Lección</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleLeccionSubmit}>
                <CFormInput
                  className="mb-2"
                  placeholder="Filtrar módulos por nombre"
                  value={filtroModuloForm}
                  onChange={e => setFiltroModuloForm(e.target.value)}
                />
                {searchErrors.filtroModuloForm && <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{searchErrors.filtroModuloForm}</div>}
                <CFormSelect
                  className="mb-3"
                  label="Módulo"
                  value={leccionForm.id_modulo}
                  onChange={e => setLeccionForm({ ...leccionForm, id_modulo: e.target.value })}
                  required
                >
                  <option value="">Seleccione un módulo</option>
                  {modulos
                    .filter(m => m.nombre_modulo.toLowerCase().includes(filtroModuloForm.toLowerCase()))
                    .map(m => (
                      <option key={m.id_modulo} value={m.id_modulo}>{m.nombre_modulo}</option>
                    ))}
                </CFormSelect>
                {leccionFormErrors.id_modulo && <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{leccionFormErrors.id_modulo}</div>}

                <CFormInput
                  className="mb-3"
                  type="text"
                  label="Nombre de la lección"
                  placeholder="Nombre de la lección"
                  value={leccionForm.nombre_leccion}
                  onChange={e => setLeccionForm({ ...leccionForm, nombre_leccion: e.target.value })}
                  required
                />
                {leccionFormErrors.nombre_leccion && <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{leccionFormErrors.nombre_leccion}</div>}

                <CFormInput
                  className="mb-3"
                  type="text"
                  label="Descripción"
                  placeholder="Descripción"
                  value={leccionForm.descripcion}
                  onChange={e => setLeccionForm({ ...leccionForm, descripcion: e.target.value })}
                  required
                />
                {leccionFormErrors.descripcion && <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{leccionFormErrors.descripcion}</div>}

                <div className="d-flex justify-content-end">
                  <CButton type="submit" style={{ background: '#070145', color: 'white', minWidth: 140 }}>Crear Lección</CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol md={12} xl={10} xxl={9} style={{ margin: '0 auto' }}>
          <CCard className="mb-4 shadow" style={{ minWidth: 600, maxWidth: 1100, margin: '0 auto' }}>
            <CCardHeader style={{ background: '#070145', color: 'white' }}>
              <strong>Lecciones</strong>
            </CCardHeader>
            <CCardBody>
              <CRow className="mb-3">
                <CCol md={6} lg={4}>
                  <CFormInput
                    placeholder="Filtrar lecciones por módulo"
                    value={filtroModuloCrud}
                    onChange={e => { setFiltroModuloCrud(e.target.value); setLeccionPage(1); }}
                  />
                </CCol>
                <CCol md={6} lg={4}>
                  <CFormInput
                    placeholder="Filtrar por nombre de lección"
                    value={filtroLeccionCrud}
                    onChange={e => { setFiltroLeccionCrud(e.target.value); setLeccionPage(1); }}
                  />
                </CCol>
              </CRow>
              {searchErrors.filtroModuloCrud && <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{searchErrors.filtroModuloCrud}</div>}
              {searchErrors.filtroLeccionCrud && <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{searchErrors.filtroLeccionCrud}</div>}
              <CTable hover responsive style={{ minWidth: 600 }}>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Módulo</CTableHeaderCell>
                    <CTableHeaderCell>Nombre</CTableHeaderCell>
                    <CTableHeaderCell>Descripción</CTableHeaderCell>
                    <CTableHeaderCell>Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {leccionesToShow.length === 0 && (
                    <CTableRow>
                      <CTableDataCell colSpan="4" className="text-center">No hay lecciones que coincidan con los filtros.</CTableDataCell>
                    </CTableRow>
                  )}
                  {leccionesToShow.map(l => (
                    <CTableRow key={l.id_leccion}>
                      <CTableDataCell>{l.nombre_modulo}</CTableDataCell>
                      <CTableDataCell>{l.nombre_leccion}</CTableDataCell>
                      <CTableDataCell>{l.descripcion}</CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex justify-content-center gap-2">
                          <CButton
                            size="sm"
                            style={{ background: '#070145', color: 'white', ...buttonStyle }}
                            onClick={() => handleLeccionEdit(l)}
                          >
                            Editar
                          </CButton>
                          <CButton
                            size="sm"
                            style={{ background: 'red', color: 'white', ...buttonStyle }}
                            onClick={() => handleLeccionEliminar(l)}
                          >
                            Eliminar
                          </CButton>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <div className="d-flex justify-content-center mt-3">
                <CPagination align="center" aria-label="Paginación lecciones">
                  <CPaginationItem
                    disabled={leccionPage === 1}
                    onClick={() => setLeccionPage(leccionPage - 1)}
                  >
                    &laquo;
                  </CPaginationItem>
                  {[...Array(leccionesTotalPages)].map((_, idx) => (
                    <CPaginationItem
                      key={idx + 1}
                      active={leccionPage === idx + 1}
                      onClick={() => setLeccionPage(idx + 1)}
                    >
                      {idx + 1}
                    </CPaginationItem>
                  ))}
                  <CPaginationItem
                    disabled={leccionPage === leccionesTotalPages || leccionesTotalPages === 0}
                    onClick={() => setLeccionPage(leccionPage + 1)}
                  >
                    &raquo;
                  </CPaginationItem>
                </CPagination>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modal Editar Lección (no cerrar por click fuera ni ESC) */}
      <CModal
        visible={!!leccionEdit}
        onClose={() => { if (permitCloseEdit) setLeccionEdit(null); }}
        alignment="center"
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <CModalHeader closeButton style={{ background: '#114c5f', color: 'white' }}>
          Editar Lección
        </CModalHeader>
        <CModalBody style={{ padding: 32 }}>
          {leccionEdit && (
            <CForm onSubmit={handleLeccionEditSave} style={modalStyle}>
              <CFormSelect
                className="mb-3"
                label="Módulo"
                value={leccionEdit.id_modulo}
                onChange={e => setLeccionEdit({ ...leccionEdit, id_modulo: e.target.value })}
                required
              >
                <option value="">Seleccione un módulo</option>
                {modulos.map(m => (
                  <option key={m.id_modulo} value={m.id_modulo}>{m.nombre_modulo}</option>
                ))}
              </CFormSelect>
              {leccionEditErrors.id_modulo && <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{leccionEditErrors.id_modulo}</div>}

              <CFormInput
                className="mb-3"
                type="text"
                label="Nombre de la lección"
                value={leccionEdit.nombre_leccion}
                onChange={e => setLeccionEdit({ ...leccionEdit, nombre_leccion: e.target.value })}
                required
              />
              {leccionEditErrors.nombre_leccion && <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{leccionEditErrors.nombre_leccion}</div>}

              <CFormInput
                className="mb-3"
                type="text"
                label="Descripción"
                value={leccionEdit.descripcion}
                onChange={e => setLeccionEdit({ ...leccionEdit, descripcion: e.target.value })}
                required
              />
              {leccionEditErrors.descripcion && <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{leccionEditErrors.descripcion}</div>}

              <div className="d-flex justify-content-end" style={{ gap: 8 }}>
                <CButton type="button" color="secondary" onClick={() => { setPermitCloseEdit(true); setLeccionEdit(null); }}>Cancelar</CButton>
                <CButton type="submit" style={{ background: '#114c5f', color: 'white', minWidth: 140 }}>Guardar</CButton>
              </div>
            </CForm>
          )}
        </CModalBody>
      </CModal>

      {/* Modal Eliminar Lección (no cerrar por click fuera ni ESC) */}
      <CModal
        visible={!!leccionEliminar}
        onClose={() => { if (permitCloseEliminar) setLeccionEliminar(null); }}
        alignment="center"
        size="sm"
        backdrop="static"
        keyboard={false}
      >
        <CModalHeader closeButton style={{ background: '#114c5f', color: 'white' }}>
          Eliminar Lección
        </CModalHeader>
        <CModalBody className="text-center" style={{ padding: 32 }}>
          ¿Seguro que deseas eliminar la lección <b>{leccionEliminar?.nombre_leccion}</b>?
        </CModalBody>
        <CModalFooter className="justify-content-center">
          <CButton style={{ background: 'red', color: 'white', ...buttonStyle }} onClick={() => { setPermitCloseEliminar(true); setLeccionEliminar(null); }}>Cancelar</CButton>
          <CButton style={{ background: '#114c5f', color: 'white', ...buttonStyle }} onClick={handleLeccionEliminarConfirm}>Eliminar</CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  );
}