import React, { useState } from "react";
import {
  CCard, CCardBody, CForm, CFormInput, CFormLabel, CFormSelect, CButton, CCol, CRow, CAlert
} from "@coreui/react";

// Simulación de datos que vendrían de la base de datos
const parroquias = [
  "Parroquia El Carmen",
  "Parroquia Santa Lucía",
  "Parroquia San Juan",
  "Parroquia La Vega"
];

const desastres = [
  "Inundación",
  "Deslizamiento",
  "Incendio",
  "Sismo"
];

const Comunidad = () => {
  const [form, setForm] = useState({
    nombre: "",
    parroquia: "",
    fecha: "",
    desastre: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Limpiar error al escribir
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!form.parroquia) newErrors.parroquia = "Seleccione una parroquia";
    if (!form.fecha) newErrors.fecha = "Seleccione una fecha";
    if (!form.desastre) newErrors.desastre = "Seleccione un desastre";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setSubmitted(true);
    if (Object.keys(validationErrors).length === 0) {
      // Aquí puedes enviar el formulario
      alert("Comunidad registrada correctamente");
      setForm({
        nombre: "",
        parroquia: "",
        fecha: "",
        desastre: ""
      });
      setSubmitted(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
      <CCard className="shadow-lg w-100" style={{ maxWidth: 600 }}>
        <CCardBody>
          <h3 className="mb-4 text-center text-black">Registro de Comunidad</h3>
          <CForm onSubmit={handleSubmit} autoComplete="off">
            <CCol className="mb-3">
              <CFormLabel>Nombre de la comunidad</CFormLabel>
              <CFormInput
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                maxLength={50}
                placeholder="Ingrese el nombre de la comunidad"
                invalid={!!errors.nombre}
                required
              />
              {errors.nombre && <CAlert color="danger" className="py-1 my-1">{errors.nombre}</CAlert>}
            </CCol>
            <CCol className="mb-3">
              <CFormLabel>Parroquia</CFormLabel>
              <CFormSelect
                name="parroquia"
                value={form.parroquia}
                onChange={handleChange}
                invalid={!!errors.parroquia}
                required
              >
                <option value="">Seleccione una parroquia...</option>
                {parroquias.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </CFormSelect>
              {errors.parroquia && <CAlert color="danger" className="py-1 my-1">{errors.parroquia}</CAlert>}
            </CCol>
            <CCol className="mb-3">
              <CFormLabel>Fecha</CFormLabel>
              <CFormInput
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
                invalid={!!errors.fecha}
                required
              />
              {errors.fecha && <CAlert color="danger" className="py-1 my-1">{errors.fecha}</CAlert>}
            </CCol>
            <CCol className="mb-3">
              <CFormLabel>Desastre ocurrido</CFormLabel>
              <CFormSelect
                name="desastre"
                value={form.desastre}
                onChange={handleChange}
                invalid={!!errors.desastre}
                required
              >
                <option value="">Seleccione un desastre...</option>
                {desastres.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </CFormSelect>
              {errors.desastre && <CAlert color="danger" className="py-1 my-1">{errors.desastre}</CAlert>}
            </CCol>
            <CRow className="mt-4">
              <CCol className="d-flex justify-content-center">
                <CButton color="info text-white" type="submit">
                  Registrar
                </CButton>
              </CCol>
            </CRow>
            {submitted && Object.keys(errors).length === 0 && (
              <CAlert color="success" className="mt-3 py-2 text-center">
                ¡Comunidad registrada correctamente!
              </CAlert>
            )}
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default Comunidad;