import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
  CRow,
  CCol,
  CContainer,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilBook, cilVideo, cilLightbulb, cilArrowLeft } from '@coreui/icons'
import numeroImg from 'src/assets/images/numero.webp'

const tabs = [
  { key: 'leccion', label: 'Lección', icon: cilBook },
  { key: 'video', label: 'Video', icon: cilVideo },
  { key: 'ejemplo', label: 'Ejemplos', icon: cilLightbulb },
]

const MultiplosDivisores = () => {
  const [activeTab, setActiveTab] = useState('leccion')
  const navigate = useNavigate()

  const moradoPrincipal = '#1a0b2e'
  const moradoAcento = '#6b21a8'

  return (
    <CContainer className="py-5" style={{ minHeight: '100vh' }}>
      <style>
        {`
          .main-title-mod { color: ${moradoPrincipal}; font-weight: 800; }
          .card-module { border: none; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); background: #fff; }
          .tab-btn { 
            border: 2px solid #f3f4f6; 
            border-radius: 12px; 
            padding: 12px 20px; 
            transition: all 0.3s ease;
            background: #f8faff;
            color: #6b7280;
          }
          .tab-btn.active { 
            background: ${moradoPrincipal} !important; 
            color: white !important; 
            border-color: ${moradoPrincipal};
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(26, 11, 46, 0.2);
          }
          .example-box { 
            border-left: 5px solid ${moradoAcento}; 
            background: #f9fafb; 
            border-radius: 0 12px 12px 0;
            transition: transform 0.2s;
          }
          .example-box:hover { transform: scale(1.01); }
          .btn-primary-custom {
            background-color: ${moradoPrincipal};
            border: none;
            padding: 12px;
            font-weight: bold;
            border-radius: 10px;
          }
          .btn-primary-custom:hover {
            background-color: ${moradoAcento};
          }
        `}
      </style>

      {/* Botón de Retorno */}
      <CButton
        variant="ghost"
        className="mb-4 text-secondary d-flex align-items-center"
        onClick={() => navigate(-1)}
      >
        <CIcon icon={cilArrowLeft} className="me-2" /> Volver al Dashboard
      </CButton>

      <CRow className="justify-content-center">
        <CCol lg={10} xl={9}>
          <CCard className="card-module p-2 p-md-4">
            <CCardBody>
              <div className="text-center mb-5">
                <h1 className="main-title-mod display-5">Múltiplos y Divisores</h1>
                <p className="text-muted fs-5">
                  Comprende las relaciones fundamentales entre los números.
                </p>
              </div>

              {/* Tabs Navegación */}
              <div className="d-flex flex-wrap justify-content-center mb-5" style={{ gap: 12 }}>
                {tabs.map((tab) => (
                  <CButton
                    key={tab.key}
                    className={`tab-btn d-flex align-items-center ${activeTab === tab.key ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    <CIcon icon={tab.icon} className="me-2" />
                    {tab.label}
                  </CButton>
                ))}
              </div>

              {/* Contenido Dinámico */}
              <div className="mt-2 px-md-3">
                {activeTab === 'leccion' && (
                  <div className="animate__animated animate__fadeIn">
                    <h3 className="fw-bold mb-4" style={{ color: moradoAcento }}>
                      Conceptos Clave
                    </h3>
                    <CRow className="align-items-center">
                      <CCol md={7}>
                        <div className="mb-4">
                          <h5 className="fw-bold" style={{ color: moradoPrincipal }}>
                            🔢 ¿Qué es un Múltiplo?
                          </h5>
                          <p className="text-secondary fs-6">
                            Es el número que obtenemos al multiplicar un número por otro cualquiera.
                            Piénsalo como los resultados de las tablas de multiplicar.
                            <br />
                            <small className="text-muted">
                              Ej: Múltiplos de 4 → 4, 8, 12, 16...
                            </small>
                          </p>
                        </div>
                        <div className="mb-4">
                          <h5 className="fw-bold" style={{ color: moradoPrincipal }}>
                            ✂️ ¿Qué es un Divisor?
                          </h5>
                          <p className="text-secondary fs-6">
                            Es aquel número que divide a otro de forma <strong>exacta</strong> (el
                            resto es cero).
                            <br />
                            <small className="text-muted">
                              Ej: Divisores de 12 → 1, 2, 3, 4, 6, 12.
                            </small>
                          </p>
                        </div>
                      </CCol>
                      <CCol md={5} className="text-center">
                        <div className="p-3 bg-white shadow-sm rounded-4 border">
                          <img
                            src={numeroImg}
                            alt="Múltiplos y Divisores"
                            className="img-fluid rounded-3"
                            style={{ maxHeight: '220px' }}
                          />
                        </div>
                      </CCol>
                    </CRow>
                    <CButton
                      className="btn-primary-custom w-100 mt-5 shadow text-white"
                      onClick={() => navigate('/AlumnoDashboard')}
                    >
                      ¡LISTO PARA COMENZAR LA LECCIÓN!
                    </CButton>
                  </div>
                )}

                {activeTab === 'video' && (
                  <div className="text-center animate__animated animate__fadeIn">
                    <h3 className="fw-bold mb-4" style={{ color: moradoAcento }}>
                      Aprendizaje Visual
                    </h3>
                    <div className="ratio ratio-16x9 shadow-lg rounded-4 overflow-hidden mb-4 border border-4 border-white">
                      <iframe
                        src="https://www.youtube.com/embed/jifqWoTSK6o"
                        title="Video tutorial"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <p className="text-muted">
                      Mira este video para reforzar la diferencia entre múltiplos y divisores.
                    </p>
                  </div>
                )}

                {activeTab === 'ejemplo' && (
                  <div className="animate__animated animate__fadeIn">
                    <h3 className="fw-bold mb-4" style={{ color: moradoAcento }}>
                      Ejemplos de la Vida Real
                    </h3>

                    <CCard className="example-box mb-4 border-0 shadow-sm">
                      <CCardBody>
                        <h5 className="fw-bold" style={{ color: moradoPrincipal }}>
                          🍎 El ejemplo de las manzanas (Múltiplos)
                        </h5>
                        <p className="mb-0 text-secondary">
                          Si compras 3 bolsas y en cada una vienen 5 manzanas, el total es{' '}
                          <strong>15</strong>. Decimos que 15 es múltiplo de 5 (porque $5 \times 3 =
                          15$) y también de 3.
                        </p>
                      </CCardBody>
                    </CCard>

                    <CCard className="example-box mb-4 border-0 shadow-sm">
                      <CCardBody>
                        <h5 className="fw-bold" style={{ color: moradoPrincipal }}>
                          🍬 Repartiendo caramelos (Divisores)
                        </h5>
                        <p className="mb-0 text-secondary">
                          Si tienes 18 caramelos y quieres hacer bolsas iguales para 6 amigos, a
                          cada uno le tocan 3. El <strong>6</strong> es divisor de 18 porque la
                          división es exacta.
                        </p>
                      </CCardBody>
                    </CCard>

                    <div className="bg-light p-3 rounded-3 text-center border-dashed">
                      <p className="text-muted mb-0 small italic">
                        "Todo número es múltiplo de sí mismo y de 1."
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default MultiplosDivisores
