import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CContainer,
  CPagination,
  CPaginationItem,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CAlert,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilPlus, cilSearch, cilTrash, cilSave, cilBook, cilPencil } from '@coreui/icons'

export default function CrudRecursos() {
  const [lecciones, setLecciones] = useState([])
  const [recursos, setRecursos] = useState([])
  const [recursoForm, setRecursoForm] = useState({
    id_leccion: '',
    tipo_recurso: '',
    url: '',
    descripcion: '',
  })
  const [recursoEdit, setRecursoEdit] = useState(null)
  const [recursoEliminar, setRecursoEliminar] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('success')
  const itemsPerPage = 5
  const [recursoPage, setRecursoPage] = useState(1)

  // NUEVO: Filtros
  const [filtroLeccionForm, setFiltroLeccionForm] = useState('')
  const [filtroLeccionCrud, setFiltroLeccionCrud] = useState('')

  useEffect(() => {
    fetchLecciones()
    fetchRecursos()
  }, [])

  const fetchLecciones = () => {
    fetch('http://localhost:4000/obtenerlecciones')
      .then((res) => res.json())
      .then(setLecciones)
  }

  const fetchRecursos = () => {
    fetch('http://localhost:4000/obtenerrecursos')
      .then((res) => res.json())
      .then(setRecursos)
  }

  const handleRecursoSubmit = async (e) => {
    e.preventDefault()
    await fetch('http://localhost:4000/crearrecurso', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recursoForm),
    })
    setRecursoForm({ id_leccion: '', tipo_recurso: '', url: '', descripcion: '' })
    fetchRecursos()
    setMensaje('Recurso creado correctamente')
    setTipoMensaje('success')
  }

  const handleRecursoEdit = (recurso) => setRecursoEdit(recurso)
  const handleRecursoEditSave = async (e) => {
    e.preventDefault()
    await fetch(`http://localhost:4000/recursos/${recursoEdit.id_recurso}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recursoEdit),
    })
    setRecursoEdit(null)
    fetchRecursos()
    setMensaje('Recurso editado correctamente')
    setTipoMensaje('success')
  }

  const handleRecursoEliminar = (recurso) => setRecursoEliminar(recurso)
  const handleRecursoEliminarConfirm = async () => {
    await fetch(`http://localhost:4000/recursos/${recursoEliminar.id_recurso}`, {
      method: 'DELETE',
    })
    setRecursoEliminar(null)
    fetchRecursos()
    setMensaje('Recurso eliminado correctamente')
    setTipoMensaje('success')
  }

  // Filtrar lecciones para el formulario
  const leccionesFiltradasForm = lecciones.filter((l) =>
    l.nombre_leccion.toLowerCase().includes(filtroLeccionForm.toLowerCase()),
  )

  // Filtrar recursos por nombre de lección en el CRUD
  const recursosFiltrados = recursos.filter((r) =>
    r.nombre_leccion.toLowerCase().includes(filtroLeccionCrud.toLowerCase()),
  )

  const recursosTotalPages = Math.ceil(recursosFiltrados.length / itemsPerPage)
  const recursosToShow = recursosFiltrados.slice(
    (recursoPage - 1) * itemsPerPage,
    recursoPage * itemsPerPage,
  )

  // Efecto para limpiar el mensaje automáticamente después de 5 segundos
  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => {
        setMensaje('')
      }, 5000)

      // Limpiamos el timer si el componente se desmonta o el mensaje cambia
      return () => clearTimeout(timer)
    }
  }, [mensaje])

  const modalStyle = { maxWidth: 500, width: '100%' }
  const buttonStyle = { minWidth: 110, maxWidth: 110 }
  const azulProfundo = '#070145'
  return (
    <CContainer className="py-5">
      <style>
        {`
          .custom-card { border: none; border-radius: 16px; box-shadow: 0 8px 30px rgba(0,0,0,0.05); transition: 0.3s; }
          .header-dark { background: ${azulProfundo}; color: white; border-radius: 16px 16px 0 0 !important; font-weight: 700; letter-spacing: 0.5px; }
          .header-green { background: #101bb9ff; color: white; border-radius: 16px 16px 0 0 !important; }
          .input-modern { border: 2px solid #f1f3f5; border-radius: 10px; padding: 10px 15px; transition: all 0.3s; }
          .input-modern:focus { border-color: ${azulProfundo}; box-shadow: 0 0 0 4px rgba(7, 1, 69, 0.08); }
          .btn-main { border-radius: 10px; font-weight: 600; padding: 10px 20px; transition: 0.3s; }
          .btn-main:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
          .badge-soft { background-color: #eef2ff; color: #4338ca; border: 1px solid #c7d2fe; padding: 6px 12px; font-weight: 700; }
          .table-modern thead { background-color: #f8fafc; }
          .table-modern tr:hover { background-color: #fcfdfe !important; }
          .form-label-custom { font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; margin-bottom: 6px; display: block; }

        `}
      </style>

      <CContainer className="py-5">
        {mensaje && (
          <CAlert
            color={tipoMensaje}
            dismissible
            onClose={() => setMensaje('')}
            className="shadow-sm rounded-3"
          >
            {mensaje}
          </CAlert>
        )}

        {/* 🔹 ROW PRINCIPAL */}
        <CRow className="g-4 align-items-start">
          <CCol md={12} xl={5} xxl={4}>
            <CCard className="custom-card">
              <CCardHeader className="header-dark p-3">
                <div className="p-4 text-white text-center" style={{ background: azulProfundo }}>
                  <CIcon icon={cilPlus} size="xl" className="mb-2" />
                  <h4 className="fw-bold mb-0">Nuevo Recurso</h4>
                  <p className="small opacity-75">
                    Asigna nuevos recursos a lecciones correspondientes
                  </p>
                </div>
              </CCardHeader>
              <CCardBody>
                <CForm onSubmit={handleRecursoSubmit}>
                  <CFormInput
                    className="mb-2"
                    placeholder="Filtrar lección por nombre"
                    value={filtroLeccionForm}
                    onChange={(e) => setFiltroLeccionForm(e.target.value)}
                  />
                  <CFormSelect
                    className="mb-3"
                    label="Lección"
                    value={recursoForm.id_leccion}
                    onChange={(e) => setRecursoForm({ ...recursoForm, id_leccion: e.target.value })}
                    required
                  >
                    <option value="">Seleccione una lección</option>
                    {leccionesFiltradasForm.map((l) => (
                      <option key={l.id_leccion} value={l.id_leccion}>
                        {l.nombre_leccion}
                      </option>
                    ))}
                  </CFormSelect>
                  <CFormInput
                    className="mb-3"
                    type="text"
                    label="Tipo de recurso"
                    placeholder="Tipo de recurso"
                    value={recursoForm.tipo_recurso}
                    onChange={(e) =>
                      setRecursoForm({ ...recursoForm, tipo_recurso: e.target.value })
                    }
                    required
                  />
                  <CFormInput
                    className="mb-3"
                    type="text"
                    label="URL"
                    placeholder="URL"
                    value={recursoForm.url}
                    onChange={(e) => setRecursoForm({ ...recursoForm, url: e.target.value })}
                    required
                  />
                  <CFormInput
                    className="mb-3"
                    type="text"
                    label="Descripción"
                    placeholder="Descripción"
                    value={recursoForm.descripcion}
                    onChange={(e) =>
                      setRecursoForm({ ...recursoForm, descripcion: e.target.value })
                    }
                    required
                  />
                  <div className="d-flex justify-content-end">
                    <CButton
                      type="submit"
                      className="btn-main w-100 text-white"
                      style={{ background: azulProfundo }}
                    >
                      <CIcon icon={cilSave} className="me-2" />
                      Crear Recurso
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>

          <CCol md={12} xl={7} xxl={8}>
            <CCard className="custom-table-card mt-4">
              <CCardHeader className="bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                {/* Título a la izquierda */}
                <div className="d-flex align-items-center fw-bold" style={{ color: '#333' }}>
                  <CIcon icon={cilBook} className="me-2 text-primary" size="lg" />
                  Recursos
                </div>

                {/* Buscador a la derecha */}
                <CCol md={6} lg={4} className="p-0">
                  <CInputGroup>
                    {/* Icono dentro de CInputGroupText */}
                    <CInputGroupText
                      className="bg-white border-end-0"
                      style={{ borderRadius: '10px 0 0 10px' }}
                    >
                      <CIcon icon={cilSearch} className="text-muted" />
                    </CInputGroupText>

                    <CFormInput
                      placeholder="Filtrar recursos por lección"
                      value={filtroLeccionCrud}
                      onChange={(e) => {
                        setFiltroLeccionCrud(e.target.value)
                        setRecursoPage(1)
                      }}
                    />
                  </CInputGroup>
                </CCol>
              </CCardHeader>
              <CCardBody>
                <CTable hover responsive align="middle" className="custom-table mb-0">
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>LECCION</CTableHeaderCell>
                      <CTableHeaderCell>TIPO</CTableHeaderCell>
                      <CTableHeaderCell>URL</CTableHeaderCell>
                      <CTableHeaderCell>DESCRIPCIÓN</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">ACCIONES</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {recursosToShow.map((r) => (
                      <CTableRow key={r.id_recurso}>
                        <CTableDataCell>{r.nombre_leccion}</CTableDataCell>
                        <CTableDataCell>{r.tipo_recurso}</CTableDataCell>
                        <CTableDataCell>{r.url}</CTableDataCell>
                        <CTableDataCell>{r.descripcion}</CTableDataCell>
                        <CTableDataCell>
                          <div className="d-flex justify-content-center gap-2">
                            <CButton
                              color="light"
                              size="sm"
                              className="me-2 border"
                              onClick={() => handleRecursoEdit(r)}
                            >
                              <CIcon icon={cilPencil} size="sm" className="text-info" />
                            </CButton>
                            <CButton
                              color="light"
                              size="sm"
                              className="border"
                              onClick={() => handleRecursoEliminar(r)}
                            >
                              <CIcon icon={cilTrash} size="sm" className="text-danger" />
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
      </CContainer>

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
                onChange={(e) => setRecursoEdit({ ...recursoEdit, id_leccion: e.target.value })}
                required
              >
                <option value="">Seleccione una lección</option>
                {lecciones
                  .filter((l) =>
                    l.nombre_leccion.toLowerCase().includes(filtroLeccionForm.toLowerCase()),
                  )
                  .map((l) => (
                    <option key={l.id_leccion} value={l.id_leccion}>
                      {l.nombre_leccion}
                    </option>
                  ))}
              </CFormSelect>
              <CFormInput
                className="mb-3"
                type="text"
                label="Tipo de recurso"
                value={recursoEdit.tipo_recurso}
                onChange={(e) => setRecursoEdit({ ...recursoEdit, tipo_recurso: e.target.value })}
                required
              />
              <CFormInput
                className="mb-3"
                type="text"
                label="URL"
                value={recursoEdit.url}
                onChange={(e) => setRecursoEdit({ ...recursoEdit, url: e.target.value })}
                required
              />
              <CFormInput
                className="mb-3"
                type="text"
                label="Descripción"
                value={recursoEdit.descripcion}
                onChange={(e) => setRecursoEdit({ ...recursoEdit, descripcion: e.target.value })}
                required
              />
              <div className="d-flex justify-content-end">
                <CButton
                  type="submit"
                  style={{ background: '#114c5f', color: 'white', minWidth: 140 }}
                >
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
          ¿Seguro que deseas eliminar el recurso <b>{recursoEliminar?.tipo_recurso}</b> de la
          lección <b>{recursoEliminar?.nombre_leccion}</b>?
        </CModalBody>
        <CModalFooter className="justify-content-center">
          <CButton
            style={{ background: '#114c5f', color: 'white', ...buttonStyle }}
            onClick={() => setRecursoEliminar(null)}
          >
            Cancelar
          </CButton>
          <CButton
            style={{ background: '#114c5f', color: 'white', ...buttonStyle }}
            onClick={handleRecursoEliminarConfirm}
          >
            Eliminar
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}
