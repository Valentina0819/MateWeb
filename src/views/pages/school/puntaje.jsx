import React, { useEffect, useState } from 'react';
import {
  CCard, CCardBody, CCardHeader, CForm, CFormInput, CButton,
  CAlert, CRow, CCol, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell
} from '@coreui/react';

export default function GestionNotas() {
  const [cursos, setCursos] = useState([]);
  const [cursoSel, setCursoSel] = useState('');
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudianteSel, setEstudianteSel] = useState('');
  const [resultados, setResultados] = useState([]);
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [evaluacionSel, setEvaluacionSel] = useState('');
  const [nota, setNota] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('success');
  const [notasRegistradas, setNotasRegistradas] = useState([]);

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
      fetch(`http://localhost:4000/evaluaciones-modulo/${cursoSel}`)
        .then(res => res.json())
        .then(setEvaluaciones);
    } else {
      setEstudiantes([]);
      setEvaluaciones([]);
    }
    setEstudianteSel('');
    setResultados([]);
    setEvaluacionSel('');
    setNota('');
  }, [cursoSel]);

  useEffect(() => {
    if (estudianteSel && cursoSel) {
      fetch(`http://localhost:4000/resultados-ejercicios/${estudianteSel}/${cursoSel}`)
        .then(res => res.json())
        .then(setResultados);
    } else {
      setResultados([]);
    }
  }, [estudianteSel, cursoSel]);

  useEffect(() => {
    if (estudianteSel && cursoSel) {
      fetch(`http://localhost:4000/notas-registradas/${estudianteSel}/${cursoSel}`)
        .then(res => res.json())
        .then(setNotasRegistradas);
    } else {
      setNotasRegistradas([]);
    }
  }, [estudianteSel, cursoSel]);

  const handleRegistrarNota = async (e) => {
    e.preventDefault();
    setMensaje('');
    setTipoMensaje('success');
    if (notasRegistradas.length > 0) {
      setMensaje('Ya se ha asignado una nota a este estudiante en este curso.');
      setTipoMensaje('danger');
      return;
    }
    if (!estudianteSel || !nota) {
      setMensaje('Completa todos los campos.');
      setTipoMensaje('danger');
      return;
    }
    try {
      const res = await fetch('http://localhost:4000/registrar-nota-evaluacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_usuario: estudianteSel,
          nota_final: nota,
          id_curso: cursoSel
        })
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje('¡Nota registrada correctamente!');
        setNota('');
        setNotasRegistradas([{ id_usuario: estudianteSel }]);
      } else {
        setMensaje(data.mensaje || 'Error al registrar la nota');
        setTipoMensaje('danger');
      }
    } catch {
      setMensaje('Error de conexión');
      setTipoMensaje('danger');
    }
  };

  // Imprimir PDF
  const handleImprimirPDF = () => {
    if (!estudianteSel || !cursoSel) return;
    window.open(`http://localhost:4000/imprimir-lecciones/${estudianteSel}/${cursoSel}`, '_blank');
  };

  return (
    <CRow className="justify-content-center">
      <CCol md={10}>
        <CCard className="mb-4">
          <CCardHeader style={{ background: '#070145', color: 'white' }}>Gestión de Notas Finales</CCardHeader>
          <CCardBody>
            {mensaje && <CAlert color={tipoMensaje}>{mensaje}</CAlert>}
            <CForm onSubmit={handleRegistrarNota}>
              <CRow className="mb-3">
                <CCol md={4}>
                  <select
                    className="form-select"
                    value={cursoSel}
                    onChange={e => setCursoSel(e.target.value)}
                    required
                  >
                    <option value="">Seleccione un curso</option>
                    {cursos.map(c => (
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
                    {estudiantes.map(e => (
                      <option key={e.id_usuario} value={e.id_usuario}>
                        {e.nombre} {e.apellido} ({e.email})
                      </option>
                    ))}
                  </select>
                </CCol>
                <CCol md={4}>
                  <select
                    className="form-select"
                    value={evaluacionSel}
                    onChange={e => setEvaluacionSel(e.target.value)}
                    required
                  >
                    <option value="">Seleccione evaluación</option>
                    {evaluaciones.map(ev => (
                      <option key={ev.id_evaluacion} value={ev.id_evaluacion}>
                        {ev.nombre_evaluacion}
                      </option>
                    ))}
                  </select>
                </CCol>
              </CRow>
              
            </CForm>
            <div className="d-flex justify-content-end mb-2">
              <CButton
                color="info"
                className="text-white"
                onClick={handleImprimirPDF}
                disabled={!estudianteSel || !cursoSel}
              >
                Imprimir Lecciones y Ejercicios
              </CButton>
            </div>
            <h5 className="mt-4">Resultados de ejercicios del estudiante</h5>
            <CTable striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Enunciado</CTableHeaderCell>
                  <CTableHeaderCell>Lección</CTableHeaderCell>
                  <CTableHeaderCell>Módulo</CTableHeaderCell>
                  <CTableHeaderCell>Respuesta estudiante</CTableHeaderCell>
                  <CTableHeaderCell>Respuesta correcta</CTableHeaderCell>
                  <CTableHeaderCell>Puntaje</CTableHeaderCell>
                  <CTableHeaderCell>Fecha</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {resultados.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan={7} className="text-center">No hay resultados.</CTableDataCell>
                  </CTableRow>
                ) : (
                  resultados.map(r => (
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
  );
}