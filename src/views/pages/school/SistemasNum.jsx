import React, { useState } from 'react';
import { CCard, CCardBody, CCardTitle, CCardText, CButton, CRow, CCol } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import numeracionImg from 'src/assets/images/numeracion.jpg';

const tabs = [
  { key: 'leccion', label: 'Lección' },
  { key: 'video', label: 'Video' },
  { key: 'ejemplo', label: 'Ejemplos' },
];

const ModuloSistemasNumeracion = () => {
  const [activeTab, setActiveTab] = useState('leccion');
  const navigate = useNavigate();

  return (
    <CRow className="justify-content-center" style={{ background: '#f4f8fb', minHeight: '100vh', paddingTop: 40 }}>
      <CCol xs={12} md={10} lg={8}>
        <CCard className="shadow-lg p-4" style={{ borderRadius: 18 }}>
          <CCardTitle className="display-5 fw-bold mb-2 text-center" style={{ color: '#114c5f' }}>
            Sistemas de Numeración
          </CCardTitle>
          <CCardText className="mb-4 text-secondary text-center" style={{ fontSize: 20 }}>
            Aprende sobre los sistemas de numeración y cómo operarlos de manera sencilla y visual.
          </CCardText>
          {/* Tabs */}
          <div className="d-flex justify-content-center mb-4" style={{ gap: 16 }}>
            {tabs.map(tab => (
              <CButton
                key={tab.key}
                color={activeTab === tab.key ? 'info' : 'light'}
                className="flex-fill"
                style={{
                  minWidth: 140,
                  maxWidth: 200,
                  fontWeight: activeTab === tab.key ? 'bold' : 'normal',
                  borderRadius: 8,
                  background: activeTab === tab.key ? '#e0f7fa' : '#f3f4f6',
                  color: activeTab === tab.key ? '#114c5f' : '#222',
                  boxShadow: activeTab === tab.key ? '0 2px 8px #b2ebf2' : 'none',
                  border: 'none',
                  fontSize: 17
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
                <h4 className="fw-bold mb-3" style={{ color: '#1976d2' }}>¿Qué es un sistema de numeración?</h4>
                <CCard className="mb-4" style={{ background: '#e3f2fd', border: 'none' }}>
                  <CCardBody className="d-flex flex-column align-items-center">
                    <CCardText style={{ fontSize: 18 }}>
                      Un <strong>sistema de numeración</strong> es un conjunto de reglas y símbolos que se utilizan para representar cantidades o números. <br />
                      Los sistemas más conocidos son el decimal (base 10), binario (base 2), octal (base 8) y hexadecimal (base 16).<br /><br />
                      <strong>Ejemplo:</strong> El sistema decimal usa los dígitos del 0 al 9. El sistema binario solo usa 0 y 1.
                    </CCardText>
                    <img
                      src={numeracionImg}
                      alt="Ejemplo de sistemas de numeración"
                      style={{ maxWidth: 320, borderRadius: 14, marginTop: 18, boxShadow: '0 2px 8px #bdbdbd' }}
                    />
                  </CCardBody>
                </CCard>
                <CButton
                  color="info"
                  className="w-100 rounded-pill py-2"
                  style={{ fontWeight: 'bold', fontSize: 18 }}
                  onClick={() => navigate('/AlumnoDashboard')}
                >
                  ¡Comenzar lección!
                </CButton>
              </>
            )}
            {activeTab === 'video' && (
              <div className="text-center">
                <h4 className="fw-bold mb-3" style={{ color: '#1976d2' }}>Video: Sistemas de Numeración</h4>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, marginBottom: 24 }}>
                  <iframe
                    src="https://www.youtube.com/embed/vEtgv-xeeV0"
                    title="Video de sistemas de numeración"
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
                  color="info"
                  className="w-100 rounded-pill py-2"
                  style={{ fontWeight: 'bold', fontSize: 18 }}
                  href="https://www.youtube.com/results?search_query=sistemas+de+numeracion"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver más videos
                </CButton>
              </div>
            )}
            {activeTab === 'ejemplo' && (
              <>
                <h4 className="fw-bold mb-3" style={{ color: '#1976d2' }}>Ejemplos prácticos</h4>
                <CCard className="mb-4" style={{ background: '#e0f2fe', border: 'none' }}>
                  <CCardBody>
                    <CCardText style={{ fontSize: 17 }}>
                      <strong>Ejemplo 1:</strong> <br />
                      <strong>Sistema decimal:</strong> Cuando pagas $4.75, usas el sistema decimal (base 10). Los billetes y monedas están basados en múltiplos de 10 (1, 10, 100…).
                    </CCardText>
                  </CCardBody>
                </CCard>
                <CCard className="mb-4" style={{ background: '#e0f2fe', border: 'none' }}>
                  <CCardBody>
                    <CCardText style={{ fontSize: 17 }}>
                      <strong>Ejemplo 2:</strong> <br />
                      <strong>Sistema binario:</strong> Las computadoras usan el sistema binario, que solo tiene dos símbolos: 0 y 1. Por ejemplo, el número 5 en binario es 101.
                    </CCardText>
                  </CCardBody>
                </CCard>
                <CButton
                  color="info"
                  className="w-100 rounded-pill py-2"
                  style={{ fontWeight: 'bold', fontSize: 18 }}>
                  ¡Ver más ejemplos!
                </CButton>
              </>
            )}
          </div>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ModuloSistemasNumeracion;

