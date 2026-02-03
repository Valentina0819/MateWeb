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

export default function GestionNotas() {
  const [cursos, setCursos] = useState([])
  const [cursoSel, setCursoSel] = useState('')
  const [estudiantes, setEstudiantes] = useState([])
  const [estudianteSel, setEstudianteSel] = useState('')
  const [resultados, setResultados] = useState([])
  const [evaluaciones, setEvaluaciones] = useState([])
  const [evaluacionSel, setEvaluacionSel] = useState('')
  const [nota, setNota] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('success')
  const [notasRegistradas, setNotasRegistradas] = useState([])
  const azulProfundo = '#070145'
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
      fetch(`http://localhost:4000/evaluaciones-modulo/${cursoSel}`)
        .then((res) => res.json())
        .then(setEvaluaciones)
    } else {
      setEstudiantes([])
      setEvaluaciones([])
    }
    setEstudianteSel('')
    setResultados([])
    setEvaluacionSel('')
    setNota('')
  }, [cursoSel])

  useEffect(() => {
    if (estudianteSel && cursoSel) {
      fetch(`http://localhost:4000/resultados-ejercicios/${estudianteSel}/${cursoSel}`)
        .then((res) => res.json())
        .then(setResultados)
    } else {
      setResultados([])
    }
  }, [estudianteSel, cursoSel])

  useEffect(() => {
    if (estudianteSel && cursoSel) {
      fetch(`http://localhost:4000/notas-registradas/${estudianteSel}/${cursoSel}`)
        .then((res) => res.json())
        .then(setNotasRegistradas)
    } else {
      setNotasRegistradas([])
    }
  }, [estudianteSel, cursoSel])

  const handleRegistrarNota = async (e) => {
    e.preventDefault()
    setMensaje('')
    setTipoMensaje('success')
    if (notasRegistradas.length > 0) {
      setMensaje('Ya se ha asignado una nota a este estudiante en este curso.')
      setTipoMensaje('danger')
      return
    }
    if (!estudianteSel || !nota) {
      setMensaje('Completa todos los campos.')
      setTipoMensaje('danger')
      return
    }
    try {
      const res = await fetch('http://localhost:4000/registrar-nota-evaluacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_usuario: estudianteSel,
          nota_final: nota,
          id_curso: cursoSel,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setMensaje('¡Nota registrada correctamente!')
        setNota('')
        setNotasRegistradas([{ id_usuario: estudianteSel }])
      } else {
        setMensaje(data.mensaje || 'Error al registrar la nota')
        setTipoMensaje('danger')
      }
    } catch {
      setMensaje('Error de conexión')
      setTipoMensaje('danger')
    }
  }

  // Imprimir PDF
  const handleImprimirPDF = () => {
    if (!estudianteSel || !cursoSel) return
    window.open(`http://localhost:4000/imprimir-lecciones/${estudianteSel}/${cursoSel}`, '_blank')
  }

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
      <CRow className="justify-content-center">
        {/* Columna de selección/registro de notas */}
        <CCol md={4} lg={3}>
          <CCard className="mb-4 shadow">
            <CCardHeader className="header-dark p-3">
              <div className="p-4 text-white text-center" style={{ background: azulProfundo }}>
                <CIcon icon={cilPlus} size="xl" className="mb-2" />
                <h4 className="fw-bold mb-0">Gestion de Notas</h4>
                <p className="small opacity-75">
                  Asignacion de notas correspondoentes de los alumnos
                </p>
              </div>
            </CCardHeader>
            <CCardBody>
              {mensaje && <CAlert color={tipoMensaje}>{mensaje}</CAlert>}
              <CForm onSubmit={handleRegistrarNota}>
                <CRow className="mb-3">
                  <CCol xs={12} className="mb-2">
                    <select
                      className="form-select"
                      value={cursoSel}
                      onChange={(e) => setCursoSel(e.target.value)}
                      required
                    >
                      <option value="">Seleccione un curso</option>
                      {cursos.map((c) => (
                        <option key={c.id_curso} value={c.id_curso}>
                          {c.nombre_curso}
                        </option>
                      ))}
                    </select>
                  </CCol>
                  <CCol xs={12} className="mb-2">
                    <select
                      className="form-select"
                      value={estudianteSel}
                      onChange={(e) => setEstudianteSel(e.target.value)}
                      required
                    >
                      <option value="">Seleccione un estudiante</option>
                      {estudiantes.map((e) => (
                        <option key={e.id_usuario} value={e.id_usuario}>
                          {e.nombre} {e.apellido} ({e.email})
                        </option>
                      ))}
                    </select>
                  </CCol>
                  <CCol xs={12} className="mb-2">
                    <select
                      className="form-select"
                      value={evaluacionSel}
                      onChange={(e) => setEvaluacionSel(e.target.value)}
                      required
                    >
                      <option value="">Seleccione evaluación</option>
                      {evaluaciones.map((ev) => (
                        <option key={ev.id_evaluacion} value={ev.id_evaluacion}>
                          {ev.nombre_evaluacion}
                        </option>
                      ))}
                    </select>
                  </CCol>
                </CRow>
                <div className="d-flex justify-content-end mb-2">
                  <CButton
                    style={{ background: azulProfundo }}
                    className="btn-main w-100 text-white"
                    onClick={handleImprimirPDF}
                    disabled={!estudianteSel || !cursoSel}
                  >
                    <CIcon icon={cilSave} className="me-2" />
                    Imprimir Lecciones y Ejercicios
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Columna de resultados de ejercicios */}
        <CCol md={8} lg={9}>
          <CCard className="shadow">
            <CCardHeader className="bg-white border-0 py-3">
              <div className="d-flex align-items-center fw-bold" style={{ color: '#333' }}>
                <CIcon icon={cilBook} className="me-2 text-primary" size="lg" />
                Resultados de Ejercicios
              </div>
            </CCardHeader>
            <CCardBody>
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>ENUNCIADO</CTableHeaderCell>
                    <CTableHeaderCell>LECCIÓN</CTableHeaderCell>
                    <CTableHeaderCell>MÓDULO</CTableHeaderCell>
                    <CTableHeaderCell>RESPUESTA ESTUDIANTE</CTableHeaderCell>
                    <CTableHeaderCell>RESPUESTA CORRECTA</CTableHeaderCell>
                    <CTableHeaderCell>PUNTAJE</CTableHeaderCell>
                    <CTableHeaderCell>FECHA</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {resultados.length === 0 ? (
                    <CTableRow>
                      <CTableDataCell colSpan={7} className="text-center">
                        No hay resultados.
                      </CTableDataCell>
                    </CTableRow>
                  ) : (
                    resultados.map((r) => (
                      <CTableRow key={r.id_resultado}>
                        <CTableDataCell>{r.enunciado}</CTableDataCell>
                        <CTableDataCell>{r.nombre_leccion}</CTableDataCell>
                        <CTableDataCell>{r.nombre_modulo}</CTableDataCell>
                        <CTableDataCell>{r.respuesta_usuario}</CTableDataCell>
                        <CTableDataCell>{r.respuesta_correcta}</CTableDataCell>
                        <CTableDataCell>{r.puntaje}</CTableDataCell>
                        <CTableDataCell>{r.fecha_realizacion}</CTableDataCell>
                      </CTableRow>
                    ))
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}
