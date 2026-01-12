import React, { useEffect, useState } from 'react';
import {
  CCard, CCardBody, CCardHeader, CForm, CButton,
  CAlert, CRow, CCol, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CPagination, CPaginationItem
} from '@coreui/react';

function shuffle(array) {
  return array.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function formatFecha(fecha) {
  if (!fecha) return '';
  return fecha.split('T')[0];
}

// Genera distractores aleatorios distintos a la respuesta correcta
function generarDistractores(correcta) {
  // Si la respuesta es un número, genera números aleatorios
  if (!isNaN(Number(correcta))) {
    const numCorrecta = Number(correcta);
    const distractores = new Set();
    while (distractores.size < 3) {
      let val = numCorrecta + Math.floor(Math.random() * 10) - 5;
      if (val !== numCorrecta && val >= 0) distractores.add(val.toString());
    }
    return Array.from(distractores);
  }
  // Si es texto, usa palabras aleatorias
  const palabras = [
    "Sol", "Luna", "Agua", "Fuego", "Tierra", "Viento", "Azul", "Rojo", "Verde", "Amarillo",
    "Perro", "Gato", "Casa", "Árbol", "Libro", "Mesa", "Silla", "Cielo", "Flor", "Río"
  ];
  const distractores = new Set();
  while (distractores.size < 3) {
    let palabra = palabras[Math.floor(Math.random() * palabras.length)];
    if (palabra.toLowerCase() !== correcta.toLowerCase()) distractores.add(palabra);
  }
  return Array.from(distractores);
}

export default function ResponderEjercicioAlumno() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const id_usuario = usuario?.id_usuario;
  const [ejercicios, setEjercicios] = useState([]);
  const [form, setForm] = useState({ id_ejercicio: '', respuesta_usuario: '' });
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('success');
  const [respondidos, setRespondidos] = useState([]);
  const [opciones, setOpciones] = useState([]);
  const [pagina, setPagina] = useState(1);
  const ejerciciosPorPagina = 5;

  useEffect(() => {
    if (id_usuario) {
      fetch(`http://localhost:4000/obtenerejercicios/${id_usuario}`)
        .then(res => res.json())
        .then(data => setEjercicios(data));
      fetch(`http://localhost:4000/resultadosejercicios`)
        .then(res => res.json())
        .then(data => setRespondidos(data.filter(r => r.id_usuario === id_usuario)));
    }
  }, [id_usuario, mensaje]);

  // Filtra ejercicios no respondidos
  const ejerciciosPendientes = ejercicios.filter(
    ej => !respondidos.some(r => Number(r.id_ejercicio) === Number(ej.id_ejercicio))
  );

  // Cuando el usuario selecciona un ejercicio, genera opciones
  const handleEjercicioChange = (e) => {
    const id_ejercicio = e.target.value;
    setForm({ id_ejercicio, respuesta_usuario: '' });
    const ejercicio = ejerciciosPendientes.find(ej => String(ej.id_ejercicio) === String(id_ejercicio));
    if (ejercicio) {
      let opcionesGeneradas = [];
      const correcta = ejercicio.respuesta_correcta?.trim();
      // Si es verdadero/falso
      if (
        (correcta?.toLowerCase() === "verdadero" || correcta?.toLowerCase() === "falso") ||
        ejercicio.enunciado.toLowerCase().includes("verdadero") ||
        ejercicio.enunciado.toLowerCase().includes("falso")
      ) {
        opcionesGeneradas = shuffle(["Verdadero", "Falso"]);
      } else {
        // Distractores aleatorios
        const distractores = generarDistractores(correcta);
        opcionesGeneradas = shuffle([correcta, ...distractores]);
      }
      setOpciones(opcionesGeneradas);
    } else {
      setOpciones([]);
    }
  };

  const handleOpcionClick = (opcion) => {
    setForm(f => ({ ...f, respuesta_usuario: opcion }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setTipoMensaje('success');
    if (!form.id_ejercicio || !form.respuesta_usuario) {
      setMensaje('Selecciona un ejercicio y una respuesta.');
      setTipoMensaje('danger');
      return;
    }
    try {
      const res = await fetch('http://localhost:4000/responder-ejercicio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, id_usuario })
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje('¡Respuesta enviada correctamente!');
        setForm({ id_ejercicio: '', respuesta_usuario: '' });
        setOpciones([]);
      } else {
        setMensaje(data.mensaje || 'Error al responder el ejercicio');
        setTipoMensaje('danger');
      }
    } catch {
      setMensaje('Error de conexión');
      setTipoMensaje('danger');
    }
  };

  // Paginación
  const totalPaginas = Math.ceil(respondidos.length / ejerciciosPorPagina);
  const respondidosPagina = respondidos.slice(
    (pagina - 1) * ejerciciosPorPagina,
    pagina * ejerciciosPorPagina
  );

  // Muestra el ejercicio seleccionado
  const ejercicioSeleccionado = ejerciciosPendientes.find(
    ej => String(ej.id_ejercicio) === String(form.id_ejercicio)
  );

  return (
    <CRow className="justify-content-center align-items-center" style={{ minHeight: '100vh', background: '#f4f8fb' }}>
      <CCol md={8}>
        <CCard className="mb-4 shadow-lg" style={{ borderRadius: 20 }}>
          <CCardHeader className="bg-info text-white fw-bold text-center" style={{ fontSize: 24, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            Responder Ejercicio
          </CCardHeader>
          <CCardBody className="d-flex flex-column align-items-center">
            {mensaje && <CAlert color={tipoMensaje} className="w-100 text-center">{mensaje}</CAlert>}
            <CForm onSubmit={handleSubmit} className="w-100">
              <CRow className="mb-4 justify-content-center">
                <CCol md={10}>
                  <select
                    className="form-select text-center"
                    style={{ fontSize: 18, borderRadius: 10 }}
                    value={form.id_ejercicio}
                    onChange={handleEjercicioChange}
                    required
                  >
                    <option value="">Seleccione un ejercicio</option>
                    {ejerciciosPendientes.map(ej => (
                      <option key={ej.id_ejercicio} value={ej.id_ejercicio}>
                        {ej.enunciado} ({ej.nombre_leccion} - {ej.nombre_curso})
                      </option>
                    ))}
                  </select>
                </CCol>
              </CRow>
              {ejercicioSeleccionado && (
                <div className="mb-4 text-center">
                  <div className="fw-bold mb-3" style={{ fontSize: 22, color: '#114c5f' }}>
                    {ejercicioSeleccionado.enunciado}
                  </div>
                  <div className="d-flex flex-wrap justify-content-center">
                    {opciones.map((op, idx) => (
                      <CButton
                        key={idx}
                        color={form.respuesta_usuario === op ? "success" : "secondary"}
                        className="me-2 mb-2 px-4 py-2"
                        variant="outline"
                        style={{
                          fontSize: 18,
                          borderRadius: 12,
                          minWidth: 120,
                          boxShadow: form.respuesta_usuario === op ? '0 0 10px #198754' : 'none',
                          fontWeight: form.respuesta_usuario === op ? 'bold' : 'normal'
                        }}
                        onClick={() => handleOpcionClick(op)}
                        type="button"
                      >
                        {op}
                      </CButton>
                    ))}
                  </div>
                </div>
              )}
              <div className="text-center">
                <CButton
                  color="info"
                  type="submit"
                  className="text-white fw-bold px-5 py-2"
                  style={{ fontSize: 18, borderRadius: 10 }}
                  disabled={!form.id_ejercicio || !form.respuesta_usuario}
                >
                  Enviar Respuesta
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
        <CCard className="shadow-lg" style={{ borderRadius: 20 }}>
          <CCardHeader className="bg-success text-white fw-bold text-center" style={{ fontSize: 22, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            Ejercicios Respondidos
          </CCardHeader>
          <CCardBody>
            <CTable striped hover align="middle" className="text-center">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Enunciado</CTableHeaderCell>
                  <CTableHeaderCell>Respuesta</CTableHeaderCell>
                  <CTableHeaderCell>Puntaje (1-20)</CTableHeaderCell>
                  <CTableHeaderCell>Fecha</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {respondidosPagina.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan={4} className="text-center">Aún no has respondido ejercicios.</CTableDataCell>
                  </CTableRow>
                ) : (
                  respondidosPagina.map(r => (
                    <CTableRow key={r.id_resultado}>
                      <CTableDataCell>{r.enunciado}</CTableDataCell>
                      <CTableDataCell>{r.respuesta_usuario}</CTableDataCell>
                      <CTableDataCell>
                        <span style={{
                          color: r.puntaje >= 15 ? '#198754' : r.puntaje >= 10 ? '#ffc107' : '#dc3545',
                          fontWeight: 'bold'
                        }}>
                          {r.puntaje}
                        </span>
                      </CTableDataCell>
                      <CTableDataCell>{formatFecha(r.fecha_realizacion)}</CTableDataCell>
                    </CTableRow>
                  ))
                )}
              </CTableBody>
            </CTable>
            {totalPaginas > 1 && (
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
                    disabled={pagina === totalPaginas}
                    onClick={() => setPagina(pagina + 1)}
                  >
                    &raquo;
                  </CPaginationItem>
                </CPagination>
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}