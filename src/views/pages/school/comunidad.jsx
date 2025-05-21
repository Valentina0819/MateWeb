import React, { useState } from "react";
import {
  CCard, CCardBody, CForm, CFormInput, CFormLabel, CFormSelect, CButton, CCol, CRow
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
      <CCard className="shadow-lg w-100" style={{ maxWidth: 600 }}>
        <CCardBody>
          <h3 className="mb-4 text-center text-black">Registro de Comunidad</h3>
          <CForm>
            <CCol className="mb-3">
              <CFormLabel>Nombre de la comunidad</CFormLabel>
              <CFormInput
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                maxLength={50}
                placeholder="Ingrese el nombre de la comunidad"
              />
            </CCol>
            <CCol className="mb-3">
              <CFormLabel>Parroquia</CFormLabel>
              <CFormSelect
                name="parroquia"
                value={form.parroquia}
                onChange={handleChange}
              >
                <option value="">Seleccione una parroquia...</option>
                {parroquias.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol className="mb-3">
              <CFormLabel>Fecha</CFormLabel>
              <CFormInput
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
              />
            </CCol>
            <CCol className="mb-3">
              <CFormLabel>Desastre ocurrido</CFormLabel>
              <CFormSelect
                name="desastre"
                value={form.desastre}
                onChange={handleChange}
              >
                <option value="">Seleccione un desastre...</option>
                {desastres.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </CFormSelect>
            </CCol>
            <CRow className="mt-4">
              <CCol className="d-flex justify-content-center">
                <CButton color="info text-white" enabled>
                  Registrar
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default Comunidad;