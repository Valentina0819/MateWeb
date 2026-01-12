import React, { useState } from 'react';
import { CCard, CCardBody, CCardTitle, CCardText, CButton, CNav, CNavItem, CNavLink, CRow, CCol } from '@coreui/react';

const tabs = [
  { key: 'leccion', label: 'Lecciones' },
  { key: 'video', label: 'Videos' },
  { key: 'ejemplo', label: 'Ejemplos' },
];

const ModuloFraccionesOperaciones = () => {
  const [activeTab, setActiveTab] = useState('leccion');

  return (
    <CRow className="justify-content-center">
      <CCol xs={12}>
        <CCard className="shadow-lg p-4">
          {/* Título principal */}
          <CCardTitle className="display-5 fw-bold mb-2">
            Las fracciones y las operaciones
          </CCardTitle>
          {/* Subtítulo */}
          <CCardText className="mb-3 text-secondary">
            Aprende sobre las fracciones, sus términos y cómo operarlas de manera sencilla y visual.
          </CCardText>
          {/* Pestañas de navegación */}
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
                {/* Título de la lección */}
                <h4 className="fw-bold mb-2">Lección 5: Representación de la fracción y sus términos</h4>
                {/* Descripción introductoria */}
                <p className="mb-3">
                  Las fracciones son una forma de representar partes iguales de un todo. Una fracción está compuesta por dos números: el numerador (arriba), que indica cuántas partes se toman, y el denominador (abajo), que indica en cuántas partes se divide el todo.
                </p>
                {/* Caja de ejemplo */}
                <CCard className="mb-4" style={{ background: '#e0f2fe', border: 'none' }}>
                  <CCardBody>
                    <CCardText>
                      <strong>Ejemplo:</strong> <br />
                      Si tienes una pizza dividida en 4 partes iguales y tomas 3, la fracción que representa lo que tomaste es <b>3/4</b>.
                    </CCardText>
                
                  </CCardBody>
                </CCard>
                {/* Botón inferior */}
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
                <h4 className="fw-bold mb-3">Video: Representación de fracciones</h4>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, marginBottom: 24 }}>
                  <iframe
                    src="https://www.youtube.com/embed/7zK6kz5b1wI"
                    title="Video de fracciones"
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
                <h4 className="fw-bold mb-2">Ejemplos de fracciones en la vida diaria</h4>
                <CCard className="mb-4" style={{ background: '#e0f2fe', border: 'none' }}>
                  <CCardBody>
                    <CCardText>
                      <strong>Ejemplo 1:</strong> <br />
                      Si partes una barra de chocolate en 8 trozos y comes 5, has comido <b>5/8</b> de la barra.
                    </CCardText>
                    <img
                      src="https://i.imgur.com/8bQn4pQ.png"
                      alt="Ejemplo de chocolate"
                      style={{ maxWidth: 180, marginTop: 10 }}
                    />
                  </CCardBody>
                </CCard>
                <CCard className="mb-4" style={{ background: '#e0f2fe', border: 'none' }}>
                  <CCardBody>
                    <CCardText>
                      <strong>Ejemplo 2:</strong> <br />
                      Si un grupo de 10 estudiantes, 7 son niñas, entonces <b>7/10</b> del grupo son niñas.
                    </CCardText>
                    <img
                      src="https://i.imgur.com/4kQw6wF.png"
                      alt="Ejemplo de grupo"
                      style={{ maxWidth: 180, marginTop: 10 }}
                    />
                  </CCardBody>
                </CCard>
                <CButton
                  color="dark"
                  className="w-100 rounded-pill py-2"
                  style={{ fontWeight: 'bold', fontSize: 18 }}>
                  Comenzar Lección
                </CButton>
              </>
            )}
          </div>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ModuloFraccionesOperaciones;
