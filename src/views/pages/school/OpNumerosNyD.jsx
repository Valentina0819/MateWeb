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
import { cilCalculator, cilVideo, cilList, cilArrowLeft, cilCheckCircle } from '@coreui/icons'
import operacionesImg from 'src/assets/images/operaciones.gif'

const tabs = [
  { key: 'leccion', label: 'Lección', icon: cilCalculator },
  { key: 'video', label: 'Video', icon: cilVideo },
  { key: 'ejemplo', label: 'Ejemplos', icon: cilList },
]

const ModuloDecimalesYFracciones = () => {
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
            box-shadow: 0 4px 12px rgba(26, 11, 46, 0.2);
          }
          .info-box { 
            background: #f0f4ff; 
            border-radius: 15px; 
            padding: 20px;
            border-left: 6px solid ${moradoPrincipal};
          }
          .example-card {
            border: 1px solid #edf2f7;
            border-radius: 15px;
            transition: transform 0.2s ease;
          }
          .example-card:hover { transform: translateY(-5px); box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
          .btn-action {
            background-color: ${moradoPrincipal};
            border: none;
            padding: 14px;
            font-weight: bold;
            border-radius: 12px;
            color: white;
          }
          .btn-action:hover { background-color: ${moradoAcento}; color: white; }
        `}
      </style>

      {/* Botón de Retorno */}
      <CButton
        variant="ghost"
        className="mb-4 text-secondary d-flex align-items-center"
        onClick={() => navigate(-1)}
      >
        <CIcon icon={cilArrowLeft} className="me-2" /> Volver
      </CButton>

      <CRow className="justify-content-center">
        <CCol lg={10}>
          <CCard className="card-module p-3 p-md-4">
            <CCardBody>
              <div className="text-center mb-5">
                <h1 className="main-title-mod display-5">Números Naturales y Decimales</h1>
                <p className="text-muted fs-5">
                  Domina las operaciones básicas y su aplicación en la vida real.
                </p>
              </div>

              {/* Navegación por Pestañas */}
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

              {/* Contenido */}
              <div className="animate__animated animate__fadeIn">
                {activeTab === 'leccion' && (
                  <CRow className="align-items-center">
                    <CCol md={7}>
                      <h3 className="fw-bold mb-4" style={{ color: moradoAcento }}>
                        Fundamentos Matemáticos
                      </h3>
                      <div className="info-box mb-4">
                        <p className="fs-6 mb-0">
                          Las <strong>operaciones matemáticas</strong> son herramientas que usamos
                          para resolver situaciones de conteo, medida y cálculo.
                        </p>
                      </div>
                      <ul className="list-unstyled">
                        <li className="mb-3 d-flex align-items-start">
                          <CIcon icon={cilCheckCircle} className="text-success me-2 mt-1" />
                          <span>
                            <strong>Números Naturales:</strong> Utilizados para contar elementos
                            enteros ($0, 1, 2, 3...$).
                          </span>
                        </li>
                        <li className="mb-3 d-flex align-items-start">
                          <CIcon icon={cilCheckCircle} className="text-success me-2 mt-1" />
                          <span>
                            <strong>Números Decimales:</strong> Utilizados para expresar cantidades
                            no enteras o partes de la unidad ($2.5, 0.75$).
                          </span>
                        </li>
                      </ul>
                    </CCol>
                    <CCol md={5} className="text-center">
                      <div className="p-2 bg-white shadow-sm rounded-4 border">
                        <img
                          src={operacionesImg}
                          alt="Operaciones"
                          className="img-fluid rounded-3"
                        />
                      </div>
                    </CCol>
                    <CCol xs={12} className="mt-4">
                      <CButton
                        className="btn-action w-100 shadow"
                        onClick={() => navigate('/AlumnoDashboard')}
                      >
                        COMENZAR LECCIÓN INTERACTIVA
                      </CButton>
                    </CCol>
                  </CRow>
                )}

                {activeTab === 'video' && (
                  <div className="text-center">
                    <h3 className="fw-bold mb-4" style={{ color: moradoAcento }}>
                      Tutorial Paso a Paso
                    </h3>
                    <div
                      className="ratio ratio-16x9 shadow-lg rounded-4 overflow-hidden mb-4 border border-white"
                      style={{ borderWidth: '8px !important' }}
                    >
                      <iframe
                        src="https://www.youtube.com/embed/zWAoNqzBxXU"
                        title="Video tutorial decimales"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <CButton
                      className="btn-action px-5"
                      onClick={() => navigate('/AlumnoDashboard')}
                    >
                      Poner en Práctica lo Aprendido
                    </CButton>
                  </div>
                )}

                {activeTab === 'ejemplo' && (
                  <div>
                    <h3 className="fw-bold mb-4" style={{ color: moradoAcento }}>
                      Matemáticas en tu día a día
                    </h3>
                    <CRow>
                      <CCol md={6} className="mb-4">
                        <CCard className="example-card h-100 bg-light border-0">
                          <CCardBody>
                            <div className="badge bg-primary mb-2">Caso 1: Resta Natural</div>
                            <h5 className="fw-bold" style={{ color: moradoPrincipal }}>
                              El juego de canicas
                            </h5>
                            <p className="text-secondary small">
                              Si Juan tiene 20 canicas y pierde 7:
                              <br />
                              <span className="fs-5 fw-bold text-dark">$20 - 7 = 13$ canicas.</span>
                            </p>
                          </CCardBody>
                        </CCard>
                      </CCol>
                      <CCol md={6} className="mb-4">
                        <CCard className="example-card h-100 bg-light border-0">
                          <CCardBody>
                            <div className="badge bg-success mb-2">
                              Caso 2: Multiplicación Decimal
                            </div>
                            <h5 className="fw-bold" style={{ color: moradoPrincipal }}>
                              Compras en el super
                            </h5>
                            <p className="text-secondary small">
                              3 litros de leche a $1.80 cada uno:
                              <br />
                              <span className="fs-5 fw-bold text-dark">
                                $1.80 \times 3 = 5.40$ euros.
                              </span>
                            </p>
                          </CCardBody>
                        </CCard>
                      </CCol>
                    </CRow>
                    <CButton
                      className="btn-action w-100"
                      href="https://www.portaleducativo.net/sexto-basico/407/Operaciones-con-numeros-decimales"
                      target="_blank"
                    >
                      Explorar más problemas resueltos
                    </CButton>
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

export default ModuloDecimalesYFracciones
