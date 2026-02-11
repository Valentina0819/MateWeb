import { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CButton,
  CAlert,
  CRow,
  CCol,
  CContainer,
} from '@coreui/react'

const RegistroDocente = () => {
  const [cedulas, setCedulas] = useState([])
  const [formulario, setFormulario] = useState({
    fk_cedula: '',
    titulo_academico: '',
    especialidad: '',
    tipo_contrato: '',
    fecha_contratacion: '',
    estado_laboral: '',
    telefono: '',
    correo_institucional: '',
    horas_semanales: '',
  })
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' })
  const [loading, setLoading] = useState(false)

  // ðŸ”¹ Cargar cedulas de usuarios con rol 'usuario'
  useEffect(() => {
    const cargarCedulas = async () => {
      try {
        const res = await fetch('https://mateweb-production.up.railway.app/usuarios/cedulas')
        const data = await res.json()
        setCedulas(data)
      } catch (error) {
        console.error('Error al obtener cedulas:', error)
      }
    }
    cargarCedulas()
  }, [])

  // ðŸ”¹ Manejar cambios en el formulario
  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value })
  }

  // ðŸ”¹ Enviar el formulario al backend
  const enviarFormulario = async (e) => {
    e.preventDefault()
    setMensaje({ tipo: '', texto: '' })
    setLoading(true)
    try {
      const res = await fetch('https://mateweb-production.up.railway.app/docente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario),
      })

      if (res.status === 200 || res.status === 201) {
        setMensaje({ tipo: 'success', texto: '¡Docente registrado exitosamente!' })
        setFormulario({
          fk_cedula: '',
          titulo_academico: '',
          especialidad: '',
          tipo_contrato: '',
          fecha_contratacion: '',
          estado_laboral: '',
          telefono: '',
          correo_institucional: '',
          horas_semanales: '',
        })
      } else if (res.status === 409) {
        const data = await res.json()
        setMensaje({
          tipo: 'danger',
          texto: data.mensaje || 'Ya existe un docente con esa cedula.',
        })
      } else if (res.status === 404 || res.status === 500) {
        setMensaje({ tipo: 'danger', texto: 'No se pudo registrar el docente.' })
      } else {
        setMensaje({ tipo: 'danger', texto: 'Ocurrio un error inesperado.' })
      }
    } catch (error) {
      setMensaje({ tipo: 'danger', texto: 'No se pudo registrar el docente.' })
    }
    setLoading(false)
  }

  // Obtener usuario y rol
  const usuarioGuardado = localStorage.getItem('usuario')
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null

  return (
    <CContainer className="py-5">
      <CRow className="justify-content-center">
        <CCol xs={12} md={10} lg={9}>
          <CCard className="shadow-sm">
            <CCardHeader className="" style={{ backgroundColor: '#114c5f', color: 'white' }}>
              <CCardTitle>Registro de Docente</CCardTitle>
            </CCardHeader>
            <CCardBody>
              {mensaje.texto && (
                <CAlert
                  color={mensaje.tipo}
                  dismissible
                  onClose={() => setMensaje({ tipo: '', texto: '' })}
                >
                  {mensaje.texto}
                </CAlert>
              )}
              {usuario?.rol === 'admin' ? (
                <CForm onSubmit={enviarFormulario}>
                  <CRow className="g-3 align-items-end">
                    <CCol md={3}>
                      <CFormLabel>Cedula</CFormLabel>
                      <CFormSelect
                        name="fk_cedula"
                        value={formulario.fk_cedula}
                        onChange={manejarCambio}
                        required
                      >
                        <option value="">Seleccione</option>
                        {cedulas.map((usuario) => (
                          <option key={usuario.cedula} value={usuario.cedula}>
                            {usuario.cedula} - {usuario.nombres} {usuario.apellidos}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Ti­tulo Academico</CFormLabel>
                      <CFormInput
                        type="text"
                        name="titulo_academico"
                        placeholder="Ejm Licenciado, Ingeniero"
                        value={formulario.titulo_academico}
                        onChange={manejarCambio}
                        required
                        maxLength={30}
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Especialidad</CFormLabel>
                      <CFormInput
                        type="text"
                        name="especialidad"
                        placeholder="Ejm Matematicas"
                        value={formulario.especialidad}
                        onChange={manejarCambio}
                        required
                        maxLength={25}
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Tipo Contrato</CFormLabel>
                      <CFormInput
                        type="text"
                        name="tipo_contrato"
                        placeholder="Ejm Fijo, Temporal"
                        value={formulario.tipo_contrato}
                        onChange={manejarCambio}
                        required
                        maxLength={20}
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Fecha Contratacion</CFormLabel>
                      <CFormInput
                        type="date"
                        name="fecha_contratacion"
                        value={formulario.fecha_contratacion}
                        onChange={manejarCambio}
                        required
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Estado Laboral</CFormLabel>
                      <CFormInput
                        type="text"
                        name="estado_laboral"
                        placeholder="Ejm Activo, Inactivo"
                        value={formulario.estado_laboral}
                        onChange={manejarCambio}
                        required
                        maxLength={20}
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Telefono</CFormLabel>
                      <CFormInput
                        type="text"
                        name="telefono"
                        placeholder="Ejm 0414-1234567"
                        value={formulario.telefono}
                        onChange={manejarCambio}
                        required
                        maxLength={15}
                      />
                    </CCol>
                    <CCol md={4}>
                      <CFormLabel>Correo Institucional</CFormLabel>
                      <CFormInput
                        type="email"
                        name="correo_institucional"
                        placeholder="Ejm correo@gmail.com"
                        value={formulario.correo_institucional}
                        onChange={manejarCambio}
                        required
                        maxLength={40}
                      />
                    </CCol>
                    <CCol md={2}>
                      <CFormLabel>Horas/Semana</CFormLabel>
                      <CFormInput
                        type="number"
                        name="horas_semanales"
                        placeholder="Ejm 40"
                        value={formulario.horas_semanales}
                        onChange={manejarCambio}
                        required
                        min={1}
                        max={60}
                      />
                    </CCol>
                    <CCol md={12}>
                      <div className="d-grid">
                        <CButton
                          style={{ backgroundColor: '#9cd2d3', color: '#114c5f' }}
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? 'Registrando...' : 'Registrar Docente'}
                        </CButton>
                      </div>
                    </CCol>
                  </CRow>
                </CForm>
              ) : (
                <CAlert color="warning" className="mb-0">
                  Solo los administradores pueden registrar docentes.
                </CAlert>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default RegistroDocente
