import React, { useState } from "react";
import {
  CButton, CCard, CCardBody, CCardHeader, CModal, CModalBody, CModalHeader, CModalTitle,
  CForm, CFormInput, CFormLabel, CFormSelect, CCol, CRow, CTable, CTableHead, CTableRow,
  CTableHeaderCell, CTableBody, CTableDataCell, CAlert
} from "@coreui/react";

// Simulación de donantes y comunidades desde la "base de datos"
const donantesDB = [
  { id: 1, nombre: "Juan Pérez" },
  { id: 2, nombre: "Fundación Esperanza" },
  { id: 3, nombre: "María Gómez" }
];

const comunidadesDB = [
  "Barrio El Hoyo",
  "San Sebastian",
  "La Playa",
  "La Vega"
];

const tiposDonacion = [
  "Ropa",
  "Alimentos",
  "Dinero",
  "Medicinas",
  "Otros bienes"
];

const Donaciones = () => {
  const [showForm, setShowForm] = useState(false);
  const [donaciones, setDonaciones] = useState([]);
  const [selectedDonacion, setSelectedDonacion] = useState(null);
  const [filter, setFilter] = useState("");
  const [form, setForm] = useState({
    donante: "",
    tipo_donacion: "",
    cantidad: "",
    fecha_donacion: "",
    comunidad: ""
  });
  const [errors, setErrors] = useState({});

  // Validaciones
  const validate = () => {
    const newErrors = {};
    if (!form.donante) newErrors.donante = "Seleccione un donante";
    if (!form.tipo_donacion) newErrors.tipo_donacion = "Seleccione el tipo de donación";
    if (!form.cantidad || isNaN(form.cantidad) || Number(form.cantidad) <= 0) newErrors.cantidad = "Ingrese una cantidad válida";
    if (!form.fecha_donacion) newErrors.fecha_donacion = "Seleccione una fecha";
    if (!form.comunidad) newErrors.comunidad = "Seleccione una comunidad";
    return newErrors;
  };

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  // Guardar o actualizar donación
  const handleSave = (e) => {
    e.preventDefault();
    const val = validate();
    if (Object.keys(val).length) {
      setErrors(val);
      return;
    }
    if (selectedDonacion) {
      setDonaciones((prev) =>
        prev.map((d) => (d.id === selectedDonacion.id ? { ...form, id: d.id } : d))
      );
    } else {
      setDonaciones([...donaciones, { ...form, id: Date.now() }]);
    }
    setShowForm(false);
    setSelectedDonacion(null);
    setForm({
      donante: "",
      tipo_donacion: "",
      cantidad: "",
      fecha_donacion: "",
      comunidad: ""
    });
    setErrors({});
  };

  // Editar
  const handleEdit = (donacion) => {
    setSelectedDonacion(donacion);
    setForm({ ...donacion });
    setShowForm(true);
    setErrors({});
  };

  // Eliminar
  const handleDelete = (id) => {
    setDonaciones(donaciones.filter((d) => d.id !== id));
  };

  // Abrir modal para agregar
  const handleAdd = () => {
    setSelectedDonacion(null);
    setForm({
      donante: "",
      tipo_donacion: "",
      cantidad: "",
      fecha_donacion: "",
      comunidad: ""
    });
    setShowForm(true);
    setErrors({});
  };

  // Filtrado por donante, tipo, comunidad
  const filtered = donaciones.filter((d) =>
    (d.donante?.toLowerCase() || "").includes(filter.toLowerCase()) ||
    (d.tipo_donacion?.toLowerCase() || "").includes(filter.toLowerCase()) ||
    (d.comunidad?.toLowerCase() || "").includes(filter.toLowerCase())
  );

  return (
    <CCard className="p-4 shadow-lg">
      <CCardHeader className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-info text-white">
        <h5 className="m-0">Registro de Donaciones</h5>
        <CFormInput
          type="text"
          placeholder="Buscar donación..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-100 w-md-25 mt-2 mt-md-0"
        />
      </CCardHeader>

      <CCardBody>
        <div className="d-flex justify-content-end mb-3">
          <CButton color="info text-white" onClick={handleAdd}>+ Agregar Donación</CButton>
        </div>

        {/* Modal para agregar/editar donación */}
        <CModal visible={showForm} onClose={() => setShowForm(false)}>
          <CModalHeader>
            <CModalTitle>{selectedDonacion ? "Editar Donación" : "Agregar Donación"}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={handleSave} autoComplete="off">
              <CCol className="mb-3">
                <CFormLabel>Donante</CFormLabel>
                <CFormSelect
                  name="donante"
                  value={form.donante}
                  onChange={handleChange}
                  invalid={!!errors.donante}
                >
                  <option value="">Seleccione un donante...</option>
                  {donantesDB.map((d) => (
                    <option key={d.id} value={d.nombre}>{d.nombre}</option>
                  ))}
                </CFormSelect>
                {errors.donante && <CAlert color="danger" className="py-1 my-1">{errors.donante}</CAlert>}
              </CCol>
              <CCol className="mb-3">
                <CFormLabel>Tipo de Donación</CFormLabel>
                <CFormSelect
                  name="tipo_donacion"
                  value={form.tipo_donacion}
                  onChange={handleChange}
                  invalid={!!errors.tipo_donacion}
                >
                  <option value="">Seleccione el tipo...</option>
                  {tiposDonacion.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </CFormSelect>
                {errors.tipo_donacion && <CAlert color="danger" className="py-1 my-1">{errors.tipo_donacion}</CAlert>}
              </CCol>
              <CCol className="mb-3">
                <CFormLabel>Cantidad</CFormLabel>
                <CFormInput
                  name="cantidad"
                  type="number"
                  value={form.cantidad}
                  onChange={handleChange}
                  min={1}
                  invalid={!!errors.cantidad}
                  placeholder="Ingrese la cantidad"
                />
                {errors.cantidad && <CAlert color="danger" className="py-1 my-1">{errors.cantidad}</CAlert>}
              </CCol>
              <CCol className="mb-3">
                <CFormLabel>Fecha</CFormLabel>
                <CFormInput
                  name="fecha_donacion"
                  type="date"
                  value={form.fecha_donacion}
                  onChange={handleChange}
                  invalid={!!errors.fecha_donacion}
                />
                {errors.fecha_donacion && <CAlert color="danger" className="py-1 my-1">{errors.fecha_donacion}</CAlert>}
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
                  {comunidadesDB.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </CFormSelect>
                {errors.comunidad && <CAlert color="danger" className="py-1 my-1">{errors.comunidad}</CAlert>}
              </CCol>
              <CRow className="mt-4">
                <CCol className="d-flex justify-content-end gap-2">
                  <CButton type="button" color="secondary" onClick={() => setShowForm(false)}>
                    Cancelar
                  </CButton>
                  <CButton type="submit" color="info text-white">
                    {selectedDonacion ? "Actualizar" : "Registrar"}
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CModalBody>
        </CModal>

        {/* Tabla CRUD */}
        <CTable striped hover borderless responsive>
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell>Donante</CTableHeaderCell>
              <CTableHeaderCell>Tipo</CTableHeaderCell>
              <CTableHeaderCell>Cantidad</CTableHeaderCell>
              <CTableHeaderCell>Fecha</CTableHeaderCell>
              <CTableHeaderCell>Comunidad</CTableHeaderCell>
              <CTableHeaderCell className="text-end">Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filtered.length > 0 ? filtered.map((d) => (
              <CTableRow key={d.id}>
                <CTableDataCell>{d.donante || "Sin dato"}</CTableDataCell>
                <CTableDataCell>{d.tipo_donacion || "Sin dato"}</CTableDataCell>
                <CTableDataCell>{d.cantidad || "Sin dato"}</CTableDataCell>
                <CTableDataCell>{d.fecha_donacion || "Sin dato"}</CTableDataCell>
                <CTableDataCell>{d.comunidad || "Sin dato"}</CTableDataCell>
                <CTableDataCell className="text-end">
                  <CButton color="warning" size="sm" className="me-2" onClick={() => handleEdit(d)}>
                    Editar
                  </CButton>
                  <CButton color="danger" size="sm" onClick={() => handleDelete(d.id)}>
                    Eliminar
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            )) : (
              <CTableRow>
                <CTableDataCell colSpan={6} className="text-center text-muted">
                  No hay donaciones registradas.
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  );
};

export default Donaciones;