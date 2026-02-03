import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CButton,
  CAlert,
  CRow,
  CCol,
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
  CFormRange,
  CFormSelect,
  CBadge,
  CModalTitle,
  CForm,
} from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilSave, cilChartLine, cilInbox } from '@coreui/icons'
export default function PuntajesEstudiante() {
  const [cursos, setCursos] = useState([])
  const [cursoSel, setCursoSel] = useState('')
  const [estudiantes, setEstudiantes] = useState([])
  const [estudianteSel, setEstudianteSel] = useState('')
  const [puntajes, setPuntajes] = useState([])
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('success')
  const [editModal, setEditModal] = useState(false)
  const [puntajeEdit, setPuntajeEdit] = useState({ id_resultado: '', puntaje: '' })
  const [filtroModulo, setFiltroModulo] = useState('')
  const [filtroEstudiante, setFiltroEstudiante] = useState('')

  useEffect(() => {
    fetch('http://localhost:4000/obtenercursos')
      .then((res) => res.json())
      .then(setCursos)
  }, [])

  useEffect(() => {
    if (cursoSel) {
      fetch(`http://localhost:4000/estudiantes-curso/${cursoSel}`)
        .then((res) => res.json())
        .then(setEstudiantes)
    } else {
      setEstudiantes([])
    }
    setEstudianteSel('')
    setPuntajes([])
  }, [cursoSel])

  useEffect(() => {
    if (estudianteSel && cursoSel) {
      fetch(`http://localhost:4000/puntajes-estudiante/${estudianteSel}/${cursoSel}`)
        .then((res) => res.json())
        .then(setPuntajes)
    } else {
      setPuntajes([])
    }
  }, [estudianteSel, cursoSel])

  const handleEdit = (p) => {
    setPuntajeEdit({ id_resultado: p.id_resultado, puntaje: p.puntaje })
    setEditModal(true)
  }

  const handleSaveEdit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(
        `http://localhost:4000/puntaje-ejercicio/${puntajeEdit.id_resultado}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ puntaje: puntajeEdit.puntaje }),
        },
      )
      const data = await res.json()
      if (res.ok) {
        setMensaje('Puntaje actualizado correctamente')
        setTipoMensaje('success')
        setEditModal(false)
        // Refrescar puntajes
        fetch(`http://localhost:4000/puntajes-estudiante/${estudianteSel}/${cursoSel}`)
          .then((res) => res.json())
          .then(setPuntajes)
      } else {
        setMensaje(data.mensaje || 'Error al actualizar puntaje')
        setTipoMensaje('danger')
      }
    } catch {
      setMensaje('Error de conexión')
      setTipoMensaje('danger')
    }
  }

  return (
    <CRow className="justify-content-center" style={{ borderRadius: '20px', marginTop: '50px' }}>
      <CCol md={11} lg={10}>
        <CCard
          className="border-0 shadow-lg"
          style={{
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '10px -10px 30px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Header con estilo Premium */}
          <CCardHeader
            className="py-3 d-flex align-items-center justify-content-between"
            style={{
              background: 'linear-gradient(90deg, #070145 0%, #1a1a5e 100%)',
              color: 'white',
            }}
          >
            <div className="d-flex align-items-center">
              <CIcon icon={cilChartLine} className="me-2" size="xl" />
              <h5 className="mb-0 fw-bold">Reporte de Calificaciones</h5>
            </div>
            <CBadge text="dark" shape="rounded-pill" className="px-3">
              {puntajes.length} Registros encontrados
            </CBadge>
          </CCardHeader>

          <CCardBody className="p-4 bg-light">
            {/* Sección de Filtros Estilizada */}
            <div className="bg-white p-3 mb-4 shadow-sm" style={{ borderRadius: '15px' }}>
              <h6 className="text-muted mb-3 small fw-bold text-uppercase">Panel de Filtros</h6>
              <CRow className="g-3">
                <CCol md={6} lg={3}>
                  <CFormInput
                    label="Módulo"
                    placeholder="Buscar módulo..."
                    value={filtroModulo}
                    onChange={(e) => setFiltroModulo(e.target.value)}
                    className="border-light-blue"
                  />
                </CCol>
                <CCol md={6} lg={3}>
                  <CFormInput
                    label="Estudiante"
                    placeholder="Nombre o email..."
                    value={filtroEstudiante}
                    onChange={(e) => setFiltroEstudiante(e.target.value)}
                  />
                </CCol>
                <CCol md={6} lg={3}>
                  <CFormSelect
                    label="Seleccionar Curso"
                    value={cursoSel}
                    onChange={(e) => setCursoSel(e.target.value)}
                  >
                    <option value="">Todos los cursos</option>
                    {cursos
                      .filter((c) =>
                        c.nombre_curso.toLowerCase().includes(filtroModulo.toLowerCase()),
                      )
                      .map((c) => (
                        <option key={c.id_curso} value={c.id_curso}>
                          {c.nombre_curso}
                        </option>
                      ))}
                  </CFormSelect>
                </CCol>
                <CCol md={6} lg={3}>
                  <CFormSelect
                    label="Seleccionar Estudiante"
                    value={estudianteSel}
                    onChange={(e) => setEstudianteSel(e.target.value)}
                  >
                    <option value="">Todos los estudiantes</option>
                    {estudiantes
                      .filter((e) =>
                        `${e.nombre} ${e.apellido} ${e.email}`
                          .toLowerCase()
                          .includes(filtroEstudiante.toLowerCase()),
                      )
                      .map((e) => (
                        <option key={e.id_usuario} value={e.id_usuario}>
                          {e.nombre} {e.apellido}
                        </option>
                      ))}
                  </CFormSelect>
                </CCol>
              </CRow>
            </div>

            {mensaje && (
              <CAlert
                color={tipoMensaje}
                dismissible
                onClose={() => setMensaje('')}
                className="border-0 shadow-sm mb-4"
              >
                {mensaje}
              </CAlert>
            )}

            {/* Tabla con diseño moderno */}
            <div
              className="bg-white shadow-sm"
              style={{ borderRadius: '15px', overflow: 'hidden' }}
            >
              <CTable align="middle" hover responsive mb-0>
                <CTableHead style={{ background: '#f8fafc' }}>
                  <CTableRow>
                    <CTableHeaderCell className="text-muted fw-bold border-0 py-3">
                      Ejercicio / Enunciado
                    </CTableHeaderCell>
                    <CTableHeaderCell className="text-muted fw-bold border-0 py-3">
                      Ubicación
                    </CTableHeaderCell>
                    <CTableHeaderCell className="text-muted fw-bold border-0 py-3 text-center">
                      Puntaje
                    </CTableHeaderCell>
                    <CTableHeaderCell className="text-muted fw-bold border-0 py-3 text-end">
                      Acciones
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {puntajes.length === 0 ? (
                    <CTableRow>
                      <CTableDataCell colSpan={4} className="text-center py-5 text-muted">
                        <CIcon
                          icon={cilInbox}
                          size="3xl"
                          className="d-block mx-auto mb-2 opacity-25"
                        />
                        No se encontraron registros de puntajes.
                      </CTableDataCell>
                    </CTableRow>
                  ) : (
                    puntajes.map((p) => (
                      <CTableRow key={p.id_resultado}>
                        <CTableDataCell>
                          <div className="fw-bold text-dark">{p.enunciado}</div>
                          <small className="text-primary fw-semibold">{p.nombre_leccion}</small>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CBadge color="secondary" variant="outline" className="text-muted">
                            {p.nombre_modulo}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <div
                            className="fw-bold fs-5"
                            style={{
                              color:
                                p.puntaje >= 70
                                  ? '#2eb85c'
                                  : p.puntaje >= 40
                                    ? '#f9b115'
                                    : '#e55353',
                            }}
                          >
                            {p.puntaje}
                            <small className="text-muted" style={{ fontSize: '12px' }}>
                              /100
                            </small>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell className="text-end px-3">
                          <CButton
                            color="light"
                            size="sm"
                            className="shadow-sm border-0 py-2"
                            onClick={() => handleEdit(p)}
                            style={{ borderRadius: '8px' }}
                          >
                            <CIcon icon={cilPencil} className="text-warning me-1" /> Editar
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  )}
                </CTableBody>
              </CTable>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modal Editar Puntaje Modernizado */}
      <CModal
        visible={editModal}
        onClose={() => setEditModal(false)}
        alignment="center"
        backdrop="static"
      >
        <CModalHeader className="border-0 bg-light">
          <CModalTitle className="fw-bold">Ajustar Calificación</CModalTitle>
        </CModalHeader>
        <CModalBody className="p-4">
          <p className="text-muted small mb-4">
            Modifica el puntaje obtenido por el estudiante para este ejercicio específico.
          </p>
          <CForm onSubmit={handleSaveEdit}>
            <div className="mb-4">
              <CFormInput
                label="Nuevo puntaje (0 - 100)"
                type="number"
                min={0}
                max={100}
                size="lg"
                className="text-center fw-bold fs-3"
                value={puntajeEdit.puntaje}
                onChange={(e) => setPuntajeEdit({ ...puntajeEdit, puntaje: e.target.value })}
                required
              />
              <CFormRange
                className="mt-3"
                min={0}
                max={100}
                value={puntajeEdit.puntaje}
                onChange={(e) => setPuntajeEdit({ ...puntajeEdit, puntaje: e.target.value })}
              />
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
              <CButton color="light" className="px-4 border" onClick={() => setEditModal(false)}>
                Cerrar
              </CButton>
              <CButton color="info" type="submit" className="text-white px-4 fw-bold">
                Actualizar Puntaje
              </CButton>
            </div>
          </CForm>
        </CModalBody>
      </CModal>
    </CRow>
  )
}
