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

const AsignarMaterias = () => {
  const [docentes, setDocentes] = useState([]);
  const [añosMateria, setAñosMateria] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [añosEscolares, setAñosEscolares] = useState([]);
  const [idDocenteSeleccionado, setIdDocenteSeleccionado] = useState("");
  const [idAñoMateriaSeleccionado, setIdAñoMateriaSeleccionado] = useState("");
  const [idSeccionSeleccionada, setIdSeccionSeleccionada] = useState("");
  const [idAñoEscolarSeleccionado, setIdAñoEscolarSeleccionado] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Obtener usuario y rol
  const usuarioGuardado = localStorage.getItem("usuario");
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;

  useEffect(() => {
    obtenerDatosParaAsignar();
  }, []);

  const obtenerDatosParaAsignar = async () => {
    try {
      const res = await fetch("http://localhost:4000/asignar-materias");
      const data = await res.json();
      setDocentes(data.docentes || []);
      setAñosMateria(data.añosMateria || []);
      setSecciones(data.secciones || []);
      setAñosEscolares(data.añosEscolares || []);
    } catch (error) {
      console.error("Error obteniendo datos:", error);
    }
  };

  const handleAsignar = async (e) => {
    e.preventDefault();

    if (
      [idDocenteSeleccionado, idAñoMateriaSeleccionado, idSeccionSeleccionada, idAñoEscolarSeleccionado].some(
        (field) => !field || field.trim() === ""
      )
    ) {
      setMensaje("Selecciona todos los campos antes de asignar.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/asignar-docente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id_docente: idDocenteSeleccionado,
          id_año_materia: idAñoMateriaSeleccionado,
          id_seccion: idSeccionSeleccionada,
          fk_año_escolar: idAñoEscolarSeleccionado,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMensaje("Materias asignadas correctamente.");
        setIdDocenteSeleccionado("");
        setIdAñoMateriaSeleccionado("");
        setIdSeccionSeleccionada("");
        setIdAñoEscolarSeleccionado("");
      } else {
        setMensaje(`Error: ${data.mensaje}`);
      }
    } catch (error) {
      console.error("Error asignando materias:", error);
      setMensaje("Error en la conexión con el servidor.");
    }
  };

  return (
    <CContainer className="py-4">
      <CRow className="justify-content-center">
        <CCol xs={12} md={10} lg={8}>
          <CCard className="shadow-sm">
            <CCardHeader className="" style={{ backgroundColor: "#0059b3", color: "white" }}>
              <CCardTitle>Asignar Materias a Docentes</CCardTitle>
            </CCardHeader>
            <CCardBody>
              {usuario?.rol === "admin" ? (
                <>
                  {mensaje && (
                    <CAlert
                      color={mensaje.toLowerCase().includes("error") ? "danger" : "success"}
                      dismissible
                      onClose={() => setMensaje("")}
                    >
                      {mensaje}
                    </CAlert>
                  )}
                  <CForm onSubmit={handleAsignar}>
                    <CRow className="g-3 align-items-end">
                      <CCol md={6}>
                        <CFormLabel>Docente</CFormLabel>
                        <CFormSelect
                          value={idDocenteSeleccionado}
                          onChange={(e) => setIdDocenteSeleccionado(e.target.value)}
                          required
                        >
                          <option value="">Seleccione un docente</option>
                          {docentes.map((docente) => (
                            <option key={docente.id_docente} value={docente.id_docente}>
                              {docente.nombre} - {docente.cedula}
                            </option>
                          ))}
                        </CFormSelect>
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel>Materia</CFormLabel>
                        <CFormSelect
                          value={idAñoMateriaSeleccionado}
                          onChange={(e) => setIdAñoMateriaSeleccionado(e.target.value)}
                          required
                        >
                          <option value="">Seleccione una materia</option>
                          {añosMateria.map((materia) => (
                            <option key={materia.id_año_materia} value={materia.id_año_materia}>
                              {materia.codigo_materia} - {materia.nombre_materia}
                            </option>
                          ))}
                        </CFormSelect>
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel>Sección</CFormLabel>
                        <CFormSelect
                          value={idSeccionSeleccionada}
                          onChange={(e) => setIdSeccionSeleccionada(e.target.value)}
                          required
                        >
                          <option value="">Seleccione una sección</option>
                          {secciones.map((seccion) => (
                            <option key={seccion.id_seccion} value={seccion.id_seccion}>
                              {seccion.nombre_seccion} - {seccion.nombre_año}
                            </option>
                          ))}
                        </CFormSelect>
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel>Año Escolar</CFormLabel>
                        <CFormSelect
                          value={idAñoEscolarSeleccionado}
                          onChange={(e) => setIdAñoEscolarSeleccionado(e.target.value)}
                          required
                        >
                          <option value="">Seleccione año escolar</option>
                          {añosEscolares.map((a) => (
                            <option key={a.id_año_escolar} value={a.id_año_escolar}>
                              {a.nombre}
                            </option>
                          ))}
                        </CFormSelect>
                      </CCol>
                      <CCol md={12} className="d-grid mt-3">
                        <CButton color="" type="submit" size="lg" style={{backgroundColor: '#0059b3', color: 'white'}}>
                          Asignar Materias
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </>
              ) : (
                <CAlert color="warning" className="mb-0">
                  Solo los administradores pueden asignar materias a docentes.
                </CAlert>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default AsignarMaterias;