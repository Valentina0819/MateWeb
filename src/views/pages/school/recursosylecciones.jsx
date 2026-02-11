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
  cilEducation,
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
    fetch('https://mateweb-production.up.railway.app/obtenermodulos')
      .then((r) => r.json())
      .then(setModulos)
      .catch(() => setModulos([]))
    fetchLecciones()
  }, [])

  const fetchLecciones = () => {
    fetch('https://mateweb-production.up.railway.app/obtenerlecciones')
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
      await fetch('https://mateweb-production.up.railway.app/crearleccion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leccionForm),
      })
      setLeccionForm({ id_modulo: '', nombre_leccion: '', descripcion: '' })
      fetchLecciones()
      setMensaje('¡Exito! La leccion ha sido creada.')
      setTipoMensaje('success')
    } catch {
      setMensaje('Error al intentar crear la leccion')
      setTipoMensaje('danger')
    }
  }

  const handleEditSave = async () => {
    try {
      await fetch(`https://mateweb-production.up.railway.app/lecciones/${leccionEdit.id_leccion}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leccionEdit),
      })
      setLeccionEdit(null)
      fetchLecciones()
      setMensaje('Leccion actualizada correctamente')
      setTipoMensaje('success')
    } catch {
      setMensaje('Error al editar')
      setTipoMensaje('danger')
    }
  }

  const handleDelete = async () => {
    try {
      await fetch(
        `https://mateweb-production.up.railway.app/lecciones/${leccionEliminar.id_leccion}`,
        {
          method: 'DELETE',
        },
      )
      setLeccionEliminar(null)
      fetchLecciones()
      setMensaje('Leccion eliminada permanentemente')
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
            {/* FORMULARIO DE CREACION */}
            <CCol lg={4}>
              <CCard className="custom-card">
                <CCardHeader className="header-dark p-3">
                  <div className="p-4 text-white text-center" style={{ background: azulProfundo }}>
                    <CIcon icon={cilPlus} size="xl" className="mb-2" />
                    <h4 className="fw-bold mb-0">Nueva Leccion</h4>
                    <p className="small opacity-75">
                      Asigna nuevas lecciones a modulos correspondientes
                    </p>
                  </div>
                </CCardHeader>
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <label className="small mb-1 fw-bold text-muted">Modulo Padre</label>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilSearch} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Buscar modulo..."
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
                      <option value="">Seleccione un modulo</option>
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

                    <label className="small mb-1 fw-bold text-muted">Ti­tulo</label>
                    <CFormInput
                      className="mb-3"
                      placeholder="Ej: Introduccion a React"
                      value={leccionForm.nombre_leccion}
                      onChange={(e) =>
                        setLeccionForm({ ...leccionForm, nombre_leccion: e.target.value })
                      }
                    />

                    <label className="small mb-1 fw-bold text-muted">Descripcion Corta</label>
                    <CFormInput
                      className="mb-4"
                      placeholder="¿De que trata esta leccion?"
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
                      Registrar Leccion
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

      <CModal
        visible={!!leccionEdit}
        onClose={() => setLeccionEdit(null)}
        alignment="center"
        backdrop="static"
        size="lg"
      >
        {/* HEADER */}
        <CModalHeader
          className="border-0 p-4"
          style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}
        >
          <div className="d-flex align-items-center">
            <div className="p-3 bg-info rounded-3 me-3 shadow-sm">
              <CIcon icon={cilPencil} className="text-white" size="lg" />
            </div>
            <div>
              <h5 className="mb-0 fw-bold" style={{ color: '#070145' }}>
                Editar Leccion
              </h5>
              <small className="text-muted">Actualiza la informacion de la leccion</small>
            </div>
          </div>
        </CModalHeader>

        {/* BODY */}
        <CModalBody className="p-4">
          {leccionEdit && (
            <CRow className="g-4">
              {/* Nombre */}
              <CCol md={12}>
                <div
                  className="p-3 rounded-4"
                  style={{
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <label
                    className="fw-bold small text-uppercase d-block mb-2"
                    style={{ color: '#070145', letterSpacing: '1px' }}
                  >
                    Nombre de la leccion
                  </label>
                  <CFormInput
                    className="shadow-sm"
                    style={{
                      backgroundColor: '#fff',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '2px solid #cbd5e1',
                    }}
                    placeholder="Ej: Introduccion a React"
                    value={leccionEdit.nombre_leccion}
                    onChange={(e) =>
                      setLeccionEdit({ ...leccionEdit, nombre_leccion: e.target.value })
                    }
                  />
                </div>
              </CCol>

              {/* Descripcion */}
              <CCol md={12}>
                <div
                  className="p-3 rounded-4"
                  style={{
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <label
                    className="fw-bold small text-uppercase d-block mb-2"
                    style={{ color: '#070145', letterSpacing: '1px' }}
                  >
                    Descripcion
                  </label>
                  <CFormInput
                    className="shadow-sm"
                    style={{
                      backgroundColor: '#fff',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '2px solid #cbd5e1',
                    }}
                    placeholder="Breve descripcion de la leccion"
                    value={leccionEdit.descripcion}
                    onChange={(e) =>
                      setLeccionEdit({ ...leccionEdit, descripcion: e.target.value })
                    }
                  />
                </div>
              </CCol>
            </CRow>
          )}
        </CModalBody>

        {/* FOOTER */}
        <CModalFooter
          className="border-0 p-4 justify-content-between"
          style={{ background: '#f8fafc' }}
        >
          <CButton
            color="secondary"
            variant="ghost"
            className="fw-bold text-uppercase"
            onClick={() => setLeccionEdit(null)}
          >
            Cancelar
          </CButton>

          <CButton
            className="px-5 text-white shadow"
            style={{
              background: 'linear-gradient(45deg, #0dcaf0, #0aa2c0)',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 'bold',
            }}
            onClick={handleEditSave}
          >
            Guardar Cambios
          </CButton>
        </CModalFooter>
      </CModal>

      {/* MODAL ELIMINAR - TIPO ADVERTENCIA */}
      <CModal
        visible={!!leccionEliminar}
        onClose={() => setLeccionEliminar(null)}
        alignment="center"
        backdrop="static"
        size="lg"
      >
        {/* HEADER */}
        <CModalHeader
          className="border-0 p-4"
          style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}
        >
          <div className="d-flex align-items-center">
            <div className="p-3 bg-danger rounded-circle me-3 shadow-sm">
              <CIcon icon={cilTrash} className="text-white" size="xl" />
            </div>
            <div>
              <h5 className="mb-0 fw-bold" style={{ color: '#070145' }}>
                Confirmar Eliminacion de Leccion
              </h5>
              <small className="text-muted">Esta accion no se puede deshacer</small>
            </div>
          </div>
        </CModalHeader>

        {/* BODY */}
        <CModalBody className="p-4">
          <div className="text-center mb-4">
            <p className="text-muted">
              Estas a punto de eliminar la siguiente leccion del sistema:
            </p>
          </div>

          <CRow className="g-3">
            <CCol md={12}>
              <div
                className="p-4 rounded-4 border-start border-4 border-danger"
                style={{ backgroundColor: '#fff5f5' }}
              >
                <label
                  className="fw-bold small text-uppercase opacity-50 d-block mb-2"
                  style={{ letterSpacing: '1px' }}
                >
                  Leccion a eliminar
                </label>

                <div className="d-flex align-items-center">
                  <div className="p-3 bg-danger rounded-3 me-3 shadow-sm">
                    <CIcon icon={cilEducation} className="text-white" size="lg" />
                  </div>
                  <span className="fs-4 fw-bold text-dark">
                    {leccionEliminar?.nombre_leccion || 'Leccion no seleccionada'}
                  </span>
                </div>
              </div>
            </CCol>
          </CRow>

          <div className="mt-4 p-3 rounded-3 bg-light border text-center">
            <p className="mb-0 text-secondary" style={{ fontSize: '0.9rem' }}>
              Al eliminar esta lección se perdera toda la informacion asociada de forma permanente.
            </p>
          </div>
        </CModalBody>

        {/* FOOTER */}
        <CModalFooter
          className="border-0 p-4 justify-content-between"
          style={{ background: '#f8fafc' }}
        >
          <CButton
            color="secondary"
            variant="ghost"
            className="fw-bold text-uppercase"
            onClick={() => setLeccionEliminar(null)}
          >
            Cancelar
          </CButton>

          <CButton
            className="px-5 text-white shadow"
            style={{
              background: '#dc3545',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 'bold',
            }}
            onClick={handleDelete}
          >
            Si, ELIMINAR LECCIÓN
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}
