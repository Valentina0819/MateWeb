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
    // Solo letras y espacios para nombre
    if (!form.nombre.trim()) {
      newErrors.nombre = "Nombre requerido";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(form.nombre)) {
      newErrors.nombre = "Solo letras y espacios";
    }
    if (!form.tipo) newErrors.tipo = "Seleccione el tipo";
    // Solo números para teléfono
    if (!/^\d{11}$/.test(form.telefono)) {
      newErrors.telefono = "Teléfono debe tener 11 números";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Solo permitir letras en nombre
    if (name === "nombre") {
      if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: undefined });
      }
    }
    // Solo permitir números y guiones en identificador
    else if (name === "identificador") {
      if (/^[VEJPG\-0-9]*$/.test(value)) {
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: undefined });
      }
    }
    // Solo permitir números en teléfono
    else if (name === "telefono") {
      if (/^\d*$/.test(value) && value.length <= 11) {
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: undefined });
      }
    }
    // Otros campos
    else {
      setForm({ ...form, [name]: value });
      setErrors({ ...errors, [name]: undefined });
    }
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
          <h3 className="" style={{ backgroundColor: "#0059b3", color: "white" }}>Registro de Donante</h3>
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
                required
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
                required
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
                required
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
                onChange={handleChange}
                maxLength={11}
                placeholder="Ej: 04141234567"
                invalid={!!errors.telefono}
                required
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