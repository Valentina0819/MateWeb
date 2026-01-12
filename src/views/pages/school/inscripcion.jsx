// filepath: c:\Users\USUARIO\OneDrive\Documentos\PaginasDiseño\DISEÑOARREGLADOVALENTINA\DISEÑOARREGLADOVALENTINA\FRONTEND\src\views\pages\school\inscripcion.jsx
import React, { useEffect, useState, useRef } from 'react';
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
  CPaginationItem
} from '@coreui/react';

export default function InscripcionEstudiante() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [id_usuario, setIdUsuario] = useState('');
  const [id_curso, setIdCurso] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [filtroCurso, setFiltroCurso] = useState('');

  // Para inscripciones y paginación
  const [inscripciones, setInscripciones] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [cursosAll, setCursosAll] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [inscripcionEdit, setInscripcionEdit] = useState(null);
  const [inscripcionEliminar, setInscripcionEliminar] = useState(null);
  const [mensajeTabla, setMensajeTabla] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('success');
  const [pagina, setPagina] = useState(1);
  const porPagina = 5;

  // VALIDACIONES en tiempo real
  const [errors, setErrors] = useState({ usuario: '', curso: '' });
  const [modalEditErrors, setModalEditErrors] = useState({ usuario: '', curso: '' });
  const [modalEliminarError, setModalEliminarError] = useState('');
  const [searchErrors, setSearchErrors] = useState({ estudiante: '', curso: '' });

  // impedir cierre por click fuera hasta confirmar con botones
  const [permitCloseModal, setPermitCloseModal] = useState(false);
  const [permitCloseEliminar, setPermitCloseEliminar] = useState(false);

  // bloqueo boton atrás
  const popstateHandlerRef = useRef(null);
  const pushedRef = useRef(false);

  // Cargar estudiantes y cursos para el formulario
  useEffect(() => {
    fetch('http://localhost:4000/estudiantes-cursos')
      .then(res => {
        if (!res.ok) throw new Error('No se pudo obtener datos');
        return res.json();
      })
      .then(data => {
        setEstudiantes(data.estudiantes || []);
        setCursos(data.cursos || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar datos: ' + err.message);
        setLoading(false);
      });
  }, []);

  // Cargar inscripciones, usuarios y cursos para la tabla
  const cargarDatos = () => {
    fetch('http://localhost:4000/inscripciones')
      .then(res => res.json())
      .then(setInscripciones)
      .catch(() => setInscripciones([]));
    fetch('http://localhost:4000/usuarios')
      .then(res => res.json())
      .then(setUsuarios)
      .catch(() => setUsuarios([]));
    fetch('http://localhost:4000/obtenercursos')
      .then(res => res.json())
      .then(setCursosAll)
      .catch(() => setCursosAll([]));
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // VALIDADORES
  const validarUsuario = (val) => {
    if (!val || val === '') return 'Seleccione un estudiante.';
    return '';
  };
  const validarCurso = (val) => {
    if (!val || val === '') return 'Seleccione un curso.';
    return '';
  };

  // validación en tiempo real del formulario principal
  useEffect(() => {
    setErrors({
      usuario: validarUsuario(id_usuario),
      curso: validarCurso(id_curso),
    });
  }, [id_usuario, id_curso]);

  // validación en tiempo real de las barras de búsqueda
  useEffect(() => {
    if (!filtro) {
      setSearchErrors(prev => ({ ...prev, estudiante: '' }));
      return;
    }
    const matches = estudiantes.filter(e =>
      `${e.nombre} ${e.apellido}`.toLowerCase().includes(filtro.toLowerCase())
    );
    setSearchErrors(prev => ({ ...prev, estudiante: matches.length === 0 ? 'No se encontró ningún estudiante válido.' : '' }));
  }, [filtro, estudiantes]);

  useEffect(() => {
    if (!filtroCurso) {
      setSearchErrors(prev => ({ ...prev, curso: '' }));
      return;
    }
    const matches = cursos.filter(c =>
      c.nombre_curso.toLowerCase().includes(filtroCurso.toLowerCase())
    );
    setSearchErrors(prev => ({ ...prev, curso: matches.length === 0 ? 'No se encontró ningún curso válido.' : '' }));
  }, [filtroCurso, cursos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');
    // validar antes de enviar
    const eUsuario = validarUsuario(id_usuario);
    const eCurso = validarCurso(id_curso);
    setErrors({ usuario: eUsuario, curso: eCurso });
    if (eUsuario || eCurso) {
      setError('Corrija los errores antes de enviar.');
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch('http://localhost:4000/inscribir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_usuario, id_curso })
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje(data.mensaje);
        setIdUsuario('');
        setIdCurso('');
        cargarDatos();
      } else {
        setError(data.mensaje || 'Error al inscribir');
      }
    } catch (err) {
      setError('Error de conexión');
    }
    setEnviando(false);
  };

  // Filtrado de estudiantes por nombre o apellido
  const estudiantesFiltrados = estudiantes.filter(e =>
    `${e.nombre} ${e.apellido}`.toLowerCase().includes(filtro.toLowerCase())
  );

  // Filtrado de cursos por nombre
  const cursosFiltrados = cursos.filter(c =>
    c.nombre_curso.toLowerCase().includes(filtroCurso.toLowerCase())
  );

  // --- Tabla Inscripciones con paginación ---
  const totalPaginas = Math.ceil(inscripciones.length / porPagina);
  const inscripcionesPagina = inscripciones.slice((pagina - 1) * porPagina, pagina * porPagina);

  // Editar inscripción
  const handleEditar = (inscripcion) => {
    setInscripcionEdit({ ...inscripcion }); // clonar para edición
    setModal(true);
    setPermitCloseModal(false);
    setMensajeTabla('');
    setModalEditErrors({
      usuario: validarUsuario(inscripcion?.id_usuario),
      curso: validarCurso(inscripcion?.id_curso),
    });
  };

  // validación en tiempo real modal editar
  useEffect(() => {
    if (!modal) return;
    setModalEditErrors({
      usuario: validarUsuario(inscripcionEdit?.id_usuario),
      curso: validarCurso(inscripcionEdit?.id_curso),
    });
    // eslint-disable-next-line
  }, [inscripcionEdit, modal]);

  // Guardar edición
  const handleGuardar = async (e) => {
    e.preventDefault();
    const errUsuario = validarUsuario(inscripcionEdit?.id_usuario);
    const errCurso = validarCurso(inscripcionEdit?.id_curso);
    setModalEditErrors({ usuario: errUsuario, curso: errCurso });
    if (errUsuario || errCurso) {
      setMensajeTabla('Corrija los errores en la edición.');
      setTipoMensaje('danger');
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/inscripciones/${inscripcionEdit.id_inscripcion}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_usuario: inscripcionEdit.id_usuario,
          id_curso: inscripcionEdit.id_curso
        })
      });
      const data = await res.json();
      if (res.ok) {
        setMensajeTabla('Inscripción actualizada correctamente');
        setTipoMensaje('success');
        setPermitCloseModal(true);
        setModal(false);
        cargarDatos();
      } else {
        setMensajeTabla(data.mensaje || 'Error al actualizar');
        setTipoMensaje('danger');
      }
    } catch {
      setMensajeTabla('Error de conexión');
      setTipoMensaje('danger');
    }
  };

  // Eliminar inscripción
  const handleEliminar = async () => {
    if (!inscripcionEliminar?.id_inscripcion) {
      setModalEliminarError('No se ha seleccionado una inscripción válida.');
      return;
    }
    try {
      const res = await fetch(`http://localhost:4000/inscripciones/${inscripcionEliminar.id_inscripcion}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (res.ok) {
        setMensajeTabla('Inscripción eliminada correctamente');
        setTipoMensaje('success');
        setPermitCloseEliminar(true);
        setModalEliminar(false);
        cargarDatos();
      } else {
        setMensajeTabla(data.mensaje || 'Error al eliminar');
        setTipoMensaje('danger');
      }
    } catch {
      setMensajeTabla('Error de conexión');
      setTipoMensaje('danger');
    }
  };

  // Solicitar eliminar
  const solicitarEliminar = (insc) => {
    setInscripcionEliminar({ ...insc });
    setModalEliminar(true);
    setPermitCloseEliminar(false);
    setModalEliminarError('');
  };

  // BLOQUEO BACK BUTTON mientras modales abiertos (cualquiera)
  useEffect(() => {
    const anyOpen = modal || modalEliminar;
    if (anyOpen) {
      if (!pushedRef.current) {
        try {
          window.history.pushState({ modalOpen: true }, '');
          pushedRef.current = true;
        } catch {}
      }
      const handler = () => {
        try { window.history.pushState({ modalOpen: true }, ''); } catch {}
      };
      popstateHandlerRef.current = handler;
      window.addEventListener('popstate', handler);
    } else {
      if (popstateHandlerRef.current) {
        window.removeEventListener('popstate', popstateHandlerRef.current);
        popstateHandlerRef.current = null;
      }
      if (pushedRef.current) {
        try { window.history.back(); } catch {}
        pushedRef.current = false;
      }
    }
    return () => {
      if (popstateHandlerRef.current) {
        window.removeEventListener('popstate', popstateHandlerRef.current);
        popstateHandlerRef.current = null;
      }
    };
  }, [modal, modalEliminar]);

  return (
    <CContainer className="py-5">
      <CRow className="justify-content-center">
        <CCol md={7} lg={6}>
          <CCard className="shadow" style={{ borderRadius: 10 }}>
            <CCardHeader className="text-center" style={{ background: '#070145', color: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
              <h4 className="mb-0">Inscribir Estudiante en Curso</h4>
            </CCardHeader>
            <CCardBody>
              {loading ? (
                <div className="text-center my-4">
                  <CSpinner color="info" />
                </div>
              ) : (
                <CForm onSubmit={handleSubmit}>
                  {error && <CAlert color="danger">{error}</CAlert>}
                  {mensaje && <CAlert color="success">{mensaje}</CAlert>}

                  <CFormLabel htmlFor="filtroEstudiante" className="fw-bold">Buscar estudiante</CFormLabel>
                  <CFormInput
                    id="filtroEstudiante"
                    placeholder="Escribe el nombre o apellido"
                    className="mb-2"
                    value={filtro}
                    onChange={e => setFiltro(e.target.value)}
                    style={{ borderRadius: 8 }}
                  />
                  {searchErrors.estudiante && <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{searchErrors.estudiante}</div>}

                  <CFormLabel htmlFor="estudianteSelect" className="fw-bold mt-2">Estudiante</CFormLabel>
                  <CFormSelect
                    id="estudianteSelect"
                    value={id_usuario}
                    onChange={e => setIdUsuario(e.target.value)}
                    aria-describedby="errorUsuario"
                    required
                    className="mb-2"
                    style={{ borderRadius: 8 }}
                  >
                    <option value="">Seleccione...</option>
                    {estudiantesFiltrados.map(e => (
                      <option key={e.id_usuario} value={e.id_usuario}>
                        {e.nombre} {e.apellido} ({e.email})
                      </option>
                    ))}
                  </CFormSelect>
                  {errors.usuario && <div id="errorUsuario" style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{errors.usuario}</div>}

                  <CFormLabel htmlFor="filtroCurso" className="fw-bold">Buscar curso</CFormLabel>
                  <CFormInput
                    id="filtroCurso"
                    placeholder="Escribe el nombre del curso"
                    className="mb-2"
                    value={filtroCurso}
                    onChange={e => setFiltroCurso(e.target.value)}
                    style={{ borderRadius: 8 }}
                  />
                  {searchErrors.curso && <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{searchErrors.curso}</div>}

                  <CFormLabel htmlFor="cursoSelect" className="fw-bold mt-2">Curso</CFormLabel>
                  <CFormSelect
                    id="cursoSelect"
                    value={id_curso}
                    onChange={e => setIdCurso(e.target.value)}
                    aria-describedby="errorCurso"
                    required
                    className="mb-3"
                    style={{ borderRadius: 8 }}
                  >
                    <option value="">Seleccione...</option>
                    {cursosFiltrados.map(c => (
                      <option key={c.id_curso} value={c.id_curso}>
                        {c.nombre_curso}
                      </option>
                    ))}
                  </CFormSelect>
                  {errors.curso && <div id="errorCurso" style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{errors.curso}</div>}

                  <div className="text-center">
                    <CButton
                      type="submit"
                      style={{ backgroundColor: '#070145', color: 'white', borderRadius: 8 }}
                      className="px-5 text-white fw-bold"
                      disabled={enviando}
                    >
                      {enviando ? <CSpinner size="sm" /> : 'Inscribir'}
                    </CButton>
                  </div>
                </CForm>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Tabla de inscripciones con diseño mejorado y botones acomodados */}
      <CRow className="justify-content-center mt-4">
        <CCol md={10} lg={8}>
          <CCard>
            <CCardHeader style={{ backgroundColor: '#070145', color: 'white' }}>
              Gestión de Inscripciones
            </CCardHeader>
            <CCardBody>
              {mensajeTabla && <CAlert color={tipoMensaje}>{mensajeTabla}</CAlert>}
              <div className="d-flex justify-content-center">
                <CTable hover className="w-100 text-center align-middle" responsive>
                  <CTableHead style={{ background: '#f5f7fb' }}>
                    <CTableRow>
                      <CTableHeaderCell style={{ width: '50%', textAlign: 'left', paddingLeft: 20 }}>Estudiante</CTableHeaderCell>
                      <CTableHeaderCell style={{ width: '35%' }}>Curso</CTableHeaderCell>
                      <CTableHeaderCell style={{ width: '15%' }}>Acciones</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {inscripcionesPagina.map(i => (
                      <CTableRow key={i.id_inscripcion}>
                        <CTableDataCell className="text-start ps-4">
                          <div style={{ fontWeight: 600 }}>{i.nombre} {i.apellido}</div>
                          <small className="text-muted">{i.email}</small>
                        </CTableDataCell>
                        <CTableDataCell>{i.nombre_curso}</CTableDataCell>
                        <CTableDataCell>
                          <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                            <CButton
                              size="sm"
                              style={{ backgroundColor: '#0d6efd', color: 'white', minWidth: 70 }}
                              onClick={() => handleEditar(i)}
                            >
                              Editar
                            </CButton>
                            <CButton
                              size="sm"
                              style={{ backgroundColor: '#dc3545', color: 'white', minWidth: 70 }}
                              onClick={() => solicitarEliminar(i)}
                            >
                              Eliminar
                            </CButton>
                          </div>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                    {inscripcionesPagina.length === 0 && (
                      <CTableRow>
                        <CTableDataCell colSpan="3">No hay inscripciones registradas.</CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              </div>

              {/* Paginación */}
              <div className="d-flex justify-content-center mt-3">
                <CPagination align="center" aria-label="Paginación inscripciones">
                  <CPaginationItem
                    disabled={pagina === 1}
                    onClick={() => setPagina(pagina - 1)}
                  >
                    &laquo;
                  </CPaginationItem>
                  {[...Array(totalPaginas)].map((_, idx) => (
                    <CPaginationItem
                      key={idx + 1}
                      active={pagina === idx + 1}
                      onClick={() => setPagina(idx + 1)}
                    >
                      {idx + 1}
                    </CPaginationItem>
                  ))}
                  <CPaginationItem
                    disabled={pagina === totalPaginas || totalPaginas === 0}
                    onClick={() => setPagina(pagina + 1)}
                  >
                    &raquo;
                  </CPaginationItem>
                </CPagination>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modal Editar (NO se cierra por click fuera ni con ESC) */}
      <CModal visible={modal} backdrop="static" keyboard={false} onClose={() => { if (permitCloseModal) setModal(false); }}>
        <CModalHeader>
          <strong>Editar Inscripción</strong>
        </CModalHeader>
        <CModalBody>
          {mensajeTabla && <CAlert color={tipoMensaje}>{mensajeTabla}</CAlert>}
          {inscripcionEdit && (
            <CForm onSubmit={handleGuardar}>
              <CFormLabel className="fw-bold">Estudiante</CFormLabel>
              <CFormSelect
                className="mb-2"
                value={inscripcionEdit.id_usuario}
                onChange={e => setInscripcionEdit({ ...inscripcionEdit, id_usuario: e.target.value })}
                aria-describedby="modalErrorUsuario"
              >
                <option value="">Seleccione un estudiante</option>
                {usuarios.map(u => (
                  <option key={u.id_usuario} value={u.id_usuario}>
                    {u.nombre} {u.apellido} ({u.email})
                  </option>
                ))}
              </CFormSelect>
              {modalEditErrors.usuario && <div id="modalErrorUsuario" style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{modalEditErrors.usuario}</div>}

              <CFormLabel className="fw-bold mt-2">Curso</CFormLabel>
              <CFormSelect
                className="mb-2"
                value={inscripcionEdit.id_curso}
                onChange={e => setInscripcionEdit({ ...inscripcionEdit, id_curso: e.target.value })}
                aria-describedby="modalErrorCurso"
              >
                <option value="">Seleccione un curso</option>
                {cursosAll.map(c => (
                  <option key={c.id_curso} value={c.id_curso}>{c.nombre_curso}</option>
                ))}
              </CFormSelect>
              {modalEditErrors.curso && <div id="modalErrorCurso" style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{modalEditErrors.curso}</div>}

              <div className="d-flex justify-content-end mt-3" style={{ gap: 8 }}>
                <CButton color="secondary" onClick={() => { setPermitCloseModal(true); setModal(false); }}>Cancelar</CButton>
                <CButton color="info" type="submit" className="text-white fw-bold">Guardar</CButton>
              </div>
            </CForm>
          )}
        </CModalBody>
      </CModal>

      {/* Modal Eliminar (NO se cierra por click fuera ni con ESC) */}
      <CModal visible={modalEliminar} backdrop="static" keyboard={false} onClose={() => { if (permitCloseEliminar) setModalEliminar(false); }}>
        <CModalHeader>
          <strong>Eliminar Inscripción</strong>
        </CModalHeader>
        <CModalBody>
          {modalEliminarError && <div style={{ color: 'red', marginBottom: 8 }}>{modalEliminarError}</div>}
          ¿Seguro que deseas eliminar la inscripción de <b>{inscripcionEliminar?.nombre} {inscripcionEliminar?.apellido}</b> en el curso <b>{inscripcionEliminar?.nombre_curso}</b>?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => { setPermitCloseEliminar(true); setModalEliminar(false); }}>Cancelar</CButton>
          <CButton color="danger" onClick={handleEliminar}>Eliminar</CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  );
}