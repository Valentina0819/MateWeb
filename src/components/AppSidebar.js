import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import logo1 from 'src/assets/images/educativo.png'
import getNav from '../_nav'
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const nav = getNav()

  return (
    <CSidebar
      className="border-end border-opacity-10"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
      style={{
        background: '#1a0b2e',
        boxShadow: '4px 0 25px rgba(0, 0, 0, 0.5)',
        borderRight: '1px solid rgba(168, 85, 247, 0.15)',
        overflow: 'hidden',
      }}
    >
      <style>
        {`
          /* Símbolos matemáticos de fondo sutiles */
          .sidebar-bg-icons {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            z-index: 0;
            opacity: 0.3; /* Muy tenue para no distraer */
            color: white;
            font-family: serif;
          }

          .sidebar-nav {
            position: relative;
            z-index: 1;
            background: transparent !important;
          }

          /* Estilo de los links de navegación */
          .nav-link {
            border-radius: 12px !important;
            margin: 4px 12px !important;
            padding: 10px 15px !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            color: rgba(255, 255, 255, 0.7) !important;
          }

          .nav-link:hover {
            background: rgba(168, 85, 247, 0.15) !important;
            color: #d8b4fe !important;
            transform: translateX(5px);
          }

          .nav-link.active {
            background: linear-gradient(135deg, #a855f7 0%, #6b21a8 100%) !important;
            color: white !important;
            box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4);
          }

          .nav-group-items {
            background: rgba(0, 0, 0, 0.2) !important;
            margin: 5px 12px !important;
            border-radius: 12px;
          }

          .nav-title {
            color: #a855f7 !important;
            font-weight: 800 !important;
            letter-spacing: 1px;
            font-size: 0.7rem !important;
            margin-top: 20px !important;
          }
        `}
      </style>

      <div className="sidebar-bg-icons">
        {/* Superior */}
        <div
          style={{
            position: 'absolute',
            top: '5%',
            left: '10%',
            fontSize: '4rem',
            transform: 'rotate(-15deg)',
          }}
        >
          ∑
        </div>
        <div
          style={{
            position: 'absolute',
            top: '12%',
            left: '70%',
            fontSize: '2.5rem',
            opacity: 0.5,
          }}
        >
          π
        </div>
        <div
          style={{
            position: 'absolute',
            top: '22%',
            left: '30%',
            fontSize: '3.5rem',
            transform: 'rotate(20deg)',
          }}
        >
          Δ
        </div>

        {/* Medio */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '65%',
            fontSize: '5rem',
            transform: 'rotate(-10deg)',
          }}
        >
          √
        </div>
        <div
          style={{
            position: 'absolute',
            top: '45%',
            left: '15%',
            fontSize: '2.5rem',
            opacity: 0.6,
          }}
        >
          ∞
        </div>
        <div
          style={{
            position: 'absolute',
            top: '55%',
            left: '50%',
            fontSize: '4rem',
            transform: 'rotate(15deg)',
          }}
        >
          ∫
        </div>

        {/* Inferior */}
        <div
          style={{
            position: 'absolute',
            bottom: '25%',
            left: '10%',
            fontSize: '3rem',
            opacity: 0.4,
          }}
        >
          Ω
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '60%',
            fontSize: '4.5rem',
            transform: 'rotate(-20deg)',
          }}
        >
          β
        </div>
        <div style={{ position: 'absolute', bottom: '5%', left: '30%', fontSize: '3.5rem' }}>λ</div>
        <div style={{ position: 'absolute', bottom: '35%', left: '80%', fontSize: '2rem' }}>θ</div>

        {/* Símbolos extra pequeños para rellenar */}
        <div style={{ position: 'absolute', top: '30%', left: '85%', fontSize: '1.5rem' }}>+</div>
        <div style={{ position: 'absolute', top: '65%', left: '5%', fontSize: '1.8rem' }}>%</div>
        <div style={{ position: 'absolute', bottom: '45%', left: '40%', fontSize: '1.5rem' }}>
          ≠
        </div>
      </div>

      <CSidebarHeader className="border-bottom border-white border-opacity-10">
        <CSidebarBrand className="d-flex flex-column align-items-center py-3">
          <img
            src={logo1}
            alt="Logo"
            style={{
              width: unfoldable ? '40px' : '110px',
              height: unfoldable ? '40px' : '110px',
              borderRadius: '20px',
              filter: 'drop-shadow(0 0 12px rgba(168, 85, 247, 0.6))',
              transition: 'all 0.4s ease',
              objectFit: 'contain',
            }}
          />
          {!unfoldable && (
            <div className="mt-3 text-center">
              <span
                style={{
                  color: 'white',
                  fontWeight: '900',
                  fontSize: '1.4rem',
                  letterSpacing: '2px',
                  textShadow: '0 0 10px rgba(168, 85, 247, 0.5)',
                }}
              >
                EDUMATH<span style={{ color: '#a855f7' }}>.</span>
              </span>
            </div>
          )}
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>

      <div className="flex-grow-1 overflow-auto custom-scrollbar">
        <AppSidebarNav items={nav} />
      </div>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
