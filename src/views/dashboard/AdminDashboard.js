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
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilBook, cilTask, cilChartLine } from '@coreui/icons'

export default function DashboardDocente() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetch('https://mateweb-production.up.railway.app/dashboard-docente/estadisticas')
      .then((res) => res.json())
      .then(setStats)
      .catch((err) => console.error('Error al cargar stats:', err))
  }, [])

  if (!stats)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <CSpinner style={{ color: '#1a0b2e' }} variant="grow" />
      </div>
    )

  return (
    <div className="p-4">
      <style>
        {`
          .main-title {
            color: #1a0b2e;
            font-weight: 800;
            letter-spacing: -0.5px;
          }

          .card-uniform {
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            background: #ffffff;
          }

          /* Colores Uniformes para Widgets */
          .bg-student { background-color: #6b21a8 !important; } /* Morado acento */
          .bg-course { background-color: #3b82f6 !important; }  /* Azul */
          .bg-enroll { background-color: #10b981 !important; }  /* Verde */

          .header-morado {
            background-color: #1a0b2e !important;
            color: white;
            font-weight: 600;
            border-radius: 15px 15px 0 0 !important;
            border: none;
          }

          .custom-table {
            margin-bottom: 0;
          }

          .custom-table thead th {
            background-color: #f8faff;
            color: #4b5563;
            text-transform: uppercase;
            font-size: 0.75rem;
            padding: 15px;
            border-bottom: 1px solid #edf2f7;
          }

          .custom-table tbody td {
            padding: 15px;
            color: #1f2937;
            border-bottom: 1px solid #f3f4f6;
          }

          .badge-flat {
            background-color: #f3f4f6;
            color: #1a0b2e;
            font-weight: 700;
            border-radius: 8px;
            padding: 6px 12px;
          }
        `}
      </style>

      <div className="mb-5">
        <h2 className="main-title d-flex align-items-center">
          <CIcon icon={cilChartLine} size="xl" className="me-3" />
          Dashboard Docente
        </h2>
        <p className="text-muted">Resumen general del progreso acadÃ©mico y estadÃ­stico.</p>
      </div>

      {/* Widgets de EstadÃ­sticas Uniformes */}
      <CRow className="mb-4">
        <CCol sm={6} lg={4}>
          <CWidgetStatsA
            className="mb-4 pb-3 card-uniform bg-student text-white"
            value={<div className="fs-3 fw-bold">{stats.totalEstudiantes}</div>}
            title="Total Estudiantes"
            icon={<CIcon icon={cilPeople} height={40} className="my-2 opacity-25" />}
          />
        </CCol>
        <CCol sm={6} lg={4}>
          <CWidgetStatsA
            className="mb-4 pb-3 card-uniform bg-course text-white"
            value={<div className="fs-3 fw-bold">{stats.totalCursos}</div>}
            title="Cursos Activos"
            icon={<CIcon icon={cilBook} height={40} className="my-2 opacity-25" />}
          />
        </CCol>
        <CCol sm={6} lg={4}>
          <CWidgetStatsA
            className="mb-4 pb-3 card-uniform bg-enroll text-white"
            value={<div className="fs-3 fw-bold">{stats.totalInscripciones}</div>}
            title="Inscripciones"
            icon={<CIcon icon={cilTask} height={40} className="my-2 opacity-25" />}
          />
        </CCol>
      </CRow>

      <CRow>
        {/* Tabla Estudiantes por Curso */}
        <CCol md={6}>
          <CCard className="card-uniform border-0 mb-4">
            <CCardHeader className="header-morado py-3">DistribuciÃ³n de Alumnos</CCardHeader>
            <CCardBody className="p-0">
              <CTable responsive className="custom-table">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Curso</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Total</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {stats.estudiantesPorCurso.map((curso) => (
                    <CTableRow key={curso.nombre_curso}>
                      <CTableDataCell className="fw-semibold">{curso.nombre_curso}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        <span className="badge-flat">{curso.cantidad}</span>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Tabla Progreso por Curso */}
        <CCol md={6}>
          <CCard className="card-uniform border-0 mb-4">
            <CCardHeader className="header-morado py-3">Rendimiento por MÃ³dulo</CCardHeader>
            <CCardBody className="p-0">
              <CTable responsive className="custom-table">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Curso</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Progreso</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {stats.progresoPorCurso.map((curso) => (
                    <CTableRow key={curso.nombre_curso}>
                      <CTableDataCell className="fw-semibold">{curso.nombre_curso}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        <span style={{ color: '#1a0b2e', fontWeight: 'bold' }}>
                          {curso.porcentaje_realizado}%
                        </span>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}
