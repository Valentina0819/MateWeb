import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CButton,
  CRow,
  CCol,
  CAlert,
  CBadge,
  CContainer,
  CCardHeader,
} from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilSave } from '@coreui/icons'
// --- Lógica de la sopa de números ---

function generarMatriz(n = 10) {
  return Array.from({ length: n }, () =>
    Array.from({ length: n }, () => Math.floor(Math.random() * 10)),
  )
}

function insertarObjetivos(matriz, objetivos) {
  const n = matriz.length
  const nuevaMatriz = matriz.map((row) => [...row])
  const posiciones = []

  objetivos.forEach((objetivo) => {
    const str = objetivo.toString()
    let colocado = false
    let intentos = 0

    while (!colocado && intentos < 100) {
      const direccion = Math.random() < 0.33 ? 'H' : Math.random() < 0.66 ? 'V' : 'D'
      const fila = Math.floor(Math.random() * n)
      const col = Math.floor(Math.random() * n)
      let cabe = true

      if (direccion === 'H' && col + str.length <= n) {
        for (let i = 0; i < str.length; i++) {
          if (posiciones.some((p) => p.fila === fila && p.col === col + i)) {
            cabe = false
            break
          }
        }
        if (cabe) {
          for (let i = 0; i < str.length; i++) {
            nuevaMatriz[fila][col + i] = Number(str[i])
            posiciones.push({ fila, col: col + i, objetivo, idx: i })
          }
          colocado = true
        }
      } else if (direccion === 'V' && fila + str.length <= n) {
        for (let i = 0; i < str.length; i++) {
          if (posiciones.some((p) => p.fila === fila + i && p.col === col)) {
            cabe = false
            break
          }
        }
        if (cabe) {
          for (let i = 0; i < str.length; i++) {
            nuevaMatriz[fila + i][col] = Number(str[i])
            posiciones.push({ fila: fila + i, col, objetivo, idx: i })
          }
          colocado = true
        }
      } else if (direccion === 'D' && fila + str.length <= n && col + str.length <= n) {
        for (let i = 0; i < str.length; i++) {
          if (posiciones.some((p) => p.fila === fila + i && p.col === col + i)) {
            cabe = false
            break
          }
        }
        if (cabe) {
          for (let i = 0; i < str.length; i++) {
            nuevaMatriz[fila + i][col + i] = Number(str[i])
            posiciones.push({ fila: fila + i, col: col + i, objetivo, idx: i })
          }
          colocado = true
        }
      }
      intentos++
    }
  })

  return { matriz: nuevaMatriz, posiciones }
}

// Paleta de colores para los números encontrados
const colores = [
  '#f52222ff', // rojo
  '#016becff', // azul
  '#0ef19eff', // verde
  '#e9aa0cff', // amarillo
  '#5c2af3ff', // violeta
  '#fb7185ff', // rosa
  '#38bdf8ff', // celeste
  '#f472b6ff', // fucsia
  '#facc15ff', // dorado
  '#4ade80ff', // verde claro
]

// Configuración de niveles
const NIVELES = [
  { objetivos: [125, 347, 892, 456], size: 8 },
  { objetivos: [321, 789, 654, 987, 210], size: 9 },
  { objetivos: [159, 753, 951, 357, 258, 654], size: 10 },
  { objetivos: [1234, 5678, 4321, 8765], size: 10 },
  { objetivos: [2468, 1357, 8642, 7531, 4826], size: 11 },
]

