import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
  CAlert,
  CBadge,
  CTooltip,
  CCol,
  CRow,
  CFormLabel,
  CFormText,
  CFormFeedback,
  CModalTitle,
} from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilSave, cilPencil, cilTrash, cilWarning, cilPeople } from '@coreui/icons'
const roles = [
  { value: 'admin', label: 'Administrador' },
  { value: 'alumno', label: 'Alumno' },
  { value: 'docente', label: 'docente' },
]

export default function CrudUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [modal, setModal] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)
  const [usuarioEdit, setUsuarioEdit] = useState(null)
  const [usuarioEliminar, setUsuarioEliminar] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('success')

  // Cargar usuarios
  const cargarUsuarios = () => {
    fetch('http://localhost:4000/usuarios')
      .then((res) => res.json())
      .then(setUsuarios)
  }

  useEffect(() => {
    cargarUsuarios()
  }, [])

  // Editar usuario
  const handleEditar = (usuario) => {
    setUsuarioEdit(usuario)
    setModal(true)
    setMensaje('')
  }

  // Guardar edición
  const handleGuardar = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:4000/usuarios/${usuarioEdit.id_usuario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioEdit),
      })
      const data = await res.json()
      if (res.ok) {
        setMensaje('Usuario actualizado correctamente')
        setTipoMensaje('success')
        setModal(false)
        cargarUsuarios()
      } else {
        setMensaje(data.mensaje || 'Error al actualizar')
        setTipoMensaje('danger')
      }
    } catch {
      setMensaje('Error de conexión')
      setTipoMensaje('danger')
    }
  }

  // Eliminar usuario
  const handleEliminar = async () => {
    try {
      const res = await fetch(`http://localhost:4000/usuarios/${usuarioEliminar.id_usuario}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (res.ok) {
        setMensaje('Usuario eliminado correctamente')
        setTipoMensaje('success')
        setModalEliminar(false)
        cargarUsuarios()
      } else {
        setMensaje(data.mensaje || 'Error al eliminar')
        setTipoMensaje('danger')
      }
    } catch {
      setMensaje('Error de conexión')
      setTipoMensaje('danger')
    }
  }

  return (
    <CRow className="justify-content-center mt-5 mb-5">
      <CCol md={11} lg={10}>
        <CCard
          className="border-0"
          style={{
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
            position: 'relative',
          }}
        >
          <CCardHeader
            className="d-flex justify-content-between align-items-center py-3"
            style={{
              background: '#070145',
              color: 'white',
              border: 'none',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
            }}
          >
            <div className="d-flex align-items-center">
              <CIcon icon={cilPeople} className="me-2" size="lg" />
              <h5 className="mb-0 fw-bold">Gestión de Usuarios</h5>
            </div>
            <CBadge color="info" shape="rounded-pill">
              {usuarios.length} Usuarios totales
            </CBadge>
          </CCardHeader>

          <CCardBody
            className="px-4"
            style={{
              borderBottomLeftRadius: '20px',
              borderBottomRightRadius: '20px',
            }}
          >
            {/* Alerta con el autocierre que configuramos antes */}
            {mensaje && (
              <CAlert
                color={tipoMensaje}
                dismissible
                onClose={() => setMensaje('')}
                className="border-0 shadow-sm"
                style={{ borderRadius: '10px' }}
              >
                {mensaje}
              </CAlert>
            )}

            <div className="table-responsive">
              <CTable align="middle" hover responsive className="mb-0 mt-2">
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="border-0 text-muted small text-uppercase">
                      Nombre Completo
                    </CTableHeaderCell>
                    <CTableHeaderCell className="border-0 text-muted small text-uppercase">
                      Email
                    </CTableHeaderCell>
                    <CTableHeaderCell className="border-0 text-muted small text-uppercase text-center">
                      Rol
                    </CTableHeaderCell>
                    <CTableHeaderCell className="border-0 text-muted small text-uppercase text-end">
                      Acciones
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {usuarios.map((u) => (
                    <CTableRow key={u.id_usuario}>
                      <CTableDataCell>
                        <div className="fw-bold text-dark">
                          {u.nombre} {u.apellido}
                        </div>
                        <small className="text-muted">ID: #{u.id_usuario}</small>
                      </CTableDataCell>
                      <CTableDataCell>{u.email}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CBadge
                          color={u.rol === 'admin' ? 'danger' : 'info'}
                          variant="outline"
                          className="px-3 py-2 text-uppercase"
                          style={{ fontSize: '10px', borderRadius: '5px' }}
                        >
                          {u.rol}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell className="text-end">
                        <CTooltip content="Editar Usuario">
                          <CButton
                            color="light"
                            size="sm"
                            className="me-2 shadow-sm border"
                            onClick={() => handleEditar(u)}
                            style={{ borderRadius: '8px' }}
                          >
                            <CIcon icon={cilPencil} className="text-primary" />
                          </CButton>
                        </CTooltip>
                        <CTooltip content="Eliminar Usuario">
                          <CButton
                            color="light"
                            size="sm"
                            className="shadow-sm border"
                            onClick={() => {
                              setUsuarioEliminar(u)
                              setModalEliminar(true)
                            }}
                            style={{ borderRadius: '8px' }}
                          >
                            <CIcon icon={cilTrash} className="text-danger" />
                          </CButton>
                        </CTooltip>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      {/* Modal Eliminar - Estilo de Advertencia */}
      <CModal
        visible={modalEliminar}
        onClose={() => setModalEliminar(false)}
        alignment="center"
        size="sm"
      >
        <CModalBody className="text-center p-4">
          <CIcon icon={cilWarning} size="3xl" className="text-danger mb-3" />
          <h5 className="fw-bold">¿Estás seguro?</h5>
          <p className="text-muted small">
            Estás a punto de eliminar a <br />
            <strong className="text-dark">
              {usuarioEliminar?.nombre} {usuarioEliminar?.apellido}
            </strong>
            . Esta acción no se puede deshacer.
          </p>
          <div className="d-flex gap-2 justify-content-center mt-4">
            <CButton color="light" className="px-4" onClick={() => setModalEliminar(false)}>
              Cancelar
            </CButton>
            <CButton color="danger" className="text-white px-4" onClick={handleEliminar}>
              Eliminar
            </CButton>
          </div>
        </CModalBody>
      </CModal>

      {/* Modal Editar - Rediseñado */}
      <CModal backdrop="static" visible={modal} onClose={() => setModal(false)} alignment="center">
        <CModalHeader className="border-0">
          <CModalTitle className="fw-bold">Editar Perfil</CModalTitle>
        </CModalHeader>
        <CModalBody className="px-4 pb-4">
          {usuarioEdit && (
            <CForm onSubmit={handleGuardar} className="row g-3">
              <CCol md={6}>
                <CFormInput
                  label="Nombre"
                  placeholder="Ej: Juan"
                  value={usuarioEdit.nombre}
                  onChange={(e) => setUsuarioEdit({ ...usuarioEdit, nombre: e.target.value })}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  label="Apellido"
                  placeholder="Ej: Pérez"
                  value={usuarioEdit.apellido}
                  onChange={(e) => setUsuarioEdit({ ...usuarioEdit, apellido: e.target.value })}
                  required
                />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  label="Correo Electrónico"
                  type="email"
                  value={usuarioEdit.email}
                  onChange={(e) => setUsuarioEdit({ ...usuarioEdit, email: e.target.value })}
                  required
                />
              </CCol>
              <CCol md={12}>
                <CFormSelect
                  label="Asignar Rol"
                  value={usuarioEdit.rol}
                  onChange={(e) => setUsuarioEdit({ ...usuarioEdit, rol: e.target.value })}
                  required
                >
                  <option disabled value="">
                    Seleccionar...
                  </option>
                  {roles.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol xs={12} className="mt-4 pt-2">
                <CButton
                  color="primary"
                  type="submit"
                  className="w-100 py-2 fw-bold"
                  style={{ background: '#070145', border: 'none' }}
                >
                  Actualizar Usuario
                </CButton>
              </CCol>
            </CForm>
          )}
        </CModalBody>
      </CModal>
    </CRow>
  )
}
