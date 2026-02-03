import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  CContainer,
  CRow,
  CCol,
  CForm,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilLockLocked } from '@coreui/icons'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [mensajeError, setMensajeError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, contraseña }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem(
          'usuario',
          JSON.stringify({
            email: data.usuario,
            rol: data.rol,
            id_usuario: data.id_usuario,
          }),
        )

        const routes = {
          admin: '/docente/dashboard',
          docente: '/docente/dashboard',
          alumno: '/AlumnoDashboard',
        }
        navigate(routes[data.rol] || '/404')
      } else {
        setMensajeError(data.mensaje || 'Error al iniciar sesión')
        setShowErrorModal(true)
      }
    } catch (error) {
      setMensajeError('Error de conexión con el servidor')
      setShowErrorModal(true)
    }
  }

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          
          .login-container {
            min-height: 100vh;
            font-family: 'Plus Jakarta Sans', sans-serif;
            background: linear-gradient(-45deg, #1a0b2e, #31106b, #4c1d95, #2e1065);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
            position: relative;
            display: flex;
            align-items: center;
            overflow: hidden;
          }
          .math-symbols {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 0;
          }
          
          .math-symbol {
            position: absolute;
            font-weight: 900;
            color: rgba(255, 255, 255, 0.9); /* Más opacidad */
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.6), 0 0 40px rgba(99, 102, 241, 0.4); /* Efecto Neón */
            user-select: none;
            filter: blur(0.5px);
          }


          .sym-lg { font-size: 8rem; opacity: 0.25; filter: blur(1px); } /* Menos blur para que se vea */
          .sym-md { font-size: 5rem; opacity: 0.5; }
          .sym-sm { font-size: 3rem; opacity: 0.9; } /* El más pequeño es el más brillante */

          /* 3. Animación un poco más rápida para que se vea el movimiento */
          @keyframes float-complex {
            0% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(45px, -70px) rotate(20deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
          }
          .glass-wrapper { position: relative; z-index: 1; width: 100%; }
          .login-card {
            background: rgba(255, 255, 255, 0.96);
            border-radius: 28px;
            padding: 3.5rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          }
            .login-title {
            font-size: 2.25rem;
            font-weight: 800;
            color: #1a1c2e;
            letter-spacing: -0.025em;
            margin-bottom: 0.5rem;
          }
          
          .login-subtitle {
            color: #64748b;
            font-size: 1rem;
            margin-bottom: 2rem;
          }
          
          .input-group-modern {
            position: relative;
            margin-bottom: 1.25rem;
          }
          
          .input-icon {
            position: absolute;
            left: 1.25rem;
            top: 50%;
            transform: translateY(-50%);
            color: #94a3b8;
            transition: color 0.3s;
          }
          
          .form-input-modern {
            width: 100%;
            padding: 1rem 1rem 1rem 3.5rem;
            border: 2px solid #f1f5f9;
            border-radius: 16px;
            background: #f8fafc;
            font-weight: 500;
            transition: all 0.3s;
          }
          
          .form-input-modern:focus {
            outline: none;
            background: white;
            border-color: #6366f1;
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
          }

          .form-input-modern:focus + .input-icon {
            color: #6366f1;
          }
          
          .btn-gradient {
            background: #1d0a4bff;
            color: white;
            padding: 1.1rem;
            border-radius: 16px;
            border: none;
            font-weight: 700;
            width: 100%;
            margin-top: 1rem;
            transition: all 0.3s;
          }
          
          .btn-gradient:hover {
            background: #480d96ff;
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          }
          
          .welcome-card {
            background: #1d0a4bff;
            backdrop-filter: blur(10px);
            border-radius: 28px;
            padding: 3.5rem;
            height: 100%;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            border: 1px solid rgba(255,255,255,0.1);
          }

          .welcome-title { font-size: 2.5rem; font-weight: 800; margin-bottom: 1.5rem; }
          .welcome-text { font-size: 1.1rem; line-height: 1.7; opacity: 0.8; margin-bottom: 2.5rem; }

          .btn-register {
            background: white;
            color: #1a1c2e;
            padding: 1rem 2.5rem;
            border-radius: 14px;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.3s;
          }

          .btn-register:hover {
            transform: scale(1.05);
            background: #f8fafc;
          }
          
          .forgot-password {
            color: #6366f1;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.9rem;
          }
        `}
      </style>

      <div className="login-container">
        <div className="math-symbols">
          {[
            { s: 'π', t: '10%', l: '5%', sz: 'sym-lg' },
            { s: '√', t: '80%', l: '10%', sz: 'sym-lg' },
            { s: '∑', t: '15%', l: '85%', sz: 'sym-md' },
            { s: '∫', t: '50%', l: '5%', sz: 'sym-sm' },
            { s: '∞', t: '40%', l: '45%', sz: 'sym-lg' },
            { s: 'Δ', t: '70%', l: '80%', sz: 'sym-md' },
            { s: 'θ', t: '5%', l: '40%', sz: 'sym-sm' },
            { s: 'λ', t: '60%', l: '20%', sz: 'sym-sm' },
            { s: 'Ω', t: '30%', l: '75%', sz: 'sym-md' },
            { s: 'α', t: '85%', l: '45%', sz: 'sym-sm' },
            { s: 'β', t: '25%', l: '25%', sz: 'sym-md' },
            { s: 'f(x)', t: '55%', l: '90%', sz: 'sym-sm' },
          ].map((item, index) => (
            <span
              key={index}
              className={`math-symbol ${item.sz}`}
              style={{
                top: item.t,
                left: item.l,
                animation: `float-complex ${10 + index}s infinite ease-in-out`,
                animationDelay: `${index * 0.5}s`,
              }}
            >
              {item.s}
            </span>
          ))}
        </div>

        <CContainer className="glass-wrapper">
          <CRow className="justify-content-center">
            <CCol lg={11} xl={10}>
              <CRow className="g-0 shadow-lg" style={{ borderRadius: '28px', overflow: 'hidden' }}>
                {/* Lado del Formulario */}
                <CCol md={6}>
                  <div className="login-card">
                    <h1 className="login-title">¡Hola de nuevo!</h1>
                    <p className="login-subtitle">Ingresa tus credenciales para continuar</p>

                    <CForm onSubmit={handleLogin}>
                      <div className="input-group-modern">
                        <input
                          type="email"
                          className="form-input-modern"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <CIcon icon={cilUser} className="input-icon" size="lg" />
                      </div>

                      <div className="input-group-modern">
                        <input
                          type="password"
                          className="form-input-modern"
                          placeholder="Contraseña"
                          value={contraseña}
                          onChange={(e) => setContraseña(e.target.value)}
                          required
                        />
                        <CIcon icon={cilLockLocked} className="input-icon" size="lg" />
                      </div>

                      <div className="d-flex justify-content-end mb-4">
                        <Link to="/lista" className="forgot-password">
                          ¿Problemas al entrar?
                        </Link>
                      </div>

                      <button type="submit" className="btn-gradient">
                        Entrar al Aula
                      </button>
                    </CForm>
                  </div>
                </CCol>

                {/* Lado de Bienvenida (Visible solo en tablets/desktop) */}
                <CCol md={6} className="d-none d-md-block">
                  <div className="welcome-card">
                    <h2 className="welcome-title">Matemáticas al Alcance</h2>
                    <p className="welcome-text">
                      Descubre una nueva forma de aprender. Recursos interactivos, seguimiento
                      personalizado y comunidad activa.
                    </p>
                    <Link to="/register" className="btn-register">
                      Crear cuenta gratuita
                    </Link>
                  </div>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CContainer>

        {/* Modal de Error con diseño limpio */}
        <CModal visible={showErrorModal} onClose={() => setShowErrorModal(false)} centered>
          <CModalHeader closeButton className="border-0 pb-0"></CModalHeader>
          <CModalBody className="text-center py-4">
            <div className="text-danger mb-3">
              <CIcon icon={cilLockLocked} size="3xl" />
            </div>
            <h4 className="fw-bold">Acceso Denegado</h4>
            <p className="text-muted">{mensajeError}</p>
          </CModalBody>
          <CModalFooter className="border-0 pt-0 justify-content-center">
            <CButton
              color="dark"
              className="px-5 rounded-pill"
              onClick={() => setShowErrorModal(false)}
            >
              Reintentar
            </CButton>
          </CModalFooter>
        </CModal>
      </div>
    </>
  )
}

export default Login
