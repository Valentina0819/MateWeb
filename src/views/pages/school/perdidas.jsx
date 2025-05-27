import React, { useState } from "react";
import {
  CCard, CCardBody, CCardHeader, CForm, CFormInput, CFormSelect, CButton, CCol, CRow, CAlert,
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CModal, CModalHeader, CModalTitle, CModalBody,
  CInputGroup, CInputGroupText
} from "@coreui/react";

// Simulación de comunidades (esto debería venir de la base de datos)
const comunidadesDB = [
  "Comunidad 1",
  "Comunidad 2",
  "Comunidad 3",
];

const tiposBien = [
  "Material",
  "Inmueble",
  "Vehículo",
  "Otro"
];

const Perdidas = () => {
  const [form, setForm] = useState({
    comunidad: "",
    tipo_bien: "",
    descripcion: "",
    valor_estimado: ""
  });
  const [errors, setErrors] = useState({});
  const [perdidas, setPerdidas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  // Validación de campos
  const validate = () => {
    const newErrors = {};
    if (!form.comunidad) newErrors.comunidad = "Seleccione una comunidad";
    if (!form.tipo_bien) newErrors.tipo_bien = "Seleccione el tipo de bien";
    if (!form.descripcion.trim()) newErrors.descripcion = "Descripción requerida";
    // Valor estimado: solo números y obligatorio
    if (!form.valor_estimado.trim()) newErrors.valor_estimado = "Valor estimado requerido";
    else if (!/^\d+(\.\d{1,2})?$/.test(form.valor_estimado)) newErrors.valor_estimado = "Solo números (puede usar decimales)";
    return newErrors;
  };

  // Control de cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Solo permitir números y punto en valor_estimado
    if (name === "valor_estimado") {
      if (/^\d*\.?\d{0,2}$/.test(value)) {
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: undefined });
      }
    } else {
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
    if (selected !== null) {
      // Editar
      setPerdidas(perdidas.map((p, idx) => idx === selected ? { ...form } : p));
    } else {
      // Crear
      setPerdidas([...perdidas, { ...form }]);
    }
    setForm({ comunidad: "", tipo_bien: "", descripcion: "", valor_estimado: "" });
    setErrors({});
    setShowForm(false);
    setSelected(null);
  };

  const handleEdit = (idx) => {
    setForm({ ...perdidas[idx] });
    setShowForm(true);
    setSelected(idx);
    setErrors({});
  };

  const handleDelete = (idx) => {
    setPerdidas(perdidas.filter((_, i) => i !== idx));
  };

  const handleAdd = () => {
    setForm({ comunidad: "", tipo_bien: "", descripcion: "", valor_estimado: "" });
    setShowForm(true);
    setSelected(null);
    setErrors({});
  };

  // Filtrado por búsqueda (comunidad, tipo de bien, descripción)
  const filtered = perdidas.filter((p) =>
    p.comunidad.toLowerCase().includes(search.toLowerCase()) ||
    p.tipo_bien.toLowerCase().includes(search.toLowerCase()) ||
    p.descripcion.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <CCard className="p-4 shadow-lg">
      <CCardHeader className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-danger text-white">
        <h5 className="" style={{ backgroundColor: "#0059b3", color: "white" }}>Registro de Pérdidas Materiales</h5>
        <CButton color="warning text-dark bg-white mt-2 mt-md-0" onClick={handleAdd}>+ Registrar Pérdida</CButton>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-3">
          <CCol md={6} lg={4}>
            <CInputGroup>
              <CInputGroupText>Buscar</CInputGroupText>
              <CFormInput
                placeholder="Comunidad, tipo o descripción"
                value={search}
                onChange={e => setSearch(e.target.value)}
                maxLength={40}
              />
            </CInputGroup>
          </CCol>
        </CRow>
        <CTable striped hover responsive align="middle">
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell>Comunidad</CTableHeaderCell>
              <CTableHeaderCell>Tipo de Bien</CTableHeaderCell>
              <CTableHeaderCell>Descripción</CTableHeaderCell>
              <CTableHeaderCell>Valor Estimado</CTableHeaderCell>
              <CTableHeaderCell className="text-end">Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filtered.length > 0 ? filtered.map((p, idx) => (
              <CTableRow key={idx}>
                <CTableDataCell>{p.comunidad}</CTableDataCell>
                <CTableDataCell>{p.tipo_bien}</CTableDataCell>
                <CTableDataCell>{p.descripcion}</CTableDataCell>
                <CTableDataCell>{p.valor_estimado}</CTableDataCell>
                <CTableDataCell className="text-end">
                  <CButton color="warning" size="sm" className="me-2" onClick={() => handleEdit(perdidas.indexOf(p))}>
                    Editar
                  </CButton>
                  <CButton color="danger" size="sm" onClick={() => handleDelete(perdidas.indexOf(p))}>
                    Eliminar
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            )) : (
              <CTableRow>
                <CTableDataCell colSpan={5} className="text-center text-muted">
                  No hay pérdidas registradas.
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
      </CCardBody>

      <CModal visible={showForm} onClose={() => setShowForm(false)}>
        <CModalHeader>
          <CModalTitle>{selected !== null ? "Editar Pérdida" : "Registrar Pérdida"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit} autoComplete="off">
            <CCol className="mb-3">
              <CFormSelect
                label="Comunidad"
                name="comunidad"
                value={form.comunidad}
                onChange={handleChange}
                invalid={!!errors.comunidad}
                required
              >
                <option value="">Seleccione una comunidad...</option>
                {comunidadesDB.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </CFormSelect>
              {errors.comunidad && <CAlert color="danger" className="py-1 my-1">{errors.comunidad}</CAlert>}
            </CCol>
            <CCol className="mb-3">
              <CFormSelect
                label="Tipo de Bien"
                name="tipo_bien"
                value={form.tipo_bien}
                onChange={handleChange}
                invalid={!!errors.tipo_bien}
                required
              >
                <option value="">Seleccione el tipo...</option>
                {tiposBien.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </CFormSelect>
              {errors.tipo_bien && <CAlert color="danger" className="py-1 my-1">{errors.tipo_bien}</CAlert>}
            </CCol>
            <CCol className="mb-3">
              <CFormInput
                label="Descripción"
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                maxLength={60}
                placeholder="Ej: Descripción de la perdida del bien"
                invalid={!!errors.descripcion}
                required
              />
              {errors.descripcion && <CAlert color="danger" className="py-1 my-1">{errors.descripcion}</CAlert>}
            </CCol>
            <CCol className="mb-3">
              <CFormInput
                label="Valor Estimado"
                name="valor_estimado"
                value={form.valor_estimado}
                onChange={handleChange}
                maxLength={12}
                placeholder="Ej: 15000.00"
                invalid={!!errors.valor_estimado}
                required
              />
              {errors.valor_estimado && <CAlert color="danger" className="py-1 my-1">{errors.valor_estimado}</CAlert>}
            </CCol>
            <div className="d-flex justify-content-end gap-2 mt-4">
              <CButton type="button" color="secondary" onClick={() => setShowForm(false)}>
                Cancelar
              </CButton>
              <CButton type="submit" color="danger text-white">
                {selected !== null ? "Actualizar" : "Registrar"}
              </CButton>
            </div>
          </CForm>
        </CModalBody>
      </CModal>
    </CCard>
  );
};

export default Perdidas;