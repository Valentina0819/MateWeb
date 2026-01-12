import React, { useEffect, useState } from 'react';
import {
  CRow, CCol, CCard, CCardBody, CCardHeader, CWidgetStatsA, CTable, CTableHead, CTableRow, CTableHeaderCell,
  CTableBody, CTableDataCell, CPagination, CPaginationItem, CAvatar
} from '@coreui/react';
import { cilUser, cilBook, cilList, cilChart } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function DashboardDocente() {
  const [stats, setStats] = useState(null);

  // Paginación para tablas
  const [pageEstudiantes, setPageEstudiantes] = useState(1);
  const [pageProgreso, setPageProgreso] = useState(1);
  const porPagina = 5;

  useEffect(() => {
    fetch('http://localhost:4000/dashboard-docente/estadisticas')
      .then(res => res.json())
      .then(setStats);
  }, []);

  if (!stats) return <div className="text-center py-5">Cargando estadísticas...</div>;

  // Datos paginados
  const estudiantesPorCursoTotal = stats.estudiantesPorCurso.length;
  const estudiantesPorCursoPag = stats.estudiantesPorCurso.slice((pageEstudiantes - 1) * porPagina, pageEstudiantes * porPagina);
  const estudiantesTotalPages = Math.ceil(estudiantesPorCursoTotal / porPagina);

  const progresoPorCursoTotal = stats.progresoPorCurso.length;
  const progresoPorCursoPag = stats.progresoPorCurso.slice((pageProgreso - 1) * porPagina, pageProgreso * porPagina);
  const progresoTotalPages = Math.ceil(progresoPorCursoTotal / porPagina);

  // Datos para gráfica de barras
  const barData = {
    labels: stats.progresoPorCurso.map(c => c.nombre_curso),
    datasets: [
      {
        label: 'Progreso (%)',
        data: stats.progresoPorCurso.map(c => c.porcentaje_realizado),
        backgroundColor: '#2eb85c',
        borderRadius: 8,
        barThickness: 32,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        ticks: { color: '#114c5f', font: { weight: 'bold' } },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { color: '#114c5f', font: { weight: 'bold' }, stepSize: 20 },
        grid: { color: '#e0e0e0' },
      },
    },
  };

  return (
    <div style={{ background: 'linear-gradient(120deg, #f4f8fb 60%, #e3f6fc 100%)', minHeight: '100vh', padding: '32px 0' }}>
      <CRow className="mb-4 justify-content-center">
        <CCol md={4}>
          <CWidgetStatsA
            className="mb-3 shadow"
            color="info"
            value={
              <>
                <CIcon icon={cilUser} className="me-2" /> {stats.totalEstudiantes}
              </>
            }
            title="Total de Estudiantes"
            style={{ borderRadius: 18, background: '#e3f2fd', color: '#114c5f' }}
          />
        </CCol>
        <CCol md={4}>
          <CWidgetStatsA
            className="mb-3 shadow"
            color="success"
            value={
              <>
                <CIcon icon={cilBook} className="me-2" /> {stats.totalCursos}
              </>
            }
            title="Total de Cursos"
            style={{ borderRadius: 18, background: '#e8f5e9', color: '#114c5f' }}
          />
        </CCol>
        <CCol md={4}>
          <CWidgetStatsA
            className="mb-3 shadow"
            color="warning"
            value={
              <>
                <CIcon icon={cilList} className="me-2" /> {stats.totalInscripciones}
              </>
            }
            title="Total de Inscripciones"
            style={{ borderRadius: 18, background: '#fffde7', color: '#114c5f' }}
          />
        </CCol>
      </CRow>

      <CRow className="mb-4 justify-content-center">
        <CCol md={10} lg={6}>
          <CCard className="shadow" style={{ borderRadius: 18 }}>
            <CCardHeader className="bg-info text-white d-flex align-items-center" style={{ fontSize: 18 }}>
              <CIcon icon={cilUser} className="me-2" /> Estudiantes por Curso
            </CCardHeader>
            <CCardBody>
              <CTable striped hover responsive className="align-middle text-center">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Curso</CTableHeaderCell>
                    <CTableHeaderCell>Cantidad</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {estudiantesPorCursoPag.map(curso => (
                    <CTableRow key={curso.nombre_curso}>
                      <CTableDataCell>
                        <CAvatar color="info" className="me-2">{curso.nombre_curso[0]}</CAvatar>
                        {curso.nombre_curso}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CIcon icon={cilUser} className="me-1" />
                        {curso.cantidad}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <div className="d-flex justify-content-center mt-3">
                <CPagination align="center">
                  <CPaginationItem
                    disabled={pageEstudiantes === 1}
                    onClick={() => setPageEstudiantes(pageEstudiantes - 1)}
                  >
                    &laquo;
                  </CPaginationItem>
                  {[...Array(estudiantesTotalPages)].map((_, idx) => (
                    <CPaginationItem
                      key={idx + 1}
                      active={pageEstudiantes === idx + 1}
                      onClick={() => setPageEstudiantes(idx + 1)}
                    >
                      {idx + 1}
                    </CPaginationItem>
                  ))}
                  <CPaginationItem
                    disabled={pageEstudiantes === estudiantesTotalPages || estudiantesTotalPages === 0}
                    onClick={() => setPageEstudiantes(pageEstudiantes + 1)}
                  >
                    &raquo;
                  </CPaginationItem>
                </CPagination>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={10} lg={6}>
          <CCard className="shadow" style={{ borderRadius: 18 }}>
            <CCardHeader className="bg-success text-white d-flex align-items-center" style={{ fontSize: 18 }}>
              <CIcon icon={cilChart} className="me-2" /> Progreso Promedio por Curso (%)
            </CCardHeader>
            <CCardBody>
              <CTable striped hover responsive className="align-middle text-center">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Curso</CTableHeaderCell>
                    <CTableHeaderCell>Progreso (%)</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {progresoPorCursoPag.map(curso => (
                    <CTableRow key={curso.nombre_curso}>
                      <CTableDataCell>
                        <CAvatar color="success" className="me-2">{curso.nombre_curso[0]}</CAvatar>
                        {curso.nombre_curso}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CIcon icon={cilChart} className="me-1" />
                        {curso.porcentaje_realizado}%
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <div className="d-flex justify-content-center mt-3">
                <CPagination align="center">
                  <CPaginationItem
                    disabled={pageProgreso === 1}
                    onClick={() => setPageProgreso(pageProgreso - 1)}
                  >
                    &laquo;
                  </CPaginationItem>
                  {[...Array(progresoTotalPages)].map((_, idx) => (
                    <CPaginationItem
                      key={idx + 1}
                      active={pageProgreso === idx + 1}
                      onClick={() => setPageProgreso(idx + 1)}
                    >
                      {idx + 1}
                    </CPaginationItem>
                  ))}
                  <CPaginationItem
                    disabled={pageProgreso === progresoTotalPages || progresoTotalPages === 0}
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

      <CRow className="justify-content-center mt-4">
        <CCol md={12} lg={10} xl={9}>
          <CCard className="shadow" style={{ borderRadius: 18 }}>
            <CCardHeader className="bg-primary text-white d-flex align-items-center" style={{ fontSize: 18 }}>
              <CIcon icon={cilChart} className="me-2" /> Gráfica de Progreso por Curso
            </CCardHeader>
            <CCardBody>
              <div className="d-flex justify-content-center">
                <div style={{ background: '#f4f8fb', borderRadius: 16, padding: 32, width: '100%', maxWidth: 900 }}>
                  <Bar data={barData} options={barOptions} height={220} />
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
}