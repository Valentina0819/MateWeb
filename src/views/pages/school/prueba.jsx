import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CForm,
  CButton,
  CAlert,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CPagination,
  CPaginationItem,
} from '@coreui/react'

function shuffle(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

function formatFecha(fecha) {
  if (!fecha) return ''
  return fecha.split('T')[0]
}

function generarDistractores(correcta) {
  if (!isNaN(Number(correcta))) {
    const numCorrecta = Number(correcta)
    const distractores = new Set()
    while (distractores.size < 3) {
      let val = numCorrecta + Math.floor(Math.random() * 10) - 5
      if (val !== numCorrecta && val >= 0) distractores.add(val.toString())
    }
    return Array.from(distractores)
  }

  const palabras = [
    'Sol',
    'Luna',
    'Agua',
    'Fuego',
    'Tierra',
    'Viento',
    'Azul',
    'Rojo',
    'Verde',
    'Amarillo',
    'Perro',
    'Gato',
    'Casa',
    'Arbol',
    'Libro',
    'Mesa',
    'Silla',
    'Cielo',
  ]

  const distractores = new Set()
  while (distractores.size < 3) {
    let palabra = palabras[Math.floor(Math.random() * palabras.length)]
    if (palabra.toLowerCase() !== correcta.toLowerCase()) distractores.add(palabra)
  }
  return Array.from(distractores)
}

export default function ResponderEjercicioAlumno() {
  const usuario = JSON.parse(localStorage.getItem('usuario'))
  const id_usuario = usuario?.id_usuario

  const [ejercicios, setEjercicios] = useState([])
  const [respondidos, setRespondidos] = useState([])
  const [form, setForm] = useState({ id_ejercicio: '', respuesta_usuario: '' })
  const [opciones, setOpciones] = useState([])
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('success')
  const [pagina, setPagina] = useState(1)

  const ejerciciosPorPagina = 5

  useEffect(() => {
    if (id_usuario) {
      fetch(`https://mateweb-production.up.railway.app/obtenerejercicios/${id_usuario}`)
        .then((res) => res.json())
        .then(setEjercicios)

      fetch(`https://mateweb-production.up.railway.app/resultadosejercicios`)
        .then((res) => res.json())
        .then((data) => setRespondidos(data.filter((r) => r.id_usuario === id_usuario)))
    }
  }, [id_usuario, mensaje])

  const ejerciciosPendientes = ejercicios.filter(
    (ej) => !respondidos.some((r) => Number(r.id_ejercicio) === Number(ej.id_ejercicio)),
  )

  const handleEjercicioChange = (e) => {
    const id_ejercicio = e.target.value
    setForm({ id_ejercicio, respuesta_usuario: '' })

    const ejercicio = ejerciciosPendientes.find(
      (ej) => String(ej.id_ejercicio) === String(id_ejercicio),
    )

    if (!ejercicio) return setOpciones([])

    const correcta = ejercicio.respuesta_correcta?.trim()
    let opcionesGeneradas = []

    if (
      correcta?.toLowerCase() === 'verdadero' ||
      correcta?.toLowerCase() === 'falso' ||
      ejercicio.enunciado.toLowerCase().includes('verdadero')
    ) {
      opcionesGeneradas = shuffle(['Verdadero', 'Falso'])
    } else {
      opcionesGeneradas = shuffle([correcta, ...generarDistractores(correcta)])
    }

    setOpciones(opcionesGeneradas)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje('')

    if (!form.id_ejercicio || !form.respuesta_usuario) {
      setMensaje('Selecciona un ejercicio y una respuesta.')
      setTipoMensaje('danger')
      return
    }

    try {
      const res = await fetch('https://mateweb-production.up.railway.app/responder-ejercicio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, id_usuario }),
      })

      if (res.ok) {
        setMensaje('¡Respuesta enviada correctamente!')
        setTipoMensaje('success')
        setForm({ id_ejercicio: '', respuesta_usuario: '' })
        setOpciones([])
      } else {
        setMensaje('Error al enviar la respuesta')
        setTipoMensaje('danger')
      }
    } catch {
      setMensaje('Error de conexion')
      setTipoMensaje('danger')
    }
  }

  const totalPaginas = Math.ceil(respondidos.length / ejerciciosPorPagina)
  const respondidosPagina = respondidos.slice(
    (pagina - 1) * ejerciciosPorPagina,
    pagina * ejerciciosPorPagina,
  )

  const ejercicioSeleccionado = ejerciciosPendientes.find(
    (ej) => String(ej.id_ejercicio) === String(form.id_ejercicio),
  )

  return (
    <CRow className="justify-content-center">
      <CCol md={9} className="my-5">
        {/* RESPONDER */}
        <CCard className="mb-4 shadow-sm" style={{ borderRadius: 18 }}>
          <CCardBody>
            <div className="d-flex align-items-center gap-2 mb-4">
              <div
                style={{
                  background: '#4f46e5',
                  color: 'white',
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                }}
              ></div>
              <h5 className="mb-0 fw-semibold">Responder Ejercicio</h5>
            </div>

            {mensaje && <CAlert color={tipoMensaje}>{mensaje}</CAlert>}

            <CForm onSubmit={handleSubmit}>
              <select
                className="form-select mb-4"
                value={form.id_ejercicio}
                onChange={handleEjercicioChange}
              >
                <option value="">Seleccione un ejercicio</option>
                {ejerciciosPendientes.map((ej) => (
                  <option key={ej.id_ejercicio} value={ej.id_ejercicio}>
                    {ej.enunciado} ({ej.nombre_leccion})
                  </option>
                ))}
              </select>

              {ejercicioSeleccionado && (
                <>
                  <div className="fw-semibold mb-3">{ejercicioSeleccionado.enunciado}</div>
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {opciones.map((op, idx) => (
                      <CButton
                        key={idx}
                        type="button"
                        variant="outline"
                        color={form.respuesta_usuario === op ? 'success' : 'secondary'}
                        onClick={() => setForm((f) => ({ ...f, respuesta_usuario: op }))}
                        style={{ borderRadius: 12 }}
                      >
                        {op}
                      </CButton>
                    ))}
                  </div>
                </>
              )}

              <div className="text-end">
                <CButton
                  type="submit"
                  disabled={!form.id_ejercicio || !form.respuesta_usuario}
                  style={{
                    background: '#0f172a',
                    color: 'white',
                    borderRadius: 10,
                    padding: '10px 24px',
                    border: 'none',
                  }}
                >
                  Enviar respuesta
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>

        {/* RESPONDIDOS */}
        <CCard className="shadow-sm" style={{ borderRadius: 18 }}>
          <CCardBody>
            <h6 className="fw-semibold mb-3">Ejercicios Respondidos</h6>

            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Enunciado</CTableHeaderCell>
                  <CTableHeaderCell>Respuesta</CTableHeaderCell>
                  <CTableHeaderCell>Puntaje</CTableHeaderCell>
                  <CTableHeaderCell>Fecha</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {respondidosPagina.map((r) => (
                  <CTableRow key={r.id_resultado}>
                    <CTableDataCell>{r.enunciado}</CTableDataCell>
                    <CTableDataCell>{r.respuesta_usuario}</CTableDataCell>
                    <CTableDataCell className="fw-semibold">{r.puntaje}</CTableDataCell>
                    <CTableDataCell>{formatFecha(r.fecha_realizacion)}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            {totalPaginas > 1 && (
              <CPagination className="justify-content-center mt-3">
                {[...Array(totalPaginas)].map((_, i) => (
                  <CPaginationItem
                    key={i}
                    active={pagina === i + 1}
                    onClick={() => setPagina(i + 1)}
                  >
                    {i + 1}
                  </CPaginationItem>
                ))}
              </CPagination>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
