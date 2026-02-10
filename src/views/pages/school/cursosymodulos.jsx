import React, { useEffect, useState, useRef, useCallback } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CContainer,
  CAlert,
  CPagination,
  CPaginationItem,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CBadge,
  CTooltip,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPencil,
  cilTrash,
  cilPlus,
  cilLibrary,
  cilLayers,
  cilSave,
  cilEducation,
} from '@coreui/icons'

export default function CrudCursosModulos() {
  // --- ESTADOS ---
  const [cursos, setCursos] = useState([])
  const [cursoForm, setCursoForm] = useState({ nombre_curso: '', descripcion: '' })
  const [cursoErrors, setCursoErrors] = useState({})

  const [modalEditCurso, setModalEditCurso] = useState(false)
  const [cursoEditForm, setCursoEditForm] = useState({ nombre_curso: '', descripcion: '' })
  const [editCursoId, setEditCursoId] = useState(null)
  const [cursoEditErrors, setCursoEditErrors] = useState({})

  const [modulos, setModulos] = useState([])
  const [moduloForm, setModuloForm] = useState({ id_curso: '', nombre_modulo: '', descripcion: '' })
  const [moduloErrors, setModuloErrors] = useState({})

  const [modalEditModulo, setModalEditModulo] = useState(false)
  const [moduloEditForm, setModuloEditForm] = useState({
    id_curso: '',
    nombre_modulo: '',
    descripcion: '',
  })
  const [editModuloModalId, setEditModuloModalId] = useState(null)
  const [moduloEditErrors, setModuloEditErrors] = useState({})

  const [alert, setAlert] = useState({ color: '', text: '' })
  const [cursoPage, setCursoPage] = useState(1)
  const [moduloPage, setModuloPage] = useState(1)
  const itemsPerPage = 4

  const [modalConfirmCurso, setModalConfirmCurso] = useState(false)
  const [cursoAEliminar, setCursoAEliminar] = useState(null)
  const [modalConfirmModulo, setModalConfirmModulo] = useState(false)
  const [moduloAEliminar, setModuloAEliminar] = useState(null)

  const azulProfundo = '#070145'

  // --- CARGA DE DATOS ---
  const fetchCursos = useCallback(async () => {
    const res = await fetch('http://localhost:4000/obtenercursos')
    const data = await res.json()
    setCursos(data)
  }, [])

  const fetchModulos = useCallback(async () => {
    const res = await fetch('http://localhost:4000/obtenermodulos')
    const data = await res.json()
    setModulos(data)
  }, [])

  useEffect(() => {
    fetchCursos()
    fetchModulos()
  }, [fetchCursos, fetchModulos])

  // --- VALIDACIONES ---
  const validarCurso = (form) => {
    let errs = {}
    if (!form.nombre_curso || form.nombre_curso.trim().length < 3)
      errs.nombre_curso = 'Mínimo 3 caracteres.'
    if (!form.descripcion || form.descripcion.trim().length < 5)
      errs.descripcion = 'Mínimo 5 caracteres.'
    return errs
  }

  const validarModulo = (form) => {
    let errs = {}
    if (!form.id_curso) errs.id_curso = 'Seleccione un curso.'
    if (!form.nombre_modulo || form.nombre_modulo.trim().length < 3)
      errs.nombre_modulo = 'Mínimo 3 caracteres.'
    return errs
  }

  // --- HANDLERS CURSOS ---
  const handleCursoSubmit = async (e) => {
    e.preventDefault()
    const errs = validarCurso(cursoForm)
    if (Object.keys(errs).length > 0) {
      setCursoErrors(errs)
      return
    }
    try {
      await fetch('http://localhost:4000/crearcurso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cursoForm),
      })
      setAlert({ color: 'success', text: 'Curso creado con éxito' })
      setCursoForm({ nombre_curso: '', descripcion: '' })
      setCursoErrors({})
      fetchCursos()
    } catch {
      setAlert({ color: 'danger', text: 'Error al guardar' })
    }
  }

  const handleGuardarEdicionCurso = async () => {
    try {
      await fetch(`http://localhost:4000/editarcurso/${editCursoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cursoEditForm),
      })
      setModalEditCurso(false)
      setAlert({ color: 'info', text: 'Curso actualizado' })
      fetchCursos()
    } catch {
      setAlert({ color: 'danger', text: 'Error al actualizar' })
    }
  }

  const handleDeleteCurso = async () => {
    try {
      const res = await fetch(`http://localhost:4000/eliminarcurso/${cursoAEliminar}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setAlert({ color: 'warning', text: 'Curso y módulos eliminados' })
        setModalConfirmCurso(false)
        fetchCursos()
        fetchModulos()
      }
    } catch {
      setAlert({ color: 'danger', text: 'Error al eliminar' })
    }
  }

  // --- HANDLERS MÓDULOS ---
  const handleModuloSubmit = async (e) => {
    e.preventDefault()
    const errs = validarModulo(moduloForm)
    if (Object.keys(errs).length > 0) {
      setModuloErrors(errs)
      return
    }
    try {
      await fetch('http://localhost:4000/crearmodulo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(moduloForm),
      })
      setAlert({ color: 'success', text: 'Módulo creado con éxito' })
      setModuloForm({ id_curso: '', nombre_modulo: '', descripcion: '' })
      setModuloErrors({})
      fetchModulos()
    } catch {
      setAlert({ color: 'danger', text: 'Error al guardar' })
    }
  }

  const handleDeleteModulo = async () => {
    try {
      await fetch(`http://localhost:4000/eliminarmodulo/${moduloAEliminar}`, { method: 'DELETE' })
      setAlert({ color: 'warning', text: 'Módulo eliminado' })
      setModalConfirmModulo(false)
      fetchModulos()
    } catch {
      setAlert({ color: 'danger', text: 'Error al eliminar' })
    }
  }

  // --- PAGINACIÓN ---
  const cursosToShow = cursos.slice((cursoPage - 1) * itemsPerPage, cursoPage * itemsPerPage)
  const modulosToShow = modulos.slice((moduloPage - 1) * itemsPerPage, moduloPage * itemsPerPage)

  return (
    <CContainer className="py-5">
      <style>
        {`
          .custom-card { border: none; border-radius: 16px; box-shadow: 0 8px 30px rgba(0,0,0,0.05); transition: 0.3s; }
          .header-dark { background: ${azulProfundo}; color: white; border-radius: 16px 16px 0 0 !important; font-weight: 700; letter-spacing: 0.5px; }
          .header-green { background: #101bb9ff; color: white; border-radius: 16px 16px 0 0 !important; }
          .input-modern { border: 2px solid #f1f3f5; border-radius: 10px; padding: 10px 15px; transition: all 0.3s; }
          .input-modern:focus { border-color: ${azulProfundo}; box-shadow: 0 0 0 4px rgba(7, 1, 69, 0.08); }
          .btn-main { border-radius: 10px; font-weight: 600; padding: 10px 20px; transition: 0.3s; }
          .btn-main:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
          .badge-soft { background-color: #eef2ff; color: #4338ca; border: 1px solid #c7d2fe; padding: 6px 12px; font-weight: 700; }
          .table-modern thead { background-color: #f8fafc; }
          .table-modern tr:hover { background-color: #fcfdfe !important; }
          .form-label-custom { font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; margin-bottom: 6px; display: block; }
        `}
      </style>

      {alert.text && (
        <CAlert color={alert.color} className="mb-4 border-0 shadow-sm">
          {alert.text}
        </CAlert>
      )}

      <CRow className="g-4">
        {/* --- SECCIÓN CURSOS --- */}
        <CCol lg={5}>
          <CCard className="custom-card">
            <CCardHeader className="header-dark p-3">
              <CIcon icon={cilPlus} className="me-2" />
              NUEVO CURSO
            </CCardHeader>
            <CCardBody className="p-4">
              <CForm onSubmit={handleCursoSubmit}>
                <div className="mb-3">
                  <span className="form-label-custom">Nombre del curso</span>
                  <CFormInput
                    className="input-modern"
                    value={cursoForm.nombre_curso}
                    onChange={(e) => setCursoForm({ ...cursoForm, nombre_curso: e.target.value })}
                    placeholder="Ej: React Avanzado"
                  />
                  {cursoErrors.nombre_curso && (
                    <small className="text-danger fw-bold">{cursoErrors.nombre_curso}</small>
                  )}
                </div>
                <div className="mb-4">
                  <span className="form-label-custom">Descripción</span>
                  <CFormInput
                    className="input-modern"
                    value={cursoForm.descripcion}
                    onChange={(e) => setCursoForm({ ...cursoForm, descripcion: e.target.value })}
                    placeholder="Breve detalle del curso"
                  />
                  {cursoErrors.descripcion && (
                    <small className="text-danger fw-bold">{cursoErrors.descripcion}</small>
                  )}
                </div>
                <CButton
                  type="submit"
                  className="btn-main w-100 text-white"
                  style={{ background: azulProfundo }}
                >
                  CREAR CURSO
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol lg={7}>
          <CCard className="custom-card">
            <CCardHeader className="bg-white border-0 p-3">
              <h5 className="mb-0 fw-bold">
                <CIcon icon={cilLibrary} className="text-primary me-2" />
                Cursos Activos
              </h5>
            </CCardHeader>
            <CCardBody className="p-0">
              <CTable responsive align="middle" className="table-modern mb-0">
                <thead>
                  <tr>
                    <th className="ps-4 py-3">CURSO</th>
                    <th>DESCRIPCIÓN</th>
                    <th className="text-center">ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {cursosToShow.map((c) => (
                    <tr key={c.id_curso}>
                      <td className="ps-4 fw-bold text-dark">{c.nombre_curso}</td>
                      <td className="text-muted small">{c.descripcion}</td>
                      <td className="text-center">
                        <CButton
                          color="light"
                          size="sm"
                          className="me-2 border"
                          onClick={() => {
                            setEditCursoId(c.id_curso)
                            setCursoEditForm(c)
                            setModalEditCurso(true)
                          }}
                        >
                          <CIcon icon={cilPencil} className="text-info" />
                        </CButton>
                        <CButton
                          color="light"
                          size="sm"
                          className="border"
                          onClick={() => {
                            setCursoAEliminar(c.id_curso)
                            setModalConfirmCurso(true)
                          }}
                        >
                          <CIcon icon={cilTrash} className="text-danger" />
                        </CButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </CTable>
              <div className="p-3 d-flex justify-content-center">
                <CPagination size="sm">
                  <CPaginationItem
                    disabled={cursoPage === 1}
                    onClick={() => setCursoPage(cursoPage - 1)}
                  >
                    Anterior
                  </CPaginationItem>
                  <CPaginationItem active>{cursoPage}</CPaginationItem>
                  <CPaginationItem onClick={() => setCursoPage(cursoPage + 1)}>
                    Siguiente
                  </CPaginationItem>
                </CPagination>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        {/* --- SECCIÓN MÓDULOS --- */}
        <CCol lg={5}>
          <CCard className="custom-card">
            <CCardHeader className="header-green p-3">
              <CIcon icon={cilPlus} className="me-2" />
              NUEVO MÓDULO
            </CCardHeader>
            <CCardBody className="p-4">
              <CForm onSubmit={handleModuloSubmit}>
                <div className="mb-3">
                  <span className="form-label-custom">Asignar a Curso</span>
                  <CFormSelect
                    className="input-modern"
                    value={moduloForm.id_curso}
                    onChange={(e) => setModuloForm({ ...moduloForm, id_curso: e.target.value })}
                  >
                    <option value="">Seleccione...</option>
                    {cursos.map((c) => (
                      <option key={c.id_curso} value={c.id_curso}>
                        {c.nombre_curso}
                      </option>
                    ))}
                  </CFormSelect>
                  {moduloErrors.id_curso && (
                    <small className="text-danger fw-bold">{moduloErrors.id_curso}</small>
                  )}
                </div>
                <div className="mb-3">
                  <span className="form-label-custom">Nombre del Módulo</span>
                  <CFormInput
                    className="input-modern"
                    value={moduloForm.nombre_modulo}
                    onChange={(e) =>
                      setModuloForm({ ...moduloForm, nombre_modulo: e.target.value })
                    }
                    placeholder="Ej: Hooks Básicos"
                  />
                  {moduloErrors.nombre_modulo && (
                    <small className="text-danger fw-bold">{moduloErrors.nombre_modulo}</small>
                  )}
                </div>
                <CButton
                  type="submit"
                  className="btn-main w-100 text-white"
                  style={{ background: '#101bb9ff', border: 'none' }}
                >
                  GUARDAR MÓDULO
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol lg={7}>
          <CCard className="custom-card">
            <CCardHeader className="bg-white border-0 p-3">
              <h5 className="mb-0 fw-bold">
                <CIcon icon={cilLayers} className="text-success me-2" />
                Estructura de Módulos
              </h5>
            </CCardHeader>
            <CCardBody className="p-0">
              <CTable responsive align="middle" className="table-modern mb-0">
                <thead>
                  <tr>
                    <th className="ps-4 py-3">MÓDULO</th>
                    <th>CURSO RELACIONADO</th>
                    <th className="text-center">ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {modulosToShow.map((m) => (
                    <tr key={m.id_modulo}>
                      <td className="ps-4 fw-bold">{m.nombre_modulo}</td>
                      <td>
                        <CBadge shape="rounded-pill" className="badge-soft">
                          {m.nombre_curso || 'Asignando...'}
                        </CBadge>
                      </td>
                      <td className="text-center">
                        <CButton
                          color="light"
                          size="sm"
                          className="border"
                          onClick={() => {
                            setModuloAEliminar(m.id_modulo)
                            setModalConfirmModulo(true)
                          }}
                        >
                          <CIcon icon={cilTrash} className="text-danger" />
                        </CButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </CTable>
              <div className="p-3 d-flex justify-content-center">
                <CPagination size="sm">
                  <CPaginationItem
                    disabled={moduloPage === 1}
                    onClick={() => setModuloPage(moduloPage - 1)}
                  >
                    Anterior
                  </CPaginationItem>
                  <CPaginationItem active>{moduloPage}</CPaginationItem>
                  <CPaginationItem onClick={() => setModuloPage(moduloPage + 1)}>
                    Siguiente
                  </CPaginationItem>
                </CPagination>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* --- MODALES --- */}
      <CModal
        visible={modalEditCurso}
        onClose={() => setModalEditCurso(false)}
        alignment="center"
        backdrop="static" // Evita cierres accidentales
        size="lg"
      >
        <CModalHeader
          className="border-0 p-4"
          style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}
        >
          <div className="d-flex align-items-center">
            <div className="p-2 bg-primary rounded-3 me-3">
              <CIcon icon={cilPencil} className="text-white" size="lg" />
            </div>
            <h5 className="mb-0 fw-bold" style={{ color: azulProfundo }}>
              Actualizar Información del Curso
            </h5>
          </div>
        </CModalHeader>

        <CModalBody className="p-4" style={{ backgroundColor: '#ffffff' }}>
          <CRow>
            <CCol md={12} className="mb-4">
              <div
                className="p-3 rounded-4"
                style={{
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  transition: '0.3s',
                }}
              >
                <label
                  className="form-label-custom mb-2"
                  style={{ color: azulProfundo, letterSpacing: '1px' }}
                >
                  NOMBRE DEL CURSO
                </label>
                <CFormInput
                  className="input-modern shadow-sm"
                  style={{
                    backgroundColor: '#fff',
                    fontSize: '1.1rem',
                    padding: '12px',
                    border: '2px solid #cbd5e1',
                  }}
                  placeholder="Introduce el nombre"
                  value={cursoEditForm.nombre_curso}
                  onChange={(e) =>
                    setCursoEditForm({ ...cursoEditForm, nombre_curso: e.target.value })
                  }
                />
              </div>
            </CCol>

            <CCol md={12}>
              <div
                className="p-3 rounded-4"
                style={{
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                }}
              >
                <label
                  className="form-label-custom mb-2"
                  style={{ color: azulProfundo, letterSpacing: '1px' }}
                >
                  DESCRIPCIÓN DETALLADA
                </label>
                <CFormInput
                  className="input-modern shadow-sm"
                  style={{
                    backgroundColor: '#fff',
                    fontSize: '1rem',
                    padding: '12px',
                    border: '2px solid #cbd5e1',
                  }}
                  placeholder="¿Qué aprenderán los alumnos?"
                  value={cursoEditForm.descripcion}
                  onChange={(e) =>
                    setCursoEditForm({ ...cursoEditForm, descripcion: e.target.value })
                  }
                />
              </div>
            </CCol>
          </CRow>
        </CModalBody>

        <CModalFooter
          className="border-0 p-4 justify-content-between"
          style={{ background: '#f8fafc' }}
        >
          <CButton
            color="secondary"
            variant="ghost"
            className="fw-bold text-uppercase"
            onClick={() => setModalEditCurso(false)}
          >
            Descartar
          </CButton>
          <CButton
            className="btn-main px-5 text-white shadow-lg"
            style={{
              background: `linear-gradient(45deg, ${azulProfundo}, #1e1b4b)`,
              border: 'none',
              borderRadius: '12px',
            }}
            onClick={handleGuardarEdicionCurso}
          >
            <CIcon icon={cilSave} className="me-2" />
            GUARDAR CAMBIOS
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal de confirmación para eliminar curso */}
      <CModal
        visible={modalConfirmCurso}
        onClose={() => setModalConfirmCurso(false)}
        alignment="center"
        backdrop="static"
        size="lg"
      >
        {/* HEADER */}
        <CModalHeader
          className="border-0 p-4"
          style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}
        >
          <div className="d-flex align-items-center">
            <div className="p-3 bg-danger rounded-circle me-3 shadow-sm">
              <CIcon icon={cilTrash} className="text-white" size="xl" />
            </div>
            <div>
              <h5 className="mb-0 fw-bold" style={{ color: azulProfundo }}>
                Confirmar Eliminación de Curso
              </h5>
              <small className="text-muted">Esta acción no se puede deshacer</small>
            </div>
          </div>
        </CModalHeader>

        {/* BODY */}
        <CModalBody className="p-4">
          <div className="text-center mb-4">
            <p className="text-muted">Estás a punto de eliminar el siguiente curso del sistema:</p>
          </div>

          <CRow className="g-3">
            {/* Bloque del Curso */}
            <CCol md={12}>
              <div
                className="p-4 rounded-4 border-start border-4 border-warning"
                style={{ backgroundColor: '#fffbeb' }}
              >
                <label
                  className="fw-bold small text-uppercase opacity-50 d-block mb-2"
                  style={{ letterSpacing: '1px' }}
                >
                  Curso a eliminar
                </label>

                <div className="d-flex align-items-center">
                  <div className="p-3 bg-warning rounded-3 me-3 shadow-sm">
                    <CIcon icon={cilEducation} className="text-dark" size="lg" />
                  </div>
                  <span className="fs-4 fw-bold text-dark">
                    {cursos.find((c) => c.id_curso === cursoAEliminar)?.nombre_curso ||
                      'Curso no seleccionado'}
                  </span>
                </div>
              </div>
            </CCol>
          </CRow>

          <div className="mt-4 p-3 rounded-3 bg-light border text-center">
            <p className="mb-0 text-secondary" style={{ fontSize: '0.9rem' }}>
              ⚠️ Al eliminar este curso se eliminarán todos los módulos, inscripciones y registros
              asociados de forma permanente.
            </p>
          </div>
        </CModalBody>

        {/* FOOTER */}
        <CModalFooter
          className="border-0 p-4 justify-content-between"
          style={{ background: '#f8fafc' }}
        >
          <CButton
            color="secondary"
            variant="ghost"
            className="fw-bold text-uppercase"
            onClick={() => setModalConfirmCurso(false)}
          >
            Cancelar
          </CButton>

          <CButton
            className="px-5 text-white shadow"
            style={{
              background: '#dc3545',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 'bold',
            }}
            onClick={() => {
              setModalConfirmCurso(false)
              handleDeleteCurso()
            }}
          >
            SÍ, ELIMINAR CURSO
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={modalConfirmModulo}
        onClose={() => setModalConfirmModulo(false)}
        alignment="center"
      >
        <CModalHeader
          className="border-0 p-4"
          style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}
        >
          <div className="d-flex align-items-center">
            <div className="p-3 bg-danger rounded-circle me-3 shadow-sm">
              <CIcon icon={cilTrash} className="text-white" size="xl" />
            </div>
            <div>
              <h5 className="mb-0 fw-bold" style={{ color: azulProfundo }}>
                Eliminar Módulo
              </h5>
            </div>
          </div>
        </CModalHeader>
        <CModalBody>¿Estás seguro de que deseas eliminar este módulo?</CModalBody>
        <CModalFooter className="border-0">
          <CButton color="light" onClick={() => setModalConfirmModulo(false)}>
            Cancelar
          </CButton>
          <CButton color="danger" className="text-white" onClick={handleDeleteModulo}>
            Eliminar
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}
