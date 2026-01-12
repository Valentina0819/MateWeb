import React, { useState } from 'react';
import { CCard, CCardBody, CCardTitle, CCardText, CButton, CRow, CCol } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import operacionesImg from 'src/assets/images/operaciones.gif';

const tabs = [
  { key: 'leccion', label: 'Lección' },
  { key: 'video', label: 'Video' },
  { key: 'ejemplo', label: 'Ejemplos' },
];

const ModuloDecimalesYFracciones = () => {
  const [activeTab, setActiveTab] = useState('leccion');
  const navigate = useNavigate();

  return (
    <CRow className="justify-content-center" style={{ background: '#f4f8fb', minHeight: '100vh', paddingTop: 40 }}>
      <CCol xs={12} md={10} lg={8}>
        <CCard className="shadow-lg p-4" style={{ borderRadius: 18 }}>
          <CCardTitle className="display-5 fw-bold mb-2 text-center" style={{ color: '#114c5f' }}>
            Operaciones con números naturales y decimales
          </CCardTitle>
          <CCardText className="mb-4 text-secondary text-center" style={{ fontSize: 20 }}>
            Aprende sobre las operaciones con números naturales y decimales y cómo resolverlas de manera sencilla y visual.
          </CCardText>
          {/* Tabs */}
          <div className="d-flex justify-content-center mb-4" style={{ gap: 16 }}>
            {tabs.map(tab => (
              <CButton
                key={tab.key}
                color={activeTab === tab.key ? 'secondary' : 'light'}
                className="flex-fill"
                style={{
                  minWidth: 140,
                  maxWidth: 200,
                  fontWeight: activeTab === tab.key ? 'bold' : 'normal',
                  borderRadius: 8,
                  background: activeTab === tab.key ? '#e5e7eb' : '#f3f4f6',
                  color: '#222',
                  boxShadow: activeTab === tab.key ? '0 2px 8px #e5e7eb' : 'none',
                  border: 'none',
                }}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </CButton>
            ))}
          </div>
          {/* Contenido de la pestaña activa */}
          <div>
            {activeTab === 'leccion' && (
              <>
                <h4 className="fw-bold mb-2" style={{ color: '#1976d2' }}>¿Qué son las operaciones con números naturales y decimales?</h4>
                <CCard className="mb-4" style={{ background: '#e3f2fd', border: 'none' }}>
                  <CCardBody className="d-flex flex-column align-items-center">
                    <CCardText style={{ fontSize: 18 }}>
                      Las <strong>operaciones con números naturales y decimales</strong> son acciones matemáticas que realizamos para resolver problemas que implican contar, medir o calcular.<br />
                      Las operaciones básicas son: suma, resta, multiplicación y división.<br /><br />
                      <strong>Números naturales:</strong> 0, 1, 2, 3, ...<br />
                      <strong>Números decimales:</strong> 2.5, 3.75, 0.1, etc.
                    </CCardText>
                    <img
                      src={operacionesImg}
                      alt="Operaciones con números"
                      style={{ maxWidth: 320, borderRadius: 14, marginTop: 18, boxShadow: '0 2px 8px #bdbdbd' }}
                    />
                  </CCardBody>
                </CCard>
                <CButton
                  color="dark"
                  className="w-100 rounded-pill py-2"
                  style={{ fontWeight: 'bold', fontSize: 18 }}
                  onClick={() => navigate('/AlumnoDashboard')}
                >
                  Comenzar Lección
                </CButton>
              </>
            )}
            {activeTab === 'video' && (
              <div className="text-center">
                <h4 className="fw-bold mb-3">Video: Operaciones con números decimales</h4>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, marginBottom: 24 }}>
                  <iframe
                    src="https://www.youtube.com/embed/zWAoNqzBxXU"
                    title="Video de operaciones con decimales"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 0,
                      borderRadius: 12,
                    }}
                    allowFullScreen
                  />
                </div>
                <CButton
                  color="dark"
                  className="w-100 rounded-pill py-2"
                  style={{ fontWeight: 'bold', fontSize: 18 }}
                  onClick={() => navigate('/AlumnoDashboard')}
                >
                  Comenzar Lección
                </CButton>
              </div>
            )}
            {activeTab === 'ejemplo' && (
              <>
                <h4 className="fw-bold mb-2" style={{ color: '#1976d2' }}>Ejemplos de operaciones en la vida diaria</h4>
                <CCard className="mb-4" style={{ background: '#e0f2fe', border: 'none' }}>
                  <CCardBody>
                    <CCardText>
                      <strong>Ejemplo 1:</strong> <br />
                      Juan tenía 20 canicas y perdió 7 mientras jugaba.<br />
                      Operación: 20 − 7 = 13 canicas.<br />
                      Resultado: A Juan le quedan 13 canicas.
                    </CCardText>
                  </CCardBody>
                </CCard>
                <CCard className="mb-4" style={{ background: '#e0f2fe', border: 'none' }}>
                  <CCardBody>
                    <CCardText>
                      <strong>Ejemplo 2:</strong> <br />
                      Cada litro de leche cuesta 1,80 euros. Si compramos 3 litros, ¿cuánto pagamos en total?<br />
                      Operación: 1,80 × 3 = 5,40 euros.<br />
                      Resultado: El total a pagar es 5,40 euros.
                    </CCardText>
                  </CCardBody>
                </CCard>
                <CButton
                  color="dark"
                  className="w-100 rounded-pill py-2"
                  style={{ fontWeight: 'bold', fontSize: 18 }}
                  href="https://www.portaleducativo.net/sexto-basico/407/Operaciones-con-numeros-decimales"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver más ejemplos
                </CButton>
              </>
            )}
          </div>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ModuloDecimalesYFracciones;