const SopaNumerosInteractiva = () => {
  const [nivel, setNivel] = useState(0)
  const [matriz, setMatriz] = useState([])
  const [seleccion, setSeleccion] = useState([]) // [{fila, col, valor}]
  const [encontrados, setEncontrados] = useState([]) // [{objetivo, celdas: [{fila, col}], color, correcto}]
  const [puntos, setPuntos] = useState(0)
  const [mensaje, setMensaje] = useState('')
  const [finalizado, setFinalizado] = useState(false)
  const [objetivos, setObjetivos] = useState(NIVELES[0].objetivos)
  const [size, setSize] = useState(NIVELES[0].size)
  const [respuestas, setRespuestas] = useState([]) // [{celdas, valor, color}]
  const [evaluado, setEvaluado] = useState(false)

  // Inicializa la sopa de números para el nivel actual
  useEffect(() => {
    const matrizAleatoria = generarMatriz(size)
    insertarObjetivos(matrizAleatoria, objetivos)
    const { matriz: matrizConObjetivos } = insertarObjetivos(matrizAleatoria, objetivos)
    setMatriz(matrizConObjetivos)
    setSeleccion([])
    setEncontrados([])
    setMensaje('')
    setFinalizado(false)
    setRespuestas([])
    setEvaluado(false)
  }, [nivel, objetivos, size])

  // Permite seleccionar celdas en línea recta (horizontal, vertical o diagonal)
  const esSeleccionValida = (fila, col) => {
    if (seleccion.length === 0) return true
    const { fila: f0, col: c0 } = seleccion[0]
    // Debe estar en la misma fila, columna o diagonal
    if (!(fila === f0 || col === c0 || Math.abs(fila - f0) === Math.abs(col - c0))) return false
    // Debe ser adyacente a la última seleccionada
    const { fila: flast, col: clast } = seleccion[seleccion.length - 1]
    if (
      (Math.abs(fila - flast) === 1 && col === clast) ||
      (Math.abs(col - clast) === 1 && fila === flast) ||
      (Math.abs(fila - flast) === 1 && Math.abs(col - clast) === 1)
    ) {
      return true
    }
    return false
  }

  const azulProfundo = '#070145'

  // Permite seleccionar celdas ya encontradas si coinciden con el número buscado
  const handleSeleccion = (fila, col) => {
    const yaSeleccionada = seleccion.some((cell) => cell.fila === fila && cell.col === col)
    if (yaSeleccionada) {
      // Permitir deseleccionar la última seleccionada
      if (
        seleccion.length > 0 &&
        seleccion[seleccion.length - 1].fila === fila &&
        seleccion[seleccion.length - 1].col === col
      ) {
        setSeleccion(seleccion.slice(0, -1))
      }
      return
    }
    if (!esSeleccionValida(fila, col)) return
    setSeleccion([...seleccion, { fila, col, valor: matriz[fila][col] }])
  }

  // Deselecciona todo
  const limpiarSeleccion = () => setSeleccion([])

  // Guarda la selección como un intento de respuesta y la marca con color
  const guardarRespuesta = () => {
    if (seleccion.length < 2) {
      setMensaje('Selecciona al menos dos celdas.')
      return
    }
    // Asigna color según el orden de guardado
    const color = colores[respuestas.length % colores.length]
    setRespuestas([
      ...respuestas,
      { celdas: [...seleccion], valor: seleccion.map((c) => c.valor).join(''), color },
    ])
    setSeleccion([])
    setMensaje('')
  }

  // Evalúa todas las respuestas guardadas
  const evaluarActividad = () => {
    let aciertos = 0
    let nuevosEncontrados = []
    const usados = new Set()
    respuestas.forEach((resp, idx) => {
      const idxObjetivo = objetivos.findIndex(
        (obj, i) => obj.toString() === resp.valor && !usados.has(i),
      )
      if (idxObjetivo !== -1) {
        aciertos++
        usados.add(idxObjetivo)
        nuevosEncontrados.push({
          objetivo: objetivos[idxObjetivo],
          celdas: resp.celdas,
          color: resp.color,
          correcto: true,
        })
      } else {
        nuevosEncontrados.push({
          objetivo: resp.valor,
          celdas: resp.celdas,
          color: resp.color,
          correcto: false,
        })
      }
    })
    setEncontrados(nuevosEncontrados)
    setEvaluado(true)
    const puntosNivel = Math.round((aciertos / objetivos.length) * 10)
    setPuntos(puntos + puntosNivel)
    if (nivel + 1 < NIVELES.length) {
      setMensaje(
        `Nivel completado. Aciertos: ${aciertos}/${objetivos.length}. Puntuación: ${puntosNivel}/10. Haz clic en "Siguiente Nivel".`,
      )
    } else {
      setFinalizado(true)
      setMensaje(
        `¡Felicidades! Completaste todos los niveles. Puntuación final: ${puntos + puntosNivel}`,
      )
    }
  }

  // Siguiente nivel
  const siguienteNivel = () => {
    if (nivel + 1 < NIVELES.length) {
      setNivel(nivel + 1)
      setObjetivos(NIVELES[nivel + 1].objetivos)
      setSize(NIVELES[nivel + 1].size)
      setPuntos(puntos)
      setMensaje('')
      setRespuestas([])
      setEvaluado(false)
    }
  }

  // Renderiza la matriz de botones
  const renderMatriz = () => (
    <table style={{ borderCollapse: 'collapse', margin: '0 auto' }}>
      <tbody>
        {matriz.map((fila, i) => (
          <tr key={i}>
            {fila.map((num, j) => {
              // ¿Esta celda está seleccionada?
              const estaSeleccionada = seleccion.some((cell) => cell.fila === i && cell.col === j)
              // ¿Esta celda ya fue marcada como parte de una respuesta guardada?
              let colorFondo = '#fff'
              let colorTexto = '#222'
              let correcto = false
              // Busca en respuestas guardadas (antes de evaluar)
              const respIdx = respuestas.findIndex((r) =>
                r.celdas.some((cell) => cell.fila === i && cell.col === j),
              )
              if (respIdx !== -1) {
                colorFondo = respuestas[respIdx].color
                colorTexto = '#fff'
              }
              // Busca en encontrados (después de evaluar)
              if (evaluado) {
                const encontradoIdx = encontrados.findIndex((e) =>
                  e.celdas.some((cell) => cell.fila === i && cell.col === j),
                )
                if (encontradoIdx !== -1) {
                  colorFondo = encontrados[encontradoIdx].color
                  colorTexto = encontrados[encontradoIdx].correcto ? '#fff' : '#222'
                  correcto = encontrados[encontradoIdx].correcto
                }
              }
              if (estaSeleccionada) colorFondo = '#38bdf8'
              return (
                <td key={j} style={{ padding: 0 }}>
                  <CButton
                    color="light"
                    style={{
                      width: 28,
                      height: 28,
                      minWidth: 28,
                      minHeight: 28,
                      fontSize: 14,
                      fontWeight: 'bold',
                      border: '1px solid #bbb',
                      borderRadius: 4,
                      margin: 1,
                      background: colorFondo,
                      color: colorTexto,
                      boxShadow: estaSeleccionada ? '0 0 4px #38bdf8' : undefined,
                      cursor: finalizado ? 'not-allowed' : 'pointer',
                      padding: 0,
                    }}
                    disabled={finalizado}
                    onClick={() => handleSeleccion(i, j)}
                  >
                    {num}
                  </CButton>
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )

  return (
    <CContainer fluid className="py-4">
      <CRow className="justify-content-center">
        <CCol xs={12} sm={11} md={9} lg={7} xl={6}>
          <CCard
            className="custom-card border-0 shadow-lg"
            style={{ borderRadius: '24px', overflow: 'hidden' }}
          >
            {/* Cabecera con Degradado */}
            <CCardHeader className="text-white border-0 py-4" style={{ background: azulProfundo }}>
              <h3 className="fw-bold text-center mb-0" style={{ letterSpacing: '1px' }}>
                SOPA DE NÚMEROS
              </h3>
            </CCardHeader>

            <CCardBody className="p-4" style={{ backgroundColor: '#ffffff' }}>
              {/* Status Bar: Puntos y Nivel */}
              <div
                className="d-flex justify-content-between align-items-center mb-4 p-3"
                style={{ backgroundColor: '#ffffffff', borderRadius: '16px' }}
              >
                <div className="d-flex align-items-center">
                  <span className="fw-bold text-primary me-2">PUNTOS:</span>
                  <CBadge color="primary" shape="rounded-pill" className="px-3 py-2 fs-6 shadow-sm">
                    {puntos}
                  </CBadge>
                </div>
                <div className="d-flex align-items-center">
                  <span className="fw-bold text-info me-2">NIVEL:</span>
                  <CBadge
                    color="info"
                    shape="rounded-pill"
                    className="text-white px-3 py-2 fs-6 shadow-sm"
                  >
                    {nivel + 1} / {NIVELES.length}
                  </CBadge>
                </div>
              </div>

              {/* Números a encontrar - Estilo Chips */}
              <div className="text-center mb-2 small fw-bold text-muted text-uppercase">
                Objetivos:
              </div>
              <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
                {objetivos.map((n, i) => {
                  const idx = encontrados.findIndex((e) => e.objetivo === n && e.correcto)
                  return (
                    <CBadge
                      key={i}
                      style={{
                        background: idx !== -1 ? encontrados[idx].color : '#f1f5f9',
                        color: idx !== -1 ? '#fff' : '#64748b',
                        borderRadius: '8px',
                        padding: '10px 15px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        transition: '0.3s',
                        border: idx !== -1 ? 'none' : '1px solid #e2e8f0',
                      }}
                    >
                      {n}
                    </CBadge>
                  )
                })}
              </div>

              {/* Matriz de números - Estilo Game Board */}
              <div className="mb-4 d-flex justify-content-center overflow-auto py-2">
                <table style={{ borderCollapse: 'separate', borderSpacing: '6px' }}>
                  <tbody>
                    {matriz.map((fila, i) => (
                      <tr key={i}>
                        {fila.map((num, j) => {
                          const estaSeleccionada = seleccion.some(
                            (cell) => cell.fila === i && cell.col === j,
                          )
                          let colorFondo = '#ffffff'
                          let colorTexto = '#1e293b'
                          let bColor = '#e2e8f0'

                          const respIdx = respuestas.findIndex((r) =>
                            r.celdas.some((cell) => cell.fila === i && cell.col === j),
                          )
                          if (respIdx !== -1) {
                            colorFondo = respuestas[respIdx].color
                            colorTexto = '#fff'
                            bColor = 'transparent'
                          }

                          if (evaluado) {
                            const encontradoIdx = encontrados.findIndex((e) =>
                              e.celdas.some((cell) => cell.fila === i && cell.col === j),
                            )
                            if (encontradoIdx !== -1) {
                              colorFondo = encontrados[encontradoIdx].color
                              colorTexto = encontrados[encontradoIdx].correcto ? '#fff' : '#1e293b'
                              bColor = 'transparent'
                            }
                          }

                          if (estaSeleccionada) {
                            colorFondo = '#38bdf8'
                            colorTexto = '#fff'
                            bColor = '#0ea5e9'
                          }

                          return (
                            <td key={j}>
                              <CButton
                                onClick={() => handleSeleccion(i, j)}
                                disabled={finalizado}
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  fontSize: '1.1rem',
                                  fontWeight: '800',
                                  borderRadius: '10px',
                                  backgroundColor: colorFondo,
                                  color: colorTexto,
                                  border: `2px solid ${bColor}`,
                                  boxShadow: estaSeleccionada
                                    ? '0 0 12px rgba(56, 189, 248, 0.5)'
                                    : 'none',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  padding: 0,
                                  transition: 'all 0.1s ease',
                                }}
                              >
                                {num}
                              </CButton>
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Controles Principales */}
              <div className="d-grid gap-3 d-md-flex justify-content-center mb-4">
                <CButton
                  className="text-white px-4 py-2 fw-bold shadow-sm"
                  disabled={seleccion.length === 0 || finalizado || evaluado}
                  onClick={guardarRespuesta}
                  style={{ borderRadius: '12px', backgroundColor: '#5900ffff' }}
                >
                  <CIcon icon={cilSave} className="me-2" /> Guardar
                </CButton>

                <CButton
                  color="dark"
                  variant="outline"
                  className="px-4 py-2"
                  disabled={seleccion.length === 0 || finalizado || evaluado}
                  onClick={limpiarSeleccion}
                >
                  Limpiar
                </CButton>

                <CButton
                  className="text-white px-4 py-2 fw-bold shadow-sm"
                  disabled={respuestas.length === 0 || finalizado || evaluado}
                  onClick={evaluarActividad}
                  style={{ borderRadius: '12px', backgroundColor: ' #0011ffff' }}
                >
                  Completar
                </CButton>
              </div>

              {/* Botones de Acción Secundaria */}
              <div className="d-flex justify-content-center gap-2 mb-3">
                <CButton
                  variant="ghost"
                  color="dark"
                  size="sm"
                  onClick={() => window.location.reload()}
                >
                  Reiniciar Juego
                </CButton>
                {evaluado && !finalizado && (
                  <CButton
                    color="primary"
                    size="sm"
                    className="fw-bold px-4"
                    onClick={siguienteNivel}
                    style={{ borderRadius: '10px', backgroundColor: '#070145', color: 'white' }}
                  >
                    Siguiente Nivel ➔
                  </CButton>
                )}
              </div>

              {/* Mensajes de Alerta */}
              {mensaje && (
                <CAlert
                  color={finalizado ? 'success' : mensaje.startsWith('Nivel') ? 'info' : 'warning'}
                  className="text-center fw-bold border-0 shadow-sm mb-0"
                  style={{ borderRadius: '12px' }}
                >
                  {mensaje}
                </CAlert>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default SopaNumerosInteractiva
