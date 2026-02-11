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
import {
  cilSave,
  cilPencil,
  cilTrash,
  cilWarning,
  cilPeople,
  cilUser,
  cilGroup,
  cilUserFollow,
} from '@coreui/icons'
const roles = [
  { value: 'admin', label: 'Administrador' },
  { value: 'alumno', label: 'Alumno' },
  { value: 'docente', label: 'Docente' },
]

export default function CrudUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [modal, setModal] = useState(false)
  const [modalAgregar, setModalAgregar] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)
  const [usuarioEdit, setUsuarioEdit] = useState(null)
  const [usuarioEliminar, setUsuarioEliminar] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('success')

  // Estados para agregar usuario
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contraseña: '',
    repeatPassword: '',
    rol: '',
  })
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)

  // Cargar usuarios
  const cargarUsuarios = () => {
    fetch('https://mateweb-production.up.railway.app/usuarios')
      .then((res) => res.json())
      .then(setUsuarios)
  }

  useEffect(() => {
    cargarUsuarios()
  }, [])

  // Validaciones para agregar usuario
  const validarNombre = (val) => (!val || val.trim().length < 2 ? 'Mínimo 2 caracteres.' : '')
  const validarApellido = (val) => (!val || val.trim().length < 2 ? 'Mínimo 2 caracteres.' : '')
  const validarEmail = (val) => (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? 'Email inválido.' : '')
  const validarContraseña = (val) => {
    if (!val || val.length < 6) return 'Mínimo 6 caracteres.'
    if (!/(?=.*[A-Z])(?=.*\d)/.test(val)) return 'Usa Mayúscula y número.'
    return ''
  }

  // Validar formulario en tiempo real
  useEffect(() => {
    const newErrors = {
      nombre: validarNombre(nuevoUsuario.nombre),
      apellido: validarApellido(nuevoUsuario.apellido),
      email: validarEmail(nuevoUsuario.email),
      contraseña: validarContraseña(nuevoUsuario.contraseña),
      repeatPassword:
        nuevoUsuario.repeatPassword !== nuevoUsuario.contraseña ? 'No coinciden.' : '',
      rol: !nuevoUsuario.rol ? 'Selecciona un rol.' : '',
    }
    setErrors(newErrors)
    const allValid =
      Object.values(newErrors).every((err) => err === '') &&
      nuevoUsuario.nombre &&
      nuevoUsuario.apellido &&
      nuevoUsuario.email &&
      nuevoUsuario.contraseña &&
      nuevoUsuario.rol
    setIsFormValid(allValid)
  }, [nuevoUsuario])

  // Abrir modal para agregar usuario
  const handleAbrirModalAgregar = () => {
    setNuevoUsuario({
      nombre: '',
      apellido: '',
      email: '',
      contraseña: '',
      repeatPassword: '',
      rol: '',
    })
    setErrors({})
    setModalAgregar(true)
    setMensaje('')
  }

  // Agregar usuario
  const handleAgregarUsuario = async (e) => {
    e.preventDefault()
    if (!isFormValid) return

    try {
      const res = await fetch('https://mateweb-production.up.railway.app/userss', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nuevoUsuario.nombre,
          apellido: nuevoUsuario.apellido,
          email: nuevoUsuario.email,
          contraseña: nuevoUsuario.contraseña,
          rol: nuevoUsuario.rol,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setMensaje('Usuario creado correctamente')
        setTipoMensaje('success')
        setModalAgregar(false)
        cargarUsuarios()
      } else {
        setMensaje(data.message || 'Error al crear usuario')
        setTipoMensaje('danger')
      }
    } catch {
      setMensaje('Error de conexión')
      setTipoMensaje('danger')
    }
  }

  // Editar usuario
  const handleEditar = (usuario) => {
    setUsuarioEdit(usuario)
    setModal(true)
    setMensaje('')
  }

  const handleGuardar = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(
        `https://mateweb-production.up.railway.app/usuarios/${usuarioEdit.id_usuario}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(usuarioEdit),
        },
      )
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
      setMensaje('Error de conexion')
      setTipoMensaje('danger')
    }
  }

  // Eliminar usuario
  const handleEliminar = async () => {
    try {
      const res = await fetch(
        `https://mateweb-production.up.railway.app/usuarios/${usuarioEliminar.id_usuario}`,
        {
          method: 'DELETE',
        },
      )
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
      setMensaje('Error de conexion')
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
              <h5 className="mb-0 fw-bold">Gestion de Usuarios</h5>
            </div>
            <div className="d-flex align-items-center gap-2">
              <CBadge color="info" shape="rounded-pill">
                {usuarios.length} Usuarios totales
              </CBadge>
              <CButton
                color="light"
                className="d-flex align-items-center gap-2 fw-bold shadow-sm"
                onClick={handleAbrirModalAgregar}
                style={{
                  borderRadius: '10px',
                  padding: '8px 16px',
                }}
              >
                <CIcon icon={cilUserFollow} />
                Agregar Usuario
              </CButton>
            </div>
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
                Confirmar Eliminacion de Usuario
              </h5>
              <small className="text-muted">Esta accion no se puede deshacer</small>
            </div>
          </div>
        </CModalHeader>

        {/* BODY */}
        <CModalBody className="p-4">
          <div className="text-center mb-4">
            <p className="text-muted">
              Estas a punto de eliminar al siguiente usuario del sistema:
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
                  Usuario a eliminar
                </label>

                <div className="d-flex align-items-center">
                  <div className="p-3 bg-danger rounded-3 me-3 shadow-sm">
                    <CIcon icon={cilUser} className="text-white" size="lg" />
                  </div>
                  <span className="fs-4 fw-bold text-dark">
                    {usuarioEliminar?.nombre} {usuarioEliminar?.apellido}
                  </span>
                </div>
              </div>
            </CCol>
          </CRow>

          <div className="mt-4 p-3 rounded-3 bg-light border text-center">
            <p className="mb-0 text-secondary" style={{ fontSize: '0.9rem' }}>
              Al eliminar este usuario se perderá toda la información asociada, incluyendo accesos,
              registros y actividad.
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
            onClick={() => setModalEliminar(false)}
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
            onClick={handleEliminar}
          >
            SI, ELIMINAR USUARIO
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        backdrop="static"
        visible={modal}
        onClose={() => setModal(false)}
        alignment="center"
        size="lg"
      >
        {/* HEADER */}
        <CModalHeader
          closeButton
          style={{
            background: '#ffffff',
            borderBottom: '1px solid #e5e7eb',
            padding: '16px 24px',
          }}
        >
          <div className="d-flex align-items-center gap-2">
            <div
              style={{
                background: '#4f46e5',
                color: 'white',
                borderRadius: 8,
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
              }}
            >
              ðŸ‘¤
            </div>
            <h5 className="mb-0 fw-semibold">Editar Perfil</h5>
          </div>
        </CModalHeader>

        {/* BODY */}
        <CModalBody style={{ padding: 24, background: '#f9fafb' }}>
          {usuarioEdit && (
            <CForm onSubmit={handleGuardar}>
              <div className="row g-3">
                {/* NOMBRE */}
                <CCol md={6}>
                  <div className="p-3 bg-white rounded shadow-sm">
                    <CFormInput
                      label="Nombre"
                      placeholder="Ej: Juan"
                      value={usuarioEdit.nombre}
                      onChange={(e) => setUsuarioEdit({ ...usuarioEdit, nombre: e.target.value })}
                      required
                    />
                  </div>
                </CCol>

                {/* APELLIDO */}
                <CCol md={6}>
                  <div className="p-3 bg-white rounded shadow-sm">
                    <CFormInput
                      label="Apellido"
                      placeholder="Ej: Perez"
                      value={usuarioEdit.apellido}
                      onChange={(e) => setUsuarioEdit({ ...usuarioEdit, apellido: e.target.value })}
                      required
                    />
                  </div>
                </CCol>

                {/* EMAIL */}
                <CCol md={12}>
                  <div className="p-3 bg-white rounded shadow-sm">
                    <CFormInput
                      label="Correo Electrenico"
                      type="email"
                      value={usuarioEdit.email}
                      onChange={(e) => setUsuarioEdit({ ...usuarioEdit, email: e.target.value })}
                      required
                    />
                  </div>
                </CCol>

                {/* ROL */}
                <CCol md={12}>
                  <div className="p-3 bg-white rounded shadow-sm">
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
                  </div>
                </CCol>
              </div>

              {/* FOOTER */}
              <div className="d-flex justify-content-between align-items-center mt-4">
                <span
                  role="button"
                  onClick={() => setModal(false)}
                  style={{
                    color: '#6b7280',
                    cursor: 'pointer',
                    fontWeight: 500,
                  }}
                >
                  Descartar
                </span>

                <CButton
                  type="submit"
                  style={{
                    background: '#0f172a',
                    color: 'white',
                    borderRadius: 10,
                    padding: '10px 24px',
                    minWidth: 180,
                    border: 'none',
                  }}
                >
                  Guardar cambios
                </CButton>
              </div>
            </CForm>
          )}
        </CModalBody>
      </CModal>

      {/* Modal Agregar Usuario */}
      <CModal
        backdrop="static"
        visible={modalAgregar}
        onClose={() => setModalAgregar(false)}
        alignment="center"
        size="lg"
      >
        {/* HEADER */}
        <CModalHeader
          closeButton
          style={{
            background: '#ffffff',
            borderBottom: '1px solid #e5e7eb',
            padding: '16px 24px',
          }}
        >
          <div className="d-flex align-items-center gap-2">
            <div
              style={{
                background: '#10b981',
                color: 'white',
                borderRadius: 8,
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
              }}
            >
              <CIcon icon={cilUserFollow} />
            </div>
            <h5 className="mb-0 fw-semibold">Agregar Nuevo Usuario</h5>
          </div>
        </CModalHeader>

        {/* BODY */}
        <CModalBody style={{ padding: 24, background: '#f9fafb' }}>
          <CForm onSubmit={handleAgregarUsuario}>
            <div className="row g-3">
              {/* NOMBRE */}
              <CCol md={6}>
                <div className="p-3 bg-white rounded shadow-sm">
                  <CFormInput
                    label="Nombre"
                    placeholder="Ej: Juan"
                    value={nuevoUsuario.nombre}
                    onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
                    invalid={!!errors.nombre}
                    required
                  />
                  {errors.nombre && <div className="text-danger small mt-1">{errors.nombre}</div>}
                </div>
              </CCol>

              {/* APELLIDO */}
              <CCol md={6}>
                <div className="p-3 bg-white rounded shadow-sm">
                  <CFormInput
                    label="Apellido"
                    placeholder="Ej: Pérez"
                    value={nuevoUsuario.apellido}
                    onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, apellido: e.target.value })}
                    invalid={!!errors.apellido}
                    required
                  />
                  {errors.apellido && (
                    <div className="text-danger small mt-1">{errors.apellido}</div>
                  )}
                </div>
              </CCol>

              {/* EMAIL */}
              <CCol md={12}>
                <div className="p-3 bg-white rounded shadow-sm">
                  <CFormInput
                    label="Correo Electrónico"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={nuevoUsuario.email}
                    onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
                    invalid={!!errors.email}
                    required
                  />
                  {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                </div>
              </CCol>

              {/* CONTRASEÑA */}
              <CCol md={6}>
                <div className="p-3 bg-white rounded shadow-sm">
                  <CFormInput
                    label="Contraseña"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={nuevoUsuario.contraseña}
                    onChange={(e) =>
                      setNuevoUsuario({ ...nuevoUsuario, contraseña: e.target.value })
                    }
                    invalid={!!errors.contraseña}
                    required
                  />
                  {errors.contraseña && (
                    <div className="text-danger small mt-1">{errors.contraseña}</div>
                  )}
                  <small className="text-muted">Incluye mayúscula y número</small>
                </div>
              </CCol>

              {/* REPETIR CONTRASEÑA */}
              <CCol md={6}>
                <div className="p-3 bg-white rounded shadow-sm">
                  <CFormInput
                    label="Repetir Contraseña"
                    type="password"
                    placeholder="Confirmar contraseña"
                    value={nuevoUsuario.repeatPassword}
                    onChange={(e) =>
                      setNuevoUsuario({ ...nuevoUsuario, repeatPassword: e.target.value })
                    }
                    invalid={!!errors.repeatPassword}
                    required
                  />
                  {errors.repeatPassword && (
                    <div className="text-danger small mt-1">{errors.repeatPassword}</div>
                  )}
                </div>
              </CCol>

              {/* ROL */}
              <CCol md={12}>
                <div className="p-3 bg-white rounded shadow-sm">
                  <CFormSelect
                    label="Asignar Rol"
                    value={nuevoUsuario.rol}
                    onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })}
                    invalid={!!errors.rol}
                    required
                  >
                    <option value="">Seleccionar rol...</option>
                    {roles.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </CFormSelect>
                  {errors.rol && <div className="text-danger small mt-1">{errors.rol}</div>}
                  <small className="text-muted">
                    Define los permisos del usuario en el sistema
                  </small>
                </div>
              </CCol>
            </div>

            {/* FOOTER */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <span
                role="button"
                onClick={() => setModalAgregar(false)}
                style={{
                  color: '#6b7280',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                Cancelar
              </span>

              <CButton
                type="submit"
                disabled={!isFormValid}
                style={{
                  background: isFormValid ? '#10b981' : '#ccc',
                  color: 'white',
                  borderRadius: 10,
                  padding: '10px 24px',
                  minWidth: 180,
                  border: 'none',
                  cursor: isFormValid ? 'pointer' : 'not-allowed',
                }}
              >
                <CIcon icon={cilUserFollow} className="me-2" />
                Crear Usuario
              </CButton>
            </div>
          </CForm>
        </CModalBody>
      </CModal>
    </CRow>
  )
}
