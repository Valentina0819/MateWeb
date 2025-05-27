import { useState, useEffect } from "react";
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CCardTitle,
  CForm,
  CFormLabel,
  CFormSelect,
  CButton,
  CAlert,
} from "@coreui/react";

const AsignarMateria = () => {
  const [materias, setMaterias] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [codigoMateriaSeleccionada, setCodigoMateriaSeleccionada] = useState("");
  const [idSeccionSeleccionada, setIdSeccionSeleccionada] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Obtener usuario y rol
  const usuarioGuardado = localStorage.getItem("usuario");
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;

  useEffect(() => {
    obtenerMateriasYSecciones();
  }, []);

  const obtenerMateriasYSecciones = async () => {
    try {
      const resMaterias = await fetch("http://localhost:4000/materias");
      const dataMaterias = await resMaterias.json();
      setMaterias(dataMaterias.materias || []);

      const resSecciones = await fetch("http://localhost:4000/secciones");
      const dataSecciones = await resSecciones.json();
      setSecciones(dataSecciones.secciones || []);
    } catch (error) {
      console.error("Error obteniendo datos:", error);
    }
  };

  const handleAsignar = async (e) => {
    e.preventDefault();

    if (!codigoMateriaSeleccionada || !idSeccionSeleccionada) {
      setMensaje("Selecciona una materia y una sección.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/asignar-seccion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          codigo_materia: codigoMateriaSeleccionada,
          id_seccion: idSeccionSeleccionada
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMensaje("Materia asignada correctamente.");
        setCodigoMateriaSeleccionada("");
        setIdSeccionSeleccionada("");
      } else {
        setMensaje(`Error: ${data.mensaje}`);
      }
    } catch (error) {
      console.error("Error asignando materia:", error);
      setMensaje("Error en la conexión con el servidor.");
    }
  };

  return (
    <CContainer className="pt-2 pb-4 mb-5">
      <CRow className="justify-content-center">
        <CCol xs={12} md={8} lg={6}>
          <CCard className="shadow-sm">
            <CCardHeader className="" style={{ backgroundColor: "#0059b3", color: "white" }}>
              <CCardTitle>Asignar Materia a Sección</CCardTitle>
            </CCardHeader>
            <CCardBody>
              {mensaje && (
                <CAlert
                  color={mensaje.toLowerCase().includes("error") ? "danger" : "success"}
                  dismissible
                  onClose={() => setMensaje("")}
                >
                  {mensaje}
                </CAlert>
              )}
              {usuario?.rol === "admin" ? (
                <CForm onSubmit={handleAsignar}>
                  <CRow className="g-3 align-items-end">
                    <CCol md={12}>
                      <CFormLabel>Materia</CFormLabel>
                      <CFormSelect
                        value={codigoMateriaSeleccionada}
                        onChange={(e) => setCodigoMateriaSeleccionada(e.target.value)}
                        required
                      >
                        <option value="">Selecciona una materia</option>
                        {materias.map((materia) => (
                          <option key={materia.codigo_materia} value={materia.codigo_materia}>
                            {materia.nombre} - {materia.codigo_materia}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol md={12}>
                      <CFormLabel>Sección</CFormLabel>
                      <CFormSelect
                        value={idSeccionSeleccionada}
                        onChange={(e) => setIdSeccionSeleccionada(e.target.value)}
                        required
                      >
                        <option value="">Selecciona una sección</option>
                        {secciones.map((seccion) => (
                          <option key={seccion.id_seccion} value={seccion.id_seccion}>
                            {seccion.id_año} Año - Sección {seccion.nombre_seccion}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol md={12} className="d-grid mt-3">
                      <CButton color="primary" type="submit" size="lg">
                        Asignar Materia
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              ) : (
                <CAlert color="warning" className="mb-0">
                  Solo los administradores pueden asignar materias a secciones.
                </CAlert>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <div style={{ minHeight: 120 }} />
    </CContainer>
  );
};

export default AsignarMateria;