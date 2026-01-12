import React, { useState } from 'react'
import { CCard, CCardBody, CButton, CRow, CCol, CAlert, CBadge } from '@coreui/react'

// Definición de formas y categorías por nivel
const NIVELES = [
  {
    figuras: [
      { id: 1, tipo: 'cuadrado' },
      { id: 2, tipo: 'círculo' },
      { id: 3, tipo: 'triángulo' },
      { id: 4, tipo: 'rectángulo' },
    ],
    categorias: [
      { id: '4lados', nombre: 'Figuras con 4 lados', acepta: ['cuadrado', 'rectángulo'] },
      { id: 'redondas', nombre: 'Figuras redondas', acepta: ['círculo'] },
      { id: '3lados', nombre: 'Figuras con 3 lados', acepta: ['triángulo'] },
    ],
  },
  {
    figuras: [
      { id: 1, tipo: 'cuadrado' },
      { id: 2, tipo: 'círculo' },
      { id: 3, tipo: 'triángulo' },
      { id: 4, tipo: 'rectángulo' },
      { id: 5, tipo: 'óvalo' },
      { id: 6, tipo: 'pentágono' },
    ],
    categorias: [
      { id: '4lados', nombre: 'Figuras con 4 lados', acepta: ['cuadrado', 'rectángulo'] },
      { id: 'redondas', nombre: 'Figuras redondas', acepta: ['círculo', 'óvalo'] },
      { id: '3lados', nombre: 'Figuras con 3 lados', acepta: ['triángulo'] },
      { id: '5lados', nombre: 'Figuras con 5 lados', acepta: ['pentágono'] },
    ],
  },
  {
    figuras: [
      { id: 1, tipo: 'cuadrado' },
      { id: 2, tipo: 'círculo' },
      { id: 3, tipo: 'triángulo' },
      { id: 4, tipo: 'rectángulo' },
      { id: 5, tipo: 'óvalo' },
      { id: 6, tipo: 'pentágono' },
      { id: 7, tipo: 'hexágono' },
      { id: 8, tipo: 'rombo' },
    ],
    categorias: [
      { id: '4lados', nombre: 'Figuras con 4 lados', acepta: ['cuadrado', 'rectángulo', 'rombo'] },
      { id: 'redondas', nombre: 'Figuras redondas', acepta: ['círculo', 'óvalo'] },
      { id: '3lados', nombre: 'Figuras con 3 lados', acepta: ['triángulo'] },
      { id: '5lados', nombre: 'Figuras con 5 lados', acepta: ['pentágono'] },
      { id: '6lados', nombre: 'Figuras con 6 lados', acepta: ['hexágono'] },
    ],
  },
]

// Componente de forma geométrica
const Figura = ({ tipo }) => {
  const estilos = {
    width: 48,
    height: 48,
    margin: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fff',
    cursor: 'grab',
  }
  switch (tipo) {
    case 'cuadrado':
      return <div style={{ ...estilos, border: '3px solid #60a5fa' }} />
    case 'rectángulo':
      return <div style={{ ...estilos, width: 64, height: 32, border: '3px solid #fbbf24' }} />
    case 'círculo':
      return <div style={{ ...estilos, borderRadius: '50%', border: '3px solid #34d399' }} />
    case 'triángulo':
      return (
        <div style={{ width: 0, height: 0, borderLeft: '24px solid transparent', borderRight: '24px solid transparent', borderBottom: '48px solid #f87171', margin: 8 }} />
      )
    case 'óvalo':
      return <div style={{ ...estilos, width: 60, height: 36, borderRadius: '50%', border: '3px solid #a78bfa' }} />
    case 'pentágono':
      return (
        <svg width="48" height="48" style={{ margin: 8 }}>
          <polygon points="24,4 44,18 36,44 12,44 4,18" fill="none" stroke="#fb7185" strokeWidth="3" />
        </svg>
      )
    case 'hexágono':
      return (
        <svg width="48" height="48" style={{ margin: 8 }}>
          <polygon points="24,4 44,16 44,32 24,44 4,32 4,16" fill="none" stroke="#f472b6" strokeWidth="3" />
        </svg>
      )
    case 'rombo':
      return (
        <svg width="48" height="48" style={{ margin: 8 }}>
          <polygon points="24,4 44,24 24,44 4,24" fill="none" stroke="#facc15" strokeWidth="3" />
        </svg>
      )
    default:
      return <div style={estilos} />
  }
}

