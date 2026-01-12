import React, { useState } from "react";
import {
  CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CFormCheck, CSpinner, CContainer
} from "@coreui/react";

const preguntasQuiz = [
  {
    pregunta: "¿Cuál es el resultado de 15 × 8?",
    opciones: ["120", "123", "112", "100"],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Cuánto es 25 + 17?",
    opciones: ["32", "42", "40", "38"],
    respuestaCorrecta: 1
  },
  {
    pregunta: "¿Cuál es el doble de 14?",
    opciones: ["24", "28", "18", "30"],
    respuestaCorrecta: 1
  },
  {
    pregunta: "¿Cuánto es 81 ÷ 9?",
    opciones: ["8", "9", "7", "6"],
    respuestaCorrecta: 1
  },
  {
    pregunta: "¿Cuál es el resultado de 7 × 6?",
    opciones: ["42", "36", "40", "48"],
    respuestaCorrecta: 0
  }
];

const QuizOperaciones = () => {
  const [nivel, setNivel] = useState(0);
  const [seleccionada, setSeleccionada] = useState(null);
  const [puntaje, setPuntaje] = useState(0);
  const [guardando, setGuardando] = useState(false);
  const [finalizado, setFinalizado] = useState(false);

  const handleSiguiente = () => {
    if (seleccionada === null) return;
    setGuardando(true);
    setTimeout(() => {
      if (seleccionada === preguntasQuiz[nivel].respuestaCorrecta) {
        setPuntaje(p => p + 20);
      }
      if (nivel + 1 < preguntasQuiz.length) {
        setNivel(nivel + 1);
        setSeleccionada(null);
      } else {
        setFinalizado(true);
      }
      setGuardando(false);
    }, 500);
  };

  return (
    <CContainer className="py-4" style={{ minHeight: "100vh", background: "#e3f2fd" }}>
      {/* Título principal */}
      <CRow>
        <CCol>
          <h2 className="fw-bold text-center mb-4" style={{ color: "#1976d2" }}>
            Quiz de Operaciones
          </h2>
        </CCol>
        {/* Marcador de puntaje */}
        <CCol xs="auto" className="d-flex align-items-center justify-content-end">
          <div style={{
            background: "#fff", borderRadius: 16, padding: "8px 24px",
            fontWeight: "bold", fontSize: 20, color: "#1976d2", boxShadow: "0 2px 8px #1976d220"
          }}>
            {puntaje} puntos
          </div>
        </CCol>
      </CRow>
      <CRow className="justify-content-center mt-3">
        <CCol xs={12} md={8} lg={6}>
          <CCard className="shadow-lg border-0" style={{ borderRadius: 24 }}>
            <CCardHeader className="bg-white text-center" style={{ borderRadius: "24px 24px 0 0" }}>
              <h4 className="fw-bold mb-0" style={{ color: "#1976d2" }}>Quiz de Matemáticas</h4>
            </CCardHeader>
            <CCardBody>
              {finalizado ? (
                <div className="text-center py-5">
                  <h3 className="fw-bold mb-3" style={{ color: "#388e3c" }}>¡Quiz finalizado!</h3>
                  <p className="fs-4">Tu puntaje final es:</p>
                  <div style={{
                    fontSize: 48, fontWeight: "bold", color: "#1976d2", marginBottom: 16
                  }}>{puntaje} / {preguntasQuiz.length * 20}</div>
                  <CButton color="primary" size="lg" onClick={() => {
                    setNivel(0); setPuntaje(0); setFinalizado(false); setSeleccionada(null);
                  }}>Reintentar</CButton>
                </div>
              ) : (
                <>
                  <div className="mb-4 text-center" style={{ fontSize: 18, color: "#444" }}>
                    <b>Nivel {nivel + 1} de {preguntasQuiz.length}</b>
                  </div>
                  <div className="mb-4 text-center" style={{ fontSize: 22, color: "#1976d2" }}>
                    {preguntasQuiz[nivel].pregunta}
                  </div>
                  <div className="mb-4">
                    {preguntasQuiz[nivel].opciones.map((op, idx) => (
                      <CFormCheck
                        key={idx}
                        type="radio"
                        name="opcion"
                        id={`opcion${idx}`}
                        label={op}
                        checked={seleccionada === idx}
                        onChange={() => setSeleccionada(idx)}
                        className="mb-2"
                        style={{
                          background: "#f5faff",
                          borderRadius: 12,
                          padding: "12px 16px",
                          fontSize: 18,
                          border: seleccionada === idx ? "2px solid #1976d2" : "1px solid #b0bec5"
                        }}
                        disabled={guardando}
                      />
                    ))}
                  </div>
                  <div className="d-flex justify-content-center">
                    <CButton
                      color="primary"
                      size="lg"
                      style={{ minWidth: 220, fontSize: 22, borderRadius: 16 }}
                      onClick={handleSiguiente}
                      disabled={seleccionada === null || guardando}
                    >
                      {guardando ? <CSpinner size="sm" /> : "Siguiente Pregunta"}
                    </CButton>
                  </div>
                </>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default QuizOperaciones;

