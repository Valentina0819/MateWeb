import React, { useEffect, useState } from 'react';
import {
  CCard, CCardBody, CCardHeader, CButton, CTable, CTableHead, CTableRow, CTableHeaderCell,
  CTableBody, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter, CForm, CFormInput, CFormSelect, CAlert
} from '@coreui/react';

const roles = [
  { value: 'admin', label: 'Administrador' },
  { value: 'alumno', label: 'Alumno' },
  { value: 'docente', label: 'docente' }
];

export default function CrudUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [usuarioEdit, setUsuarioEdit] = useState(null);
  const [usuarioEliminar, setUsuarioEliminar] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('success');

  // Cargar usuarios
  const cargarUsuarios = () => {
    fetch('http://localhost:4000/usuarios')
      .then(res => res.json())
      .then(setUsuarios);
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // Editar usuario
  const handleEditar = (usuario) => {
    setUsuarioEdit(usuario);
    setModal(true);
    setMensaje('');
  };

  // Guardar edición
  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/usuarios/${usuarioEdit.id_usuario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioEdit)
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje('Usuario actualizado correctamente');
        setTipoMensaje('success');
        setModal(false);
        cargarUsuarios();
      } else {
        setMensaje(data.mensaje || 'Error al actualizar');
        setTipoMensaje('danger');
      }
    } catch {
      setMensaje('Error de conexión');
      setTipoMensaje('danger');
    }
  };

  // Eliminar usuario
  const handleEliminar = async () => {
    try {
      const res = await fetch(`http://localhost:4000/usuarios/${usuarioEliminar.id_usuario}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje('Usuario eliminado correctamente');
        setTipoMensaje('success');
        setModalEliminar(false);
        cargarUsuarios();
      } else {
        setMensaje(data.mensaje || 'Error al eliminar');
        setTipoMensaje('danger');
      }
    } catch {
      setMensaje('Error de conexión');
      setTipoMensaje('danger');
    }
  };

  return (
    <CCard className="mt-4">
      <CCardHeader style={{ background: '#070145', color: 'white' }}>Gestión de Usuarios</CCardHeader>
      <CCardBody>
        {mensaje && <CAlert color={tipoMensaje}>{mensaje}</CAlert>}
        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              
              <CTableHeaderCell>Nombre</CTableHeaderCell>
              <CTableHeaderCell>Apellido</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Rol</CTableHeaderCell>
              <CTableHeaderCell>Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {usuarios.map(u => (
              <CTableRow key={u.id_usuario}>
                
                <CTableDataCell>{u.nombre}</CTableDataCell>
                <CTableDataCell>{u.apellido}</CTableDataCell>
                <CTableDataCell>{u.email}</CTableDataCell>
                <CTableDataCell>{u.rol}</CTableDataCell>
                <CTableDataCell>
                  <CButton style={{ background: '#070145', color: 'white' }} size="sm" className="me-2" onClick={() => handleEditar(u)}>Editar</CButton>
                  <CButton style={{ background: 'red', color: 'white' }} onClick={() => { setUsuarioEliminar(u); setModalEliminar(true); }}>Eliminar</CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* Modal Editar */}
      <CModal visible={modal} onClose={() => setModal(false)}>
        <CModalHeader closeButton>Editar Usuario</CModalHeader>
        <CModalBody>
          {usuarioEdit && (
            <CForm onSubmit={handleGuardar}>
              <CFormInput
                className="mb-2"
                label="Nombre"
                value={usuarioEdit.nombre}
                onChange={e => setUsuarioEdit({ ...usuarioEdit, nombre: e.target.value })}
                required
              />
              <CFormInput
                className="mb-2"
                label="Apellido"
                value={usuarioEdit.apellido}
                onChange={e => setUsuarioEdit({ ...usuarioEdit, apellido: e.target.value })}
                required
              />
              <CFormInput
                className="mb-2"
                label="Email"
                type="email"
                value={usuarioEdit.email}
                onChange={e => setUsuarioEdit({ ...usuarioEdit, email: e.target.value })}
                required
              />
              <CFormSelect
                className="mb-2"
                label="Rol"
                value={usuarioEdit.rol}
                onChange={e => setUsuarioEdit({ ...usuarioEdit, rol: e.target.value })}
                required
              >
                {roles.map(r => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </CFormSelect>
              <CButton color="info" type="submit" className="text-white fw-bold">Guardar</CButton>
            </CForm>
          )}
        </CModalBody>
      </CModal>

      {/* Modal Eliminar */}
      <CModal visible={modalEliminar} onClose={() => setModalEliminar(false)}>
        <CModalHeader closeButton>Eliminar Usuario</CModalHeader>
        <CModalBody>
          ¿Seguro que deseas eliminar al usuario <b>{usuarioEliminar?.nombre} {usuarioEliminar?.apellido}</b>?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalEliminar(false)}>Cancelar</CButton>
          <CButton color="danger" onClick={handleEliminar}>Eliminar</CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  );
}