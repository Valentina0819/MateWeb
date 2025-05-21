import React, { useState } from "react";
import {
  CCard, CCardBody, CForm, CFormInput, CFormLabel, CFormSelect, CButton, CCol, CRow, CAlert
} from "@coreui/react";

const Donantes = () => {
  const [form, setForm] = useState({
    identificador: "",
    nombre: "",
    tipo: "",
    telefono: ""
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    // Validación de cédula o RIF: solo números o formato J-12345678-9
    if (
      !form.identificador.trim() ||
      (!/^\d{7,10}$/.test(form.identificador) && !/^([VEJPG]-)?\d{7,9}-?\d?$/.test(form.identificador))
    ) {
      newErrors.identificador = "Ingrese una cédula (solo números) o RIF válido (Ej: J-12345678-9)";
    }
    if (!form.nombre.trim()) newErrors.nombre = "Nombre requerido";
    if (!form.tipo) newErrors.tipo = "Seleccione el tipo";
    if (!/^\d{11}$/.test(form.telefono)) newErrors.telefono = "Teléfono debe tener 11 números";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = validate();
    if (Object.keys(val).length) {
      setErrors(val);
      return;
    }
    alert("Donante registrado correctamente (aquí iría la lógica de guardado)");
    setForm({
      identificador: "",
      nombre: "",
      tipo: "",
      telefono: ""
    });
    setErrors({});
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
      <CCard className="shadow-lg w-100 " style={{ maxWidth: 500 }}>
        <CCardBody>
          <h3 className="mb-4 text-center text-black">Registro de Donante</h3>
          <CForm onSubmit={handleSubmit} autoComplete="off">
            <CCol className="mb-3">
              <CFormLabel>Cédula o RIF</CFormLabel>
              <CFormInput
                name="identificador"
                value={form.identificador}
                onChange={handleChange}
                maxLength={12}
                placeholder="Ej: 12345678 o J-12345678-9"
                invalid={!!errors.identificador}
              />
              {errors.identificador && <CAlert color="danger" className="py-1 my-1">{errors.identificador}</CAlert>}
            </CCol>
            <CCol className="mb-3">
              <CFormLabel>Nombre</CFormLabel>
              <CFormInput
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                maxLength={50}
                placeholder="Ingrese el nombre"
                invalid={!!errors.nombre}
              />
              {errors.nombre && <CAlert color="danger" className="py-1 my-1">{errors.nombre}</CAlert>}
            </CCol>
            <CCol className="mb-3">
              <CFormLabel>Tipo de Institución</CFormLabel>
              <CFormSelect
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                invalid={!!errors.tipo}
              >
                <option value="">Seleccione...</option>
                <option value="Persona">Persona</option>
                <option value="Institución">Institución</option>
              </CFormSelect>
              {errors.tipo && <CAlert color="danger" className="py-1 my-1">{errors.tipo}</CAlert>}
            </CCol>
            <CCol className="mb-3">
              <CFormLabel>Teléfono</CFormLabel>
              <CFormInput
                name="telefono"
                value={form.telefono}
                onChange={e => {
                  if (e.target.value.length <= 11 && /^\d*$/.test(e.target.value)) {
                    handleChange(e);
                  }
                }}
                maxLength={11}
                placeholder="Ej: 04141234567"
                invalid={!!errors.telefono}
              />
              {errors.telefono && <CAlert color="danger" className="py-1 my-1">{errors.telefono}</CAlert>}
            </CCol>
            <CRow className="mt-4">
              <CCol className="d-flex justify-content-center">
                <CButton color="info text-white" type="submit">
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

export default Donantes;