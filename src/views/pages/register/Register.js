import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilPhone, cilCalendar, cilHome, cilAddressBook } from '@coreui/icons'

const Register = () => {
  const [form, setForm] = useState({
    cedula: '',
    nombres: '',
    apellidos: '',
    direccion: '',
    telefono: '',
    sexo: '',
    fecha_nacimiento: '',
    usuario: '',
    email: '',
    password: '',
    password2: '',
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!/^\d{7,8}$/.test(form.cedula)) newErrors.cedula = 'Cédula inválida (7-8 dígitos)'
    if (!form.nombres.trim()) newErrors.nombres = 'Nombres requeridos'
    if (!form.apellidos.trim()) newErrors.apellidos = 'Apellidos requeridos'
    if (!form.direccion.trim()) newErrors.direccion = 'Dirección requerida'
    if (!/^\d{11}$/.test(form.telefono)) newErrors.telefono = 'Teléfono inválido (11 dígitos)'
    if (!form.sexo) newErrors.sexo = 'Seleccione el sexo'
    if (!form.fecha_nacimiento) newErrors.fecha_nacimiento = 'Fecha de nacimiento requerida'
    if (!form.usuario.trim()) newErrors.usuario = 'Usuario requerido'
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email inválido'
    if (!form.password || form.password.length < 6) newErrors.password = 'Contraseña mínima 6 caracteres'
    if (form.password !== form.password2) newErrors.password2 = 'Las contraseñas no coinciden'
    return newErrors
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const val = validate()
    if (Object.keys(val).length) {
      setErrors(val)
      return
    }
    // Aquí iría la lógica de registro
    alert('¡Registro exitoso!')
    setForm({
      cedula: '',
      nombres: '',
      apellidos: '',
      direccion: '',
      telefono: '',
      sexo: '',
      fecha_nacimiento: '',
      usuario: '',
      email: '',
      password: '',
      password2: '',
    })
    setErrors({})
  }

  return (
    <div
      className="min-vh-100 d-flex flex-row align-items-center"
      style={{
        background: 'linear-gradient(135deg, #FF7043 30%, #1976D2 100%)',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(255,255,255,0.18)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <CContainer style={{ position: 'relative', zIndex: 2 }}>
        <CRow className="justify-content-center">
          <CCol md={12} lg={10} xl={9}>
            <CCard className="mx-2" style={{ minHeight: 0 }}>
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit} autoComplete="off">
                  <h1 className="fw-bold text-black mb-3">Registro</h1>
                  <p className="text-body-secondary mb-4">Crea tu cuenta para gestionar desastres</p>
                  <CRow>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilAddressBook} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Cédula"
                          name="cedula"
                          value={form.cedula}
                          onChange={handleChange}
                          maxLength={8}
                          invalid={!!errors.cedula}
                        />
                      </CInputGroup>
                      {errors.cedula && <CAlert color="danger" className="py-1 my-1">{errors.cedula}</CAlert>}
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Nombres"
                          name="nombres"
                          value={form.nombres}
                          onChange={handleChange}
                          maxLength={30}
                          invalid={!!errors.nombres}
                        />
                      </CInputGroup>
                      {errors.nombres && <CAlert color="danger" className="py-1 my-1">{errors.nombres}</CAlert>}
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Apellidos"
                          name="apellidos"
                          value={form.apellidos}
                          onChange={handleChange}
                          maxLength={30}
                          invalid={!!errors.apellidos}
                        />
                      </CInputGroup>
                      {errors.apellidos && <CAlert color="danger" className="py-1 my-1">{errors.apellidos}</CAlert>}
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilHome} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Dirección"
                          name="direccion"
                          value={form.direccion}
                          onChange={handleChange}
                          maxLength={60}
                          invalid={!!errors.direccion}
                        />
                      </CInputGroup>
                      {errors.direccion && <CAlert color="danger" className="py-1 my-1">{errors.direccion}</CAlert>}
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilPhone} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Teléfono"
                          name="telefono"
                          value={form.telefono}
                          onChange={handleChange}
                          maxLength={11}
                          invalid={!!errors.telefono}
                        />
                      </CInputGroup>
                      {errors.telefono && <CAlert color="danger" className="py-1 my-1">{errors.telefono}</CAlert>}
                    </CCol>
                    <CCol md={6}>
                      <CRow className="mb-3">
                        <CCol xs={6}>
                          <CFormSelect
                            name="sexo"
                            value={form.sexo}
                            onChange={handleChange}
                            invalid={!!errors.sexo}
                          >
                            <option value="">Sexo</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Otro">Otro</option>
                          </CFormSelect>
                          {errors.sexo && <CAlert color="danger" className="py-1 my-1">{errors.sexo}</CAlert>}
                        </CCol>
                        <CCol xs={6}>
                          <CInputGroup>
                            <CInputGroupText>
                              <CIcon icon={cilCalendar} />
                            </CInputGroupText>
                            <CFormInput
                              type="date"
                              name="fecha_nacimiento"
                              value={form.fecha_nacimiento}
                              onChange={handleChange}
                              invalid={!!errors.fecha_nacimiento}
                            />
                          </CInputGroup>
                          {errors.fecha_nacimiento && <CAlert color="danger" className="py-1 my-1">{errors.fecha_nacimiento}</CAlert>}
                        </CCol>
                      </CRow>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Usuario"
                          name="usuario"
                          value={form.usuario}
                          onChange={handleChange}
                          maxLength={20}
                          invalid={!!errors.usuario}
                        />
                      </CInputGroup>
                      {errors.usuario && <CAlert color="danger" className="py-1 my-1">{errors.usuario}</CAlert>}
                      <CInputGroup className="mb-3">
                        <CInputGroupText>@</CInputGroupText>
                        <CFormInput
                          placeholder="Email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          maxLength={40}
                          invalid={!!errors.email}
                        />
                      </CInputGroup>
                      {errors.email && <CAlert color="danger" className="py-1 my-1">{errors.email}</CAlert>}
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Contraseña"
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          autoComplete="new-password"
                          invalid={!!errors.password}
                        />
                      </CInputGroup>
                      {errors.password && <CAlert color="danger" className="py-1 my-1">{errors.password}</CAlert>}
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Repetir contraseña"
                          name="password2"
                          value={form.password2}
                          onChange={handleChange}
                          autoComplete="new-password"
                          invalid={!!errors.password2}
                        />
                      </CInputGroup>
                      {errors.password2 && <CAlert color="danger" className="py-1 my-1">{errors.password2}</CAlert>}
                    </CCol>
                  </CRow>
                  <div className="d-grid mt-2">
                    <CButton color="info text-white">Crear Cuenta</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
