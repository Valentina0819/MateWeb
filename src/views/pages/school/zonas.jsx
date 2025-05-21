import React, { useState } from 'react';
import {
  CContainer, CRow, CCol, CCard, CCardBody, CCardTitle, CCardText, CForm, CFormInput,
  CFormLabel, CFormSelect, CButton, CModal, CModalHeader, CModalTitle, CModalBody, CAlert, CImage
} from '@coreui/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
import 'leaflet/dist/leaflet.css';
import '@coreui/coreui/dist/css/coreui.min.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

// Noticias recientes
import rio from "../../../assets/images/rio.jpg";
import rio2 from "../../../assets/images/rio2.png";
import torbes from "../../../assets/images/torbes.jpg";

const newsPosts = [
  { id: 1, title: "🌊 Desbordamiento del río Torbes", description: "Lluvias En el sector Andrés Eloy Blanco municipio san cristóbal, el río Torbes se llevó la carretera principal de la comunidad, que arrasó con tuberías de agua potable, las cloacas y postes tras el aumento del caudal en medio del aguacero.  causado el desbordamiento.", image: rio },
  { id: 2, title: "🏠 Deslizamiento de tierra", description: "Un Al menos siete viviendas de la citada comunidad están a punto de caer al río, motivo por el cual, los residentes  ejercieron acciones de protesta y trancaron la Troncal 5 que comunica al Táchira con el estado Barinas, por varias horas, hecho que generó fuertes discusiones. (Jueves 10 de agosto del 2023)", image: rio2 },
  { id: 3, title: "🚨 Alerta por Derrumbes", description: "Expertos evaluarán Según los vecinos, en el sector La Playa, el río Torbes se salió de su cauce, mientras que en el barrio El Río se presentó una situación similar, pero por un caño y una laguna, hecho que hizo colapsar algunas alcantarillas. Bomberos de San Cristóbal y cuadrillas de la Alcaldía atendieron la emergencia. (10 de junio del 2024)", image: torbes },
];

// Niveles de riesgo posibles
const riskLevels = ["Bajo", "Moderado", "Alto"];

const initialZones = [
  { name: "Barrio El Hoyo", lat: 7.737388, lng: -72.240024, risk: "Alto" },
  { name: "San Sebastian", lat: 7.744076, lng: -72.242490, risk: "Moderado" },
  { name: "La Playa", lat: 7.742052, lng: -72.242339, risk: "Alto" }
];

const riskToValue = { "Bajo": 1, "Moderado": 2, "Alto": 3 };
const riskToColor = { "Bajo": "green", "Moderado": "orange", "Alto": "red" };

