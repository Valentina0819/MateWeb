import React, { useState } from 'react';
import {
  CCard, CCardBody, CCardTitle, CCardText, CButton, CRow, CCol
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import numeroImg from 'src/assets/images/numero.webp';

const tabs = [
  { key: 'leccion', label: 'Lección' },
  { key: 'video', label: 'Video' },
  { key: 'ejemplo', label: 'Ejemplos' }
];

const MultiplosDivisores = () => {
  const [activeTab, setActiveTab] = useState('leccion');
  const navigate = useNavigate();

  return (
    <CRow className="justify-content-center" style={{ background: '#f4f8fb', minHeight: '100vh', paddingTop: 40 }}>
      <CCol xs={12} md={10} lg={8}>
        <CCard className="shadow-lg p-4" style={{ borderRadius: 18 }}>
          <CCardTitle className="display-5 fw-bold mb-2 text-center" style={{ color: '#114c5f' }}>
            Múltiplos y Divisores
          </CCardTitle>
          <CCardText className="mb-4 text-secondary text-center" style={{ fontSize: 20 }}>
            Descubre de forma sencilla y visual qué son los múltiplos y los divisores, con ejemplos, imágenes y un video explicativo.
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
                <h4 className="fw-bold mb-3" style={{ color: '#1976d2' }}>¿Qué son los múltiplos y los divisores?</h4>
                <CCard className="mb-4" style={{ background: '#e3f2fd', border: 'none' }}>
                  <CCardBody className="d-flex flex-column align-items-center">
                    <CCardText style={{ fontSize: 18 }}>
                      <strong>Múltiplo:</strong> Es el resultado de multiplicar un número por cualquier número entero. <br />
                      Por ejemplo, los múltiplos de 4 son: 4, 8, 12, 16, 20, ... <br /><br />
                      <strong>Divisor:</strong> Es un número que puede dividir a otro de manera exacta, sin dejar residuo.<br />
                      Por ejemplo, los divisores de 12 son: 1, 2, 3, 4, 6 y 12.
                    </CCardText>
                    <img
                      src={numeroImg}
                      alt="Ejemplo de múltiplos y divisores"
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
                <h4 className="fw-bold mb-3" style={{ color: '#1976d2' }}>Video: Múltiplos y Divisores</h4>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, marginBottom: 24 }}>
                  <iframe
                    src="https://www.youtube.com/embed/jifqWoTSK6o"
                    title="Video de múltiplos y divisores"
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
                  href="https://www.youtube.com/results?search_query=múltiplos+y+divisores"
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
                      <strong>Ejemplo de múltiplo:</strong><br />
                      Si tienes 3 cajas y en cada una pones 5 manzanas, tendrás 15 manzanas en total. <br />
                      El 15 es múltiplo de 5 porque 5 × 3 = 15.
                    </CCardText>
                  </CCardBody>
                </CCard>
                <CCard className="mb-4" style={{ background: '#e0f2fe', border: 'none' }}>
                  <CCardBody>
                    <CCardText style={{ fontSize: 17 }}>
                      <strong>Ejemplo de divisor:</strong><br />
                      Si tienes 18 caramelos y los repartes en 6 bolsas iguales, cada bolsa tendrá 3 caramelos.<br />
                      El 6 es divisor de 18 porque 18 ÷ 6 = 3 exacto.
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

export default MultiplosDivisores;
