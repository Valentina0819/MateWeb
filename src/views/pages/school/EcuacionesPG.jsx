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
import { cilFunctions, cilVideo, cilLightbulb, cilArrowLeft, cilSearch } from '@coreui/icons'
import ecuacionImg from 'src/assets/images/ecuacion.webp'

const tabs = [
  { key: 'leccion', label: 'Lección', icon: cilFunctions },
  { key: 'video', label: 'Video', icon: cilVideo },
  { key: 'ejemplo', label: 'Ejemplos', icon: cilLightbulb },
]

const EcuacionesPrimerGrado = () => {
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
          .formula-box {
            background: #f3f4f6;
            border-radius: 12px;
            padding: 15px;
            font-family: 'Courier New', Courier, monospace;
            border-left: 4px solid ${moradoAcento};
          }
          .step-badge {
            background: ${moradoAcento};
            color: white;
            border-radius: 50%;
            width: 28px;
            height: 28px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            font-size: 14px;
          }
          .btn-primary-custom {
            background-color: ${moradoPrincipal};
            border: none;
            padding: 12px;
            font-weight: bold;
            border-radius: 10px;
          }
          .btn-primary-custom:hover { background-color: ${moradoAcento}; color: white; }
        `}
      </style>

      {/* Botón Volver */}
      <CButton
        variant="ghost"
        className="mb-4 text-secondary d-flex align-items-center"
        onClick={() => navigate(-1)}
      >
        <CIcon icon={cilArrowLeft} className="me-2" /> Volver al panel
      </CButton>

      <CRow className="justify-content-center">
        <CCol lg={10} xl={9}>
          <CCard className="card-module p-3 p-md-4">
            <CCardBody>
              <div className="text-center mb-5">
                <h1 className="main-title-mod display-5">Ecuaciones de Primer Grado</h1>
                <p className="text-muted fs-5">El arte de encontrar el valor de la incógnita.</p>
              </div>

              {/* Tabs de Navegación */}
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
              <div className="animate__animated animate__fadeIn">
                {activeTab === 'leccion' && (
                  <CRow className="align-items-center">
                    <CCol md={7}>
                      <h3 className="fw-bold mb-4" style={{ color: moradoAcento }}>
                        ¿Qué es una Ecuación?
                      </h3>
                      <CCardText className="text-secondary fs-6">
                        Es una <strong>igualdad matemática</strong> entre dos expresiones.
                        Resolverla significa encontrar el valor de la "incógnita" (normalmente la
                        letra $x$) que hace que la igualdad sea cierta.
                      </CCardText>
                      <div className="formula-box my-4">
                        <span className="text-muted">Estructura básica:</span>
                        <h4
                          className="mt-2 mb-0 text-center fw-bold"
                          style={{ letterSpacing: '2px' }}
                        >
                          $ax + b = c$
                        </h4>
                      </div>
                      <p className="small text-muted italic">
                        *Se llaman de "primer grado" porque la incógnita no tiene exponentes (está
                        elevada a 1).
                      </p>
                    </CCol>
                    <CCol md={5} className="text-center">
                      <div className="p-3 bg-white shadow-sm rounded-4 border">
                        <img
                          src={ecuacionImg}
                          alt="Concepto de balanza en ecuaciones"
                          className="img-fluid rounded-3"
                          style={{ maxHeight: '200px' }}
                        />
                      </div>
                    </CCol>
                    <CCol xs={12} className="mt-4">
                      <CButton
                        className="btn-primary-custom w-100 shadow text-white"
                        onClick={() => navigate('/AlumnoDashboard')}
                      >
                        ¡EMPEZAR A RESOLVER!
                      </CButton>
                    </CCol>
                  </CRow>
                )}

                {activeTab === 'video' && (
                  <div className="text-center">
                    <h3 className="fw-bold mb-4" style={{ color: moradoAcento }}>
                      Aprende Visualmente
                    </h3>
                    <div className="ratio ratio-16x9 shadow-lg rounded-4 overflow-hidden mb-4 border border-4 border-white">
                      <iframe
                        src="https://www.youtube.com/embed/IHblqjW8RY8"
                        title="Video tutorial de ecuaciones"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <p className="text-muted small">
                      Mira los pasos para despejar la $x$ correctamente.
                    </p>
                  </div>
                )}

                {activeTab === 'ejemplo' && (
                  <div>
                    <h3 className="fw-bold mb-4" style={{ color: moradoAcento }}>
                      Resolución Paso a Paso
                    </h3>

                    <CCard
                      className="mb-4 border-0 shadow-sm bg-light"
                      style={{ borderRadius: '15px' }}
                    >
                      <CCardBody>
                        <h5 className="fw-bold mb-3" style={{ color: moradoPrincipal }}>
                          📝 Ejemplo: Despejando la incógnita
                        </h5>
                        <div className="mb-2">
                          <span className="step-badge">1</span> Restamos 2 a ambos lados: $3x = 11 -
                          2$
                        </div>
                        <div className="mb-2">
                          <span className="step-badge">2</span> Simplificamos: $3x = 9$
                        </div>
                        <div className="mb-2">
                          <span className="step-badge">3</span> Dividimos entre 3: $x = 9 / 3$
                        </div>
                        <hr />
                        <div className="text-center fw-bold fs-5 text-success">
                          ✅ Resultado: $x = 3$
                        </div>
                      </CCardBody>
                    </CCard>

                    <CButton
                      className="btn-primary-custom w-100 d-flex align-items-center justify-content-center"
                      href="https://www.superprof.es/apuntes/escolar/matematicas/algebra/ecuaciones/ejercicios-de-ecuaciones-de-primer-grado.html"
                      target="_blank"
                    >
                      <CIcon icon={cilSearch} className="me-2" /> Ver más ejercicios en la web
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

export default EcuacionesPrimerGrado
