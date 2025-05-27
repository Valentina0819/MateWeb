import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CButton,
  CAlert,
} from "@coreui/react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [materias, setMaterias] = useState([]);
  const [usuario, setUsuario] = useState(null);

  // 🔹 Cargar el usuario guardado en `localStorage`
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    console.log("Usuario guardado en localStorage:", usuarioGuardado); // 🔥 Depuración

    if (usuarioGuardado) {
      const usuarioParseado = JSON.parse(usuarioGuardado);
      setUsuario(usuarioParseado); // Guarda el objeto completo
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // 🔹 Obtener materias del docente desde el backend
  useEffect(() => {
    const obtenerMaterias = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:4000/recibir", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        return;
      }

      const data = await res.json();
      setMaterias(data);
    };

    obtenerMaterias();
  }, []);

  return (
    <CContainer className="py-4">
      <CRow className="justify-content-between align-items-center mb-4">
        <CCol xs={12} md={8}>
          <h2>
            Bienvenido Profesor(a), {" "}
            <span style={{ color: "#2c3e50" }}>
               {usuario?.usuario}
            </span>
          </h2>
        </CCol>
      </CRow>

      <CCard className="shadow-sm mb-4">
        <CCardHeader className="" style={{ backgroundColor: "#09515f", color: "white" }}>
          <CCardTitle className="mb-0">Tus Materias Asignadas</CCardTitle>
        </CCardHeader>
        <CCardBody>
          {materias.length > 0 ? (
            <CRow className="g-3">
              {materias.map((materia, index) => (
                <CCol xs={12} md={6} lg={4} key={index}>
                  <CCard className="h-100 border-0 shadow-sm">
                    <CCardBody>
                      <h5 className="fw-bold mb-2" style={{ color: "#9f3b06" }}>
                        {materia.materia}
                      </h5>
                      <div>
                        <strong>Sección:</strong> {materia.seccion}
                      </div>
                      <div>
                        <strong>Año:</strong> {materia.año} {/* 🔥 Agregado el campo de Año */}
                      </div>
                      <div>
                        <strong>Año Escolar:</strong> {materia.año_escolar}
                      </div>
                    </CCardBody>
                  </CCard>
                </CCol>
              ))}
            </CRow>
          ) : (
            <CAlert color="info" className="mb-0">
              No tienes materias asignadas.
            </CAlert>
          )}
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default Dashboard;