const Modals = () => {
  const [nivel, setNivel] = useState(0)
  const [figurasDisponibles, setFigurasDisponibles] = useState([...NIVELES[nivel].figuras])
  const [categorias, setCategorias] = useState(NIVELES[nivel].categorias.map(cat => ({ ...cat, figuras: [] })))
  const [mensaje, setMensaje] = useState('')
  const [completado, setCompletado] = useState(false)

  // Drag & Drop
  const handleDragStart = (e, figura) => {
    e.dataTransfer.setData('figura', JSON.stringify(figura))
  }

  const handleDrop = (e, catId) => {
    e.preventDefault()
    const figura = JSON.parse(e.dataTransfer.getData('figura'))
    // Evitar duplicados en la categoría
    setCategorias(prev =>
      prev.map(cat =>
        cat.id === catId && !cat.figuras.some(f => f.id === figura.id)
          ? { ...cat, figuras: [...cat.figuras, figura] }
          : cat
      )
    )
    // Quitar figura de disponibles
    setFigurasDisponibles(prev => prev.filter(f => f.id !== figura.id))
    setMensaje('')
  }

  const handleDragOver = e => e.preventDefault()

  // Verificar si la clasificación es correcta
  const verificar = () => {
    let correcto = true
    for (const cat of categorias) {
      for (const figura of cat.figuras) {
        if (!cat.acepta.includes(figura.tipo)) {
          correcto = false
        }
      }
      // También debe tener todas las figuras requeridas
      if (
        cat.figuras.length !== cat.acepta.length ||
        !cat.acepta.every(tipo => cat.figuras.some(f => f.tipo === tipo))
      ) {
        correcto = false
      }
    }
    if (correcto) {
      setMensaje('¡Correcto! Puedes avanzar al siguiente nivel.')
      setCompletado(true)
    } else {
      setMensaje('Hay figuras mal clasificadas o faltantes. Intenta de nuevo.')
      setCompletado(false)
    }
  }

  // Siguiente nivel
  const siguienteNivel = () => {
    if (nivel < NIVELES.length - 1) {
      const nuevoNivel = nivel + 1
      setNivel(nuevoNivel)
      setFigurasDisponibles([...NIVELES[nuevoNivel].figuras])
      setCategorias(NIVELES[nuevoNivel].categorias.map(cat => ({ ...cat, figuras: [] })))
      setMensaje('')
      setCompletado(false)
    }
  }

  // Menú principal (reiniciar)
  const reiniciar = () => {
    setNivel(0)
    setFigurasDisponibles([...NIVELES[0].figuras])
    setCategorias(NIVELES[0].categorias.map(cat => ({ ...cat, figuras: [] })))
    setMensaje('')
    setCompletado(false)
  }

  // Guardar resultado (solo muestra mensaje)
  const guardarResultado = () => {
    setMensaje('¡Resultado guardado! (solo interfaz)')
  }

  return (
    <CRow className="justify-content-center">
      <CCol xs={12} md={10} lg={8}>
        <CCard className="shadow-lg p-3 mt-3" style={{ background: '#f0f9ff' }}>
          <CCardBody>
            <h4 className="fw-bold mb-2 text-center" style={{ color: '#0ea5e9' }}>
              Figuras geométricas
            </h4>
            <div className="mb-2 text-center">
              <CBadge color="info" className="px-3 py-2 fs-6">
                Nivel {nivel + 1} / {NIVELES.length}
              </CBadge>
            </div>
            {mensaje && (
              <CAlert color={completado ? 'success' : 'danger'} className="text-center">
                {mensaje}
              </CAlert>
            )}
            <div className="mb-3 text-center" style={{ fontSize: 15 }}>
              <span className="fw-bold">Figuras disponibles:</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', minHeight: 70 }}>
                {figurasDisponibles.map(figura => (
                  <div
                    key={figura.id}
                    style={{ display: 'inline-block' }}
                    draggable
                    onDragStart={e => handleDragStart(e, figura)}
                  >
                    <Figura tipo={figura.tipo} />
                    <div style={{ textAlign: 'center', fontSize: 13 }}>
                      {figura.tipo.charAt(0).toUpperCase() + figura.tipo.slice(1)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-3" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {categorias.map(cat => (
                <div
                  key={cat.id}
                  onDrop={e => handleDrop(e, cat.id)}
                  onDragOver={handleDragOver}
                  style={{
                    minHeight: 90,
                    minWidth: 160,
                    border: `2px dashed #bbb`,
                    borderRadius: 10,
                    background: '#fff',
                    margin: 8,
                    padding: 8,
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: 6 }}>{cat.nombre}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', minHeight: 40 }}>
                    {cat.figuras.length === 0
                      ? <span style={{ color: '#aaa' }}>(Zona de figuras)</span>
                      : cat.figuras.map(f => (
                        <div key={f.id} style={{ display: 'inline-block' }}>
                          <Figura tipo={f.tipo} />
                          <div style={{ textAlign: 'center', fontSize: 13 }}>
                            {f.tipo.charAt(0).toUpperCase() + f.tipo.slice(1)}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-center mb-2" style={{ gap: 8 }}>
              <CButton color="success" onClick={verificar} disabled={figurasDisponibles.length > 0 || completado}>
                Verificar
              </CButton>
              <CButton color="dark" variant="outline" onClick={reiniciar}>
                Menú Principal
              </CButton>
              <CButton color="info" onClick={guardarResultado} disabled={!completado}>
                Guardar Resultado
              </CButton>
              <CButton color="primary" onClick={siguienteNivel} disabled={!completado || nivel === NIVELES.length - 1}>
                Siguiente Nivel
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Modals
