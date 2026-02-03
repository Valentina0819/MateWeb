import React, { useState } from 'react'
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
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '24px solid transparent',
            borderRight: '24px solid transparent',
            borderBottom: '48px solid #f87171',
            margin: 8,
          }}
        />
      )
    case 'óvalo':
      return (
        <div
          style={{
            ...estilos,
            width: 60,
            height: 36,
            borderRadius: '50%',
            border: '3px solid #a78bfa',
          }}
        />
      )
    case 'pentágono':
      return (
        <svg width="48" height="48" style={{ margin: 8 }}>
          <polygon
            points="24,4 44,18 36,44 12,44 4,18"
            fill="none"
            stroke="#fb7185"
            strokeWidth="3"
          />
        </svg>
      )
    case 'hexágono':
      return (
        <svg width="48" height="48" style={{ margin: 8 }}>
          <polygon
            points="24,4 44,16 44,32 24,44 4,32 4,16"
            fill="none"
            stroke="#f472b6"
            strokeWidth="3"
          />
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
  const [categorias, setCategorias] = useState(
    NIVELES[nivel].categorias.map((cat) => ({ ...cat, figuras: [] })),
  )
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
    setCategorias((prev) =>
      prev.map((cat) =>
        cat.id === catId && !cat.figuras.some((f) => f.id === figura.id)
          ? { ...cat, figuras: [...cat.figuras, figura] }
          : cat,
      ),
    )
    // Quitar figura de disponibles
    setFigurasDisponibles((prev) => prev.filter((f) => f.id !== figura.id))
    setMensaje('')
  }

  const handleDragOver = (e) => e.preventDefault()

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
        !cat.acepta.every((tipo) => cat.figuras.some((f) => f.tipo === tipo))
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
      setCategorias(NIVELES[nuevoNivel].categorias.map((cat) => ({ ...cat, figuras: [] })))
      setMensaje('')
      setCompletado(false)
    }
  }

  // Menú principal (reiniciar)
  const reiniciar = () => {
    setNivel(0)
    setFigurasDisponibles([...NIVELES[0].figuras])
    setCategorias(NIVELES[0].categorias.map((cat) => ({ ...cat, figuras: [] })))
    setMensaje('')
    setCompletado(false)
  }

  // Guardar resultado (solo muestra mensaje)
  const guardarResultado = () => {
    setMensaje('¡Resultado guardado! (solo interfaz)')
  }

  return (
    <CContainer fluid className="py-4">
      <CRow className="justify-content-center">
        <CCol xs={12} md={10} lg={8}>
          <CCard
            className="border-0 shadow-lg"
            style={{ borderRadius: '24px', overflow: 'hidden' }}
          >
            <CCardHeader className="text-white border-0 py-4" style={{ background: '#070145' }}>
              <h3 className="fw-bold text-center mb-0" style={{ letterSpacing: '1px' }}>
                FIGURAS GEOMÉTRICAS
              </h3>
            </CCardHeader>

            <CCardBody className="p-4" style={{ backgroundColor: '#ffffff' }}>
              <div className="d-flex justify-content-center mb-4">
                <CBadge
                  color="info"
                  shape="rounded-pill"
                  className="text-white px-4 py-2 fs-6 shadow-sm"
                >
                  Nivel {nivel + 1} / {NIVELES.length}
                </CBadge>
              </div>

              {/* Alerta de Mensaje */}
              {mensaje && (
                <CAlert
                  color={completado ? 'success' : 'danger'}
                  className="text-center fw-bold shadow-sm border-0 mb-4"
                  style={{ borderRadius: '12px' }}
                >
                  {mensaje}
                </CAlert>
              )}

              {/* Sección: Figuras Disponibles (Source) */}
              <div className="mb-5 p-3" style={{ background: '#f1f5f9', borderRadius: '20px' }}>
                <div
                  className="text-muted small fw-bold text-center text-uppercase mb-3"
                  style={{ letterSpacing: '1px' }}
                >
                  Figuras por clasificar
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '15px',
                    minHeight: '100px',
                    alignItems: 'center',
                  }}
                >
                  {figurasDisponibles.map((figura) => (
                    <div
                      key={figura.id}
                      className="bg-white shadow-sm p-2 rounded-3 text-center"
                      style={{
                        cursor: 'grab',
                        transition: 'transform 0.2s',
                        width: '80px',
                        border: '1px solid #e2e8f0',
                      }}
                      draggable
                      onDragStart={(e) => handleDragStart(e, figura)}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      <Figura tipo={figura.tipo} />
                      <div className="fw-bold text-dark mt-1" style={{ fontSize: '11px' }}>
                        {figura.tipo.charAt(0).toUpperCase() + figura.tipo.slice(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sección: Categorías (Drop Zones) */}
              <div
                className="mb-4"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '20px',
                }}
              >
                {categorias.map((cat) => (
                  <div
                    key={cat.id}
                    onDrop={(e) => handleDrop(e, cat.id)}
                    onDragOver={handleDragOver}
                    style={{
                      minHeight: '150px',
                      border: '2px dashed #9fa8b4ff',
                      borderRadius: '20px',
                      background: '#fff',
                      padding: '15px',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      backgroundColor: '#ffffff',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                    }}
                    onDragEnter={(e) => {
                      e.currentTarget.style.borderColor = '#0ea5e9'
                      e.currentTarget.style.backgroundColor = '#f0f9ff'
                    }}
                    onDragLeave={(e) => {
                      e.currentTarget.style.borderColor = '#cbd5e1'
                      e.currentTarget.style.backgroundColor = '#ffffff'
                    }}
                  >
                    <div className="fw-bold text-primary mb-3 text-uppercase small">
                      {cat.nombre}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '10px',
                        minHeight: '60px',
                      }}
                    >
                      {cat.figuras.length === 0 ? (
                        <div
                          className="d-flex align-items-center justify-content-center w-100"
                          style={{ color: '#94a3b8', fontSize: '12px', fontStyle: 'italic' }}
                        >
                          Suelta aquí
                        </div>
                      ) : (
                        cat.figuras.map((f) => (
                          <div key={f.id} className="text-center bg-light p-1 rounded-2 shadow-xs">
                            <Figura tipo={f.tipo} />
                            <div className="text-dark fw-semibold" style={{ fontSize: '10px' }}>
                              {f.tipo.charAt(0).toUpperCase() + f.tipo.slice(1)}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Botones de Acción */}
              <div className="d-flex flex-wrap justify-content-center gap-3 pt-3">
                <CButton
                  className="text-white px-4 py-2 fw-bold shadow-sm"
                  onClick={verificar}
                  style={{ backgroundColor: '#5900ffff', borderRadius: '12px' }}
                  disabled={figurasDisponibles.length > 0 || completado}
                >
                  Verificar clasificación
                </CButton>

                <CButton
                  color="dark"
                  variant="outline"
                  className="px-4 py-2"
                  style={{ borderRadius: '12px' }}
                  onClick={reiniciar}
                >
                  Volver al Menú
                </CButton>

                <CButton
                  className="text-white px-4 py-2 fw-bold shadow-sm"
                  style={{ backgroundColor: '#0011ffff', borderRadius: '12px' }}
                  onClick={guardarResultado}
                  disabled={!completado}
                >
                  Guardar Progreso
                </CButton>

                <CButton
                  className="px-4 py-2 fw-bold shadow-sm"
                  style={{ borderRadius: '12px', backgroundColor: '#070145', color: 'white' }}
                  onClick={siguienteNivel}
                  disabled={!completado || nivel === NIVELES.length - 1}
                >
                  Siguiente Nivel ➔
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Modals
