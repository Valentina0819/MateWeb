import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer, cilUserPlus, cilUser, cilUserX, cilRain, cilBook, cilClipboard, cilHome,
  cilBuilding, cilBullhorn, cilGift, cilInstitution, cilList, cilWarning, cilCloudUpload,
  cilHeart, cilEducation, cilPeople, cilUserFemale, cilPen, cilCalendar, cilCheckCircle,
  cilAddressBook, cilLibrary,cilLibraryAdd,cilPlaylistAdd,cilWindowRestore, cilPencil, cilPaperclip, cilNotes, cilHappy, cilCopy,cilExternalLink,cilNoteAdd,cilLockLocked,cilApplications,cilBraille,cilFolderOpen,cilLayers,cilLan,cilStar,cilDataTransferDown,cilDialpad,cilCut
} from '@coreui/icons'
import { CNavItem, CNavTitle, CNavGroup } from '@coreui/react'

export default function getNav() {
  const usuarioGuardado = localStorage.getItem('usuario');
  const rol = usuarioGuardado
    ? (JSON.parse(usuarioGuardado).rol || 'usuario').toLowerCase().trim()
    : 'usuario';

  return [
    ...(rol === 'usuario'
      ? [{
        component: CNavItem,
        name: 'Dashboard',
        to: '/docente/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      }]
      : []),
    ...(rol === 'alumno'
      ? [{
        component: CNavItem,
        name: 'Dashboard',
        to: '/AlumnoDashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      }]
      : []),
          ...(rol === 'docente'
      ? [{
        component: CNavItem,
        name: 'Dashboard',
        to: '/docente/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      }]
      : []),
    {
      component: CNavTitle,
      name: 'GESTIÓN ACADÉMICA',
    },
       ...(rol === 'admin' || rol === 'alumno'
      ? [{
        component: CNavGroup,
        name: 'Contenidos',
        to: '/contenidos',
        icon: <CIcon icon={cilWindowRestore} customClassName="nav-icon" />,
        
        items: [
          {
            component: CNavItem,
            name: 'Sistemas de numeración',
            to: '/contenidos/leccion1',
          },
          {
            component: CNavItem,
            name: 'Los múltiplos y los divisores',
            to: '/contenidos/leccion2',
          },
          {
            component: CNavItem,
            name: 'Operaciones con números naturales y decimales',
            to: '/contenidos/leccion3',
          },
          {
            component: CNavItem,
            name: 'Ecuaciones de primer grado',
            to: '/contenidos/leccion4',
          },

          
        ]
      }]
      : []),




  // Agrupación de módulos de docentes
    ...(rol === 'alumno'
      ? [{
        component: CNavGroup,
        name: 'Pruebas',
        icon: <CIcon  icon={cilPencil} customClassName="nav-icon" />,
        items: [

           {
            component: CNavItem,
            name: 'Examen',
            to: '/prueba',
            icon: <CIcon icon={cilExternalLink} customClassName="nav-icon" />,
          },
        ]
        
      }]
      : []),




    // Agrupación de módulos de estudiantes
    ...(rol === 'admin'
      ? [{
        component: CNavGroup,
        name: 'Estudiantes',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
        items: [

           {
            component: CNavItem,
            name: 'inscribir',
            to: '/inscripcion',
            icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
            
          },
          {
            component: CNavItem,
            name: 'cursos',
            to: '/cursosymodulos',
            icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
            
          },
          {
            component: CNavItem,
            name: 'lecciones',
            to: '/recursosylecciones',
            icon: <CIcon icon={cilLan} customClassName="nav-icon" />,
            
          },
          {
            component: CNavItem,
            name: 'Recursos',
            to: '/Recursos',
            icon: <CIcon icon={cilDataTransferDown} customClassName="nav-icon" />,
            
          },
           {
            component: CNavItem,
            name: 'ejercicios',
            to: '/ejerciciodocente',
            icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
            
          },
            {
            component: CNavItem,
            name: 'puntaje',
            to: '/puntaje',
            icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
            
          },

        ]
      }]
      : []),

      
    // Agrupación de módulos de estudiantes
    ...(rol === 'docente'
      ? [{
        component: CNavGroup,
        name: 'Estudiantes',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
        items: [


          {
            component: CNavItem,
            name: 'cursos',
            to: '/cursosymodulos',
            icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
            
          },
          {
            component: CNavItem,
            name: 'lecciones',
            to: '/recursosylecciones',
            icon: <CIcon icon={cilLan} customClassName="nav-icon" />,
            
          },
                    {
            component: CNavItem,
            name: 'Recursos',
            to: '/Recursos',
            icon: <CIcon icon={cilDataTransferDown} customClassName="nav-icon" />,
            
          },

           {
            component: CNavItem,
            name: 'ejercicios',
            to: '/ejerciciodocente',
            icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
            
          },
            {
            component: CNavItem,
            name: 'puntaje',
            to: '/puntaje',
            icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
            
          },


          
          
         /* {
            component: CNavItem,
            name: 'Listado de Estudiantes',
            to: '/EditarEstudiante',
            icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
          },*/
        ]
      }]
      : []),



      
    ...(rol === 'admin' || rol === 'alumno'
      ? [{
        component: CNavGroup,
        name: 'Diviertete',
        icon: <CIcon icon={cilBraille} customClassName="nav-icon" />,
        items: [
          {
          component: CNavItem,
          name: 'Sopa de Números',
          to: '/Sabana',
          icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Arrastra las Formas',
          to: '/usuario',
          icon: <CIcon icon={cilHappy} customClassName="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Quiz de Operaciones',
          to: '/administrador',
          icon: <CIcon icon={cilApplications} customClassName="nav-icon" />,
        },
        ]
      }]
      : []),

          ...(rol === 'admin'
      ? [{
        component: CNavGroup,
        name: 'Gestionar',
        icon: <CIcon icon={cilCut} customClassName="nav-icon" />,
        items: [
          {
          component: CNavItem,
          name: 'Usuarios',
          to: '/usuarios',
          icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
        },

        {
            component: CNavItem,
            name: 'Editar puntaje',
            to: '/noticas',
            icon: <CIcon icon={cilDialpad} customClassName="nav-icon" />,
            
          },


        ]
      }]
      : []),






  ]
}