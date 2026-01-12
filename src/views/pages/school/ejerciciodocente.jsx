import React, { useEffect, useState } from 'react';
import {
  CCard, CCardBody, CCardHeader, CForm, CFormSelect, CFormInput, CButton,
  CRow, CCol, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CContainer,
  CPagination, CPaginationItem
} from '@coreui/react';

export default function CrudEjercicios() {
  const [lecciones, setLecciones] = useState([]);
  const [ejercicios, setEjercicios] = useState([]);
  const [form, setForm] = useState({ id_leccion: '', tipo_ejercicio: '', enunciado: '', dificultad: '', respuesta_correcta: '' });
  const [filtro, setFiltro] = useState('');
  const [pagina, setPagina] = useState(1);
  const porPagina = 5;
  const [filtroLeccion, setFiltroLeccion] = useState(''); // Nuevo estado para filtrar lecciones

  useEffect(() => {
    fetch('http://localhost:4000/obtenerlecciones')
      .then(res => res.json())
      .then(setLecciones);
    fetchEjercicios();
  }, []);

  const fetchEjercicios = () => {
    fetch('http://localhost:4000/obtenerejercicios')
      .then(res => res.json())
      .then(setEjercicios);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:4000/crearejercicio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ id_leccion: '', tipo_ejercicio: '', enunciado: '', dificultad: '', respuesta_correcta: '' });
    fetchEjercicios();
  };

  // Filtrar ejercicios por nombre de curso/lección
  const ejerciciosFiltrados = ejercicios.filter(e =>
    (e.nombre_leccion || '').toLowerCase().includes(filtro.toLowerCase())
  );

  // Filtrar lecciones para el select del formulario
  const leccionesFiltradas = lecciones.filter(l =>
    l.nombre_leccion.toLowerCase().includes(filtroLeccion.toLowerCase())
  );

  // Paginación
  const totalPaginas = Math.ceil(ejerciciosFiltrados.length / porPagina);
  const ejerciciosPagina = ejerciciosFiltrados.slice((pagina - 1) * porPagina, pagina * porPagina);

  return (
    <CContainer className="py-4">
      <CRow className="justify-content-center">
        <CCol md={10} lg={8}>
          <CCard className="mb-4 shadow" style={{ borderRadius: 18 }}>
            <CCardHeader  style={{ background: '#070145', color: 'white', fontSize: 22 }}>
              Registrar Ejercicio
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit} className="row g-3">
                <CCol md={12}>
                  <CFormInput
                    placeholder="Filtrar lección por nombre"
                    value={filtroLeccion}
                    onChange={e => setFiltroLeccion(e.target.value)}
                    className="mb-2"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormSelect
                    label="Lección"
                    value={form.id_leccion}
                    onChange={e => setForm({ ...form, id_leccion: e.target.value })}
                    required
                  >
                    <option value="">Seleccione una lección</option>
                    {leccionesFiltradas.map(l => (
                      <option key={l.id_leccion} value={l.id_leccion}>{l.nombre_leccion}</option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    label="Tipo de ejercicio"
                    placeholder="Tipo de ejercicio"
                    value={form.tipo_ejercicio}
                    onChange={e => setForm({ ...form, tipo_ejercicio: e.target.value })}
                    required
                  />
                </CCol>
                <CCol md={12}>
                  <CFormInput
                    label="Enunciado"
                    placeholder="Enunciado"
                    value={form.enunciado}
                    onChange={e => setForm({ ...form, enunciado: e.target.value })}
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    label="Dificultad"
                    type="number"
                    placeholder="Dificultad"
                    value={form.dificultad}
                    onChange={e => setForm({ ...form, dificultad: e.target.value })}
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    label="Respuesta correcta"
                    placeholder="Respuesta correcta"
                    value={form.respuesta_correcta}
                    onChange={e => setForm({ ...form, respuesta_correcta: e.target.value })}
                    required
                  />
                </CCol>
                <CCol xs={12} className="text-center">
                  <CButton type="submit" style={{ background: '#070145', color: 'white' }} className="px-5 text-white fw-bold">
                    Crear Ejercicio
                  </CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow className="justify-content-center">
        <CCol md={12}>
          <CCard className="shadow" style={{ borderRadius: 18 }}>
            <CCardHeader className="bg-success text-white fw-bold text-center" style={{ fontSize: 20 }}>
              Lista de Ejercicios
            </CCardHeader>
            <CCardBody>
              <CRow className="mb-3">
                <CCol md={6} lg={4}>
                  <CFormInput
                    placeholder="Filtrar por nombre de curso/lección"
                    value={filtro}
                    onChange={e => { setFiltro(e.target.value); setPagina(1); }}
                  />
                </CCol>
              </CRow>
              <CTable striped hover responsive className="align-middle text-center">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Lección</CTableHeaderCell>
                    <CTableHeaderCell>Tipo</CTableHeaderCell>
                    <CTableHeaderCell>Enunciado</CTableHeaderCell>
                    <CTableHeaderCell>Dificultad</CTableHeaderCell>
                    <CTableHeaderCell>Respuesta Correcta</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {ejerciciosPagina.map(e => (
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
                  <CPaginationItem
                    disabled={pagina === 1}
                    onClick={() => setPagina(pagina - 1)}
                  >
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
  );
}