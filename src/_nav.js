import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDoor,
  cilSpeedometer,
  cilPeople,
  cilDevices,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

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
    name: 'PROFILES',
  },
  {
    component: CNavItem,
    name: 'Estudiantes',
    to: '/students',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Docentes',
    to: '/docents',
    icon: <CIcon icon={cilDevices} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Aulas',
    to: '/classrooms',
    icon: <CIcon icon={cilDoor} customClassName="nav-icon" />,
  },

]

export default _nav
