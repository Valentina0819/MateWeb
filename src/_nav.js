import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilWindowRestore,
  cilPencil,
  cilExternalLink,
  cilPeople,
  cilFolderOpen,
  cilLayers,
  cilLan,
  cilDataTransferDown,
  cilStar,
  cilBraille,
  cilClipboard,
  cilHappy,
  cilApplications,
  cilCut,
  cilDialpad,
  cilBook,
} from '@coreui/icons'
import { CNavItem, CNavTitle, CNavGroup } from '@coreui/react'

export default function getNav() {
  const usuarioGuardado = localStorage.getItem('usuario')
  const userObj = usuarioGuardado ? JSON.parse(usuarioGuardado) : null
  const rol = (userObj?.rol || 'usuario').toLowerCase().trim()

  // Definición de rutas por Dashboard para evitar repetición
  const dashboardRoutes = {
    admin: '/admin/dashboard',
    docente: '/docente/dashboard',
    alumno: '/AlumnoDashboard',
    usuario: '/docente/dashboard',
  }

  const navigation = [
    // --- DASHBOARD PRINCIPAL ---
    {
      component: CNavItem,
      name: 'Panel Principal',
      to: dashboardRoutes[rol] || '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon text-info" />,
      badge: {
        color: 'primary',
      },
    },

    {
      component: CNavTitle,
      name: 'GESTIÓN ACADÉMICA',
    },

    // --- SECCIÓN: CONTENIDOS (Admin y Alumnos) ---
    ...(rol === 'admin' || rol === 'alumno'
      ? [
          {
            component: CNavGroup,
            name: 'Contenidos',
            icon: <CIcon icon={cilBook} customClassName="nav-icon text-warning" />,
            items: [
              { component: CNavItem, name: 'Sistemas Numeración', to: '/contenidos/leccion1' },
              { component: CNavItem, name: 'Múltiplos y Divisores', to: '/contenidos/leccion2' },
              { component: CNavItem, name: 'Operaciones Mixtas', to: '/contenidos/leccion3' },
              { component: CNavItem, name: 'Ecuaciones 1° Grado', to: '/contenidos/leccion4' },
            ],
          },
        ]
      : []),

    // --- SECCIÓN: EXÁMENES (Solo Alumnos) ---
    ...(rol === 'alumno'
      ? [
          {
            component: CNavItem,
            name: 'Mi Examen',
            to: '/prueba',
            icon: <CIcon icon={cilExternalLink} customClassName="nav-icon text-danger" />,
          },
        ]
      : []),

    // --- SECCIÓN: ESTUDIANTES (Admin y Docente) ---
    ...(rol === 'admin' || rol === 'docente'
      ? [
          {
            component: CNavGroup,
            name: 'Aula Virtual',
            icon: <CIcon icon={cilPeople} customClassName="nav-icon text-success" />,
            items: [
              ...(rol === 'admin'
                ? [
                    {
                      component: CNavItem,
                      name: 'Inscribir',
                      to: '/inscripcion',
                      icon: <CIcon icon={cilFolderOpen} />,
                    },
                  ]
                : []),
              {
                component: CNavItem,
                name: 'Cursos',
                to: '/cursosymodulos',
                icon: <CIcon icon={cilLayers} />,
              },
              {
                component: CNavItem,
                name: 'Lecciones',
                to: '/recursosylecciones',
                icon: <CIcon icon={cilLan} />,
              },
              {
                component: CNavItem,
                name: 'Biblioteca Recursos',
                to: '/Recursos',
                icon: <CIcon icon={cilDataTransferDown} />,
              },
              {
                component: CNavItem,
                name: 'Ejercicios Docente',
                to: '/ejerciciodocente',
                icon: <CIcon icon={cilPencil} />,
              },
              {
                component: CNavItem,
                name: 'Registro Puntajes',
                to: '/puntaje',
                icon: <CIcon icon={cilStar} />,
              },
            ],
          },
        ]
      : []),

    // --- SECCIÓN: JUEGOS (Admin y Alumno) ---
    ...(rol === 'admin' || rol === 'alumno'
      ? [
          {
            component: CNavGroup,
            name: 'Zona de Juegos',
            icon: <CIcon icon={cilBraille} customClassName="nav-icon text-info" />,
            items: [
              {
                component: CNavItem,
                name: 'Sopa de Números',
                to: '/Sabana',
                icon: <CIcon icon={cilClipboard} />,
              },
              {
                component: CNavItem,
                name: 'Arrastra Formas',
                to: '/usuario',
                icon: <CIcon icon={cilHappy} />,
              },
              {
                component: CNavItem,
                name: 'Quiz Rápido',
                to: '/administrador',
                icon: <CIcon icon={cilApplications} />,
              },
            ],
          },
        ]
      : []),

    // --- SECCIÓN: ADMINISTRACIÓN (Solo Admin) ---
    ...(rol === 'admin'
      ? [
          {
            component: CNavTitle,
            name: 'CONFIGURACIÓN SISTEMA',
          },
          {
            component: CNavGroup,
            name: 'Administrar',
            icon: <CIcon icon={cilCut} customClassName="nav-icon text-secondary" />,
            items: [
              {
                component: CNavItem,
                name: 'Usuarios',
                to: '/usuarios',
                icon: <CIcon icon={cilPeople} />,
              },
              {
                component: CNavItem,
                name: 'Editar Puntajes',
                to: '/noticas',
                icon: <CIcon icon={cilDialpad} />,
              },
            ],
          },
        ]
      : []),
  ]

  return navigation
}
