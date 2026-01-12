import React, { useEffect, useState } from 'react';
import {
  CCard, CCardBody, CCardHeader, CForm, CFormInput, CFormSelect, CButton,
  CRow, CCol, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CContainer, CPagination, CPaginationItem, CModal, CModalHeader, CModalBody, CModalFooter, CAlert
} from '@coreui/react';

export default function CrudRecursos() {
  const [lecciones, setLecciones] = useState([]);
  const [recursos, setRecursos] = useState([]);
  const [recursoForm, setRecursoForm] = useState({ id_leccion: '', tipo_recurso: '', url: '', descripcion: '' });
  const [recursoEdit, setRecursoEdit] = useState(null);
  const [recursoEliminar, setRecursoEliminar] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('success');
  const itemsPerPage = 5;
  const [recursoPage, setRecursoPage] = useState(1);

  // NUEVO: Filtros
  const [filtroLeccionForm, setFiltroLeccionForm] = useState('');
  const [filtroLeccionCrud, setFiltroLeccionCrud] = useState('');

  useEffect(() => {
    fetchLecciones();
    fetchRecursos();
  }, []);

  const fetchLecciones = () => {
    fetch('http://localhost:4000/obtenerlecciones')
      .then(res => res.json())
      .then(setLecciones);
  };

  const fetchRecursos = () => {
    fetch('http://localhost:4000/obtenerrecursos')
      .then(res => res.json())
      .then(setRecursos);
  };

  const handleRecursoSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:4000/crearrecurso', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recursoForm)
    });
    setRecursoForm({ id_leccion: '', tipo_recurso: '', url: '', descripcion: '' });
    fetchRecursos();
    setMensaje('Recurso creado correctamente');
    setTipoMensaje('success');
  };

  const handleRecursoEdit = (recurso) => setRecursoEdit(recurso);
  const handleRecursoEditSave = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:4000/recursos/${recursoEdit.id_recurso}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recursoEdit)
    });
    setRecursoEdit(null);
    fetchRecursos();
    setMensaje('Recurso editado correctamente');
    setTipoMensaje('success');
  };

  const handleRecursoEliminar = (recurso) => setRecursoEliminar(recurso);
  const handleRecursoEliminarConfirm = async () => {
    await fetch(`http://localhost:4000/recursos/${recursoEliminar.id_recurso}`, {
      method: 'DELETE'
    });
    setRecursoEliminar(null);
    fetchRecursos();
    setMensaje('Recurso eliminado correctamente');
    setTipoMensaje('success');
  };

  // Filtrar lecciones para el formulario
  const leccionesFiltradasForm = lecciones.filter(l =>
    l.nombre_leccion.toLowerCase().includes(filtroLeccionForm.toLowerCase())
  );

  // Filtrar recursos por nombre de lección en el CRUD
  const recursosFiltrados = recursos.filter(r =>
    r.nombre_leccion.toLowerCase().includes(filtroLeccionCrud.toLowerCase())
  );

  const recursosTotalPages = Math.ceil(recursosFiltrados.length / itemsPerPage);
  const recursosToShow = recursosFiltrados.slice((recursoPage - 1) * itemsPerPage, recursoPage * itemsPerPage);
  const modalStyle = { maxWidth: 500, width: '100%' };
  const buttonStyle = { minWidth: 110, maxWidth: 110 };

  return (
    <CContainer className="py-4">
      {mensaje && <CAlert color={tipoMensaje} onClose={() => setMensaje('')}>{mensaje}</CAlert>}
      <CRow className="mb-4">
        <CCol md={12} xl={8} xxl={7} style={{ margin: '0 auto' }}>
          <CCard className="mb-4 shadow" style={{ minWidth: 600, maxWidth: 900, margin: '0 auto' }}>
            <CCardHeader style={{ background: '#070145', color: 'white' }}>
              <strong>Nuevo Recurso</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleRecursoSubmit}>
                <CFormInput
                  className="mb-2"
                  placeholder="Filtrar lección por nombre"
                  value={filtroLeccionForm}
                  onChange={e => setFiltroLeccionForm(e.target.value)}
                />
                <CFormSelect
                  className="mb-3"
                  label="Lección"
                  value={recursoForm.id_leccion}
                  onChange={e => setRecursoForm({ ...recursoForm, id_leccion: e.target.value })}
                  required
                >
                  <option value="">Seleccione una lección</option>
                  {leccionesFiltradasForm.map(l => (
                    <option key={l.id_leccion} value={l.id_leccion}>{l.nombre_leccion}</option>
                  ))}
                </CFormSelect>
                <CFormInput
                  className="mb-3"
                  type="text"
                  label="Tipo de recurso"
                  placeholder="Tipo de recurso"
                  value={recursoForm.tipo_recurso}
                  onChange={e => setRecursoForm({ ...recursoForm, tipo_recurso: e.target.value })}
                  required
                />
                <CFormInput
                  className="mb-3"
                  type="text"
                  label="URL"
                  placeholder="URL"
                  value={recursoForm.url}
                  onChange={e => setRecursoForm({ ...recursoForm, url: e.target.value })}
                  required
                />
                <CFormInput
                  className="mb-3"
                  type="text"
                  label="Descripción"
                  placeholder="Descripción"
                  value={recursoForm.descripcion}
                  onChange={e => setRecursoForm({ ...recursoForm, descripcion: e.target.value })}
                  required
                />
                <div className="d-flex justify-content-end">
                  <CButton type="submit" style={{ background: '#070145', color: 'white', minWidth: 140 }}>Crear Recurso</CButton>
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
              <strong>Recursos</strong>
            </CCardHeader>
            <CCardBody>
              <CRow className="mb-3">
                <CCol md={6} lg={4}>
                  <CFormInput
                    placeholder="Filtrar recursos por lección"
                    value={filtroLeccionCrud}
                    onChange={e => { setFiltroLeccionCrud(e.target.value); setRecursoPage(1); }}
                  />
                </CCol>
              </CRow>
              <CTable hover responsive style={{ minWidth: 600 }}>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Lección</CTableHeaderCell>
                    <CTableHeaderCell>Tipo</CTableHeaderCell>
                    <CTableHeaderCell>URL</CTableHeaderCell>
                    <CTableHeaderCell>Descripción</CTableHeaderCell>
                    <CTableHeaderCell>Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {recursosToShow.map(r => (
                    <CTableRow key={r.id_recurso}>
                      <CTableDataCell>{r.nombre_leccion}</CTableDataCell>
                      <CTableDataCell>{r.tipo_recurso}</CTableDataCell>
                      <CTableDataCell>{r.url}</CTableDataCell>
                      <CTableDataCell>{r.descripcion}</CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex justify-content-center gap-2">
                          <CButton
                            size="sm"
                            style={{ background: '#070145', color: 'white', ...buttonStyle }}
                            onClick={() => handleRecursoEdit(r)}
                          >
                            Editar
                          </CButton>
                          <CButton
                            size="sm"
                            style={{ background: 'red', color: 'white', ...buttonStyle }}
                            onClick={() => handleRecursoEliminar(r)}
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
                <CPagination align="center" aria-label="Paginación recursos">
                  <CPaginationItem
                    disabled={recursoPage === 1}
                    onClick={() => setRecursoPage(recursoPage - 1)}
                  >
                    &laquo;
                  </CPaginationItem>
                  {[...Array(recursosTotalPages)].map((_, idx) => (
                    <CPaginationItem
                      key={idx + 1}
                      active={recursoPage === idx + 1}
                      onClick={() => setRecursoPage(idx + 1)}
                    >
                      {idx + 1}
                    </CPaginationItem>
                  ))}
                  <CPaginationItem
                    disabled={recursoPage === recursosTotalPages || recursosTotalPages === 0}
                    onClick={() => setRecursoPage(recursoPage + 1)}
                  >
                    &raquo;
                  </CPaginationItem>
                </CPagination>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modales */}
      <CModal
        visible={!!recursoEdit}
        onClose={() => setRecursoEdit(null)}
        alignment="center"
        size="lg"
        backdrop="static"
      >
        <CModalHeader closeButton style={{ background: '#114c5f', color: 'white' }}>
          Editar Recurso
        </CModalHeader>
        <CModalBody style={{ padding: 32 }}>
          {recursoEdit && (
            <CForm onSubmit={handleRecursoEditSave} style={modalStyle}>
              <CFormSelect
                className="mb-3"
                label="Lección"
                value={recursoEdit.id_leccion}
                onChange={e => setRecursoEdit({ ...recursoEdit, id_leccion: e.target.value })}
                required
              >
                <option value="">Seleccione una lección</option>
                {lecciones
                  .filter(l => l.nombre_leccion.toLowerCase().includes(filtroLeccionForm.toLowerCase()))
                  .map(l => (
                    <option key={l.id_leccion} value={l.id_leccion}>{l.nombre_leccion}</option>
                  ))}
              </CFormSelect>
              <CFormInput
                className="mb-3"
                type="text"
                label="Tipo de recurso"
                value={recursoEdit.tipo_recurso}
                onChange={e => setRecursoEdit({ ...recursoEdit, tipo_recurso: e.target.value })}
                required
              />
              <CFormInput
                className="mb-3"
                type="text"
                label="URL"
                value={recursoEdit.url}
                onChange={e => setRecursoEdit({ ...recursoEdit, url: e.target.value })}
                required
              />
              <CFormInput
                className="mb-3"
                type="text"
                label="Descripción"
                value={recursoEdit.descripcion}
                onChange={e => setRecursoEdit({ ...recursoEdit, descripcion: e.target.value })}
                required
              />
              <div className="d-flex justify-content-end">
                <CButton type="submit" style={{ background: '#114c5f', color: 'white', minWidth: 140 }}>
                  Guardar
                </CButton>
              </div>
            </CForm>
          )}
        </CModalBody>
      </CModal>
      <CModal
        visible={!!recursoEliminar}
        onClose={() => setRecursoEliminar(null)}
        alignment="center"
        size="sm"
        backdrop="static"
      >
        <CModalHeader closeButton style={{ background: '#114c5f', color: 'white' }}>
          Eliminar Recurso
        </CModalHeader>
        <CModalBody className="text-center" style={{ padding: 32 }}>
          ¿Seguro que deseas eliminar el recurso <b>{recursoEliminar?.tipo_recurso}</b> de la lección <b>{recursoEliminar?.nombre_leccion}</b>?
        </CModalBody>
        <CModalFooter className="justify-content-center">
          <CButton style={{ background: '#114c5f', color: 'white', ...buttonStyle }} onClick={() => setRecursoEliminar(null)}>Cancelar</CButton>
          <CButton style={{ background: '#114c5f', color: 'white', ...buttonStyle }} onClick={handleRecursoEliminarConfirm}>Eliminar</CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  );
}