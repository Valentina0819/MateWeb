import React, { useState } from "react";
import {
  CButton, CCard, CCardBody, CCardHeader, CModal, CModalBody, CModalHeader, CModalTitle,
  CFormInput, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CFormLabel, CFormSelect, CAlert, CInputGroup, CInputGroupText, CCol
} from "@coreui/react";

const comunidades = [
  "Comunidad A",
  "Comunidad B",
  "Comunidad C",
  "Comunidad D"
];

const Damnificados = () => {
  const [showForm, setShowForm] = useState(false);
  const [damnificados, setDamnificados] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    telefono: "",
    comunidad: "",
    estado_salud: ""
  });
  const [errors, setErrors] = useState({});

  // Validaciones
  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "Nombre requerido";
    if (!form.apellido.trim()) newErrors.apellido = "Apellido requerido";
    if (!/^\d{8}$/.test(form.cedula)) newErrors.cedula = "Cédula debe tener 8 números";
    if (!/^\d{11}$/.test(form.telefono)) newErrors.telefono = "Teléfono debe tener 11 números";
    if (!form.comunidad) newErrors.comunidad = "Seleccione una comunidad";
    if (!form.estado_salud.trim()) newErrors.estado_salud = "Estado de salud requerido";
    return newErrors;
  };

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  // Guardar o actualizar damnificado
  const handleSave = (e) => {
    e.preventDefault();
    const val = validate();
    if (Object.keys(val).length) {
      setErrors(val);
      return;
    }
    if (selected) {
      setDamnificados((prev) =>
        prev.map((d) => (d.id === selected.id ? { ...form, id: d.id } : d))
      );
    } else {
      setDamnificados([...damnificados, { ...form, id: Date.now() }]);
    }
    setShowForm(false);
    setSelected(null);
    setForm({
      nombre: "",
      apellido: "",
      cedula: "",
      telefono: "",
      comunidad: "",
      estado_salud: ""
    });
    setErrors({});
  };

  // Editar
  const handleEdit = (damnificado) => {
    setSelected(damnificado);
    setForm({ ...damnificado });
    setShowForm(true);
    setErrors({});
  };

  // Eliminar
  const handleDelete = (id) => {
    setDamnificados(damnificados.filter((d) => d.id !== id));
  };

  // Abrir modal para agregar
  const handleAdd = () => {
    setSelected(null);
    setForm({
      nombre: "",
      apellido: "",
      cedula: "",
      telefono: "",
      comunidad: "",
      estado_salud: ""
    });
    setShowForm(true);
    setErrors({});
  };

  // Filtrado por cédula
  const filtered = damnificados.filter((d) =>
    d.cedula.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <CCard className="p-4 shadow-lg">
      <CCardHeader className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-info text-white">
        <h5 className="m-0">Registro de Damnificados</h5>
        <CInputGroup className="w-auto mt-2 mt-md-0">
          <CInputGroupText>Buscar cédula</CInputGroupText>
          <CFormInput
            type="text"
            placeholder="Ej: 12345678"
            value={filter}
            onChange={(e) => setFilter(e.target.value.replace(/\D/g, ""))}
            maxLength={8}
          />
        </CInputGroup>
      </CCardHeader>

      <CCardBody>
        <div className="d-flex justify-content-end mb-3">
          <CButton color="info text-white" onClick={handleAdd}>+ Agregar Damnificado</CButton>
        </div>

        <CTable striped hover responsive align="middle">
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell>Nombre</CTableHeaderCell>
              <CTableHeaderCell>Apellido</CTableHeaderCell>
              <CTableHeaderCell>Cédula</CTableHeaderCell>
              <CTableHeaderCell>Teléfono</CTableHeaderCell>
              <CTableHeaderCell>Comunidad</CTableHeaderCell>
              <CTableHeaderCell>Estado de Salud</CTableHeaderCell>
              <CTableHeaderCell className="text-end">Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filtered.map((d) => (
              <CTableRow key={d.id}>
                <CTableDataCell>{d.nombre}</CTableDataCell>
                <CTableDataCell>{d.apellido}</CTableDataCell>
                <CTableDataCell>{d.cedula}</CTableDataCell>
                <CTableDataCell>{d.telefono}</CTableDataCell>
                <CTableDataCell>{d.comunidad}</CTableDataCell>
                <CTableDataCell>{d.estado_salud}</CTableDataCell>
                <CTableDataCell className="text-end">
                  <CButton color="warning" size="sm" className="me-2" onClick={() => handleEdit(d)}>
                    Editar
                  </CButton>
                  <CButton color="danger" size="sm" onClick={() => handleDelete(d.id)}>
                    Eliminar
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
            {filtered.length === 0 && (
              <CTableRow>
                <CTableDataCell colSpan={7} className="text-center text-muted">
                  No hay damnificados registrados.
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* Modal para agregar/editar */}
      <CModal visible={showForm} onClose={() => setShowForm(false)}>
        <CModalHeader>
          <CModalTitle>{selected ? "Editar Damnificado" : "Agregar Damnificado"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form onSubmit={handleSave} autoComplete="off">
            <CCol className="mb-3">
              <CFormLabel>Nombre</CFormLabel>
              <CFormInput
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                invalid={!!errors.nombre}
                maxLength={30}
              />
              {errors.nombre && <CAlert color="danger" className="py-1 my-1">{errors.nombre}</CAlert>}
            </CCol>
            <CCol className="mb-3">
              <CFormLabel>Apellido</CFormLabel>
              <CFormInput
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                invalid={!!errors.apellido}
                maxLength={30}
              />
              {errors.apellido && <CAlert color="danger" className="py-1 my-1">{errors.apellido}</CAlert>}
            </CCol>
            <CCol className="mb-3">
              <CFormLabel>Cédula</CFormLabel>
              <CFormInput
                name="cedula"
                value={form.cedula}
                onChange={e => {
                  // Solo números y máximo 8 caracteres
                  if (e.target.value.length <= 8 && /^\d*$/.test(e.target.value)) {
                    handleChange(e);
                  }
                }}
                invalid={!!errors.cedula}
                maxLength={8}
                placeholder="Ej: 12345678"
              />
              {errors.cedula && <CAlert color="danger" className="py-1 my-1">{errors.cedula}</CAlert>}
            </CCol>
            <CCol className="mb-3">
              <CFormLabel>Teléfono</CFormLabel>
              <CFormInput
                name="telefono"
                value={form.telefono}
                onChange={e => {
                  // Solo números y máximo 11 caracteres
                  if (e.target.value.length <= 11 && /^\d*$/.test(e.target.value)) {
                    handleChange(e);
                  }
                }}
                invalid={!!errors.telefono}
                maxLength={11}
                placeholder="Ej: 04141234567"
              />
              {errors.telefono && <CAlert color="danger" className="py-1 my-1">{errors.telefono}</CAlert>}
            </CCol>
            <CCol className="mb-3">
              <CFormLabel>Comunidad</CFormLabel>
              <CFormSelect
                name="comunidad"
                value={form.comunidad}
                onChange={handleChange}
                invalid={!!errors.comunidad}
              >
                <option value="">Seleccione una comunidad...</option>
                {comunidades.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </CFormSelect>
              {errors.comunidad && <CAlert color="danger" className="py-1 my-1">{errors.comunidad}</CAlert>}
            </CCol>
            <CCol className="mb-3">
              <CFormLabel>Estado de Salud</CFormLabel>
              <CFormInput
                name="estado_salud"
                value={form.estado_salud}
                onChange={handleChange}
                invalid={!!errors.estado_salud}
                maxLength={30}
              />
              {errors.estado_salud && <CAlert color="danger" className="py-1 my-1">{errors.estado_salud}</CAlert>}
            </CCol>
            <div className="d-flex justify-content-end gap-2 mt-4">
              <CButton type="button" color="secondary" onClick={() => setShowForm(false)}>
                Cancelar
              </CButton>
              <CButton type="submit" color="info text-white">
                {selected ? "Actualizar" : "Registrar"}
              </CButton>
            </div>
          </form>
        </CModalBody>
      </CModal>
    </CCard>
  );
};

export default Damnificados;