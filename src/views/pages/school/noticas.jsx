import React, { useEffect, useState } from 'react';
import {
  CCard, CCardBody, CCardHeader, CFormInput, CButton,
  CAlert, CRow, CCol, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter
} from '@coreui/react';

export default function PuntajesEstudiante() {
  const [cursos, setCursos] = useState([]);
  const [cursoSel, setCursoSel] = useState('');
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudianteSel, setEstudianteSel] = useState('');
  const [puntajes, setPuntajes] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('success');
  const [editModal, setEditModal] = useState(false);
  const [puntajeEdit, setPuntajeEdit] = useState({ id_resultado: '', puntaje: '' });
  const [filtroModulo, setFiltroModulo] = useState('');
  const [filtroEstudiante, setFiltroEstudiante] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/obtenercursos')
      .then(res => res.json())
      .then(setCursos);
  }, []);

  useEffect(() => {
    if (cursoSel) {
      fetch(`http://localhost:4000/estudiantes-curso/${cursoSel}`)
        .then(res => res.json())
        .then(setEstudiantes);
    } else {
      setEstudiantes([]);
    }
    setEstudianteSel('');
    setPuntajes([]);
  }, [cursoSel]);

  useEffect(() => {
    if (estudianteSel && cursoSel) {
      fetch(`http://localhost:4000/puntajes-estudiante/${estudianteSel}/${cursoSel}`)
        .then(res => res.json())
        .then(setPuntajes);
    } else {
      setPuntajes([]);
    }
  }, [estudianteSel, cursoSel]);

  const handleEdit = (p) => {
    setPuntajeEdit({ id_resultado: p.id_resultado, puntaje: p.puntaje });
    setEditModal(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/puntaje-ejercicio/${puntajeEdit.id_resultado}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ puntaje: puntajeEdit.puntaje })
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje('Puntaje actualizado correctamente');
        setTipoMensaje('success');
        setEditModal(false);
        // Refrescar puntajes
        fetch(`http://localhost:4000/puntajes-estudiante/${estudianteSel}/${cursoSel}`)
          .then(res => res.json())
          .then(setPuntajes);
      } else {
        setMensaje(data.mensaje || 'Error al actualizar puntaje');
        setTipoMensaje('danger');
      }
    } catch {
      setMensaje('Error de conexión');
      setTipoMensaje('danger');
    }
  };

  return (
    <CRow className="justify-content-center">
      <CCol md={10}>
        <CCard className="mb-4">
          <CCardHeader style={{ background: '#070145', color: 'white' }}>Puntajes de Ejercicios</CCardHeader>
          <CCardBody>
            {mensaje && <CAlert color={tipoMensaje} onClose={() => setMensaje('')}>{mensaje}</CAlert>}
            <CRow className="mb-3">
              <CCol md={4}>
                <CFormInput
                  placeholder="Filtrar por módulo"
                  value={filtroModulo}
                  onChange={e => setFiltroModulo(e.target.value)}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  placeholder="Filtrar por estudiante"
                  value={filtroEstudiante}
                  onChange={e => setFiltroEstudiante(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={4}>
                <select
                  className="form-select"
                  value={cursoSel}
                  onChange={e => setCursoSel(e.target.value)}
                  required
                >
                  <option value="">Seleccione un curso</option>
                  {cursos
                    .filter(c => c.nombre_curso.toLowerCase().includes(filtroModulo.toLowerCase()))
                    .map(c => (
                      <option key={c.id_curso} value={c.id_curso}>{c.nombre_curso}</option>
                    ))}
                </select>
              </CCol>
              <CCol md={4}>
                <select
                  className="form-select"
                  value={estudianteSel}
                  onChange={e => setEstudianteSel(e.target.value)}
                  required
                >
                  <option value="">Seleccione un estudiante</option>
                  {estudiantes
                    .filter(e => `${e.nombre} ${e.apellido} ${e.email}`.toLowerCase().includes(filtroEstudiante.toLowerCase()))
                    .map(e => (
                      <option key={e.id_usuario} value={e.id_usuario}>
                        {e.nombre} {e.apellido} ({e.email})
                      </option>
                    ))}
                </select>
              </CCol>
            </CRow>
            <CTable striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Enunciado</CTableHeaderCell>
                  <CTableHeaderCell>Lección</CTableHeaderCell>
                  <CTableHeaderCell>Módulo</CTableHeaderCell>
                  <CTableHeaderCell>Puntaje</CTableHeaderCell>
                  <CTableHeaderCell>Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {puntajes.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan={5} className="text-center">No hay puntajes.</CTableDataCell>
                  </CTableRow>
                ) : (
                  puntajes.map(p => (
                    <CTableRow key={p.id_resultado}>
                      <CTableDataCell>{p.enunciado}</CTableDataCell>
                      <CTableDataCell>{p.nombre_leccion}</CTableDataCell>
                      <CTableDataCell>{p.nombre_modulo}</CTableDataCell>
                      <CTableDataCell>{p.puntaje}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="warning" size="sm" onClick={() => handleEdit(p)}>Editar</CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                )}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modal editar puntaje */}
      <CModal visible={editModal} onClose={() => setEditModal(false)}>
        <CModalHeader closeButton>Editar Puntaje</CModalHeader>
        <CModalBody>
          <form onSubmit={handleSaveEdit}>
            <CFormInput
              label="Nuevo puntaje"
              type="number"
              min={0}
              max={100}
              value={puntajeEdit.puntaje}
              onChange={e => setPuntajeEdit({ ...puntajeEdit, puntaje: e.target.value })}
              required
            />
            <div className="mt-3 d-flex justify-content-end">
              <CButton color="secondary" className="me-2" onClick={() => setEditModal(false)}>Cancelar</CButton>
              <CButton color="info" type="submit" className="text-white">Guardar</CButton>
            </div>
          </form>
        </CModalBody>
      </CModal>
    </CRow>
  );
}