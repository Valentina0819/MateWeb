import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CButton, CRow, CCol, CAlert, CBadge } from '@coreui/react'

// --- Lógica de la sopa de números ---

function generarMatriz(n = 10) {
  return Array.from({ length: n }, () =>
    Array.from({ length: n }, () => Math.floor(Math.random() * 10))
  )
}

function insertarObjetivos(matriz, objetivos) {
  const n = matriz.length
  const nuevaMatriz = matriz.map(row => [...row])
  const posiciones = []

  objetivos.forEach(objetivo => {
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
          if (posiciones.some(p => p.fila === fila && p.col === col + i)) {
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
          if (posiciones.some(p => p.fila === fila + i && p.col === col)) {
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
          if (posiciones.some(p => p.fila === fila + i && p.col === col + i)) {
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
  '#f87171', // rojo
  '#60a5fa', // azul
  '#34d399', // verde
  '#fbbf24', // amarillo
  '#a78bfa', // violeta
  '#fb7185', // rosa
  '#38bdf8', // celeste
  '#f472b6', // fucsia
  '#facc15', // dorado
  '#4ade80', // verde claro
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

  // Permite seleccionar celdas ya encontradas si coinciden con el número buscado
  const handleSeleccion = (fila, col) => {
    const yaSeleccionada = seleccion.some(cell => cell.fila === fila && cell.col === col)
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
    setRespuestas([...respuestas, { celdas: [...seleccion], valor: seleccion.map(c => c.valor).join(''), color }])
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
        (obj, i) => obj.toString() === resp.valor && !usados.has(i)
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
        `Nivel completado. Aciertos: ${aciertos}/${objetivos.length}. Puntuación: ${puntosNivel}/10. Haz clic en "Siguiente Nivel".`
      )
    } else {
      setFinalizado(true)
      setMensaje(
        `¡Felicidades! Completaste todos los niveles. Puntuación final: ${puntos + puntosNivel}`
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
              const estaSeleccionada = seleccion.some(cell => cell.fila === i && cell.col === j)
              // ¿Esta celda ya fue marcada como parte de una respuesta guardada?
              let colorFondo = '#fff'
              let colorTexto = '#222'
              let correcto = false
              // Busca en respuestas guardadas (antes de evaluar)
              const respIdx = respuestas.findIndex(r =>
                r.celdas.some(cell => cell.fila === i && cell.col === j)
              )
              if (respIdx !== -1) {
                colorFondo = respuestas[respIdx].color
                colorTexto = '#fff'
              }
              // Busca en encontrados (después de evaluar)
              if (evaluado) {
                const encontradoIdx = encontrados.findIndex(e =>
                  e.celdas.some(cell => cell.fila === i && cell.col === j)
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
    <CRow className="justify-content-center">
      <CCol xs={12} sm={11} md={9} lg={7} xl={6}>
        <CCard className="shadow-lg p-2 mt-2" style={{ background: '#f0f9ff', minHeight: 0 }}>
          <CCardBody style={{ padding: 12 }}>
            <h5 className="fw-bold mb-2 text-center" style={{ color: '#0ea5e9', fontSize: 22 }}>
              Sopa de Números
            </h5>
            <div className="mb-1 text-center" style={{ fontSize: 15 }}>
              <CBadge color="primary" className="px-2 py-1 fs-6">
                Puntos: {puntos}
              </CBadge>
              <CBadge color="info" className="px-2 py-1 fs-6 ms-2">
                Nivel {nivel + 1} / {NIVELES.length}
              </CBadge>
            </div>
            <div className="mb-2 text-center" style={{ fontSize: 14 }}>
              <span className="fw-bold">Números a encontrar:</span>{' '}
              {objetivos.map((n, i) => {
                const idx = encontrados.findIndex(e => e.objetivo === n && e.correcto)
                return (
                  <CBadge
                    key={i}
                    style={{
                      background: idx !== -1 ? encontrados[idx].color : '#e5e7eb',
                      color: idx !== -1 ? '#fff' : '#222',
                      marginRight: 4,
                      fontSize: 14,
                      border: '1px solid #bbb',
                    }}
                  >
                    {n}
                  </CBadge>
                )
              })}
            </div>
            <div className="mb-2" style={{ overflowX: 'auto', textAlign: 'center' }}>
              {renderMatriz()}
            </div>
            <div className="d-flex justify-content-center mb-2" style={{ gap: 6 }}>
              <CButton
                color="success"
                size="sm"
                disabled={seleccion.length === 0 || finalizado || evaluado}
                onClick={guardarRespuesta}
                style={{ minWidth: 90, fontWeight: 'bold', fontSize: 13 }}
              >
                Guardar Número
              </CButton>
              <CButton
                color="secondary"
                size="sm"
                variant="outline"
                disabled={seleccion.length === 0 || finalizado || evaluado}
                onClick={limpiarSeleccion}
                style={{ minWidth: 70, fontSize: 13 }}
              >
                Limpiar
              </CButton>
              <CButton
                color="info"
                size="sm"
                disabled={respuestas.length === 0 || finalizado || evaluado}
                onClick={evaluarActividad}
                style={{ minWidth: 90, fontWeight: 'bold', fontSize: 13 }}
              >
                Completar
              </CButton>
              <CButton
                color="dark"
                size="sm"
                variant="outline"
                onClick={() => window.location.reload()}
                style={{ minWidth: 70, fontSize: 13 }}
              >
                Reiniciar
              </CButton>
              {evaluado && !finalizado && (
                <CButton
                  color="primary"
                  size="sm"
                  onClick={siguienteNivel}
                  style={{ minWidth: 110, fontWeight: 'bold', fontSize: 13 }}
                >
                  Siguiente Nivel
                </CButton>
              )}
            </div>
            {mensaje && (
              <CAlert color={finalizado ? 'success' : mensaje.startsWith('Nivel') ? 'info' : 'warning'} className="text-center mt-2 py-2" style={{ fontSize: 14 }}>
                {mensaje}
              </CAlert>
            )}
            {evaluado && (
              <div className="mt-2" style={{ fontSize: 13 }}>
                <b>Respuestas:</b>
                <ul style={{ paddingLeft: 18 }}>
                  {encontrados.map((e, idx) => (
                    <li key={idx} style={{ color: e.correcto ? e.color : '#888' }}>
                      {e.celdas.map(c => c.valor).join('')} {e.correcto ? '✓' : '✗'}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default SopaNumerosInteractiva
