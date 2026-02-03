import React, { useEffect, useState, useCallback } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormLabel,
  CFormSelect,
  CButton,
  CAlert,
  CRow,
  CCol,
  CContainer,
  CSpinner,
  CFormInput,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CPagination,
  CPaginationItem,
  CBadge,
  CAvatar,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import {
  cilUserPlus,
  cilPencil,
  cilTrash,
  cilSearch,
  cilUser,
  cilEducation,
  cilArrowLeft,
} from '@coreui/icons'

export default function InscripcionEstudiante() {
  const [estudiantes, setEstudiantes] = useState([])
  const [cursos, setCursos] = useState([])
  const [inscripciones, setInscripciones] = useState([])
  const [id_usuario, setIdUsuario] = useState('')
  const [id_curso, setIdCurso] = useState('')
  const [filtro, setFiltro] = useState('')
  const [loading, setLoading] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' })
  const [modalDelete, setModalDelete] = useState({ visible: false, data: null })
  const [modalEdit, setModalEdit] = useState({ visible: false, data: null })
  const [pagina, setPagina] = useState(1)
  const porPagina = 5

  const azulProfundo = '#070145'
  const celesteSuave = '#eef2ff'

  const cargarDatos = useCallback(async () => {
    try {
      const [resEstCursos, resInsc] = await Promise.all([
        fetch('http://localhost:4000/estudiantes-cursos'),
        fetch('http://localhost:4000/inscripciones'),
      ])
      const dataEst = await resEstCursos.json()
      const dataInsc = await resInsc.json()
      setEstudiantes(dataEst.estudiantes || [])
      setCursos(dataEst.cursos || [])
      setInscripciones(dataInsc || [])
    } catch (err) {
      setMensaje({ texto: 'Error de conexión con el servidor', tipo: 'danger' })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    cargarDatos()
  }, [cargarDatos])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)
    try {
      const res = await fetch('http://localhost:4000/inscribir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_usuario, id_curso }),
      })
      if (res.ok) {
        setMensaje({ texto: '¡Inscripción exitosa!', tipo: 'success' })
        setIdUsuario('')
        setIdCurso('')
        cargarDatos()
      }
    } catch (error) {
      setMensaje({ texto: 'No se pudo completar la acción', tipo: 'danger' })
    }
    setEnviando(false)
  }

  const estudiantesFiltrados = estudiantes.filter((e) =>
    `${e.nombre} ${e.apellido}`.toLowerCase().includes(filtro.toLowerCase()),
  )

  const datosPaginados = inscripciones.slice((pagina - 1) * porPagina, pagina * porPagina)

  // Función para ELIMINAR
  const eliminarInscripcion = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/inscripciones/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setMensaje({ texto: 'Inscripción eliminada correctamente', tipo: 'success' })
        setInscripciones(inscripciones.filter((i) => i.id_inscripcion !== id))
      } else {
        throw new Error()
      }
    } catch (error) {
      setMensaje({ texto: 'Error al eliminar la inscripción', tipo: 'danger' })
    } finally {
      setModalDelete({ visible: false, data: null })
    }
  }

  // Función para EDITAR (Actualizar curso)
  const guardarCambiosEdicion = async () => {
    if (!modalEdit.data?.id_curso) return

    try {
      const res = await fetch(
        `http://localhost:4000/inscripciones/${modalEdit.data.id_inscripcion}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_curso: modalEdit.data.id_curso }),
        },
      )

      if (res.ok) {
        setMensaje({ texto: '¡Actualizado con éxito!', tipo: 'success' })
        await cargarDatos() // Refresca la tabla
        setModalEdit({ visible: false, data: null })
      }
    } catch (err) {
      setMensaje({ texto: 'Error al actualizar', tipo: 'danger' })
    }
  }

  return (
    <CContainer className="py-5 animate__animated animate__fadeIn">
      <style>
        {`
          .custom-card { border: none; border-radius: 20px; box-shadow: 0 12px 40px rgba(0,0,0,0.08); overflow: hidden; }
          .form-control-custom { 
            border: 2px solid #f0f0f0; 
            border-radius: 12px; 
            padding: 12px; 
            transition: all 0.3s; 
          }
          .form-control-custom:focus { 
            border-color: ${azulProfundo}; 
            box-shadow: 0 0 0 4px rgba(7, 1, 69, 0.1); 
          }
          .btn-inscribir { 
            background: ${azulProfundo}; 
            border: none; 
            border-radius: 12px; 
            padding: 14px; 
            font-weight: 700; 
            letter-spacing: 1px;
            transition: transform 0.2s;
          }
          .btn-inscribir:hover { transform: translateY(-2px); background: #0a0263; }
          .row-hover:hover { background-color: ${celesteSuave} !important; transition: 0.3s; }
          .action-btn { border-radius: 8px; transition: 0.2s; }
          .action-btn:hover { background: #fff; transform: scale(1.1); }
        `}
      </style>

      <CRow className="g-4">
        {/* Panel Izquierdo: Formulario Llamativo */}
        <CCol lg={4}>
          <CCard className="custom-card h-100">
            <div className="p-4 text-white text-center" style={{ background: azulProfundo }}>
              <CIcon icon={cilUserPlus} size="xl" className="mb-2" />
              <h4 className="fw-bold mb-0">Registro Rápido</h4>
              <p className="small opacity-75">Asigna estudiantes a cursos fácilmente</p>
            </div>
            <CCardBody className="p-4">
              {mensaje.texto && (
                <CAlert color={mensaje.tipo} className="rounded-3">
                  {mensaje.texto}
                </CAlert>
              )}

              <CForm onSubmit={handleSubmit}>
                <div className="mb-4">
                  <CFormLabel className="fw-bold text-dark small">
                    <CIcon icon={cilSearch} className="me-1" /> BUSCAR ALUMNO
                  </CFormLabel>
                  <CFormInput
                    className="form-control-custom mb-2"
                    placeholder="Ej: Juan Pérez"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                  />
                  <CFormSelect
                    className="form-control-custom"
                    value={id_usuario}
                    onChange={(e) => setIdUsuario(e.target.value)}
                    required
                  >
                    <option value="">Selecciona al estudiante</option>
                    {estudiantesFiltrados.map((e) => (
                      <option key={e.id_usuario} value={e.id_usuario}>
                        {e.nombre} {e.apellido}
                      </option>
                    ))}
                  </CFormSelect>
                </div>

                <div className="mb-4">
                  <CFormLabel className="fw-bold text-dark small">
                    <CIcon icon={cilEducation} className="me-1" /> SELECCIONAR CURSO
                  </CFormLabel>
                  <CFormSelect
                    className="form-control-custom"
                    value={id_curso}
                    onChange={(e) => setIdCurso(e.target.value)}
                    required
                  >
                    <option value="">Lista de cursos disponibles</option>
                    {cursos.map((c) => (
                      <option key={c.id_curso} value={c.id_curso}>
                        {c.nombre_curso}
                      </option>
                    ))}
                  </CFormSelect>
                </div>

                <CButton
                  type="submit"
                  disabled={enviando}
                  className="btn-inscribir w-100 text-white shadow"
                >
                  {enviando ? <CSpinner size="sm" /> : 'REGISTRAR AHORA'}
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Panel Derecho: Lista Interactiva */}
        <CCol lg={8}>
          <CCard className="custom-card">
            <CCardHeader className="bg-white p-4 border-0 d-flex justify-content-between align-items-center">
              <div>
                <h4 className="fw-bold mb-0 text-dark">Control de Inscripciones</h4>
                <span className="text-muted small">Total: {inscripciones.length} registros</span>
              </div>
            </CCardHeader>
            <CCardBody className="p-0">
              <CTable align="middle" responsive borderless className="mb-0">
                <CTableHead style={{ background: '#f8fafc' }}>
                  <CTableRow>
                    <CTableHeaderCell className="ps-4 py-3">ESTUDIANTE</CTableHeaderCell>
                    <CTableHeaderCell className="py-3">CURSO ASIGNADO</CTableHeaderCell>
                    <CTableHeaderCell className="text-center py-3">ACCIONES</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {loading ? (
                    <CTableRow>
                      <CTableDataCell colSpan="3" className="text-center py-5">
                        <CSpinner color="primary" />
                      </CTableDataCell>
                    </CTableRow>
                  ) : (
                    datosPaginados.map((i) => (
                      <CTableRow
                        key={i.id_inscripcion}
                        className="row-hover border-bottom border-light"
                      >
                        <CTableDataCell className="ps-4 py-3">
                          <div className="d-flex align-items-center">
                            <CAvatar color="primary" textColor="white" className="me-3 fw-bold">
                              {i.nombre.charAt(0)}
                            </CAvatar>
                            <div>
                              <div className="fw-bold text-dark">
                                {i.nombre} {i.apellido}
                              </div>
                              <div className="text-muted small" style={{ fontSize: '11px' }}>
                                {i.email}
                              </div>
                            </div>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CBadge
                            style={{
                              backgroundColor: '#eef2ff', // Fondo suave (celeste/purpura muy claro)
                              color: '#4338ca', // Texto en azul vibrante (Indigo)
                              border: '1px solid #c7d2fe', // Borde sutil para dar definición
                              padding: '8px 14px',
                              fontSize: '0.85rem',
                              fontWeight: '700',
                              letterSpacing: '0.3px',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.05)', // Pequeña sombra para profundidad
                            }}
                            shape="rounded-pill"
                          >
                            <CIcon icon={cilEducation} className="me-1" size="sm" />
                            {i.nombre_curso.toUpperCase()}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <div className="d-flex justify-content-center gap-2">
                            <CButton
                              color="light"
                              size="sm"
                              className="action-btn text-primary shadow-sm border"
                              onClick={() => setModalEdit({ visible: true, data: i })} // <-- Agregado
                            >
                              <CIcon icon={cilPencil} />
                            </CButton>

                            <CButton
                              color="light"
                              size="sm"
                              className="action-btn text-danger shadow-sm border"
                              onClick={() => setModalDelete({ visible: true, data: i })}
                            >
                              <CIcon icon={cilTrash} />
                            </CButton>
                          </div>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  )}
                </CTableBody>
              </CTable>

              <div className="p-4 d-flex justify-content-center">
                <CPagination className="mb-0 shadow-sm">
                  <CPaginationItem disabled={pagina === 1} onClick={() => setPagina((p) => p - 1)}>
                    Anterior
                  </CPaginationItem>
                  {[...Array(Math.ceil(inscripciones.length / porPagina))].map((_, i) => (
                    <CPaginationItem
                      key={i + 1}
                      active={pagina === i + 1}
                      onClick={() => setPagina(i + 1)}
                    >
                      {i + 1}
                    </CPaginationItem>
                  ))}
                  <CPaginationItem onClick={() => setPagina((p) => p + 1)}>
                    Siguiente
                  </CPaginationItem>
                </CPagination>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* MODAL DE EDICIÓN ESTILIZADA */}
      <CModal
        visible={modalEdit.visible}
        onClose={() => setModalEdit({ visible: false, data: null })}
        alignment="center"
        backdrop="static"
        size="lg"
      >
        <CModalHeader className="border-0 p-4" style={{ background: celesteSuave }}>
          <div className="d-flex align-items-center">
            <div className="p-3 bg-white rounded-circle me-3 shadow-sm">
              <CIcon icon={cilPencil} size="xl" style={{ color: azulProfundo }} />
            </div>
            <h5 className="mb-0 fw-bold" style={{ color: azulProfundo }}>
              Editar Inscripción
            </h5>
          </div>
        </CModalHeader>

        <CModalBody className="p-4">
          <CForm onSubmit={(e) => e.preventDefault()}>
            {' '}
            {/* Evita el refresco accidental */}
            <CRow className="g-3">
              <CCol md={12}>
                <CFormLabel className="fw-bold">Estudiante</CFormLabel>
                <CFormInput
                  value={`${modalEdit.data?.nombre || ''} ${modalEdit.data?.apellido || ''}`}
                  disabled
                  className="form-control-custom bg-light"
                />
                <small className="text-muted">
                  El estudiante no se puede cambiar, solo el curso.
                </small>
              </CCol>

              <CCol md={12} className="mt-4">
                <CFormLabel className="fw-bold text-primary">
                  <CIcon icon={cilEducation} className="me-1" /> Nuevo Curso
                </CFormLabel>
                <CFormSelect
                  className="form-control-custom"
                  value={modalEdit.data?.id_curso || ''} // Usar value en lugar de defaultValue para control total
                  onChange={(e) =>
                    setModalEdit({
                      ...modalEdit,
                      data: { ...modalEdit.data, id_curso: e.target.value },
                    })
                  }
                >
                  <option value="">Seleccione un curso</option>
                  {cursos.map((c) => (
                    <option key={c.id_curso} value={c.id_curso}>
                      {c.nombre_curso}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>

        <CModalFooter className="border-0 p-4">
          <CButton
            color="secondary"
            variant="ghost"
            onClick={() => setModalEdit({ visible: false, data: null })}
          >
            Cancelar
          </CButton>
          <CButton
            type="button" // IMPORTANTE: Define tipo button para que no dispare el submit del form
            className="btn-inscribir text-white px-5"
            style={{ background: azulProfundo }}
            onClick={guardarCambiosEdicion}
          >
            GUARDAR CAMBIOS
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal de Confirmación / Edición Estilizado */}
      {/* MODAL DE ELIMINACIÓN (ÚNICA Y OPTIMIZADA) */}
      <CModal
        visible={modalDelete.visible}
        onClose={() => setModalDelete({ visible: false, data: null })}
        alignment="center"
        backdrop="static"
        size="lg"
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
                Confirmar Baja de Inscripción
              </h5>
              <small className="text-muted">
                ID Registro: #{modalDelete.data?.id_inscripcion || '---'}
              </small>
            </div>
          </div>
        </CModalHeader>

        <CModalBody className="p-4">
          <div className="text-center mb-4">
            <p className="text-muted">
              Estás a punto de dar de baja la siguiente relación académica:
            </p>
          </div>

          <CRow className="g-3">
            {/* Bloque del Estudiante */}
            <CCol md={6}>
              <div
                className="p-3 h-100 rounded-4 border-start border-4 border-primary"
                style={{ backgroundColor: '#f1f5f9' }}
              >
                <label
                  className="fw-bold small text-uppercase opacity-50 d-block mb-2"
                  style={{ letterSpacing: '1px' }}
                >
                  Estudiante
                </label>
                <div className="d-flex align-items-center">
                  <CAvatar color="primary" textColor="white" className="me-2 fw-bold">
                    {modalDelete.data?.nombre?.charAt(0) || '?'}
                  </CAvatar>
                  <span className="fs-5 fw-bold text-dark">
                    {modalDelete.data?.nombre} {modalDelete.data?.apellido}
                  </span>
                </div>
              </div>
            </CCol>

            {/* Bloque del Curso */}
            <CCol md={6}>
              <div
                className="p-3 h-100 rounded-4 border-start border-4 border-warning"
                style={{ backgroundColor: '#fffbeb' }}
              >
                <label
                  className="fw-bold small text-uppercase opacity-50 d-block mb-2"
                  style={{ letterSpacing: '1px' }}
                >
                  Curso Asignado
                </label>
                <div className="d-flex align-items-center">
                  <div className="p-2 bg-warning rounded-2 me-2">
                    <CIcon icon={cilEducation} className="text-dark" />
                  </div>
                  <span className="fs-5 fw-bold text-dark">{modalDelete.data?.nombre_curso}</span>
                </div>
              </div>
            </CCol>
          </CRow>

          <div className="mt-4 p-3 rounded-3 bg-light border text-center">
            <p className="mb-0 text-secondary italic" style={{ fontSize: '0.9rem' }}>
              "Esta acción retirará al alumno permanentemente de este curso."
            </p>
          </div>
        </CModalBody>

        <CModalFooter
          className="border-0 p-4 justify-content-between"
          style={{ background: '#f8fafc' }}
        >
          <CButton
            color="secondary"
            variant="ghost"
            className="fw-bold text-uppercase"
            onClick={() => setModalDelete({ visible: false, data: null })}
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
            onClick={() => eliminarInscripcion(modalDelete.data.id_inscripcion)} // <--- Vinculado
          >
            SÍ, ELIMINAR
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}
