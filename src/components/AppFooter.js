import React from 'react'
import { CFooter, CContainer, CRow, CCol } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter
      className="px-4 border-0"
      style={{
        background: '#1a0b2e',
        color: 'white',
        borderTop: '3px solid #6b21a8',
        padding: '20px 0',
        boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.4)',
      }}
    >
      <CContainer fluid>
        <CRow className="align-items-center justify-content-between">
          {/* Izquierda: Logo y Copyright */}
          <CCol xs="auto" className="d-flex align-items-center">
            <div
              style={{
                background: 'rgba(168, 85, 247, 0.1)',
                padding: '5px 15px',
                borderRadius: '12px',
                border: '1px solid rgba(168, 85, 247, 0.3)',
              }}
            >
              <span className="fw-bold" style={{ letterSpacing: '1px' }}>
                EDUMATH<span style={{ color: '#a855f7' }}>.</span>
              </span>
              <span className="ms-2 text-secondary small" style={{ opacity: 0.8 }}>
                &copy; 2026 UNEFA
              </span>
            </div>
          </CCol>

          {/* Centro: Frase decorativa (Estilo Cápsula como en el Header) */}
          <CCol className="d-none d-md-block text-center">
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '6px 20px',
                borderRadius: '50px',
                border: '1px solid rgba(168, 85, 247, 0.2)',
              }}
            >
              <span style={{ color: '#e9d5ff', fontSize: '13px', fontWeight: '500' }}>
                "En matemáticas, el arte de proponer una pregunta debe ser de mayor valor que
                resolverla." — Georg Cantor
              </span>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </CFooter>
  )
}

export default React.memo(AppFooter)
