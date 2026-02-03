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
import numeracionImg from 'src/assets/images/numeracion.jpg'

const tabs = [
  { key: 'leccion', label: 'Lección', icon: cilBook },
  { key: 'video', label: 'Video', icon: cilVideo },
  { key: 'ejemplo', label: 'Ejemplos', icon: cilLightbulb },
]

const ModuloSistemasNumeracion = () => {
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
          }
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
                <h1 className="main-title-mod display-5">Sistemas de Numeración</h1>
                <p className="text-muted fs-5">
                  Fundamentos matemáticos para la computación y la vida diaria.
                </p>
              </div>

              {/* Tabs Estilizados */}
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
              <div className="mt-4 px-md-3">
                {activeTab === 'leccion' && (
                  <div className="animate__animated animate__fadeIn">
                    <h3 className="fw-bold mb-4" style={{ color: moradoAcento }}>
                      1. Conceptos Base
                    </h3>
                    <CRow className="align-items-center">
                      <CCol md={7}>
                        <p className="fs-5 text-dark leading-relaxed">
                          Un <strong>sistema de numeración</strong> es un conjunto de símbolos y
                          reglas que nos permiten construir todos los números válidos.
                        </p>
                        <p className="text-secondary">
                          La característica principal es su <strong>base</strong>, que indica el
                          número de símbolos distintos que utiliza (alfabeto numérico) y el valor de
                          cada posición.
                        </p>
                        <ul className="text-secondary mb-4">
                          <li>
                            <strong>Decimal:</strong> Base 10 (0-9) - Humano.
                          </li>
                          <li>
                            <strong>Binario:</strong> Base 2 (0-1) - Computadoras.
                          </li>
                          <li>
                            <strong>Hexadecimal:</strong> Base 16 (0-F) - Programación.
                          </li>
                        </ul>
                      </CCol>
                      <CCol md={5} className="text-center">
                        <div className="p-2 bg-white shadow-sm rounded-4">
                          <img
                            src={numeracionImg}
                            alt="Sistemas"
                            className="img-fluid rounded-4"
                            style={{ maxHeight: '250px' }}
                          />
                        </div>
                      </CCol>
                    </CRow>
                    <CButton className="btn-primary-custom w-100 mt-5 shadow text-white">
                      MARCAR LECCIÓN COMO COMPLETADA
                    </CButton>
                  </div>
                )}

                {activeTab === 'video' && (
                  <div className="text-center animate__animated animate__fadeIn">
                    <h3 className="fw-bold mb-4" style={{ color: moradoAcento }}>
                      Video Tutorial
                    </h3>
                    <div className="ratio ratio-16x9 shadow-lg rounded-4 overflow-hidden mb-4 border border-5 border-white">
                      <iframe
                        src="https://www.youtube.com/embed/vEtgv-xeeV0"
                        title="Video tutorial"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <p className="text-muted italic small">Fuente: Canal de Educación Matemática</p>
                  </div>
                )}

                {activeTab === 'ejemplo' && (
                  <div className="animate__animated animate__fadeIn">
                    <h3 className="fw-bold mb-4" style={{ color: moradoAcento }}>
                      Casos de Uso Real
                    </h3>

                    <CCard className="example-box mb-3 border-0 shadow-sm">
                      <CCardBody>
                        <h5 className="fw-bold" style={{ color: moradoPrincipal }}>
                          🌐 En la Tecnología (Binario)
                        </h5>
                        <p className="mb-0 text-secondary">
                          Cada color que ves en pantalla, cada letra de este texto y cada archivo de
                          sonido es, en el fondo, una larga cadena de <strong>0s y 1s</strong>{' '}
                          procesada por transistores.
                        </p>
                      </CCardBody>
                    </CCard>

                    <CCard className="example-box mb-4 border-0 shadow-sm">
                      <CCardBody>
                        <h5 className="fw-bold" style={{ color: moradoPrincipal }}>
                          💰 En el Comercio (Decimal)
                        </h5>
                        <p className="mb-0 text-secondary">
                          Nuestro sistema monetario es posicional y decimal. La posición de un
                          dígito en un precio (ej. $10 vs $01) cambia su valor por potencias de
                          diez.
                        </p>
                      </CCardBody>
                    </CCard>

                    <CButton
                      variant="outline-dark"
                      className="w-100 py-2 fw-bold"
                      style={{ borderRadius: '10px' }}
                    >
                      DESCARGAR GUÍA DE EJERCICIOS (PDF)
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

export default ModuloSistemasNumeracion
