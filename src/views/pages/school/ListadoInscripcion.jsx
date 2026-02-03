import { useState, useEffect } from 'react'
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CCardTitle,
  CFormInput,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CAlert,
  CSpinner,
  CFormSelect,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilTrash, cilPrinter, cilFilter, cilUser } from '@coreui/icons'

const MateriasInscritasAdmin = () => {
  const [estudiantes, setEstudiantes] = useState([])
  const [filtro, setFiltro] = useState('')
  const [anioEscolar, setAnioEscolar] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [loading, setLoading] = useState(false)
  const [aniosEscolares, setAniosEscolares] = useState([])
  const [modalConfirm, setModalConfirm] = useState(false)
  const [idAEliminar, setIdAEliminar] = useState(null)
  const [pagina, setPagina] = useState(1)
  const porPagina = 25

  const moradoPrincipal = '#1a0b2e'
  const moradoAcento = '#6b21a8'

  const totalPaginas = Math.ceil(estudiantes.length / porPagina)
  const estudiantesPagina = estudiantes.slice((pagina - 1) * porPagina, pagina * porPagina)

  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')

  const solicitarEliminar = (id) => {
    setIdAEliminar(id)
    setModalConfirm(true)
  }

  const fetchEstudiantes = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      let url = `http://localhost:4000/estudiantes-materias-inscritas?`
      if (filtro) url += `filtro=${encodeURIComponent(filtro)}&`
      if (anioEscolar) url += `anioEscolar=${encodeURIComponent(anioEscolar)}&`
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setEstudiantes(data.estudiantes || [])
    } catch (error) {
      setMensaje('Error obteniendo materias inscritas.')
    }
    setLoading(false)
  }

  const fetchAniosEscolares = async () => {
    try {
      const res = await fetch('http://localhost:4000/aniosescolares')
      const data = await res.json()
      setAniosEscolares(data.añosEscolares || [])
    } catch (error) {
      setAniosEscolares([])
    }
  }

  useEffect(() => {
    fetchAniosEscolares()
  }, [])

  useEffect(() => {
    fetchEstudiantes()
  }, [filtro, anioEscolar])

  const handleEliminar = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`http://localhost:4000/materias-inscritas/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setMensaje(data.mensaje)
      fetchEstudiantes()
    } catch (error) {
      setMensaje('Error eliminando materia.')
    }
  }

  if (usuario.rol !== 'admin') {
    return (
      <CContainer className="py-5">
        <CAlert color="danger" className="rounded-4 shadow-sm fw-bold">
          Acceso denegado. Este módulo es exclusivo para administradores.
        </CAlert>
      </CContainer>
    )
  }

  return (
    <CContainer className="py-4" fluid>
      <style>
        {`
          .admin-header { background: ${moradoPrincipal} !important; color: white; border-radius: 15px 15px 0 0 !important; }
          .admin-card { border: none; border-radius: 15px; box-shadow: 0 8px 20px rgba(0,0,0,0.06); }
          .accordion-custom .accordion-button:not(.collapsed) { 
            background-color: #f8faff; 
            color: ${moradoAcento}; 
            font-weight: bold;
          }
          .search-input { border-radius: 10px; border: 1px solid #e0e0e0; }
          .btn-print { background-color: ${moradoPrincipal}; border: none; color: white; border-radius: 8px; }
          .btn-print:hover { background-color: ${moradoAcento}; color: white; }
          .table-header-custom { background: #f8fafc !important; color: #475569; font-size: 0.85rem; }
        `}
      </style>

      <CRow className="justify-content-center">
        <CCol xs={12}>
          <CCard className="admin-card">
            <CCardHeader className="admin-header p-4">
              <CRow className="align-items-center">
                <CCol md={4}>
                  <CCardTitle className="fs-4 m-0 fw-bold d-flex align-items-center">
                    <CIcon icon={cilFilter} className="me-2" /> Gestión de Inscripciones
                  </CCardTitle>
                </CCol>
                <CCol md={4}>
                  <div className="position-relative">
                    <CFormInput
                      className="search-input ps-5 py-2"
                      placeholder="Cédula o nombre..."
                      value={filtro}
                      onChange={(e) => setFiltro(e.target.value)}
                    />
                    <CIcon
                      icon={cilSearch}
                      className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                    />
                  </div>
                </CCol>
                <CCol md={4}>
                  <CFormSelect
                    className="search-input py-2"
                    value={anioEscolar}
                    onChange={(e) => setAnioEscolar(e.target.value)}
                  >
                    <option value="">Todos los años escolares</option>
                    {aniosEscolares.map((a) => (
                      <option key={a.id_año_escolar} value={a.nombre}>
                        {a.nombre}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CRow>
            </CCardHeader>

            <CCardBody className="p-4">
              {mensaje && (
                <CAlert
                  color={mensaje.includes('Error') ? 'danger' : 'success'}
                  className="rounded-3 shadow-sm mb-4"
                  dismissible
                  onClose={() => setMensaje('')}
                >
                  {mensaje}
                </CAlert>
              )}

              {loading ? (
                <div className="text-center py-5">
                  <CSpinner style={{ color: moradoPrincipal }} variant="grow" />
                  <p className="mt-2 text-muted">Sincronizando registros...</p>
                </div>
              ) : (
                <CAccordion className="accordion-custom shadow-sm border-0">
                  {estudiantes.length === 0 ? (
                    <div className="text-center py-5 border rounded-3 bg-light">
                      <CIcon icon={cilUser} size="xl" className="text-muted mb-2" />
                      <p className="m-0">
                        No se encontraron estudiantes para los filtros aplicados.
                      </p>
                    </div>
                  ) : (
                    estudiantesPagina.map((est, idx) => (
                      <CAccordionItem itemKey={idx} key={est.cedula} className="border-bottom">
                        <CAccordionHeader>
                          <div className="d-flex w-100 justify-content-between align-items-center pe-3">
                            <span>
                              <span className="fw-bold text-dark">
                                {est.nombres} {est.apellidos}
                              </span>
                              <span className="text-muted ms-2 small">| C.I: {est.cedula}</span>
                            </span>
                            <span className="badge bg-light text-dark border-0">
                              {est.nombre_año} - {est.nombre_seccion} ({est.año_escolar})
                            </span>
                          </div>
                        </CAccordionHeader>
                        <CAccordionBody className="bg-white">
                          <CTable
                            hover
                            responsive
                            align="middle"
                            className="mb-3 border rounded-3 overflow-hidden"
                          >
                            <CTableHead className="table-header-custom">
                              <CTableRow>
                                <CTableHeaderCell>Materia</CTableHeaderCell>
                                <CTableHeaderCell>Docente</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">
                                  Año/Sección
                                </CTableHeaderCell>
                                <CTableHeaderCell className="text-center">
                                  Acciones
                                </CTableHeaderCell>
                              </CTableRow>
                            </CTableHead>
                            <CTableBody>
                              {est.materias.map((m, i) => (
                                <CTableRow key={i}>
                                  <CTableDataCell>
                                    <div className="fw-bold">{m.nombre_materia}</div>
                                    <div className="small text-muted">{m.codigo_materia}</div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div>
                                      {m.nombre_docente} {m.apellido_docente}
                                    </div>
                                    <div className="small text-muted">{m.cedula_docente}</div>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-center">
                                    {m.año} "{m.seccion}"
                                  </CTableDataCell>
                                  <CTableDataCell className="text-center">
                                    <CButton
                                      color="link"
                                      className="text-danger p-0"
                                      onClick={() => solicitarEliminar(m.id_materia_inscrita)}
                                    >
                                      <CIcon icon={cilTrash} /> Eliminar
                                    </CButton>
                                  </CTableDataCell>
                                </CTableRow>
                              ))}
                            </CTableBody>
                          </CTable>

                          <div className="d-flex justify-content-end">
                            <CButton
                              className="btn-print d-flex align-items-center px-4"
                              onClick={() =>
                                window.open(
                                  `http://localhost:4000/comprobante-inscripcion/${est.id_inscripcion}`,
                                  '_blank',
                                )
                              }
                            >
                              <CIcon icon={cilPrinter} className="me-2" /> Generar Comprobante
                            </CButton>
                          </div>
                        </CAccordionBody>
                      </CAccordionItem>
                    ))
                  )}
                </CAccordion>
              )}

              {/* Paginación Mejorada */}
              {totalPaginas > 1 && (
                <div className="d-flex justify-content-center mt-5">
                  <CPagination>
                    <CPaginationItem
                      disabled={pagina === 1}
                      onClick={() => setPagina(pagina - 1)}
                      style={{ cursor: 'pointer' }}
                    >
                      Anterior
                    </CPaginationItem>
                    <CPaginationItem active className="fw-bold px-3">
                      {pagina} de {totalPaginas}
                    </CPaginationItem>
                    <CPaginationItem
                      disabled={pagina === totalPaginas}
                      onClick={() => setPagina(pagina + 1)}
                      style={{ cursor: 'pointer' }}
                    >
                      Siguiente
                    </CPaginationItem>
                  </CPagination>
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modal de Confirmación Estilizado */}
      <CModal
        visible={modalConfirm}
        onClose={() => setModalConfirm(false)}
        alignment="center"
        className="rounded-4"
      >
        <CModalHeader className="border-0 pb-0">
          <CModalTitle className="fw-bold">Confirmar acción</CModalTitle>
        </CModalHeader>
        <CModalBody className="text-secondary py-3">
          ¿Estás seguro de que deseas eliminar esta materia de la inscripción del estudiante? Esta
          acción no se puede deshacer.
        </CModalBody>
        <CModalFooter className="border-0 pt-0">
          <CButton
            color="light"
            className="fw-bold text-muted rounded-3"
            onClick={() => setModalConfirm(false)}
          >
            Mantener materia
          </CButton>
          <CButton
            className="fw-bold rounded-3"
            style={{ backgroundColor: '#dc3545', color: 'white', border: 'none' }}
            onClick={() => {
              setModalConfirm(false)
              handleEliminar(idAEliminar)
            }}
          >
            Sí, eliminar
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}

export default MateriasInscritasAdmin
