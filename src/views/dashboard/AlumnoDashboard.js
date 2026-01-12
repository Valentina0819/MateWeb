import React, { useEffect, useState } from 'react';
import {
  CCard, CCardBody, CCardHeader, CContainer, CAlert,
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CPagination, CPaginationItem
} from '@coreui/react';

export default function DashboardEstudiante() {
  const [data, setData] = useState({ ejercicios: [], progreso: 0, total: 0, completados: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // Obtén el usuario desde localStorage
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const id_usuario = usuario?.id_usuario;
  const rol = usuario?.rol;

  useEffect(() => {
    if (!id_usuario || rol !== 'alumno') {
      setLoading(false);
      setError('No se ha proporcionado el usuario o no tienes permisos.');
      setData({ ejercicios: [], progreso: 0, total: 0, completados: 0 });
      return;
    }
    setLoading(true);
    fetch(`http://localhost:4000/dashboard-estudiante/${id_usuario}`)
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener datos');
        return res.json();
      })
      .then(d => {
        setData(d);
        setError('');
        setLoading(false);
      })
      .catch(err => {
        setError('No se pudo cargar el dashboard');
        setData({ ejercicios: [], progreso: 0, total: 0, completados: 0 });
        setLoading(false);
      });
  }, [id_usuario, rol]);

  // Calcular paginación
  const ejercicios = Array.isArray(data.ejercicios) ? data.ejercicios : [];
  const totalPages = Math.ceil(ejercicios.length / itemsPerPage);
  const ejerciciosToShow = ejercicios.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  if (loading) {
    return (
      <CContainer className="py-4">
        <CCard>
          <CCardBody>Cargando...</CCardBody>
        </CCard>
      </CContainer>
    );
  }

  return (
    <CContainer className="py-4">
      <CCard className="mb-4 shadow">
        <CCardHeader style={{ background: '#070145', color: 'white' }}>
          <h2 className="mb-0">Mi Progreso</h2>
        </CCardHeader>
        <CCardBody>
          {error && <CAlert color="danger" className="mb-3">{error}</CAlert>}
          <div style={{ marginBottom: 20 }}>
            <strong>Ejercicios completados:</strong> {data.completados} / {data.total}
            <br />
            <strong>Progreso:</strong> {data.progreso}%
            <div style={{ background: ' #eee', borderRadius: 5, height: 20, marginTop: 5 }}>
              <div style={{
                width: `${data.progreso}%`,
                background: '#070145',
                height: '100%',
                borderRadius: 5,
                transition: 'width 0.5s'
              }} />
            </div>
          </div>
        </CCardBody>
      </CCard>

      <CCard className="shadow">
        <CCardHeader style={{ background: '#070145', color: 'white' }}>
          <h3 className="mb-0">Ejercicios asignados</h3>
        </CCardHeader>
        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Curso</CTableHeaderCell>
                <CTableHeaderCell>Lección</CTableHeaderCell>
                <CTableHeaderCell>Enunciado</CTableHeaderCell>
                <CTableHeaderCell>Estado</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {ejerciciosToShow.length > 0 ? (
                ejerciciosToShow.map(ej => (
                  <CTableRow key={ej.id_ejercicio}>
                    <CTableDataCell>{ej.nombre_curso}</CTableDataCell>
                    <CTableDataCell>{ej.nombre_leccion}</CTableDataCell>
                    <CTableDataCell>{ej.enunciado}</CTableDataCell>
                    <CTableDataCell>
                      {ej.realizado
                        ? <span style={{ color: 'green', fontWeight: 'bold' }}>Realizado</span>
                        : <span style={{ color: 'red', fontWeight: 'bold' }}>Pendiente</span>
                      }
                    </CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan={4} className="text-center">
                    No tienes ejercicios asignados.
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
          {/* Paginación */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <CPagination align="center" aria-label="Paginación ejercicios">
                <CPaginationItem
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  &laquo;
                </CPaginationItem>
                {[...Array(totalPages)].map((_, idx) => (
                  <CPaginationItem
                    key={idx + 1}
                    active={page === idx + 1}
                    onClick={() => setPage(idx + 1)}
                  >
                    {idx + 1}
                  </CPaginationItem>
                ))}
                <CPaginationItem
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  &raquo;
                </CPaginationItem>
              </CPagination>
            </div>
          )}
        </CCardBody>
      </CCard>
    </CContainer>
  );
}