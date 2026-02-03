import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormSelect,
  CFormInput,
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
  CInputGroup,
  CInputGroupText,
  CFormFloating,
  CFormLabel,
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

export default function CrudEjercicios() {
  const [lecciones, setLecciones] = useState([])
  const [ejercicios, setEjercicios] = useState([])
  const [form, setForm] = useState({
    id_leccion: '',
    tipo_ejercicio: '',
    enunciado: '',
    dificultad: '',
    respuesta_correcta: '',
  })
  const [filtro, setFiltro] = useState('')
  const [pagina, setPagina] = useState(1)
  const porPagina = 5
  const [filtroLeccion, setFiltroLeccion] = useState('') // Nuevo estado para filtrar lecciones

  useEffect(() => {
    fetch('http://localhost:4000/obtenerlecciones')
      .then((res) => res.json())
      .then(setLecciones)
    fetchEjercicios()
  }, [])

  const fetchEjercicios = () => {
    fetch('http://localhost:4000/obtenerejercicios')
      .then((res) => res.json())
      .then(setEjercicios)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('http://localhost:4000/crearejercicio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setForm({
      id_leccion: '',
      tipo_ejercicio: '',
      enunciado: '',
      dificultad: '',
      respuesta_correcta: '',
    })
    fetchEjercicios()
  }

  // Filtrar ejercicios por nombre de curso/lección
  const ejerciciosFiltrados = ejercicios.filter((e) =>
    (e.nombre_leccion || '').toLowerCase().includes(filtro.toLowerCase()),
  )

  // Filtrar lecciones para el select del formulario
  const leccionesFiltradas = lecciones.filter((l) =>
    l.nombre_leccion.toLowerCase().includes(filtroLeccion.toLowerCase()),
  )

  // Paginación
  const totalPaginas = Math.ceil(ejerciciosFiltrados.length / porPagina)
  const ejerciciosPagina = ejerciciosFiltrados.slice((pagina - 1) * porPagina, pagina * porPagina)
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
      <CRow className="justify-content-center">
        {/* Columna del formulario */}
        <CCol md={5} lg={4}>
          <CCard className="mb-4 shadow" style={{ borderRadius: 18 }}>
            <CCardHeader className="header-dark p-3">
              <div className="p-4 text-white text-center" style={{ background: azulProfundo }}>
                <CIcon icon={cilPlus} size="xl" className="mb-2" />
                <h4 className="fw-bold mb-0">Registrar Ejercicio</h4>
                <p className="small opacity-75">Registrar nuevo ejercicio</p>
              </div>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit} className="row g-3">
                <CCol md={12}>
                  <CFormInput
                    placeholder="Filtrar lección por nombre"
                    value={filtroLeccion}
                    onChange={(e) => setFiltroLeccion(e.target.value)}
                    className="mb-2"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormSelect
                    label="Lección"
                    value={form.id_leccion}
                    onChange={(e) => setForm({ ...form, id_leccion: e.target.value })}
                    required
                  >
                    <option value="">Seleccione una lección</option>
                    {leccionesFiltradas.map((l) => (
                      <option key={l.id_leccion} value={l.id_leccion}>
                        {l.nombre_leccion}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    label="Tipo de ejercicio"
                    placeholder="Tipo de ejercicio"
                    value={form.tipo_ejercicio}
                    onChange={(e) => setForm({ ...form, tipo_ejercicio: e.target.value })}
                    required
                  />
                </CCol>
                <CCol md={12}>
                  <CFormInput
                    label="Enunciado"
                    placeholder="Enunciado"
                    value={form.enunciado}
                    onChange={(e) => setForm({ ...form, enunciado: e.target.value })}
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    label="Dificultad"
                    type="number"
                    placeholder="Dificultad"
                    value={form.dificultad}
                    onChange={(e) => setForm({ ...form, dificultad: e.target.value })}
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    label="Respuesta correcta"
                    placeholder="Respuesta correcta"
                    value={form.respuesta_correcta}
                    onChange={(e) => setForm({ ...form, respuesta_correcta: e.target.value })}
                    required
                  />
                </CCol>
                <CCol xs={12} className="text-center">
                  <CButton
                    type="submit"
                    className="btn-main w-100 text-white"
                    style={{ background: azulProfundo }}
                  >
                    <CIcon icon={cilSave} className="me-2" />
                    Registrar Ejercicio
                  </CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Columna de la lista de ejercicios */}
        <CCol md={7} lg={8}>
          <CCard className="shadow" style={{ borderRadius: 18 }}>
            <CCardHeader className="bg-white border-0 py-3 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center fw-bold" style={{ color: '#333' }}>
                <CIcon icon={cilBook} className="me-2 text-primary" size="lg" />
                Ejercicios Activos
              </div>

              <CCol md={6} lg={4} className="p-0">
                <CInputGroup>
                  <CInputGroupText
                    className="bg-white border-end-0"
                    style={{ borderRadius: '10px 0 0 10px' }}
                  >
                    <CIcon icon={cilSearch} className="text-muted" />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Filtrar por nombre de curso/lección"
                    value={filtro}
                    onChange={(e) => {
                      setFiltro(e.target.value)
                      setPagina(1)
                    }}
                  />
                </CInputGroup>
              </CCol>
            </CCardHeader>
            <CCardBody>
              <CTable striped hover responsive className="align-middle text-center">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>LECCION</CTableHeaderCell>
                    <CTableHeaderCell>TIPO</CTableHeaderCell>
                    <CTableHeaderCell>ENUNCIADO</CTableHeaderCell>
                    <CTableHeaderCell>DIFICULTAD</CTableHeaderCell>
                    <CTableHeaderCell>RESPUESTA CORRECTA</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {ejerciciosPagina.map((e) => (
                    <CTableRow key={e.id_ejercicio}>
                      <CTableDataCell>{e.nombre_leccion}</CTableDataCell>
                      <CTableDataCell>{e.tipo_ejercicio}</CTableDataCell>
                      <CTableDataCell>{e.enunciado}</CTableDataCell>
                      <CTableDataCell>{e.dificultad}</CTableDataCell>
                      <CTableDataCell>{e.respuesta_correcta}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <div className="d-flex justify-content-center mt-3">
                <CPagination align="center">
                  <CPaginationItem disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>
                    &laquo;
                  </CPaginationItem>
                  {[...Array(totalPaginas)].map((_, idx) => (
                    <CPaginationItem
                      key={idx + 1}
                      active={pagina === idx + 1}
                      onClick={() => setPagina(idx + 1)}
                    >
                      {idx + 1}
                    </CPaginationItem>
                  ))}
                  <CPaginationItem
                    disabled={pagina === totalPaginas || totalPaginas === 0}
                    onClick={() => setPagina(pagina + 1)}
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
  )
}
