import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CFormCheck,
  CSpinner,
  CContainer,
  CBadge,
} from '@coreui/react'

const preguntasQuiz = [
  {
    pregunta: '¿Cuál es el resultado de 15 × 8?',
    opciones: ['120', '123', '112', '100'],
    respuestaCorrecta: 0,
  },
  {
    pregunta: '¿Cuánto es 25 + 17?',
    opciones: ['32', '42', '40', '38'],
    respuestaCorrecta: 1,
  },
  {
    pregunta: '¿Cuál es el doble de 14?',
    opciones: ['24', '28', '18', '30'],
    respuestaCorrecta: 1,
  },
  {
    pregunta: '¿Cuánto es 81 ÷ 9?',
    opciones: ['8', '9', '7', '6'],
    respuestaCorrecta: 1,
  },
  {
    pregunta: '¿Cuál es el resultado de 7 × 6?',
    opciones: ['42', '36', '40', '48'],
    respuestaCorrecta: 0,
  },
]

const QuizOperaciones = () => {
  const [nivel, setNivel] = useState(0)
  const [seleccionada, setSeleccionada] = useState(null)
  const [puntaje, setPuntaje] = useState(0)
  const [guardando, setGuardando] = useState(false)
  const [finalizado, setFinalizado] = useState(false)

  const handleSiguiente = () => {
    if (seleccionada === null) return
    setGuardando(true)
    setTimeout(() => {
      if (seleccionada === preguntasQuiz[nivel].respuestaCorrecta) {
        setPuntaje((p) => p + 20)
      }
      if (nivel + 1 < preguntasQuiz.length) {
        setNivel(nivel + 1)
        setSeleccionada(null)
      } else {
        setFinalizado(true)
      }
      setGuardando(false)
    }, 500)
  }

  return (
    <CContainer fluid className="py-5">
      {/* Header: Título y Puntaje */}
      <CContainer>
        <CRow className="align-items-center mb-4">
          <CCol>
            <h1 className="fw-extrabold m-0" style={{ color: '#3556b3ff', letterSpacing: '-1px' }}>
              Mate<span style={{ color: '#070145' }}>Master</span> Quiz
            </h1>
          </CCol>
          <CCol xs="auto">
            <div
              className="shadow-sm d-flex align-items-center"
              style={{
                background: '#fff',
                borderRadius: '50px',
                padding: '10px 25px',
                border: '2px solid #070145',
              }}
            >
              <span className="me-2" style={{ fontSize: '1.2rem' }}>
                🏆
              </span>
              <span className="fw-bold" style={{ fontSize: '1.3rem', color: '#1e3a8a' }}>
                {puntaje} <small style={{ fontSize: '0.8rem', color: '#64748b' }}>PTS</small>
              </span>
            </div>
          </CCol>
        </CRow>
      </CContainer>

      <CRow className="justify-content-center">
        <CCol xs={12} md={10} lg={7} xl={6}>
          <CCard
            className="border-0 shadow-lg position-relative"
            style={{ borderRadius: '32px', overflow: 'hidden' }}
          >
            {/* Barra de Progreso Superior */}
            {!finalizado && (
              <div style={{ height: '8px', background: '#e2e8f0', width: '100%' }}>
                <div
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #3b82f6, #2dd4bf)',
                    width: `${((nivel + 1) / preguntasQuiz.length) * 100}%`,
                    transition: 'width 0.5s ease-in-out',
                  }}
                />
              </div>
            )}

            <CCardBody className="p-4 p-md-5">
              {finalizado ? (
                <div className="text-center py-4">
                  <div className="mb-4" style={{ fontSize: '80px' }}>
                    🎉
                  </div>
                  <h2 className="fw-bold mb-2" style={{ color: '#1e293b' }}>
                    ¡Increíble Trabajo!
                  </h2>
                  <p className="text-muted mb-4">Has completado el desafío matemático</p>

                  <div className="p-4 mb-4" style={{ background: '#f8fafc', borderRadius: '24px' }}>
                    <div className="text-uppercase small fw-bold text-primary mb-1">
                      Tu puntuación
                    </div>
                    <div style={{ fontSize: '4rem', fontWeight: '900', color: '#1e3a8a' }}>
                      {puntaje}
                    </div>
                    <div className="text-muted">de {preguntasQuiz.length * 20} puntos posibles</div>
                  </div>

                  <CButton
                    size="lg"
                    className="w-100 py-3 fw-bold"
                    style={{
                      borderRadius: '18px',
                      backgroundColor: '#070145',
                      color: '#fff',
                      boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
                    }}
                    onClick={() => {
                      setNivel(0)
                      setPuntaje(0)
                      setFinalizado(false)
                      setSeleccionada(null)
                    }}
                  >
                    Jugar de Nuevo
                  </CButton>
                </div>
              ) : (
                <>
                  {/* Info de Pregunta */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <CBadge color="primary" shape="rounded-pill" className="px-3 py-2">
                      PREGUNTA {nivel + 1} DE {preguntasQuiz.length}
                    </CBadge>
                    <div className="text-muted small fw-bold">OPERACIÓN BÁSICA</div>
                  </div>

                  {/* Pregunta */}
                  <div className="mb-5 text-center">
                    <h2
                      className="fw-bold px-2"
                      style={{ color: '#1e293b', fontSize: '2rem', lineHeight: '1.4' }}
                    >
                      {preguntasQuiz[nivel].pregunta}
                    </h2>
                  </div>

                  {/* Opciones */}
                  <div className="mb-5">
                    {preguntasQuiz[nivel].opciones.map((op, idx) => (
                      <div
                        key={idx}
                        onClick={() => !guardando && setSeleccionada(idx)}
                        className={`d-flex align-items-center mb-3 p-3 shadow-sm border-2 pointer-event ${
                          seleccionada === idx ? 'selected-option' : 'normal-option'
                        }`}
                        style={{
                          cursor: 'pointer',
                          borderRadius: '20px',
                          transition: 'all 0.2s ease',
                          backgroundColor: seleccionada === idx ? '#eff6ff' : '#fff',
                          border: seleccionada === idx ? '2px solid #3b82f6' : '2px solid #f1f5f9',
                          transform: seleccionada === idx ? 'scale(1.02)' : 'scale(1)',
                        }}
                      >
                        <div
                          className="me-3 d-flex align-items-center justify-content-center fw-bold"
                          style={{
                            width: '35px',
                            height: '35px',
                            borderRadius: '12px',
                            background: seleccionada === idx ? '#3b82f6' : '#f1f5f9',
                            color: seleccionada === idx ? '#fff' : '#64748b',
                            fontSize: '14px',
                          }}
                        >
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <div
                          className="fw-bold fs-5"
                          style={{ color: seleccionada === idx ? '#1e3a8a' : '#475569' }}
                        >
                          {op}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Botón Siguiente */}
                  <CButton
                    size="lg"
                    className="w-100 py-3 fw-bold"
                    style={{
                      borderRadius: '20px',
                      fontSize: '1.2rem',
                      backgroundColor: '#070145',
                      color: '#fff',
                      boxShadow:
                        seleccionada !== null ? '0 10px 20px -5px rgba(59, 130, 246, 0.4)' : 'none',
                    }}
                    onClick={handleSiguiente}
                    disabled={seleccionada === null || guardando}
                  >
                    {guardando ? (
                      <CSpinner size="sm" />
                    ) : (
                      <>
                        {nivel + 1 === preguntasQuiz.length
                          ? 'Finalizar Quiz'
                          : 'Siguiente Pregunta'}
                        <span className="ms-2">→</span>
                      </>
                    )}
                  </CButton>
                </>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default QuizOperaciones
