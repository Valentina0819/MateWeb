import React, { useEffect, useState } from 'react';
import {
  CRow, CCol, CCard, CCardBody, CCardHeader, CWidgetStatsA, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell
} from '@coreui/react';

export default function DashboardDocente() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/dashboard-docente/estadisticas')
      .then(res => res.json())
      .then(setStats);
  }, []);

  if (!stats) return <div>Cargando estadísticas...</div>;

  return (
    <div>
      <CRow className="mb-4">
        <CCol md={4}>
          <CWidgetStatsA
            className="mb-3"
            color="info"
            value={stats.totalEstudiantes}
            title="Total de Estudiantes"
          />
        </CCol>
        <CCol md={4}>
          <CWidgetStatsA
            className="mb-3"
            color="success"
            value={stats.totalCursos}
            title="Total de Cursos"
          />
        </CCol>
        <CCol md={4}>
          <CWidgetStatsA
            className="mb-3"
            color="warning"
            value={stats.totalInscripciones}
            title="Total de Inscripciones"
          />
        </CCol>
      </CRow>

      <CRow>
        <CCol md={6}>
          <CCard className="mb-4">
            <CCardHeader className="bg-info text-white">Estudiantes por Curso</CCardHeader>
            <CCardBody>
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Curso</CTableHeaderCell>
                    <CTableHeaderCell>Cantidad</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {stats.estudiantesPorCurso.map(curso => (
                    <CTableRow key={curso.nombre_curso}>
                      <CTableDataCell>{curso.nombre_curso}</CTableDataCell>
                      <CTableDataCell>{curso.cantidad}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={6}>
          <CCard className="mb-4">
            <CCardHeader className="bg-success text-white">Progreso Promedio por Curso (%)</CCardHeader>
            <CCardBody>
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Curso</CTableHeaderCell>
                    <CTableHeaderCell>Progreso (%)</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {stats.progresoPorCurso.map(curso => (
                    <CTableRow key={curso.nombre_curso}>
                      <CTableDataCell>{curso.nombre_curso}</CTableDataCell>
                      <CTableDataCell>{curso.porcentaje_realizado}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
}