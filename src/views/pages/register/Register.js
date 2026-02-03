import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { CForm, CRow, CCol, CFormInput, CAlert, CContainer } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilEnvelopeClosed, cilLockLocked } from '@coreui/icons'

const Formulario = () => {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [rol, setRol] = useState('usuario')
  const [enviando, setEnviando] = useState(false)

  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)
  const [mensaje, setMensaje] = useState({ text: '', color: '' })
  const navigate = useNavigate()

  // VALIDACIONES (Mantenemos tu lógica pero optimizada)
  const validarNombre = (val) => (!val || val.trim().length < 2 ? 'Mínimo 2 caracteres.' : '')
  const validarApellido = (val) => (!val || val.trim().length < 2 ? 'Mínimo 2 caracteres.' : '')
  const validarEmail = (val) => (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? 'Email inválido.' : '')
  const validarContraseña = (val) => {
    if (!val || val.length < 6) return 'Mínimo 6 caracteres.'
    if (!/(?=.*[A-Z])(?=.*\d)/.test(val)) return 'Usa Mayúscula y número.'
    return ''
  }

  useEffect(() => {
    const newErrors = {
      nombre: validarNombre(nombre),
      apellido: validarApellido(apellido),
      email: validarEmail(email),
      contraseña: validarContraseña(contraseña),
      repeatPassword: repeatPassword !== contraseña ? 'No coinciden.' : '',
    }
    setErrors(newErrors)
    const allValid =
      Object.values(newErrors).every((err) => err === '') && nombre && apellido && email
    setIsFormValid(allValid)
  }, [nombre, apellido, email, contraseña, repeatPassword])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid) return

    setEnviando(true)
    try {
      const response = await fetch('http://localhost:4000/userss', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellido, email, contraseña, rol }),
      })

      if (response.ok) {
        setMensaje({ text: '¡Registro exitoso! Redirigiendo...', color: 'success' })
        setTimeout(() => navigate('/login'), 2000)
      } else {
        const data = await response.json()
        setMensaje({ text: data.message || 'Error en el servidor', color: 'danger' })
      }
    } catch (error) {
      setMensaje({ text: 'Error de conexión.', color: 'danger' })
    }
    setEnviando(false)
  }

  return (
    <>
      <style>
        {`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');
                
                .reg-container {
                    min-height: 100vh;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    background: linear-gradient(-45deg, #1a0b2e, #31106b, #4c1d95, #2e1065);
                    background-size: 400% 400%;
                    animation: gradientShift 15s ease infinite;
                    position: relative;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                    padding: 40px 0;
                }

                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
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

         
          @keyframes float-complex {
            0% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(45px, -70px) rotate(20deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
          }

                .reg-card {
                    background: rgba(255, 255, 255, 0.98);
                    border-radius: 28px;
                    padding: 3rem;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    position: relative;
                    z-index: 1;
                    max-width: 600px;
                    margin: auto;
                }

                .input-group-custom {
                    position: relative;
                    margin-bottom: 1.5rem;
                }

                .form-input-custom {
                    width: 100%;
                    padding: 0.8rem 1rem 0.8rem 3.5rem;
                    border: 2px solid #f3e8ff;
                    border-radius: 16px;
                    background: #faf5ff;
                    transition: all 0.3s;
                }

                .form-input-custom:focus {
                    border-color: #a855f7;
                    background: white;
                    outline: none;
                    box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.1);
                }

                .icon-label {
                    position: absolute;
                    left: 1.25rem;
                    top: 13px;
                    color: #a855f7;
                }

                .btn-submit {
                    background: linear-gradient(135deg, #6b21a8 0%, #4c1d95 100%);
                    color: white;
                    padding: 1rem;
                    border-radius: 16px;
                    border: none;
                    font-weight: 700;
                    width: 100%;
                    transition: all 0.3s;
                }

                .btn-submit:disabled {
                    background: #ccc;
                    cursor: not-allowed;
                }

                .error-text {
                    color: #dc2626;
                    font-size: 0.75rem;
                    margin-top: 4px;
                    font-weight: 600;
                }
                `}
      </style>

      <div className="reg-container">
        {/* Lluvia de símbolos matemáticos */}
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

        <CContainer>
          <div className="reg-card">
            <div className="text-center mb-4">
              <h2 style={{ color: '#2e1065', fontWeight: 800 }}>Crea tu Cuenta</h2>
              <p className="text-muted">Únete a la mejor comunidad de matemáticas</p>
            </div>

            {mensaje.text && <CAlert color={mensaje.color}>{mensaje.text}</CAlert>}

            <CForm onSubmit={handleSubmit}>
              <CRow>
                <CCol md={6}>
                  <div className="input-group-custom">
                    <CIcon icon={cilUser} className="icon-label" size="lg" />
                    <input
                      className="form-input-custom"
                      placeholder="Nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                    {errors.nombre && <div className="error-text">{errors.nombre}</div>}
                  </div>
                </CCol>
                <CCol md={6}>
                  <div className="input-group-custom">
                    <CIcon icon={cilUser} className="icon-label" size="lg" />
                    <input
                      className="form-input-custom"
                      placeholder="Apellido"
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                    />
                    {errors.apellido && <div className="error-text">{errors.apellido}</div>}
                  </div>
                </CCol>
              </CRow>

              <div className="input-group-custom">
                <CIcon icon={cilEnvelopeClosed} className="icon-label" size="lg" />
                <input
                  className="form-input-custom"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="error-text">{errors.email}</div>}
              </div>

              <CRow>
                <CCol md={6}>
                  <div className="input-group-custom">
                    <CIcon icon={cilLockLocked} className="icon-label" size="lg" />
                    <input
                      className="form-input-custom"
                      type="password"
                      placeholder="Contraseña"
                      value={contraseña}
                      onChange={(e) => setContraseña(e.target.value)}
                    />
                    {errors.contraseña && <div className="error-text">{errors.contraseña}</div>}
                  </div>
                </CCol>
                <CCol md={6}>
                  <div className="input-group-custom">
                    <CIcon icon={cilLockLocked} className="icon-label" size="lg" />
                    <input
                      className="form-input-custom"
                      type="password"
                      placeholder="Repetir"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                    {errors.repeatPassword && (
                      <div className="error-text">{errors.repeatPassword}</div>
                    )}
                  </div>
                </CCol>
              </CRow>

              <button type="submit" className="btn-submit mt-2" disabled={!isFormValid || enviando}>
                {enviando ? 'Procesando...' : 'Registrarme ahora'}
              </button>

              <div className="text-center mt-4">
                <p className="text-muted small">
                  ¿Ya tienes cuenta?{' '}
                  <Link
                    to="/login"
                    style={{ color: '#7e22ce', fontWeight: 600, textDecoration: 'none' }}
                  >
                    Inicia Sesión
                  </Link>
                </p>
              </div>
            </CForm>
          </div>
        </CContainer>
      </div>
    </>
  )
}

export default Formulario
