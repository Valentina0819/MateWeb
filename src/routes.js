import React from 'react'


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Docents = React.lazy(() => import('./views/pages/school/docents'))
const Estudiantes = React.lazy(() => import('./views/pages/school/estudiantes'))
const Prueba = React.lazy(() => import('./views/pages/school/prueba'))
const Noticias = React.lazy(() => import('./views/pages/school/noticias'))
const Zona = React.lazy(() => import('./views/pages/school/zonas'))
const Damnificados = React.lazy(() => import('./views/pages/school/damnificados'))
const Donaciones = React.lazy(() => import('./views/pages/school/donaciones'))
const Comunidad = React.lazy(() => import('./views/pages/school/comunidad'))
const Crude = React.lazy(() => import('./views/pages/school/ComunidadCrud'))
const Donante = React.lazy(() => import('./views/pages/school/donantes'))
const Victima = React.lazy(() => import('./views/pages/school/victimas'))
const Cauce = React.lazy(() => import('./views/pages/school/desbordes'))




const routes = [
  { path: '/', exact: true, name: 'Inicio' },
  { path: '/dashboard', name: 'Panel', element: Dashboard },
  { path: '/docents', name: 'Docentes', element: Docents },
  { path: '/students', name: 'Estudiantes', element: Estudiantes },
  { path: '/prueba', name: 'pruebaa', element: Prueba },
  { path: '/noticias', name: 'noticias', element: Noticias },
  { path: '/zonas', name: 'zonas', element: Zona },
  { path: '/damnificados', name: 'personas', element: Damnificados },
  { path: '/donaciones', name: 'donacion', element: Donaciones },
  { path: '/comunidad', name: 'comunidad', element: Comunidad },
  { path: '/ComunidadCrud', name: 'crude', element: Crude },
  { path: '/donantes', name: 'donante', element: Donante },
  { path: '/victimas', name: 'victima', element: Victima },
   { path: '/desbordes', name: 'Cauce', element: Cauce },

]

export default routes
