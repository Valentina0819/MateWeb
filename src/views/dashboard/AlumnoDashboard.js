import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CContainer,
  CAlert,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CPagination,
  CPaginationItem,
  CRow,
  CCol,
  CSpinner,
  CProgress,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilEducation, cilCheckCircle, cilClock, cilChartPie } from '@coreui/icons'

export default function DashboardEstudiante() {
  const [data, setData] = useState({ ejercicios: [], progreso: 0, total: 0, completados: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const itemsPerPage = 5

  const usuario = JSON.parse(localStorage.getItem('usuario'))
  const id_usuario = usuario?.id_usuario
  const rol = usuario?.rol

  useEffect(() => {
    if (!id_usuario || rol !== 'alumno') {
      setLoading(false)
      setError('Acceso denegado: No se identifico una cuenta de alumno activa.')
      return
    }
    setLoading(true)
    fetch(`https://mateweb-production.up.railway.app/dashboard-estudiante/${id_usuario}`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al conectar con el servidor')
        return res.json()
      })
      .then((d) => {
        setData(d)
        setLoading(false)
      })
      .catch((err) => {
        setError('No se pudieron sincronizar tus datos de progreso.')
        setLoading(false)
      })
  }, [id_usuario, rol])

  const ejercicios = Array.isArray(data.ejercicios) ? data.ejercicios : []
  const totalPages = Math.ceil(ejercicios.length / itemsPerPage)
  const ejerciciosToShow = ejercicios.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <CSpinner style={{ color: '#1a0b2e' }} variant="grow" />
      </div>
    )
  }

  return (
    <CContainer className="py-4">
      <style>
        {`
          .main-title { color: #1a0b2e; font-weight: 800; }
          .card-student { border: none; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); background: #fff; }
          .header-student { background: #1a0b2e !important; color: white; border-radius: 15px 15px 0 0 !important; border: none; padding: 1.2rem; }
          .stat-box { background: #f8faff; border-radius: 12px; padding: 20px; border: 1px solid #edf2f7; }
          .badge-status { padding: 6px 12px; border-radius: 8px; font-size: 0.85rem; font-weight: 700; }
          .custom-table thead th { background: #f8faff; color: #4b5563; text-transform: uppercase; font-size: 0.75rem; border-bottom: 2px solid #edf2f7; }
        `}
      </style>

      <div className="mb-4">
        <h2 className="main-title mb-1">
          <CIcon icon={cilEducation} size="xl" className="me-2" />
          Mi Panel de Aprendizaje
        </h2>
        <p className="text-muted">
          Hola, {usuario?.nombre || 'Estudiante'}. Revisa tu avance y ejercicios pendientes.
        </p>
      </div>

      <CRow className="mb-4">
        <CCol md={12}>
          <CCard className="card-student">
            <CCardHeader className="header-student d-flex align-items-center">
              <CIcon icon={cilChartPie} className="me-2" />
              <h5 className="mb-0">Resumen de Progreso</h5>
            </CCardHeader>
            <CCardBody className="p-4">
              {error && (
                <CAlert color="danger" className="mb-4">
                  {error}
                </CAlert>
              )}

              <CRow className="align-items-center">
                <CCol md={4} className="text-center border-end">
                  <div className="stat-box">
                    <span className="text-muted d-block mb-1">COMPLETADOS</span>
                    <h2 className="fw-bold mb-0" style={{ color: '#1a0b2e' }}>
                      {data.completados} <small className="fs-6 text-muted">/ {data.total}</small>
                    </h2>
                  </div>
                </CCol>
                <CCol md={8} className="ps-md-5">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-bold">Nivel de Avance General</span>
                    <span className="fw-bold" style={{ color: '#1a0b2e' }}>
                      {data.progreso}%
                    </span>
                  </div>
                  <CProgress
                    value={data.progreso}
                    height={15}
                    style={{ background: '#f0f0f0', borderRadius: '10px' }}
                  >
                    <div
                      style={{ backgroundColor: '#1a0b2e', height: '100%', borderRadius: '10px' }}
                    />
                  </CProgress>
                  <p className="small text-muted mt-2 mb-0">
                    * Sigue practicando para completar el 100% de tus actividades asignadas.
                  </p>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CCard className="card-student">
        <CCardHeader className="header-student d-flex align-items-center">
          <CIcon icon={cilClock} className="me-2" />
          <h5 className="mb-0">Ejercicios Asignados</h5>
        </CCardHeader>
        <CCardBody className="p-0">
          <CTable hover responsive className="custom-table mb-0">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell className="ps-4">Curso</CTableHeaderCell>
                <CTableHeaderCell>Leccion</CTableHeaderCell>
                <CTableHeaderCell>Enunciado</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Estado</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {ejerciciosToShow.length > 0 ? (
                ejerciciosToShow.map((ej) => (
                  <CTableRow key={ej.id_ejercicio} className="align-middle">
                    <CTableDataCell className="ps-4 fw-semibold text-dark">
                      {ej.nombre_curso}
                    </CTableDataCell>
                    <CTableDataCell>{ej.nombre_leccion}</CTableDataCell>
                    <CTableDataCell className="text-muted" style={{ maxWidth: '300px' }}>
                      {ej.enunciado}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {ej.realizado ? (
                        <span className="badge-status bg-success-subtle text-success">
                          <CIcon icon={cilCheckCircle} className="me-1" /> Realizado
                        </span>
                      ) : (
                        <span className="badge-status bg-danger-subtle text-danger">Pendiente</span>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan={4} className="text-center py-5 text-muted">
                    No tienes ejercicios asignados en este momento.
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center py-3 border-top">
              <CPagination aria-label="Navegacion de ejercicios">
                <CPaginationItem
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  style={{ cursor: 'pointer' }}
                >
                  Anterior
                </CPaginationItem>
                {[...Array(totalPages)].map((_, idx) => (
                  <CPaginationItem
                    key={idx + 1}
                    active={page === idx + 1}
                    onClick={() => setPage(idx + 1)}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: page === idx + 1 ? '#1a0b2e' : '',
                    }}
                  >
                    {idx + 1}
                  </CPaginationItem>
                ))}
                <CPaginationItem
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  style={{ cursor: 'pointer' }}
                >
                  Siguiente
                </CPaginationItem>
              </CPagination>
            </div>
          )}
        </CCardBody>
      </CCard>
    </CContainer>
  )
}
