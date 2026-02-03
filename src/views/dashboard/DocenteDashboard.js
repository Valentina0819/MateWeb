import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CWidgetStatsA,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CPagination,
  CPaginationItem,
  CAvatar,
  CSpinner,
} from '@coreui/react'
import { cilUser, cilBook, cilList, cilChartLine } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Bar } from 'react-chartjs-2'
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

export default function DashboardDocente() {
  const [stats, setStats] = useState(null)
  const [pageEstudiantes, setPageEstudiantes] = useState(1)
  const [pageProgreso, setPageProgreso] = useState(1)
  const porPagina = 5

  const moradoPrincipal = '#1a0b2e'
  const moradoAcento = '#6b21a8'

  useEffect(() => {
    fetch('http://localhost:4000/dashboard-docente/estadisticas')
      .then((res) => res.json())
      .then(setStats)
  }, [])

  if (!stats)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <CSpinner style={{ color: moradoPrincipal }} variant="grow" />
      </div>
    )

  const estudiantesPorCursoPag = stats.estudiantesPorCurso.slice(
    (pageEstudiantes - 1) * porPagina,
    pageEstudiantes * porPagina,
  )
  const estudiantesTotalPages = Math.ceil(stats.estudiantesPorCurso.length / porPagina)

  const progresoPorCursoPag = stats.progresoPorCurso.slice(
    (pageProgreso - 1) * porPagina,
    pageProgreso * porPagina,
  )
  const progresoTotalPages = Math.ceil(stats.progresoPorCurso.length / porPagina)

  const barData = {
    labels: stats.progresoPorCurso.map((c) => c.nombre_curso),
    datasets: [
      {
        label: 'Progreso (%)',
        data: stats.progresoPorCurso.map((c) => c.porcentaje_realizado),
        backgroundColor: moradoAcento,
        borderRadius: 5,
      },
    ],
  }

  return (
    <div className="p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <style>
        {`
          .main-title { color: ${moradoPrincipal}; font-weight: 800; }
          .card-uniform { border: none; border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); background: #fff; }
          .header-morado { background: ${moradoPrincipal} !important; color: white; border-radius: 15px 15px 0 0 !important; border: none; }
          .widget-custom { border-radius: 15px !important; border: none !important; color: white !important; }
          .custom-table thead th { background: #f8faff; color: #4b5563; font-size: 0.75rem; border-bottom: 2px solid #edf2f7; }
          .page-link { color: ${moradoPrincipal} !important; border-radius: 8px !important; margin: 0 2px; }
          .page-item.active .page-link { background-color: ${moradoPrincipal} !important; border-color: ${moradoPrincipal} !important; color: white !important; }
        `}
      </style>

      <div className="mb-4">
        <h2 className="main-title d-flex align-items-center">
          <CIcon icon={cilChartLine} size="xl" className="me-3" />
          Panel de Control Docente
        </h2>
      </div>

      {/* Widgets de Estadísticas Uniformes */}
      <CRow className="mb-4">
        <CCol md={4}>
          <CWidgetStatsA
            className="mb-3 widget-custom shadow-sm"
            style={{ background: moradoAcento }}
            value={<div className="fs-3 fw-bold">{stats.totalEstudiantes}</div>}
            title="TOTAL ESTUDIANTES"
            icon={<CIcon icon={cilUser} height={40} className="opacity-25" />}
          />
        </CCol>
        <CCol md={4}>
          <CWidgetStatsA
            className="mb-3 widget-custom shadow-sm"
            style={{ background: '#3b82f6' }}
            value={<div className="fs-3 fw-bold">{stats.totalCursos}</div>}
            title="TOTAL CURSOS"
            icon={<CIcon icon={cilBook} height={40} className="opacity-25" />}
          />
        </CCol>
        <CCol md={4}>
          <CWidgetStatsA
            className="mb-3 widget-custom shadow-sm"
            style={{ background: '#10b981' }}
            value={<div className="fs-3 fw-bold">{stats.totalInscripciones}</div>}
            title="INSCRIPCIONES"
            icon={<CIcon icon={cilList} height={40} className="opacity-25" />}
          />
        </CCol>
      </CRow>

      <CRow className="mb-4">
        {/* Tabla Estudiantes */}
        <CCol lg={6}>
          <CCard className="card-uniform h-100">
            <CCardHeader className="header-morado py-3">Distribución de Alumnos</CCardHeader>
            <CCardBody>
              <CTable hover responsive className="align-middle">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Curso</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Cantidad</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {estudiantesPorCursoPag.map((curso) => (
                    <CTableRow key={curso.nombre_curso}>
                      <CTableDataCell className="fw-semibold text-dark">
                        <CAvatar
                          size="sm"
                          style={{ backgroundColor: '#e9ecef', color: moradoPrincipal }}
                          className="me-2 fw-bold"
                        >
                          {curso.nombre_curso[0]}
                        </CAvatar>
                        {curso.nombre_curso}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <span className="badge bg-light text-dark border px-3 py-2">
                          {curso.cantidad}
                        </span>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <div className="d-flex justify-content-center mt-3">
                <CPagination>
                  <CPaginationItem
                    disabled={pageEstudiantes === 1}
                    onClick={() => setPageEstudiantes(pageEstudiantes - 1)}
                  >
                    &laquo;
                  </CPaginationItem>
                  {[...Array(estudiantesTotalPages)].map((_, i) => (
                    <CPaginationItem
                      key={i}
                      active={pageEstudiantes === i + 1}
                      onClick={() => setPageEstudiantes(i + 1)}
                    >
                      {i + 1}
                    </CPaginationItem>
                  ))}
                  <CPaginationItem
                    disabled={pageEstudiantes === estudiantesTotalPages}
                    onClick={() => setPageEstudiantes(pageEstudiantes + 1)}
                  >
                    &raquo;
                  </CPaginationItem>
                </CPagination>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Tabla Progreso */}
        <CCol lg={6}>
          <CCard className="card-uniform h-100">
            <CCardHeader className="header-morado py-3">Progreso Promedio (%)</CCardHeader>
            <CCardBody>
              <CTable hover responsive className="align-middle">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Curso</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Avance</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {progresoPorCursoPag.map((curso) => (
                    <CTableRow key={curso.nombre_curso}>
                      <CTableDataCell className="fw-semibold text-dark">
                        {curso.nombre_curso}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <span style={{ color: moradoAcento, fontWeight: '800' }}>
                          {curso.porcentaje_realizado}%
                        </span>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <div className="d-flex justify-content-center mt-3">
                <CPagination>
                  <CPaginationItem
                    disabled={pageProgreso === 1}
                    onClick={() => setPageProgreso(pageProgreso - 1)}
                  >
                    &laquo;
                  </CPaginationItem>
                  {[...Array(progresoTotalPages)].map((_, i) => (
                    <CPaginationItem
                      key={i}
                      active={pageProgreso === i + 1}
                      onClick={() => setPageProgreso(i + 1)}
                    >
                      {i + 1}
                    </CPaginationItem>
                  ))}
                  <CPaginationItem
                    disabled={pageProgreso === progresoTotalPages}
                    onClick={() => setPageProgreso(pageProgreso + 1)}
                  >
                    &raquo;
                  </CPaginationItem>
                </CPagination>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Gráfica de Barras */}
      <CRow className="justify-content-center">
        <CCol md={12}>
          <CCard className="card-uniform border-0">
            <CCardHeader className="header-morado py-3">
              Visualización de Rendimiento Académico
            </CCardHeader>
            <CCardBody className="p-4">
              <div style={{ height: '300px' }}>
                <Bar
                  data={barData}
                  options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }}
                />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}
