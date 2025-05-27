import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilUserPlus,
  cilUser,
  cilUserX,
  cilRain,
  cilBook,
  cilClipboard,
  cilHome,
  cilBuilding,
  cilBullhorn,
  cilGift,
  cilInstitution,
  cilList,
  cilWarning,
  cilCloudUpload,
  cilHeart,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

export default function getNav() {
  const usuarioGuardado = localStorage.getItem('usuario');
  const rol = usuarioGuardado
    ? (JSON.parse(usuarioGuardado).rol || 'usuario').toLowerCase().trim()
    : 'usuario';

  console.log('ROL ACTUAL:', rol);

  return [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      badge: { color: 'info', text: 'NEW' },
    },
    {
      component: CNavTitle,
      name: 'GESTIÓN',
    },
// Solo admin puede registrar estudiante
    ...(rol === 'admin'
      ? [{
          component: CNavItem,
          name: 'Registrar Estudiante',
          to: '/docents',
          icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
        }]
      : []),
    // Solo admin puede registrar docente
    ...(rol === 'admin'
      ? [{
          component: CNavItem,
          name: 'Registrar Docente',
          to: '/noticias',
          icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
        }]
      : []),
    // Solo admin puede registrar materia
    ...(rol === 'admin'
      ? [{
          component: CNavItem,
          name: 'Registrar Materia',
          to: '/prueba',
          icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
        }]
      : []),
    // Solo admin puede asignar materias a docente
    ...(rol === 'admin'
      ? [{
          component: CNavItem,
          name: 'Asignar Materias a Docente',
          to: '/damnificados',
          icon: <CIcon icon={cilBullhorn} customClassName="nav-icon" />,
        }]
      : []),
    // Solo admin puede asignar sección a materia
    ...(rol === 'admin'
      ? [{
          component: CNavItem,
          name: 'Asignar seccion a Materia',
          to: '/victimas',
          icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
        }]
      : []),

      ...(rol === 'admin'
      ? [{
          component: CNavItem,
          name: 'Generar Constancia',
          to: '/desbordes',
          icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
        }]
      : []),
    // Estos módulos los ve cualquier usuario
    {
      component: CNavItem,
      name: 'prueba',
      to: '/donaciones',
      icon: <CIcon icon={cilGift} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'prueba',
      to: '/donantes',
      icon: <CIcon icon={cilHeart} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'prueba',
      to: '/comunidad',
      icon: <CIcon icon={cilInstitution} customClassName="nav-icon" />,
    },
   
    {
      component: CNavItem,
      name: 'prueba',
      to: '/zonas',
      icon: <CIcon icon={cilWarning} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'prueba',
      to: '/suceso',
      icon: <CIcon icon={cilCloudUpload} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'prueba',
      to: '/perdidas',
      icon: <CIcon icon={cilRain} customClassName="nav-icon" />,
    },
  ]
}