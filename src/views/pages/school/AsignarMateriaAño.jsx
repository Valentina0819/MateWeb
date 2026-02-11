import { useState, useEffect } from 'react'
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CCardTitle,
  CForm,
  CFormLabel,
  CFormSelect,
  CButton,
  CAlert,
  CFormInput,
} from '@coreui/react'

const AsignarMateria = () => {
  const [materias, setMaterias] = useState([])
  const [anios, setAnios] = useState([])
  const [codigoMateriaSeleccionada, setCodigoMateriaSeleccionada] = useState('')
  const [idAnioSeleccionado, setIdAnioSeleccionado] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [filtroMateria, setFiltroMateria] = useState('') // Nuevo estado

  // Obtener usuario y rol
  const usuarioGuardado = localStorage.getItem('usuario')
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null

  useEffect(() => {
    obtenerMateriasYAnios()
  }, [])

  const obtenerMateriasYAnios = async () => {
    try {
      const resMaterias = await fetch('https://mateweb-production.up.railway.app/materias')
      const dataMaterias = await resMaterias.json()
      setMaterias(dataMaterias.materias || [])

      const resAnios = await fetch('https://mateweb-production.up.railway.app/anios')
      const dataAnios = await resAnios.json()
      setAnios(dataAnios.anios || [])
    } catch (error) {
      console.error('Error obteniendo datos:', error)
    }
  }

  const handleAsignar = async (e) => {
    e.preventDefault()

    if (!codigoMateriaSeleccionada || !idAnioSeleccionado) {
      setMensaje('Selecciona una materia y un año.')
      setTimeout(() => setMensaje(''), 2500)
      return
    }

    try {
      const res = await fetch('https://mateweb-production.up.railway.app/asignar-seccion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codigo_materia: codigoMateriaSeleccionada,
          id_año: idAnioSeleccionado,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setMensaje('Materia asignada correctamente.')
        setCodigoMateriaSeleccionada('')
        setIdAnioSeleccionado('')
      } else {
        setMensaje(`Error: ${data.mensaje}`)
      }
      setTimeout(() => setMensaje(''), 2500) // Cierra el mensaje automáticamente
    } catch (error) {
      setMensaje('Error en la conexión con el servidor.')
      setTimeout(() => setMensaje(''), 2500)
    }
  }

  // Filtrado de materias por nombre o código
  const materiasFiltradas = materias.filter(
    (m) =>
      m.nombre.toLowerCase().includes(filtroMateria.toLowerCase()) ||
      m.codigo_materia.toLowerCase().includes(filtroMateria.toLowerCase()),
  )

  return (
    <CContainer className="pt-2 pb-4 mb-5">
      <CRow className="justify-content-center">
        <CCol xs={12} md={8} lg={6}>
          <CCard className="shadow-sm">
            <CCardHeader className="" style={{ backgroundColor: '#114c5f', color: 'white' }}>
              <CCardTitle>Asignar Materia a Año</CCardTitle>
            </CCardHeader>
            <CCardBody>
              {mensaje && (
                <CAlert
                  color={mensaje.toLowerCase().includes('error') ? 'danger' : 'success'}
                  dismissible
                  onClose={() => setMensaje('')}
                >
                  {mensaje}
                </CAlert>
              )}
              {usuario?.rol === 'admin' ? (
                <CForm onSubmit={handleAsignar}>
                  <CRow className="g-3 align-items-end">
                    <CCol md={12}>
                      {/* Barra de filtrado */}
                      <CFormLabel>Buscar materia por nombre o código</CFormLabel>
                      <CFormInput
                        type="text"
                        placeholder="Ej: Matemática o MAT101"
                        value={filtroMateria}
                        onChange={(e) => setFiltroMateria(e.target.value)}
                        className="mb-2"
                      />
                      <CFormLabel>Materia</CFormLabel>
                      <CFormSelect
                        value={codigoMateriaSeleccionada}
                        onChange={(e) => setCodigoMateriaSeleccionada(e.target.value)}
                        required
                      >
                        <option value="">Selecciona una materia</option>
                        {materiasFiltradas.map((materia) => (
                          <option key={materia.codigo_materia} value={materia.codigo_materia}>
                            {materia.codigo_materia} - {materia.nombre}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol md={12}>
                      <CFormLabel>Año</CFormLabel>
                      <CFormSelect
                        value={idAnioSeleccionado}
                        onChange={(e) => setIdAnioSeleccionado(e.target.value)}
                        required
                      >
                        <option value="">Selecciona un año</option>
                        {anios.map((anio) => (
                          <option key={anio.id_año} value={anio.id_año}>
                            {anio.nombre_año}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol md={12} className="d-grid mt-3">
                      <CButton
                        color=""
                        type="submit"
                        size="lg"
                        style={{ backgroundColor: '#9cd2d3', color: '#114c5f' }}
                      >
                        Asignar Materia
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              ) : (
                <CAlert color="warning" className="mb-0">
                  Solo los administradores pueden asignar materias a años.
                </CAlert>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <div style={{ minHeight: 120 }} />
    </CContainer>
  )
}

export default AsignarMateria
