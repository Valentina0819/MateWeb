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
  CModalTitle,
  CModalBody,
  CModalFooter,
  CAlert,
  CBadge,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'

import { CIcon } from '@coreui/icons-react'
import {
  cilPlus,
  cilSearch,
  cilBook,
  cilPencil,
  cilTrash,
  cilSave,
  cilWarning,
  cilX,
} from '@coreui/icons'

export default function CrudLecciones() {
  const [modulos, setModulos] = useState([])
  const [lecciones, setLecciones] = useState([])

  const [leccionForm, setLeccionForm] = useState({
    id_modulo: '',
    nombre_leccion: '',
    descripcion: '',
  })

  const [leccionEdit, setLeccionEdit] = useState(null)
  const [leccionEliminar, setLeccionEliminar] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('success')
  const [filtroModuloCrud, setFiltroModuloCrud] = useState('')
  const [filtroLeccionCrud, setFiltroLeccionCrud] = useState('')
  const [filtroModuloForm, setFiltroModuloForm] = useState('')

  const itemsPerPage = 5
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch('http://localhost:4000/obtenermodulos')
      .then((r) => r.json())
      .then(setModulos)
      .catch(() => setModulos([]))
    fetchLecciones()
  }, [])

  const fetchLecciones = () => {
    fetch('http://localhost:4000/obtenerlecciones')
      .then((r) => r.json())
      .then(setLecciones)
      .catch(() => setLecciones([]))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!leccionForm.id_modulo || !leccionForm.nombre_leccion || !leccionForm.descripcion) {
      setMensaje('Todos los campos son obligatorios')
      setTipoMensaje('danger')
      return
    }

    try {
      await fetch('http://localhost:4000/crearleccion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leccionForm),
      })
      setLeccionForm({ id_modulo: '', nombre_leccion: '', descripcion: '' })
      fetchLecciones()
      setMensaje('¡Éxito! La lección ha sido creada.')
      setTipoMensaje('success')
    } catch {
      setMensaje('Error al intentar crear la lección')
      setTipoMensaje('danger')
    }
  }

  const handleEditSave = async () => {
    try {
      await fetch(`http://localhost:4000/lecciones/${leccionEdit.id_leccion}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leccionEdit),
      })
      setLeccionEdit(null)
      fetchLecciones()
      setMensaje('Lección actualizada correctamente')
      setTipoMensaje('success')
    } catch {
      setMensaje('Error al editar')
      setTipoMensaje('danger')
    }
  }

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:4000/lecciones/${leccionEliminar.id_leccion}`, {
        method: 'DELETE',
      })
      setLeccionEliminar(null)
      fetchLecciones()
      setMensaje('Lección eliminada permanentemente')
      setTipoMensaje('info')
    } catch {
      setMensaje('Error al eliminar')
      setTipoMensaje('danger')
    }
  }

  const filtradas = lecciones
    .filter((l) =>
      filtroModuloCrud
        ? l.nombre_modulo?.toLowerCase().includes(filtroModuloCrud.toLowerCase())
        : true,
    )
    .filter((l) =>
      filtroLeccionCrud
        ? l.nombre_leccion?.toLowerCase().includes(filtroLeccionCrud.toLowerCase())
        : true,
    )

  const totalPages = Math.ceil(filtradas.length / itemsPerPage)
  const visibles = filtradas.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const azulProfundo = '#070145'

  // Estilos personalizados
  const brandPrimary = { backgroundColor: '#114c5f', borderColor: '#114c5f', color: 'white' }

  return (
    <CContainer fluid className="py-4">
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
      <CRow className="justify-content-center">
        <CCol md={11}>
          {mensaje && (
            <CAlert
              color={tipoMensaje}
              dismissible
              onClose={() => setMensaje('')}
              className="shadow-sm"
            >
              {mensaje}
            </CAlert>
          )}

          <CRow className="g-4">
            {/* FORMULARIO DE CREACIÓN */}
            <CCol lg={4}>
              <CCard className="custom-card">
                <CCardHeader className="header-dark p-3">
                  <div className="p-4 text-white text-center" style={{ background: azulProfundo }}>
                    <CIcon icon={cilPlus} size="xl" className="mb-2" />
                    <h4 className="fw-bold mb-0">Nueva Lección</h4>
                    <p className="small opacity-75">
                      Asigna nuevas lecciones a modulos correspondientes
                    </p>
                  </div>
                </CCardHeader>
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <label className="small mb-1 fw-bold text-muted">Módulo Padre</label>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilSearch} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Buscar módulo..."
                        value={filtroModuloForm}
                        onChange={(e) => setFiltroModuloForm(e.target.value)}
                      />
                    </CInputGroup>

                    <CFormSelect
                      className="mb-3 shadow-sm"
                      value={leccionForm.id_modulo}
                      onChange={(e) =>
                        setLeccionForm({ ...leccionForm, id_modulo: e.target.value })
                      }
                    >
                      <option value="">Seleccione un módulo</option>
                      {modulos
                        .filter((m) =>
                          m.nombre_modulo.toLowerCase().includes(filtroModuloForm.toLowerCase()),
                        )
                        .map((m) => (
                          <option key={m.id_modulo} value={m.id_modulo}>
                            {m.nombre_modulo}
                          </option>
                        ))}
                    </CFormSelect>

                    <label className="small mb-1 fw-bold text-muted">Título</label>
                    <CFormInput
                      className="mb-3"
                      placeholder="Ej: Introducción a React"
                      value={leccionForm.nombre_leccion}
                      onChange={(e) =>
                        setLeccionForm({ ...leccionForm, nombre_leccion: e.target.value })
                      }
                    />

                    <label className="small mb-1 fw-bold text-muted">Descripción Corta</label>
                    <CFormInput
                      className="mb-4"
                      placeholder="¿De qué trata esta lección?"
                      value={leccionForm.descripcion}
                      onChange={(e) =>
                        setLeccionForm({ ...leccionForm, descripcion: e.target.value })
                      }
                    />

                    <CButton
                      type="submit"
                      className="btn-main w-100 text-white"
                      style={{ background: azulProfundo }}
                    >
                      <CIcon icon={cilSave} className="me-2" />
                      Registrar Lección
                    </CButton>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>

            {/* LISTADO DE LECCIONES */}
            <CCol lg={8}>
              <CCard className="custom-table-card mt-4">
                <CCardHeader className="bg-white border-0 py-3">
                  <div className="d-flex align-items-center fw-bold" style={{ color: '#333' }}>
                    <CIcon icon={cilBook} className="me-2 text-primary" size="lg" />
                    Lecciones Activas
                  </div>
                </CCardHeader>
                <CCardBody className="p-0">
                  <CTable hover responsive align="middle" className="custom-table mb-0">
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell className="ps-4">MODULO</CTableHeaderCell>
                        <CTableHeaderCell>CURSO RELACIONADO</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">ACCIONES</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {visibles.map((l) => (
                        <CTableRow key={l.id_leccion}>
                          <CTableDataCell className="ps-4 fw-bold" style={{ color: '#2c3e50' }}>
                            {l.nombre_leccion}
                          </CTableDataCell>
                          <CTableDataCell>
                            <CBadge
                              shape="rounded-pill"
                              className="px-3 py-2 fw-normal"
                              style={{
                                backgroundColor: '#eef2ff',
                                color: '#4338ca',
                                border: '1px solid #c7d2fe',
                              }}
                            >
                              {l.nombre_modulo}
                            </CBadge>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <CButton
                              color="light"
                              size="sm"
                              className="me-2 border"
                              onClick={() => setLeccionEdit(l)}
                            >
                              <CIcon icon={cilPencil} size="sm" className="text-info" />
                            </CButton>
                            <CButton
                              color="light"
                              size="sm"
                              className="border"
                              onClick={() => setLeccionEliminar(l)}
                            >
                              <CIcon icon={cilTrash} size="sm" className="text-danger" />
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>

                  {/* PAGINACIÓN ESTILO IMAGEN */}
                  <div className="d-flex justify-content-center py-4 border-top">
                    <CPagination className="mb-0 shadow-sm rounded">
                      <CPaginationItem
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="border-0 text-muted small"
                      >
                        Anterior
                      </CPaginationItem>
                      <CPaginationItem
                        active
                        style={{ backgroundColor: '#4338ca', borderColor: '#4338ca' }}
                        className="rounded mx-1 shadow-sm"
                      >
                        {page}
                      </CPaginationItem>
                      <CPaginationItem
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="border-0 text-primary small"
                      >
                        Siguiente
                      </CPaginationItem>
                    </CPagination>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCol>
      </CRow>

      {/* MODAL EDITAR - MÁS ELEGANTE */}
      <CModal
        backdrop="static"
        visible={!!leccionEdit}
        onClose={() => setLeccionEdit(null)}
        alignment="center"
      >
        <CModalHeader className="bg-info text-white">
          <CModalTitle>
            <CIcon icon={cilPencil} className="me-2" /> Editar Lección
          </CModalTitle>
        </CModalHeader>
        <CModalBody className="p-4">
          {leccionEdit && (
            <>
              <div className="mb-3">
                <label className="form-label small fw-bold">Nombre de la Lección</label>
                <CFormInput
                  value={leccionEdit.nombre_leccion}
                  onChange={(e) =>
                    setLeccionEdit({ ...leccionEdit, nombre_leccion: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Descripción</label>
                <CFormInput
                  value={leccionEdit.descripcion}
                  onChange={(e) => setLeccionEdit({ ...leccionEdit, descripcion: e.target.value })}
                />
              </div>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" variant="ghost" onClick={() => setLeccionEdit(null)}>
            Cancelar
          </CButton>
          <CButton color="info" className="text-white fw-bold" onClick={handleEditSave}>
            Guardar Cambios
          </CButton>
        </CModalFooter>
      </CModal>

      {/* MODAL ELIMINAR - TIPO ADVERTENCIA */}
      <CModal
        visible={!!leccionEliminar}
        onClose={() => setLeccionEliminar(null)}
        alignment="center"
        size="sm"
      >
        <CModalBody className="text-center p-4">
          <CIcon icon={cilWarning} size="3xl" className="text-danger mb-3" />
          <h4 className="mb-2">¿Estás seguro?</h4>
          <p className="text-muted">
            Esta acción no se puede deshacer. Se eliminará la lección{' '}
            <strong>{leccionEliminar?.nombre_leccion}</strong>.
          </p>
          <div className="d-flex justify-content-center gap-2 mt-4">
            <CButton color="light" onClick={() => setLeccionEliminar(null)}>
              Cancelar
            </CButton>
            <CButton color="danger" className="text-white" onClick={handleDelete}>
              Sí, eliminar
            </CButton>
          </div>
        </CModalBody>
      </CModal>
    </CContainer>
  )
}
