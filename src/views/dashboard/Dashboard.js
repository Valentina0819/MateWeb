import React from 'react'
import classNames from 'classnames'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { Bar, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title)

// Datos simulados
const resumen = {
  fallecidos: 12,
  heridos: 37,
  desastreMasFrecuente: 'Inundación',
}

const desastresPorTipo = [
  { tipo: 'Inundación', cantidad: 8, fallecidos: 5, heridos: 15 },
  { tipo: 'Deslizamiento', cantidad: 5, fallecidos: 3, heridos: 10 },
  { tipo: 'Incendio', cantidad: 2, fallecidos: 2, heridos: 7 },
  { tipo: 'Sismo', cantidad: 1, fallecidos: 2, heridos: 5 },
]

// Gráfica de barras: cantidad de desastres por tipo
const barData = {
  labels: desastresPorTipo.map(d => d.tipo),
  datasets: [
    {
      label: 'Cantidad de Desastres',
      data: desastresPorTipo.map(d => d.cantidad),
      backgroundColor: ['#0d6efd', '#ffc107', '#dc3545', '#20c997'],
      borderRadius: 8,
    },
  ],
}

// Gráfica de torta: fallecidos/heridos por tipo de desastre
const pieData = {
  labels: desastresPorTipo.map(d => d.tipo),
  datasets: [
    {
      label: 'Fallecidos',
      data: desastresPorTipo.map(d => d.fallecidos),
      backgroundColor: ['#dc3545', '#ffc107', '#0d6efd', '#20c997'],
    },
    {
      label: 'Heridos',
      data: desastresPorTipo.map(d => d.heridos),
      backgroundColor: ['#6c757d', '#fd7e14', '#198754', '#6610f2'],
    },
  ],
}

const pieOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' },
    title: { display: true, text: 'Fallecidos y Heridos por Tipo de Desastre' },
  },
}

const barOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: 'Cantidad de Desastres por Tipo' },
  },
  scales: {
    y: { beginAtZero: true, stepSize: 1 },
  },
}

const donacionesPorTipo = [
  { tipo: 'Ropa', cantidad: 25 },
  { tipo: 'Alimentos', cantidad: 40 },
  { tipo: 'Dinero', cantidad: 15 },
  { tipo: 'Medicinas', cantidad: 10 },
  { tipo: 'Otros bienes', cantidad: 5 },
]

const donacionesPieData = {
  labels: donacionesPorTipo.map(d => d.tipo),
  datasets: [
    {
      label: 'Donaciones por tipo',
      data: donacionesPorTipo.map(d => d.cantidad),
      backgroundColor: [
        '#0d6efd',
        '#20c997',
        '#ffc107',
        '#dc3545',
        '#6f42c1'
      ],
    },
  ],
}

const donacionesPieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' },
    title: { display: true, text: 'Donaciones por Tipo' },
  },
}

const Dashboard = () => {
  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <WidgetsBrand className="mb-4" withCharts />

      {/* Tarjetas resumen */}
      <div className="container-fluid py-4">
        <CRow className="mb-4">
          <CCol md={4}>
            <CCard className="text-center shadow">
              <CCardBody>
                <h5 className="text-danger mb-2">Fallecidos</h5>
                <div style={{ fontSize: 36, fontWeight: 'bold' }}>{resumen.fallecidos}</div>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol md={4}>
            <CCard className="text-center shadow">
              <CCardBody>
                <h5 className="text-warning mb-2">Heridos</h5>
                <div style={{ fontSize: 36, fontWeight: 'bold' }}>{resumen.heridos}</div>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol md={4}>
            <CCard className="text-center shadow">
              <CCardBody>
                <h5 className="text-primary mb-2">Desastre más frecuente</h5>
                <div style={{ fontSize: 24, fontWeight: 'bold' }}>{resumen.desastreMasFrecuente}</div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Gráficas principales */}
        <CRow>
          <CCol md={6} className="mb-4">
            <CCard className="shadow">
              <CCardBody>
                <Bar data={barData} options={barOptions} height={300} />
              </CCardBody>
            </CCard>
          </CCol>
          <CCol md={6} className="mb-4">
            <CCard className="shadow">
              <CCardBody>
                {/* Primera torta */}
                <div style={{ width: 300, height: 300, margin: "0 auto" }}>
                  <Pie
                    data={{
                      labels: ['Fallecidos', 'Heridos'],
                      datasets: [
                        {
                          label: 'Fallecidos',
                          data: [
                            desastresPorTipo.reduce((acc, d) => acc + d.fallecidos, 0),
                            desastresPorTipo.reduce((acc, d) => acc + d.heridos, 0),
                          ],
                          backgroundColor: ['#dc3545', '#ffc107'],
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { position: 'bottom' },
                        title: { display: true, text: 'Total Fallecidos vs Heridos' },
                      },
                    }}
                  />
                </div>
                {/* Segunda torta pegada debajo */}
                <div style={{ width: 300, height: 300, margin: "20px auto 0 auto" }}>
                  <Pie
                    data={donacionesPieData}
                    options={donacionesPieOptions}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      

        {/* Gráfica de donaciones por tipo como torta, alineada debajo de la otra torta */}
        
      </div>
    </>
  )
}

export default Dashboard
