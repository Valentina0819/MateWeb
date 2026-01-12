import React, { useEffect, useState, useRef } from 'react';
import {
  CCard, CCardBody, CCardHeader, CForm, CFormInput, CFormSelect, CButton,
  CRow, CCol, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CContainer, CAlert, CPagination, CPaginationItem, CModal, CModalHeader, CModalBody, CModalFooter
} from '@coreui/react';

export default function CrudCursosModulos() {
  // Cursos
  const [cursos, setCursos] = useState([]);
  const [cursoForm, setCursoForm] = useState({ nombre_curso: '', descripcion: '' });
  const [cursoErrors, setCursoErrors] = useState({ nombre_curso: '', descripcion: '' });

  // Modal de edición de curso
  const [modalEditCurso, setModalEditCurso] = useState(false);
  const [cursoEditForm, setCursoEditForm] = useState({ nombre_curso: '', descripcion: '' });
  const [editCursoId, setEditCursoId] = useState(null);
  const [cursoEditErrors, setCursoEditErrors] = useState({ nombre_curso: '', descripcion: '' });
  const [permitCloseCursoEdit, setPermitCloseCursoEdit] = useState(false);

  // Módulos
  const [modulos, setModulos] = useState([]);
  const [moduloForm, setModuloForm] = useState({ id_curso: '', nombre_modulo: '', descripcion: '' });
  const [editModuloId, setEditModuloId] = useState(null);
  const [moduloErrors, setModuloErrors] = useState({ id_curso: '', nombre_modulo: '', descripcion: '' });

  // Modal de edición de módulo
  const [modalEditModulo, setModalEditModulo] = useState(false);
  const [moduloEditForm, setModuloEditForm] = useState({ id_curso: '', nombre_modulo: '', descripcion: '' });
  const [editModuloModalId, setEditModuloModalId] = useState(null);
  const [moduloEditErrors, setModuloEditErrors] = useState({ id_curso: '', nombre_modulo: '', descripcion: '' });
  const [permitCloseModuloEdit, setPermitCloseModuloEdit] = useState(false);

  // Mensajes
  const [alert, setAlert] = useState({ color: '', text: '' });

  // Paginación
  const [cursoPage, setCursoPage] = useState(1);
  const [moduloPage, setModuloPage] = useState(1);
  const itemsPerPage = 4;

  // Modales de confirmación
  const [modalConfirmCurso, setModalConfirmCurso] = useState(false);
  const [cursoAEliminar, setCursoAEliminar] = useState(null);
  const [modalConfirmModulo, setModalConfirmModulo] = useState(false);
  const [moduloAEliminar, setModuloAEliminar] = useState(null);

  // bloqueo boton atrás
  const popstateHandlerRef = useRef(null);
  const pushedRef = useRef(false);
  const [permitCloseCursoConfirm, setPermitCloseCursoConfirm] = useState(false);
  const [permitCloseModuloConfirm, setPermitCloseModuloConfirm] = useState(false);

  useEffect(() => {
    fetchCursos();
    fetchModulos();
  }, []);

  const fetchCursos = async () => {
    const res = await fetch('http://localhost:4000/obtenercursos');
    const data = await res.json();
    setCursos(data);
  };

  const fetchModulos = async () => {
    const res = await fetch('http://localhost:4000/obtenermodulos');
    const data = await res.json();
    setModulos(data);
  };

  // VALIDADORES CURSO
  const validarNombreCurso = (val) => {
    if (!val || val.trim() === '') return 'El nombre del curso es obligatorio.';
    if (val.length < 3) return 'El nombre debe tener al menos 3 caracteres.';
    if (!/^[a-zA-Z0-9\s]+$/.test(val)) return 'Solo se permiten letras, números y espacios.';
    return '';
  };

  const validarDescripcionCurso = (val) => {
    if (!val || val.trim() === '') return 'La descripción es obligatoria.';
    if (val.length < 5) return 'La descripción debe tener al menos 5 caracteres.';
    return '';
  };

  // VALIDADORES MÓDULO
  const validarCursoSeleccionado = (val) => {
    if (!val || val === '') return 'Seleccione un curso.';
    return '';
  };

  const validarNombreModulo = (val) => {
    if (!val || val.trim() === '') return 'El nombre del módulo es obligatorio.';
    if (val.length < 3) return 'El nombre debe tener al menos 3 caracteres.';
    if (!/^[a-zA-Z0-9\s]+$/.test(val)) return 'Solo se permiten letras, números y espacios.';
    return '';
  };

  const validarDescripcionModulo = (val) => {
    if (!val || val.trim() === '') return 'La descripción es obligatoria.';
    if (val.length < 5) return 'La descripción debe tener al menos 5 caracteres.';
    return '';
  };

  // validación en tiempo real curso
  useEffect(() => {
    setCursoErrors({
      nombre_curso: validarNombreCurso(cursoForm.nombre_curso),
      descripcion: validarDescripcionCurso(cursoForm.descripcion),
    });
  }, [cursoForm]);

  // validación en tiempo real curso editar
  useEffect(() => {
    setCursoEditErrors({
      nombre_curso: validarNombreCurso(cursoEditForm.nombre_curso),
      descripcion: validarDescripcionCurso(cursoEditForm.descripcion),
    });
  }, [cursoEditForm]);

  // validación en tiempo real módulo
  useEffect(() => {
    setModuloErrors({
      id_curso: validarCursoSeleccionado(moduloForm.id_curso),
      nombre_modulo: validarNombreModulo(moduloForm.nombre_modulo),
      descripcion: validarDescripcionModulo(moduloForm.descripcion),
    });
  }, [moduloForm]);

  // validación en tiempo real módulo editar
  useEffect(() => {
    setModuloEditErrors({
      id_curso: validarCursoSeleccionado(moduloEditForm.id_curso),
      nombre_modulo: validarNombreModulo(moduloEditForm.nombre_modulo),
      descripcion: validarDescripcionModulo(moduloEditForm.descripcion),
    });
  }, [moduloEditForm]);

  // BLOQUEO BACK BUTTON
  useEffect(() => {
    const anyOpen = modalConfirmCurso || modalConfirmModulo || modalEditCurso || modalEditModulo;
    if (anyOpen) {
      if (!pushedRef.current) {
        try {
          window.history.pushState({ modalOpen: true }, '');
          pushedRef.current = true;
        } catch {}
      }
      const handler = () => {
        try { window.history.pushState({ modalOpen: true }, ''); } catch {}
      };
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
  }, [modalConfirmCurso, modalConfirmModulo, modalEditCurso, modalEditModulo]);

  // CURSO HANDLERS
  const handleCursoSubmit = async (e) => {
    e.preventDefault();
    const errNombre = validarNombreCurso(cursoForm.nombre_curso);
    const errDesc = validarDescripcionCurso(cursoForm.descripcion);
    setCursoErrors({ nombre_curso: errNombre, descripcion: errDesc });
    
    if (errNombre || errDesc) {
      setAlert({ color: 'danger', text: 'Corrija los errores del formulario.' });
      return;
    }

    try {
      const { nombre_curso, descripcion } = cursoForm;
      await fetch('http://localhost:4000/crearcurso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre_curso, descripcion })
      });
      setAlert({ color: 'success', text: 'Curso creado correctamente.' });
      setCursoForm({ nombre_curso: '', descripcion: '' });
      fetchCursos();
    } catch {
      setAlert({ color: 'danger', text: 'Error al guardar el curso.' });
    }
  };

  const handleEditCurso = (curso) => {
    setCursoEditForm({ nombre_curso: curso.nombre_curso, descripcion: curso.descripcion });
    setEditCursoId(curso.id_curso);
    setModalEditCurso(true);
    setPermitCloseCursoEdit(false);
  };

  const handleGuardarEdicionCurso = async (e) => {
    e.preventDefault();
    const errNombre = validarNombreCurso(cursoEditForm.nombre_curso);
    const errDesc = validarDescripcionCurso(cursoEditForm.descripcion);
    setCursoEditErrors({ nombre_curso: errNombre, descripcion: errDesc });
    
    if (errNombre || errDesc) {
      setAlert({ color: 'danger', text: 'Corrija los errores del formulario.' });
      return;
    }

    try {
      await fetch(`http://localhost:4000/editarcurso/${editCursoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cursoEditForm)
      });
      setAlert({ color: 'info', text: 'Curso actualizado correctamente.' });
      setPermitCloseCursoEdit(true);
      setModalEditCurso(false);
      fetchCursos();
    } catch {
      setAlert({ color: 'danger', text: 'Error al actualizar el curso.' });
    }
  };

  const solicitarEliminarCurso = (id) => {
    setCursoAEliminar(id);
    setModalConfirmCurso(true);
    setPermitCloseCursoConfirm(false);
  };

  const handleDeleteCurso = async () => {
    try {
      const res = await fetch(`http://localhost:4000/eliminarcurso/${cursoAEliminar}`, { method: 'DELETE' });
      if (res.ok) {
        setAlert({ color: 'warning', text: 'Curso eliminado.' });
        setPermitCloseCursoConfirm(true);
        setModalConfirmCurso(false);
        fetchCursos();
        fetchModulos();
      } else {
        const data = await res.json();
        setAlert({ color: 'danger', text: data.mensaje || 'Error al eliminar el curso.' });
      }
    } catch {
      setAlert({ color: 'danger', text: 'Error al eliminar el curso.' });
    }
  };

  // MODULO HANDLERS
  const handleModuloSubmit = async (e) => {
    e.preventDefault();
    const errCurso = validarCursoSeleccionado(moduloForm.id_curso);
    const errNombre = validarNombreModulo(moduloForm.nombre_modulo);
    const errDesc = validarDescripcionModulo(moduloForm.descripcion);
    setModuloErrors({ id_curso: errCurso, nombre_modulo: errNombre, descripcion: errDesc });
    
    if (errCurso || errNombre || errDesc) {
      setAlert({ color: 'danger', text: 'Corrija los errores del formulario.' });
      return;
    }

    try {
      await fetch('http://localhost:4000/crearmodulo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(moduloForm)
      });
      setAlert({ color: 'success', text: 'Módulo creado correctamente.' });
      setModuloForm({ id_curso: '', nombre_modulo: '', descripcion: '' });
      fetchModulos();
    } catch {
      setAlert({ color: 'danger', text: 'Error al guardar el módulo.' });
    }
  };

  const handleEditModulo = (modulo) => {
    setModuloEditForm({
      id_curso: modulo.id_curso,
      nombre_modulo: modulo.nombre_modulo,
      descripcion: modulo.descripcion
    });
    setEditModuloModalId(modulo.id_modulo);
    setModalEditModulo(true);
    setPermitCloseModuloEdit(false);
  };

  const handleGuardarEdicionModulo = async (e) => {
    e.preventDefault();
    const errCurso = validarCursoSeleccionado(moduloEditForm.id_curso);
    const errNombre = validarNombreModulo(moduloEditForm.nombre_modulo);
    const errDesc = validarDescripcionModulo(moduloEditForm.descripcion);
    setModuloEditErrors({ id_curso: errCurso, nombre_modulo: errNombre, descripcion: errDesc });
    
    if (errCurso || errNombre || errDesc) {
      setAlert({ color: 'danger', text: 'Corrija los errores del formulario.' });
      return;
    }

    try {
      await fetch(`http://localhost:4000/editarmodulo/${editModuloModalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(moduloEditForm)
      });
      setAlert({ color: 'info', text: 'Módulo actualizado correctamente.' });
      setPermitCloseModuloEdit(true);
      setModalEditModulo(false);
      fetchModulos();
    } catch {
      setAlert({ color: 'danger', text: 'Error al actualizar el módulo.' });
    }
  };

  const solicitarEliminarModulo = (id) => {
    setModuloAEliminar(id);
    setModalConfirmModulo(true);
    setPermitCloseModuloConfirm(false);
  };

  const handleDeleteModulo = async () => {
    try {
      const res = await fetch(`http://localhost:4000/eliminarmodulo/${moduloAEliminar}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        setAlert({ color: 'warning', text: 'Módulo eliminado.' });
        setPermitCloseModuloConfirm(true);
        setModalConfirmModulo(false);
        fetchModulos();
      } else {
        setAlert({ color: 'danger', text: data.mensaje || 'Error al eliminar el módulo.' });
      }
    } catch {
      setAlert({ color: 'danger', text: 'Error al eliminar el módulo.' });
    }
  };

  // Paginación lógica
  const cursosTotalPages = Math.ceil(cursos.length / itemsPerPage);
  const cursosToShow = cursos.slice((cursoPage - 1) * itemsPerPage, cursoPage * itemsPerPage);

  const modulosTotalPages = Math.ceil(modulos.length / itemsPerPage);
  const modulosToShow = modulos.slice((moduloPage - 1) * itemsPerPage, moduloPage * itemsPerPage);

  return (
    <CContainer className="py-4">
      <CRow className="justify-content-center">
        <CCol md={7} lg={6} xl={7}>
          <CCard className="mb-4 shadow" style={{ minWidth: 420, borderRadius: 10 }}>
            <CCardHeader style={{ background: '#070145', color: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
              <strong>Nuevo Curso</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleCursoSubmit}>
                <CFormInput
                  className="mb-2"
                  type="text"
                  label="Nombre del curso"
                  placeholder="Nombre del curso"
                  value={cursoForm.nombre_curso}
                  onChange={e => setCursoForm({ ...cursoForm, nombre_curso: e.target.value })}
                  style={{ borderRadius: 8 }}
                />
                {cursoErrors.nombre_curso && <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{cursoErrors.nombre_curso}</div>}

                <CFormInput
                  className="mb-2"
                  type="text"
                  label="Descripción"
                  placeholder="Descripción"
                  value={cursoForm.descripcion}
                  onChange={e => setCursoForm({ ...cursoForm, descripcion: e.target.value })}
                  style={{ borderRadius: 8 }}
                />
                {cursoErrors.descripcion && <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{cursoErrors.descripcion}</div>}

                <div className="d-flex gap-2">
                  <CButton type="submit" color="info" className="text-white" style={{ backgroundColor: "#070145", minWidth: 100, borderRadius: 6 }}>
                    Crear
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={7} lg={6} xl={7}>
          <CCard className="mb-4 shadow" style={{ minWidth: 420, borderRadius: 10 }}>
            <CCardHeader style={{ background: '#070145', color: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
              <strong>Cursos</strong>
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive className="align-middle text-center">
                <CTableHead style={{ background: '#f5f7fb' }}>
                  <CTableRow>
                    <CTableHeaderCell>Nombre</CTableHeaderCell>
                    <CTableHeaderCell>Descripción</CTableHeaderCell>
                    <CTableHeaderCell>Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {cursosToShow.map(curso => (
                    <CTableRow key={curso.id_curso}>
                      <CTableDataCell style={{ fontWeight: 600 }}>{curso.nombre_curso}</CTableDataCell>
                      <CTableDataCell>{curso.descripcion}</CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex justify-content-center gap-2">
                          <CButton
                            size="sm"
                            style={{ backgroundColor: '#0d6efd', color: 'white', minWidth: 80, borderRadius: 6 }}
                            onClick={() => handleEditCurso(curso)}
                          >
                            Editar
                          </CButton>
                          <CButton
                            size="sm"
                            style={{ backgroundColor: '#dc3545', color: 'white', minWidth: 80, borderRadius: 6 }}
                            onClick={() => solicitarEliminarCurso(curso.id_curso)}
                          >
                            Eliminar
                          </CButton>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                  {cursosToShow.length === 0 && (
                    <CTableRow>
                      <CTableDataCell colSpan="3">No hay cursos registrados.</CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
              <div className="d-flex justify-content-center mt-3">
                <CPagination align="center" aria-label="Paginación cursos">
                  <CPaginationItem
                    disabled={cursoPage === 1}
                    onClick={() => setCursoPage(cursoPage - 1)}
                  >
                    &laquo;
                  </CPaginationItem>
                  {[...Array(cursosTotalPages)].map((_, idx) => (
                    <CPaginationItem
                      key={idx + 1}
                      active={cursoPage === idx + 1}
                      onClick={() => setCursoPage(idx + 1)}
                    >
                      {idx + 1}
                    </CPaginationItem>
                  ))}
                  <CPaginationItem
                    disabled={cursoPage === cursosTotalPages || cursosTotalPages === 0}
                    onClick={() => setCursoPage(cursoPage + 1)}
                  >
                    &raquo;
                  </CPaginationItem>
                </CPagination>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow className="justify-content-center">
        <CCol md={7} lg={6} xl={7}>
          <CCard className="mb-4 shadow" style={{ minWidth: 420, borderRadius: 10 }}>
            <CCardHeader style={{ background: '#070145', color: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
              <strong>Nuevo Módulo</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleModuloSubmit}>
                <CFormSelect
                  className="mb-2"
                  label="Curso"
                  value={moduloForm.id_curso}
                  onChange={e => setModuloForm({ ...moduloForm, id_curso: e.target.value })}
                  style={{ borderRadius: 8 }}
                >
                  <option value="">Seleccione un curso</option>
                  {cursos.map(curso => (
                    <option key={curso.id_curso} value={curso.id_curso}>
                      {curso.nombre_curso}
                    </option>
                  ))}
                </CFormSelect>
                {moduloErrors.id_curso && <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{moduloErrors.id_curso}</div>}

                <CFormInput
                  className="mb-2"
                  type="text"
                  label="Nombre del módulo"
                  placeholder="Nombre del módulo"
                  value={moduloForm.nombre_modulo}
                  onChange={e => setModuloForm({ ...moduloForm, nombre_modulo: e.target.value })}
                  style={{ borderRadius: 8 }}
                />
                {moduloErrors.nombre_modulo && <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{moduloErrors.nombre_modulo}</div>}

                <CFormInput
                  className="mb-2"
                  type="text"
                  label="Descripción"
                  placeholder="Descripción"
                  value={moduloForm.descripcion}
                  onChange={e => setModuloForm({ ...moduloForm, descripcion: e.target.value })}
                  style={{ borderRadius: 8 }}
                />
                {moduloErrors.descripcion && <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{moduloErrors.descripcion}</div>}

                <div className="d-flex gap-2">
                  <CButton type="submit" color="info" className="text-white" style={{ backgroundColor: "#070145", minWidth: 100, borderRadius: 6 }}>
                    Crear
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={7} lg={6} xl={7}>
          <CCard className="mb-4 shadow" style={{ minWidth: 420, borderRadius: 10 }}>
            <CCardHeader style={{ background: '#070145', color: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
              <strong>Módulos</strong>
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive className="align-middle text-center">
                <CTableHead style={{ background: '#f5f7fb' }}>
                  <CTableRow>
                    <CTableHeaderCell>Curso</CTableHeaderCell>
                    <CTableHeaderCell>Nombre</CTableHeaderCell>
                    <CTableHeaderCell>Descripción</CTableHeaderCell>
                    <CTableHeaderCell>Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {modulosToShow.map(modulo => (
                    <CTableRow key={modulo.id_modulo}>
                      <CTableDataCell>
                        {modulo.nombre_curso ||
                          cursos.find(c => c.id_curso === modulo.id_curso)?.nombre_curso ||
                          'Sin curso'}
                      </CTableDataCell>
                      <CTableDataCell style={{ fontWeight: 600 }}>{modulo.nombre_modulo}</CTableDataCell>
                      <CTableDataCell>{modulo.descripcion}</CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex justify-content-center gap-2">
                          <CButton
                            size="sm"
                            style={{ backgroundColor: '#0d6efd', color: 'white', minWidth: 80, borderRadius: 6 }}
                            onClick={() => handleEditModulo(modulo)}
                          >
                            Editar
                          </CButton>
                          <CButton
                            size="sm"
                            style={{ backgroundColor: '#dc3545', color: 'white', minWidth: 80, borderRadius: 6 }}
                            onClick={() => solicitarEliminarModulo(modulo.id_modulo)}
                          >
                            Eliminar
                          </CButton>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                  {modulosToShow.length === 0 && (
                    <CTableRow>
                      <CTableDataCell colSpan="4">No hay módulos registrados.</CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
              <div className="d-flex justify-content-center mt-3">
                <CPagination align="center" aria-label="Paginación módulos">
                  <CPaginationItem
                    disabled={moduloPage === 1}
                    onClick={() => setModuloPage(moduloPage - 1)}
                  >
                    &laquo;
                  </CPaginationItem>
                  {[...Array(modulosTotalPages)].map((_, idx) => (
                    <CPaginationItem
                      key={idx + 1}
                      active={moduloPage === idx + 1}
                      onClick={() => setModuloPage(idx + 1)}
                    >
                      {idx + 1}
                    </CPaginationItem>
                  ))}
                  <CPaginationItem
                    disabled={moduloPage === modulosTotalPages || modulosTotalPages === 0}
                    onClick={() => setModuloPage(moduloPage + 1)}
                  >
                    &raquo;
                  </CPaginationItem>
                </CPagination>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modal Editar Curso */}
      <CModal visible={modalEditCurso} backdrop="static" keyboard={false} onClose={() => { if (permitCloseCursoEdit) setModalEditCurso(false); }}>
        <CModalHeader>
          <strong>Editar Curso</strong>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleGuardarEdicionCurso}>
            <CFormInput
              className="mb-2"
              type="text"
              label="Nombre del curso"
              placeholder="Nombre del curso"
              value={cursoEditForm.nombre_curso}
              onChange={e => setCursoEditForm({ ...cursoEditForm, nombre_curso: e.target.value })}
              style={{ borderRadius: 8 }}
            />
            {cursoEditErrors.nombre_curso && <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{cursoEditErrors.nombre_curso}</div>}

            <CFormInput
              className="mb-2"
              type="text"
              label="Descripción"
              placeholder="Descripción"
              value={cursoEditForm.descripcion}
              onChange={e => setCursoEditForm({ ...cursoEditForm, descripcion: e.target.value })}
              style={{ borderRadius: 8 }}
            />
            {cursoEditErrors.descripcion && <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{cursoEditErrors.descripcion}</div>}
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => { setPermitCloseCursoEdit(true); setModalEditCurso(false); }}>Cancelar</CButton>
          <CButton color="info" onClick={handleGuardarEdicionCurso}>Guardar</CButton>
        </CModalFooter>
      </CModal>

      {/* Modal Editar Módulo */}
      <CModal visible={modalEditModulo} backdrop="static" keyboard={false} onClose={() => { if (permitCloseModuloEdit) setModalEditModulo(false); }}>
        <CModalHeader>
          <strong>Editar Módulo</strong>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleGuardarEdicionModulo}>
            <CFormSelect
              className="mb-2"
              label="Curso"
              value={moduloEditForm.id_curso}
              onChange={e => setModuloEditForm({ ...moduloEditForm, id_curso: e.target.value })}
              style={{ borderRadius: 8 }}
            >
              <option value="">Seleccione un curso</option>
              {cursos.map(curso => (
                <option key={curso.id_curso} value={curso.id_curso}>
                  {curso.nombre_curso}
                </option>
              ))}
            </CFormSelect>
            {moduloEditErrors.id_curso && <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{moduloEditErrors.id_curso}</div>}

            <CFormInput
              className="mb-2"
              type="text"
              label="Nombre del módulo"
              placeholder="Nombre del módulo"
              value={moduloEditForm.nombre_modulo}
              onChange={e => setModuloEditForm({ ...moduloEditForm, nombre_modulo: e.target.value })}
              style={{ borderRadius: 8 }}
            />
            {moduloEditErrors.nombre_modulo && <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{moduloEditErrors.nombre_modulo}</div>}

            <CFormInput
              className="mb-2"
              type="text"
              label="Descripción"
              placeholder="Descripción"
              value={moduloEditForm.descripcion}
              onChange={e => setModuloEditForm({ ...moduloEditForm, descripcion: e.target.value })}
              style={{ borderRadius: 8 }}
            />
            {moduloEditErrors.descripcion && <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{moduloEditErrors.descripcion}</div>}
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => { setPermitCloseModuloEdit(true); setModalEditModulo(false); }}>Cancelar</CButton>
          <CButton color="info" onClick={handleGuardarEdicionModulo}>Guardar</CButton>
        </CModalFooter>
      </CModal>

      {/* Modal Confirmación Eliminar Curso */}
      <CModal visible={modalConfirmCurso} backdrop="static" keyboard={false} onClose={() => { if (permitCloseCursoConfirm) setModalConfirmCurso(false); }}>
        <CModalHeader>
          <strong>Confirmar Eliminación</strong>
        </CModalHeader>
        <CModalBody>
          ¿Seguro que deseas eliminar este curso? Si lo eliminas, también se eliminarán todos los módulos asociados a este curso.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => { setPermitCloseCursoConfirm(true); setModalConfirmCurso(false); }}>Cancelar</CButton>
          <CButton color="danger" onClick={handleDeleteCurso}>Eliminar</CButton>
        </CModalFooter>
      </CModal>

      {/* Modal Confirmación Eliminar Módulo */}
      <CModal visible={modalConfirmModulo} backdrop="static" keyboard={false} onClose={() => { if (permitCloseModuloConfirm) setModalConfirmModulo(false); }}>
        <CModalHeader>
          <strong>Confirmar Eliminación</strong>
        </CModalHeader>
        <CModalBody>
          ¿Seguro que deseas eliminar este módulo?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => { setPermitCloseModuloConfirm(true); setModalConfirmModulo(false); }}>Cancelar</CButton>
          <CButton color="danger" onClick={handleDeleteModulo}>Eliminar</CButton>
        </CModalFooter>
      </CModal>

      {alert.text && (
        <CAlert color={alert.color} className="mt-3" dismissible onClose={() => setAlert({ color: '', text: '' })}>
          {alert.text}
        </CAlert>
      )}
    </CContainer>
  );
}