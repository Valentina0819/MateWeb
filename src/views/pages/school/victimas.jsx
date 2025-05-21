import React, { useState } from 'react'
import {
  CCard, CCardBody, CCardHeader, CForm, CFormInput, CFormSelect, CButton, CRow, CCol,
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CAlert, CModal, CModalHeader, CModalTitle, CModalBody
} from '@coreui/react'

// Simulación de comunidades (esto debería venir de la base de datos)
const comunidadesDB = [
  'Comunidad 1',
  'Comunidad 2',
  'Comunidad 3',
]

const Victimas = () => {
  const [form, setForm] = useState({
    nombre: '',
    comunidad: '',
    nro_acta: '',
    apoyo_familiar: '',
  })
  const [errors, setErrors] = useState({})
  const [victimas, setVictimas] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selected, setSelected] = useState(null)

  const validate = () => {
    const newErrors = {}
    if (!form.nombre.trim()) newErrors.nombre = 'Nombre requerido'
    if (!form.comunidad) newErrors.comunidad = 'Seleccione una comunidad'
    if (!form.nro_acta.trim()) newErrors.nro_acta = 'Nro. de acta requerido'
    if (!form.apoyo_familiar.trim()) newErrors.apoyo_familiar = 'Describa el apoyo familiar'
    return newErrors
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const val = validate()
    if (Object.keys(val).length) {
      setErrors(val)
      return
    }
    if (selected !== null) {
      // Editar
      setVictimas(victimas.map((v, idx) => idx === selected ? { ...form } : v))
    } else {
      // Crear
      setVictimas([...victimas, { ...form }])
    }
    setForm({ nombre: '', comunidad: '', nro_acta: '', apoyo_familiar: '' })
    setErrors({})
    setShowForm(false)
    setSelected(null)
  }

  const handleEdit = (idx) => {
    setForm({ ...victimas[idx] })
    setShowForm(true)
    setSelected(idx)
    setErrors({})
  }

  const handleDelete = (idx) => {
    setVictimas(victimas.filter((_, i) => i !== idx))
  }

  const handleAdd = () => {
    setForm({ nombre: '', comunidad: '', nro_acta: '', apoyo_familiar: '' })
    setShowForm(true)
    setSelected(null)
    setErrors({})
  }

  return (
    <CCard className="p-4 shadow-lg">
      <CCardHeader className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-danger text-white">
        <h5 className="m-0">Registro de Víctimas Fatales</h5>
        <CButton color="danger text-black bg-white mt-2 mt-md-0" onClick={handleAdd}>+ Registrar Víctima</CButton>
      </CCardHeader>
      <CCardBody>
        <CTable striped hover responsive align="middle">
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell>Nombre</CTableHeaderCell>
              <CTableHeaderCell>Comunidad</CTableHeaderCell>
              <CTableHeaderCell>Nro. Acta Defunción</CTableHeaderCell>
              <CTableHeaderCell>Apoyo Familiar</CTableHeaderCell>
              <CTableHeaderCell className="text-end">Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {victimas.length > 0 ? victimas.map((v, idx) => (
              <CTableRow key={idx}>
                <CTableDataCell>{v.nombre}</CTableDataCell>
                <CTableDataCell>{v.comunidad}</CTableDataCell>
                <CTableDataCell>{v.nro_acta}</CTableDataCell>
                <CTableDataCell>{v.apoyo_familiar}</CTableDataCell>
                <CTableDataCell className="text-end">
                  <CButton color="warning" size="sm" className="me-2" onClick={() => handleEdit(idx)}>
                    Editar
                  </CButton>
                  <CButton color="danger" size="sm" onClick={() => handleDelete(idx)}>
                    Eliminar
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            )) : (
              <CTableRow>
                <CTableDataCell colSpan={5} className="text-center text-muted">
                  No hay víctimas registradas.
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
      </CCardBody>

      <CModal visible={showForm} onClose={() => setShowForm(false)}>
        <CModalHeader>
          <CModalTitle>{selected !== null ? "Editar Víctima" : "Registrar Víctima"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit} autoComplete="off">
            <CCol className="mb-3">
              <CFormInput
                label="Nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                invalid={!!errors.nombre}
                placeholder="Nombre de la víctima"
                maxLength={40}
              />
              {errors.nombre && <CAlert color="danger" className="py-1 my-1">{errors.nombre}</CAlert>}
            </CCol>
            <CCol className="mb-3">
              <CFormSelect
                label="Comunidad"
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
            <CCol className="mb-3">
              <CFormInput
                label="Nro. Acta de Defunción"
                name="nro_acta"
                value={form.nro_acta}
                onChange={handleChange}
                invalid={!!errors.nro_acta}
                placeholder="Número de acta"
                maxLength={20}
              />
              {errors.nro_acta && <CAlert color="danger" className="py-1 my-1">{errors.nro_acta}</CAlert>}
            </CCol>
            <CCol className="mb-3">
              <CFormInput
                label="Apoyo Familiar"
                name="apoyo_familiar"
                value={form.apoyo_familiar}
                onChange={handleChange}
                invalid={!!errors.apoyo_familiar}
                placeholder="Ej: Donación de alimentos, ayuda económica, etc."
                maxLength={60}
              />
              {errors.apoyo_familiar && <CAlert color="danger" className="py-1 my-1">{errors.apoyo_familiar}</CAlert>}
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
  )
}

export default Victimas