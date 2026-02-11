import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CForm, CButton, CAlert, CContainer, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilEnvelopeClosed, cilArrowLeft } from '@coreui/icons'

const SolicitarRecuperacion = () => {
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje('')
    setError('')
    setEnviando(true)

    try {
      const res = await fetch('https://mateweb-production.up.railway.app/solicitar-recuperacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setMensaje(data.mensaje || 'Enlace enviado. Revisa tu correo.')
      } else {
        setError(data.mensaje || 'El correo no estÃ¡ registrado.')
      }
    } catch {
      setError('Error en la conexiÃ³n con el servidor')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');
          
          .recovery-page {
            min-height: 100vh;
            font-family: 'Plus Jakarta Sans', sans-serif;
            background: linear-gradient(-45deg, #1a0b2e, #31106b, #4c1d95, #2e1065);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
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
            color: rgba(255, 255, 255, 0.9); /* MÃ¡s opacidad */
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.6), 0 0 40px rgba(99, 102, 241, 0.4); /* Efecto NeÃ³n */
            user-select: none;
            filter: blur(0.5px);
          }


          .sym-lg { font-size: 8rem; opacity: 0.25; filter: blur(1px); } /* Menos blur para que se vea */
          .sym-md { font-size: 5rem; opacity: 0.5; }
          .sym-sm { font-size: 3rem; opacity: 0.9; } /* El mÃ¡s pequeÃ±o es el mÃ¡s brillante */

          /* 3. AnimaciÃ³n un poco mÃ¡s rÃ¡pida para que se vea el movimiento */
          @keyframes float-complex {
            0% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(45px, -70px) rotate(20deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
          }

          .glass-card {
            background: rgba(255, 255, 255, 0.98);
            border-radius: 28px;
            padding: 3rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            position: relative;
            z-index: 1;
          }

          .input-container {
            position: relative;
            margin-bottom: 1.5rem;
          }

          .modern-input {
            width: 100%;
            padding: 1rem 1rem 1rem 3.5rem;
            border: 2px solid #f3e8ff;
            border-radius: 16px;
            background: #faf5ff;
            transition: all 0.3s;
          }

          .modern-input:focus {
            border-color: #a855f7;
            background: white;
            outline: none;
            box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.1);
          }

          .icon-prefix {
            position: absolute;
            left: 1.25rem;
            top: 50%;
            transform: translateY(-50%);
            color: #a855f7;
          }

          .btn-glow {
            background: linear-gradient(135deg, #6b21a8 0%, #4c1d95 100%);
            color: white;
            padding: 1rem;
            border-radius: 16px;
            border: none;
            font-weight: 700;
            width: 100%;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(107, 33, 168, 0.3);
          }

          .btn-glow:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(107, 33, 168, 0.5);
          }
        `}
      </style>

      <div className="recovery-page">
        {/* SÃ­mbolos de fondo para coherencia visual */}
        <div className="math-symbols">
          {[
            { s: 'Ï€', t: '10%', l: '5%', sz: 'sym-lg' },
            { s: 'âˆš', t: '80%', l: '10%', sz: 'sym-lg' },
            { s: 'âˆ‘', t: '15%', l: '85%', sz: 'sym-md' },
            { s: 'âˆ«', t: '50%', l: '5%', sz: 'sym-sm' },
            { s: 'âˆž', t: '40%', l: '45%', sz: 'sym-lg' },
            { s: 'Î”', t: '70%', l: '80%', sz: 'sym-md' },
            { s: 'Î¸', t: '5%', l: '40%', sz: 'sym-sm' },
            { s: 'Î»', t: '60%', l: '20%', sz: 'sym-sm' },
            { s: 'Î©', t: '30%', l: '75%', sz: 'sym-md' },
            { s: 'Î±', t: '85%', l: '45%', sz: 'sym-sm' },
            { s: 'Î²', t: '25%', l: '25%', sz: 'sym-md' },
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
          <CRow className="justify-content-center">
            <CCol xs={12} sm={10} md={8} lg={5}>
              <div className="glass-card">
                <div className="text-center mb-4">
                  <h2 style={{ color: '#1a1c2e', fontWeight: 800 }}>RecuperaciÃ³n</h2>
                  <p className="text-muted">Enviaremos un enlace mÃ¡gico a tu bandeja de entrada</p>
                </div>

                {mensaje && (
                  <CAlert color="success" className="rounded-4">
                    {mensaje}
                  </CAlert>
                )}
                {error && (
                  <CAlert color="danger" className="rounded-4">
                    {error}
                  </CAlert>
                )}

                <CForm onSubmit={handleSubmit}>
                  <div className="input-container">
                    <CIcon icon={cilEnvelopeClosed} className="icon-prefix" size="lg" />
                    <input
                      type="email"
                      className="modern-input"
                      placeholder="Tu correo electrÃ³nico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-glow" disabled={enviando}>
                    {enviando ? 'Enviando...' : 'Enviar enlace de ayuda'}
                  </button>

                  <div className="text-center mt-4">
                    <CButton
                      variant="link"
                      className="p-0"
                      onClick={() => navigate('/login')}
                      style={{ color: '#7e22ce', textDecoration: 'none', fontWeight: 600 }}
                    >
                      <CIcon icon={cilArrowLeft} className="me-2" />
                      Volver al inicio de sesiÃ³n
                    </CButton>
                  </div>
                </CForm>
              </div>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default SolicitarRecuperacion
