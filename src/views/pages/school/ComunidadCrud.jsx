import React, { useState } from "react";
import {
  CCard, CCardBody, CCardHeader, CForm, CFormInput, CFormLabel, CFormSelect, CButton, CCol, CRow,
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CModal, CModalHeader, CModalTitle, CModalBody, CAlert
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

const ComunidadCrud = () => {
  const [comunidades, setComunidades] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    parroquia: "",
    fecha: "",
    desastre: ""
  });
  const [errors, setErrors] = useState({});
  const [filter, setFilter] = useState("");

  // Validaciones
  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "Nombre de la comunidad requerido";
    if (!form.parroquia) newErrors.parroquia = "Seleccione una parroquia";
    if (!form.fecha) newErrors.fecha = "Seleccione una fecha";
    if (!form.desastre) newErrors.desastre = "Seleccione un desastre";
    return newErrors;
  };

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  // Guardar o actualizar comunidad
  const handleSave = (e) => {
    e.preventDefault();
    const val = validate();
    if (Object.keys(val).length) {
      setErrors(val);
      return;
    }
    if (editing !== null) {
      setComunidades(comunidades.map((c, idx) =>
        idx === editing ? { ...form, id: c.id } : c
      ));
    } else {
      setComunidades([...comunidades, { ...form, id: Date.now() }]);
    }
    setShowForm(false);
    setEditing(null);
    setForm({
      nombre: "",
      parroquia: "",
      fecha: "",
      desastre: ""
    });
    setErrors({});
  };

  // Editar
  const handleEdit = (idx) => {
    setEditing(idx);
    setForm({ ...comunidades[idx] });
    setShowForm(true);
    setErrors({});
  };

  // Eliminar
  const handleDelete = (idx) => {
    setComunidades(comunidades.filter((_, i) => i !== idx));
  };

  // Abrir modal para agregar
  const handleAdd = () => {
    setEditing(null);
    setForm({
      nombre: "",
      parroquia: "",
      fecha: "",
      desastre: ""
    });
    setShowForm(true);
    setErrors({});
  };

  // Filtrado por nombre de comunidad
  const filtered = comunidades.filter((c) =>
    c.nombre.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <CCard className="p-4 shadow-lg">
      <CCardHeader className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-info text-white">
        <h5 className="m-0">Comunidades Registradas</h5>
        <div className="d-flex gap-2 align-items-center mt-2 mt-md-0">
          <CFormInput
            type="text"
            placeholder="Buscar comunidad..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{ maxWidth: 200 }}
          />
          
        </div>
      </CCardHeader>

      <CCardBody>
        <CTable striped hover responsive align="middle">
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell>Nombre</CTableHeaderCell>
              <CTableHeaderCell>Parroquia</CTableHeaderCell>
              <CTableHeaderCell>Fecha</CTableHeaderCell>
              <CTableHeaderCell>Desastre</CTableHeaderCell>
              <CTableHeaderCell className="text-end">Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filtered.map((c, idx) => (
              <CTableRow key={c.id}>
                <CTableDataCell>{c.nombre}</CTableDataCell>
                <CTableDataCell>{c.parroquia}</CTableDataCell>
                <CTableDataCell>{c.fecha}</CTableDataCell>
                <CTableDataCell>{c.desastre}</CTableDataCell>
                <CTableDataCell className="text-end">
                  <CButton color="warning" size="sm" className="me-2" onClick={() => handleEdit(idx)}>
                    Editar
                  </CButton>
                  <CButton color="danger" size="sm" onClick={() => handleDelete(idx)}>
                    Eliminar
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
            {filtered.length === 0 && (
              <CTableRow>
                <CTableDataCell colSpan={5} className="text-center text-muted">
                  No hay comunidades registradas.
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* Modal para registrar/editar comunidad */}
      <CModal visible={showForm} onClose={() => setShowForm(false)}>
        <CModalHeader>
          <CModalTitle>{editing !== null ? "Editar Comunidad" : "Registrar Comunidad"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSave} autoComplete="off">
            <CCol className="mb-3">
              <CFormLabel>Nombre de la comunidad</CFormLabel>
              <CFormInput
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                maxLength={50}
                placeholder="Ingrese el nombre de la comunidad"
                invalid={!!errors.nombre}
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
              >
                <option value="">Seleccione un desastre...</option>
                {desastres.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </CFormSelect>
              {errors.desastre && <CAlert color="danger" className="py-1 my-1">{errors.desastre}</CAlert>}
            </CCol>
            <CRow className="mt-4">
              <CCol className="d-flex justify-content-end gap-2">
                <CButton type="button" color="secondary" onClick={() => setShowForm(false)}>
                  Cancelar
                </CButton>
                <CButton type="submit" color="primary">
                  {editing !== null ? "Actualizar" : "Registrar"}
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
      </CModal>
    </CCard>
  );
};

export default ComunidadCrud;