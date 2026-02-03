import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CContainer, CHeader, CHeaderNav, CHeaderToggler, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu, cilAccountLogout } from '@coreui/icons'
import AppHeaderDropdown from './header/AppHeaderDropdown'

const AppHeader = () => {
  const headerRef = useRef()
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (document.documentElement.scrollTop > 0) {
          headerRef.current.style.height = '70px'
          headerRef.current.style.background = 'rgba(26, 11, 46, 0.95)'
          headerRef.current.style.boxShadow =
            '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(168, 85, 247, 0.2)'
        } else {
          headerRef.current.style.height = '90px' // Más grueso al inicio
          headerRef.current.style.background = '#1a0b2e'
          headerRef.current.style.boxShadow = 'none'
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const usuario = localStorage.getItem('usuario')

  return (
    <CHeader
      position="sticky"
      ref={headerRef}
      style={{
        height: '90px', // Grosor inicial potente
        background: '#1a0b2e',
        borderBottom: '3px solid #6b21a8', // Borde más grueso y vibrante
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Animación elástica
        display: 'flex',
        alignItems: 'center',
        zIndex: 1030,
      }}
    >
      <CContainer fluid className="px-4 d-flex align-items-center justify-content-between">
        {/* Lado Izquierdo: Botón Menú con Círculo de Fondo */}
        <div className="d-flex align-items-center">
          <CHeaderToggler
            onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
            style={{
              color: 'white',
              background: 'rgba(168, 85, 247, 0.2)',
              borderRadius: '12px',
              padding: '8px',
              border: '1px solid rgba(168, 85, 247, 0.4)',
            }}
          >
            <CIcon icon={cilMenu} size="xl" />
          </CHeaderToggler>

          {/* Logo / Título de la App */}
          <div className="ms-3 d-none d-lg-block">
            <h4
              style={{
                margin: 0,
                color: 'white',
                fontWeight: '800',
                letterSpacing: '1px',
                textShadow: '0 0 10px rgba(168, 85, 247, 0.8)',
              }}
            >
              EDUMATH<span style={{ color: '#a855f7' }}>.</span>
            </h4>
          </div>
        </div>

        {/* Centro: Frase llamativa con Capsula */}
        <div
          className="d-none d-md-block"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '8px 25px',
            borderRadius: '50px',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            boxShadow: 'inset 0 0 10px rgba(168, 85, 247, 0.1)',
          }}
        >
          <span
            style={{
              color: '#e9d5ff',
              fontSize: '15px',
              fontWeight: '600',
              letterSpacing: '0.5px',
            }}
          >
            🚀 "Sumamos <span style={{ color: '#a855f7' }}>diversión</span>, restamos aburrimiento"
          </span>
        </div>

        {/* Lado Derecho: Usuario */}
        <CHeaderNav className="d-flex align-items-center" style={{ gap: '20px' }}>
          {usuario ? (
            <div className="d-flex align-items-center" style={{ gap: '15px' }}>
              <AppHeaderDropdown />
              <div
                style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.1)' }}
              ></div>
              <CButton
                onClick={() => {
                  localStorage.clear()
                  navigate('/login')
                }}
                style={{
                  background: 'transparent',
                  border: '2px solid #ef4444',
                  color: '#ef4444',
                  borderRadius: '12px',
                  padding: '6px 15px',
                  fontWeight: '700',
                  transition: '0.3s',
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#ef4444'
                  e.target.style.color = 'white'
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent'
                  e.target.style.color = '#ef4444'
                }}
              >
                SALIR
              </CButton>
            </div>
          ) : (
            <CButton
              onClick={() => navigate('/login')}
              style={{
                background: 'linear-gradient(135deg, #a855f7 0%, #6b21a8 100%)',
                border: 'none',
                color: 'white',
                borderRadius: '12px',
                padding: '10px 25px',
                fontWeight: '700',
                boxShadow: '0 4px 15px rgba(168, 85, 247, 0.4)',
                textTransform: 'uppercase',
              }}
            >
              Entrar
            </CButton>
          )}
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
