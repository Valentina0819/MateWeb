import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilBullhorn,
  cilHome,
  cilBuilding,
  cilRain,
  cilList,
  cilGift,
  cilInstitution,
  cilWarning,
  cilUserPlus,
  cilLockLocked,
  cilHeart,
  cilUserX,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'


const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'GESTIÓN',
  },
  {
    component: CNavItem,
    name: 'Inicio',
    to: '/docents',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Noticias',
    to: '/noticias',
    icon: <CIcon icon={cilBullhorn} customClassName="nav-icon" />,
  },
    {
    component: CNavItem,
    name: 'Movimientos de tierra',
    to: '/prueba',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Desbordamientos de Rios',
    to: '/desbordes',
    icon: <CIcon icon={cilRain} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Damnificados',
    to: '/damnificados',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Victimas Fatales',
    to: '/victimas',
    icon: <CIcon icon={cilUserX} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Donaciones',
    to: '/donaciones',
    icon: <CIcon icon={cilGift} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Donantes',
    to: '/donantes',
    icon: <CIcon icon={cilHeart} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Registrar Comunidad',
    to: '/comunidad',
    icon: <CIcon icon={cilInstitution} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Listado de Comunidades',
    to: '/ComunidadCrud',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Zonas De Riesgo',
    to: '/zonas',
    icon: <CIcon icon={cilWarning} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Login',
    to: '/login',
    icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
  },
]

export default _nav
