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
const Perdidas = React.lazy(() => import('./views/pages/school/perdidas'))
const Suceso = React.lazy(() => import('./views/pages/school/suceso'))




const routes = [
  { path: '/', exact: true, name: 'Inicio' },
  { path: '/dashboard', name: 'Panel', element: Dashboard},
  { path: '/docents', name: 'Docentes', element: Docents },
  { path: '/students', name: 'Estudiantes', element: Estudiantes, private: true},
  { path: '/prueba', name: 'pruebaa', element: Prueba, private: true },
  { path: '/noticias', name: 'noticias', element: Noticias },
  { path: '/zonas', name: 'zonas', element: Zona, private: true },
  { path: '/damnificados', name: 'personas', element: Damnificados, private: true },
  { path: '/donaciones', name: 'donacion', element: Donaciones, private: true},
  { path: '/comunidad', name: 'comunidad', element: Comunidad, private: true },
  { path: '/ComunidadCrud', name: 'crude', element: Crude, admin: true },
  { path: '/donantes', name: 'donante', element: Donante, private: true },
  { path: '/victimas', name: 'victima', element: Victima, private: true },
  { path: '/desbordes', name: 'Cauce', element: Cauce, private: true },
  { path: '/perdidas', name: 'Perdida', element: Perdidas, private: true },
  { path: '/suceso', name: 'sucesos', element: Suceso , private: true},

]

export default routes
