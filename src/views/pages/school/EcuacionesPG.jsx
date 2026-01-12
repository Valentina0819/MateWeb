import React, { useState } from 'react';
import { CCard, CCardBody, CCardTitle, CCardText, CButton, CRow, CCol } from '@coreui/react';
import ecuacionImg from 'src/assets/images/ecuacion.webp';

const tabs = [
  { key: 'leccion', label: 'Lección' },
  { key: 'video', label: 'Video' },
  { key: 'ejemplo', label: 'Ejemplos' },
];

const EcuacionesPrimerGrado = () => {
  const [activeTab, setActiveTab] = useState('leccion');

  return (
    <CRow className="justify-content-center" style={{ background: '#f4f8fb', minHeight: '100vh', paddingTop: 40 }}>
      <CCol xs={12} md={10} lg={8}>
        <CCard className="shadow-lg p-4" style={{ borderRadius: 18 }}>
          {/* Título principal */}
          <CCardTitle className="display-5 fw-bold mb-2 text-center" style={{ color: '#114c5f' }}>
            Ecuaciones de Primer grado
          </CCardTitle>
          {/* Subtítulo */}
          <CCardText className="mb-3 text-secondary text-center" style={{ fontSize: 20 }}>
            Aprende sobre las ecuaciones de primer grado y cómo resolverlas de manera sencilla y visual.
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
                <h4 className="fw-bold mb-2" style={{ color: '#1976d2' }}>¿Qué es una ecuación de primer grado?</h4>
                <CCard className="mb-4" style={{ background: '#e3f2fd', border: 'none' }}>
                  <CCardBody className="d-flex flex-column align-items-center">
                    <CCardText style={{ fontSize: 18 }}>
                      Una <strong>ecuación de primer grado</strong> es una igualdad matemática donde aparece una incógnita (generalmente representada con una letra, como x)
                      y esa incógnita no está elevada a ninguna potencia, es decir, tiene exponente 1.<br /><br />
                      <strong>Ejemplo:</strong> x + 5 = 12
                    </CCardText>
                    <img
                      src={ecuacionImg}
                      alt="Ejemplo de ecuación de primer grado"
                      style={{ maxWidth: 320, borderRadius: 14, marginTop: 18, boxShadow: '0 2px 8px #bdbdbd' }}
                    />
                  </CCardBody>
                </CCard>
                <CButton
                  color="dark"
                  className="w-100 rounded-pill py-2"
                  style={{ fontWeight: 'bold', fontSize: 18 }}
                >
                  Comenzar Lección
                </CButton>
              </>
            )}
            {activeTab === 'video' && (
              <div className="text-center">
                <h4 className="fw-bold mb-3">Video: Ecuaciones de Primer grado</h4>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, marginBottom: 24 }}>
                  <iframe
                    src="https://www.youtube.com/embed/IHblqjW8RY8"
                    title="Video de ecuaciones de primer grado"
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
                >
                  Comenzar Lección
                </CButton>
              </div>
            )}
            {activeTab === 'ejemplo' && (
              <>
                <h4 className="fw-bold mb-2">Ejemplos de ecuaciones de primer grado en la vida diaria</h4>
                <CCard className="mb-4" style={{ background: '#e0f2fe', border: 'none' }}>
                  <CCardBody>
                    <CCardText>
                      <strong>Ejemplo 1:</strong> <br />
                      Ahorros semanales<br />
                      Carlos ahorra 5 euros cada semana. Después de x semanas, ha ahorrado 25 euros.<br />
                      La ecuación es: 5x = 25<br />
                      Dividimos entre 5: x = 5<br />
                      Resultado: Carlos tardó 5 semanas en ahorrar los 25 euros.
                    </CCardText>
                  </CCardBody>
                </CCard>
                <CCard className="mb-4" style={{ background: '#e0f2fe', border: 'none' }}>
                  <CCardBody>
                    <CCardText>
                      <strong>Ejemplo 2:</strong> <br />
                      3x + 2 = 11 <br />
                      Primero restamos 2 a ambos lados: <br />
                      3x = 9 <br />
                      Luego dividimos entre 3: <br />
                      x = 9 ÷ 3 = 3 <br />
                      ✅ Respuesta: x = 3
                    </CCardText>
                  </CCardBody>
                </CCard>
                <CButton
                  color="dark"
                  className="w-100 rounded-pill py-2"
                  style={{ fontWeight: 'bold', fontSize: 18 }}
                  href="https://www.superprof.es/apuntes/escolar/matematicas/algebra/ecuaciones/ejercicios-de-ecuaciones-de-primer-grado.html"
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

export default EcuacionesPrimerGrado;