const RiskManagementModule = () => {
  const [riskZones, setRiskZones] = useState(initialZones);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    lat: "",
    lng: "",
    risk: ""
  });
  const [errors, setErrors] = useState({});

  // Validaciones simples
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Nombre requerido";
    if (!form.lat || isNaN(form.lat) || form.lat < -90 || form.lat > 90) newErrors.lat = "Latitud inválida";
    if (!form.lng || isNaN(form.lng) || form.lng < -180 || form.lng > 180) newErrors.lng = "Longitud inválida";
    if (!form.risk) newErrors.risk = "Seleccione un nivel de riesgo";
    return newErrors;
  };

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  // Guardar nueva zona
  const handleSave = (e) => {
    e.preventDefault();
    const val = validate();
    if (Object.keys(val).length) {
      setErrors(val);
      return;
    }
    setRiskZones([...riskZones, {
      name: form.name,
      lat: parseFloat(form.lat),
      lng: parseFloat(form.lng),
      risk: form.risk
    }]);
    setShowModal(false);
    setForm({ name: "", lat: "", lng: "", risk: "" });
    setErrors({});
  };

  // Para la gráfica horizontal
  const data = {
    labels: riskZones.map(z => z.name),
    datasets: [
      {
        label: "Nivel de riesgo",
        data: riskZones.map(z => riskToValue[z.risk]),
        backgroundColor: riskZones.map(z => riskToColor[z.risk]),
        borderRadius: 8,
      }
    ]
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        min: 0,
        max: 3,
        ticks: {
          stepSize: 1,
          callback: (value) => {
            if (value === 1) return "Bajo";
            if (value === 2) return "Moderado";
            if (value === 3) return "Alto";
            return "";
          }
        },
        title: {
          display: true,
          text: "Nivel de Peligro"
        }
      },
      y: {
        title: {
          display: true,
          text: "Zona"
        }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const val = ctx.raw;
            if (val === 1) return "Bajo";
            if (val === 2) return "Moderado";
            if (val === 3) return "Alto";
            return "";
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    height: 300
  };

  return (
    <CContainer className="text-center mt-5">
      {/* Tarjeta de Introducción */}
      <CRow className="justify-content-center">
        <CCol md={10}>
          <CCard className="p-4 shadow-lg border-0">
            <CCardBody>
              <CCardTitle className="fs-3 fw-bold">🌍 Gestión de Zonas de Riesgo</CCardTitle>
              <CCardText>
                Información en tiempo real sobre deslizamientos, inundaciones y alertas en Barrio El Hoyo, La Playa y San Sebastián.
              </CCardText>
              <CButton color="primary" className="mt-2 bg-info" onClick={() => setShowModal(true)}>
                + Registrar nueva zona de riesgo
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modal para registrar nueva zona */}
      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader>
          <CModalTitle>Registrar nueva zona de riesgo</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSave} autoComplete="off">
            <CCol className="mb-3">
              <CFormLabel>Nombre de la zona</CFormLabel>
              <CFormInput
                name="name"
                value={form.name}
                onChange={handleChange}
                maxLength={50}
                placeholder="Ej: Barrio Nuevo"
                invalid={!!errors.name}
              />
              {errors.name && <CAlert color="danger" className="py-1 my-1">{errors.name}</CAlert>}
            </CCol>
            <CCol className="mb-3">
              <CFormLabel>Latitud</CFormLabel>
              <CFormInput
                name="lat"
                value={form.lat}
                onChange={handleChange}
                placeholder="Ej: 7.75"
                invalid={!!errors.lat}
              />
              {errors.lat && <CAlert color="danger" className="py-1 my-1">{errors.lat}</CAlert>}
            </CCol>
            <CCol className="mb-3">
              <CFormLabel>Longitud</CFormLabel>
              <CFormInput
                name="lng"
                value={form.lng}
                onChange={handleChange}
                placeholder="Ej: -72.23"
                invalid={!!errors.lng}
              />
              {errors.lng && <CAlert color="danger" className="py-1 my-1">{errors.lng}</CAlert>}
            </CCol>
            <CCol className="mb-3">
              <CFormLabel>Nivel de riesgo</CFormLabel>
              <CFormSelect
                name="risk"
                value={form.risk}
                onChange={handleChange}
                invalid={!!errors.risk}
              >
                <option value="">Seleccione un nivel...</option>
                {riskLevels.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </CFormSelect>
              {errors.risk && <CAlert color="danger" className="py-1 my-1">{errors.risk}</CAlert>}
            </CCol>
            <CRow className="mt-4">
              <CCol className="d-flex justify-content-end gap-2">
                <CButton type="button" color="secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </CButton>
                <CButton type="submit" color="info text-white">
                  Registrar
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
      </CModal>

      {/* Mapa de Zonas de Riesgo */}
      <CRow className="justify-content-center mt-4">
        <CCol md={10}>
          <MapContainer center={[7.766, -72.225]} zoom={13} style={{ height: "400px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {riskZones.map((zone, index) => (
              <Marker key={index} position={[zone.lat, zone.lng]}>
                <Popup>
                  <strong>{zone.name}</strong><br />
                  Nivel de riesgo: <span style={{ color: zone.risk === "Alto" ? "red" : zone.risk === "Moderado" ? "orange" : "green" }}>{zone.risk}</span>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </CCol>
      </CRow>

      {/* Gráfica de datos */}
      <CRow className="justify-content-center mt-4">
        <CCol md={8} style={{ height: 350 }}>
          <CCard className="p-4 shadow-lg border-0" style={{ height: "100%" }}>
            <CCardBody>
              <CCardTitle className="fs-4 fw-bold">📊 Zonas de Riesgo Registradas</CCardTitle>
              <div style={{ height: 250 }}>
                <Bar data={data} options={options} />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Noticias recientes tipo "post" */}
      <CRow className="justify-content-center mt-4">
        {newsPosts.map((post) => (
          <CCol md={5} key={post.id} className="mb-4">
            <CCard className="p-3 shadow-lg border-0 hover-effect" style={{ maxWidth: "400px" }}>
              <CImage className="d-block rounded" src={post.image} alt={post.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <CCardBody>
                <CCardTitle className="fs-5 fw-bold">{post.title}</CCardTitle>
                <CCardText>{post.description}</CCardText>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </CContainer>
  );
};

export default RiskManagementModule;