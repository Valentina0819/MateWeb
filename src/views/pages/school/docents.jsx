import React, { useEffect, useState } from 'react';
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CCardTitle,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CButton,
  CAlert,
} from "@coreui/react";

const EstudianteForm = () => {
  const [formData, setFormData] = useState({
    cedula: '',
    nombres: '',
    apellidos: '',
    sexo: '',
    pasaporte: '',
    celular: '',
    fecha_nacimiento: '',
    lugar_nacimiento: '',
    parroquia: '',
    nacionalidad: '',
    estado_civil: '',
    correo_electronico: '',
    nro_grupo_familiar: '',
    trabaja: false,
    hermanos_en_institucion: '',
    grupo_sanguineo: '',
    peso: '',
    talla_camisa: '',
    talla_pantalon: '',
    talla_calzado: '',
    direccion_habitacion: '',
    nro_casa: '',
    telefono_casa: ''
  });

  const [paises, setPaises] = useState([]);
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [parroquias, setParroquias] = useState([]);
  const [nacionalidades, setNacionalidades] = useState([]);

  const [selectedPais, setSelectedPais] = useState('');
  const [selectedEstado, setSelectedEstado] = useState('');
  const [selectedMunicipio, setSelectedMunicipio] = useState('');
  const [mensaje, setMensaje] = useState("");

  // Obtener usuario y rol
  const usuarioGuardado = localStorage.getItem("usuario");
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;

  useEffect(() => {
    fetch('http://localhost:4000/paises')
      .then(res => res.json())
      .then(data => setPaises(data))
      .catch(console.error);

    fetch('http://localhost:4000/nacionalidades')
      .then(res => res.json())
      .then(data => setNacionalidades(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedPais) {
      fetch(`http://localhost:4000/estadosPais?idPais=${selectedPais}`)
        .then(res => res.json())
        .then(data => setEstados(data))
        .catch(console.error);
    }
  }, [selectedPais]);

  useEffect(() => {
    if (selectedEstado) {
      fetch(`http://localhost:4000/municipios/${selectedEstado}`)
        .then(res => res.json())
        .then(data => setMunicipios(data))
        .catch(console.error);
    }
  }, [selectedEstado]);

  useEffect(() => {
    if (selectedMunicipio) {
      fetch(`http://localhost:4000/parroquias/${selectedMunicipio}`)
        .then(res => res.json())
        .then(data => setParroquias(data))
        .catch(console.error);
    }
  }, [selectedMunicipio]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMensaje('Error al registrar estudiante');
      } else {
        setMensaje('Estudiante registrado exitosamente');
        setFormData({
          cedula: '',
          nombres: '',
          apellidos: '',
          sexo: '',
          pasaporte: '',
          celular: '',
          fecha_nacimiento: '',
          lugar_nacimiento: '',
          parroquia: '',
          nacionalidad: '',
          estado_civil: '',
          correo_electronico: '',
          nro_grupo_familiar: '',
          trabaja: false,
          hermanos_en_institucion: '',
          grupo_sanguineo: '',
          peso: '',
          talla_camisa: '',
          talla_pantalon: '',
          talla_calzado: '',
          direccion_habitacion: '',
          nro_casa: '',
          telefono_casa: ''
        });
      }
    } catch (err) {
      setMensaje('Error en la conexión');
    }
  };

  return (
    <CContainer className="py-4">
      <CRow className="justify-content-center">
        <CCol xs={12} lg={11}>
          <CCard className="shadow-sm">
            <CCardHeader className="" style={{ backgroundColor: "#0059b3", color: "white" }}>
              <CCardTitle>Registro de Estudiante</CCardTitle>
            </CCardHeader>
            <CCardBody>
              {mensaje && (
                <CAlert
                  color={mensaje.toLowerCase().includes("error") ? "danger" : "success"}
                  dismissible
                  onClose={() => setMensaje("")}
                >
                  {mensaje}
                </CAlert>
              )}
              {usuario?.rol === "admin" ? (
                <CForm onSubmit={handleSubmit}>
                  <CRow className="g-3">
                    <CCol md={3}>
                      <CFormLabel>Cédula</CFormLabel>
                      <CFormInput
                        name="cedula"
                        placeholder="Ej: 12345678"
                        value={formData.cedula}
                        onChange={handleChange}
                        required
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Nombres</CFormLabel>
                      <CFormInput
                        name="nombres"
                        placeholder="Ej: Juan Carlos"
                        value={formData.nombres}
                        onChange={handleChange}
                        required
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Apellidos</CFormLabel>
                      <CFormInput
                        name="apellidos"
                        placeholder="Ej: Pérez Gómez"
                        value={formData.apellidos}
                        onChange={handleChange}
                        required
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Sexo</CFormLabel>
                      <CFormSelect
                        name="sexo"
                        value={formData.sexo}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Seleccione</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                      </CFormSelect>
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Pasaporte</CFormLabel>
                      <CFormInput
                        name="pasaporte"
                        placeholder="Opcional"
                        value={formData.pasaporte}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Celular</CFormLabel>
                      <CFormInput
                        name="celular"
                        placeholder="Ej: +58 412 1234567"
                        value={formData.celular}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Fecha de nacimiento</CFormLabel>
                      <CFormInput
                        type="date"
                        name="fecha_nacimiento"
                        value={formData.fecha_nacimiento}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Lugar de nacimiento</CFormLabel>
                      <CFormInput
                        name="lugar_nacimiento"
                        placeholder="Ej: Caracas"
                        value={formData.lugar_nacimiento}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>País</CFormLabel>
                      <CFormSelect
                        value={selectedPais}
                        onChange={e => setSelectedPais(e.target.value)}
                        required
                      >
                        <option value="">Seleccione País</option>
                        {paises.map(p => (
                          <option key={p.id_pais} value={p.id_pais}>
                            {p.nombre}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Estado</CFormLabel>
                      <CFormSelect
                        value={selectedEstado}
                        onChange={e => setSelectedEstado(e.target.value)}
                        required
                      >
                        <option value="">Seleccione Estado</option>
                        {estados.map(e => (
                          <option key={e.id_estado} value={e.id_estado}>
                            {e.nombre}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Municipio</CFormLabel>
                      <CFormSelect
                        value={selectedMunicipio}
                        onChange={e => setSelectedMunicipio(e.target.value)}
                        required
                      >
                        <option value="">Seleccione Municipio</option>
                        {municipios.map(m => (
                          <option key={m.id_municipio} value={m.id_municipio}>
                            {m.nombre}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Parroquia</CFormLabel>
                      <CFormSelect
                        name="parroquia"
                        value={formData.parroquia}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Seleccione Parroquia</option>
                        {parroquias.map(p => (
                          <option key={p.id_parroquia} value={p.id_parroquia}>
                            {p.nombre}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Nacionalidad</CFormLabel>
                      <CFormSelect
                        name="nacionalidad"
                        value={formData.nacionalidad}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Seleccione Nacionalidad</option>
                        {nacionalidades.map(n => (
                          <option key={n.id_nacionalidad} value={n.id_nacionalidad}>
                            {n.nombre}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Estado civil</CFormLabel>
                      <CFormInput
                        name="estado_civil"
                        placeholder="Ej: Soltero"
                        value={formData.estado_civil}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Correo electrónico</CFormLabel>
                      <CFormInput
                        type="email"
                        name="correo_electronico"
                        placeholder="ejemplo@correo.com"
                        value={formData.correo_electronico}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Dirección habitación</CFormLabel>
                      <CFormInput
                        name="direccion_habitacion"
                        placeholder="Ej: Calle 123, Casa 45"
                        value={formData.direccion_habitacion}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Nro. grupo familiar</CFormLabel>
                      <CFormInput
                        name="nro_grupo_familiar"
                        placeholder="Ej: 5"
                        value={formData.nro_grupo_familiar}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol md={3} className="d-flex align-items-center">
                      <CFormLabel className="me-2 mb-0">¿Trabaja?</CFormLabel>
                      <input
                        type="checkbox"
                        name="trabaja"
                        checked={formData.trabaja}
                        onChange={handleChange}
                        style={{ width: "20px", height: "20px" }}
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Hermanos en la institución</CFormLabel>
                      <CFormInput
                        name="hermanos_en_institucion"
                        placeholder="Ej: 2"
                        value={formData.hermanos_en_institucion}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Grupo sanguíneo</CFormLabel>
                      <CFormInput
                        name="grupo_sanguineo"
                        placeholder="Ej: O+"
                        value={formData.grupo_sanguineo}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Peso (kg)</CFormLabel>
                      <CFormInput
                        name="peso"
                        placeholder="Ej: 70"
                        value={formData.peso}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Talla camisa</CFormLabel>
                      <CFormInput
                        name="talla_camisa"
                        placeholder="Ej: M"
                        value={formData.talla_camisa}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Talla pantalón</CFormLabel>
                      <CFormInput
                        name="talla_pantalon"
                        placeholder="Ej: 32"
                        value={formData.talla_pantalon}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Talla calzado</CFormLabel>
                      <CFormInput
                        name="talla_calzado"
                        placeholder="Ej: 42"
                        value={formData.talla_calzado}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Nro. casa</CFormLabel>
                      <CFormInput
                        name="nro_casa"
                        placeholder="Ej: 45"
                        value={formData.nro_casa}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Teléfono de casa</CFormLabel>
                      <CFormInput
                        name="telefono_casa"
                        placeholder="Ej: 0212-1234567"
                        value={formData.telefono_casa}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol md={12} className="d-grid mt-3">
                      <CButton color="primary" type="submit" size="lg">
                        Registrar Estudiante
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              ) : (
                <CAlert color="warning" className="mb-0">
                  Solo los administradores pueden registrar estudiantes.
                </CAlert>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default EstudianteForm;
