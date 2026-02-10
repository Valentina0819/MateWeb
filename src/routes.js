import React from 'react'

const AdminDashboard = React.lazy(() => import('./views/dashboard/AdminDashboard'))
const DocenteDashboard = React.lazy(() => import('./views/dashboard/DocenteDashboard'))
const Docents = React.lazy(() => import('./views/pages/school/docents'))
const Estudiantes = React.lazy(() => import('./views/pages/school/estudiantes'))

const SistemasNum = React.lazy(() => import('./views/pages/school/SistemasNum'))
const MultiplosyDivisores = React.lazy(() => import('./views/pages/school/MultiplosyDivisores'))
const OpNumerosNyD = React.lazy(() => import('./views/pages/school/OpNumerosNyD'))
const EcuacionesPG = React.lazy(() => import('./views/pages/school/EcuacionesPG'))
const Fracciones = React.lazy(() => import('./views/pages/school/Fracciones'))

const RegistroDocente = React.lazy(() => import('./views/pages/school/RegistroDocente'))
const CargarNotas = React.lazy(() => import('./views/pages/school/CargarNotas'))
const AsignarMateriaDoc = React.lazy(() => import('./views/pages/school/AsignarMateriaDoc'))
const InscribirEstudiante = React.lazy(() => import('./views/pages/school/InscribirEstudiante'))
const ListadoInscripcion = React.lazy(() => import('./views/pages/school/ListadoInscripcion'))

const AsignarMateriaAño = React.lazy(() => import('./views/pages/school/AsignarMateriaAño'))
const ConstanciaEst = React.lazy(() => import('./views/pages/school/ConstanciaEst'))
const Director = React.lazy(() => import('./views/pages/school/director'))
const ImprimirNotas = React.lazy(() => import('./views/pages/school/ImprimirNotas'))
const ConstanciaDoc = React.lazy(() => import('./views/pages/school/ConstanciaDoc'))
const Lista = React.lazy(() => import('./views/pages/school/lista'))
const Usuario = React.lazy(() => import('./views/pages/school/usuario'))
const Anioescolar = React.lazy(() => import('./views/pages/school/anioescolar'))
const editar = React.lazy(() => import('./views/pages/school/editar'))
const EditarEstudiante = React.lazy(() => import('./views/pages/school/EditarEstudiante'))
const Sabana = React.lazy(() => import('./views/pages/school/Sabana'))
const Administrador = React.lazy(() => import('./views/pages/school/administrador'))
const Cortes = React.lazy(() => import('./views/pages/school/cortes'))
const Inscripcion = React.lazy(() => import('./views/pages/school/inscripcion'))
const Cursos = React.lazy(() => import('./views/pages/school/cursosymodulos'))
const Recursos = React.lazy(() => import('./views/pages/school/recursosylecciones'))
const Ejercicio = React.lazy(() => import('./views/pages/school/ejerciciodocente'))
const Examen = React.lazy(() => import('./views/pages/school/examencito'))
const Alumno = React.lazy(() => import('./views/dashboard/AlumnoDashboard'))
const Prueba = React.lazy(() => import('./views/pages/school/prueba'))
const Puntaje = React.lazy(() => import('./views/pages/school/puntaje'))
const Usuarios = React.lazy(() => import('./views/pages/school/usuarios'))
const Recursosdenuevo = React.lazy(() => import('./views/pages/school/Recursos'))
const Noticas = React.lazy(() => import('./views/pages/school/noticas'))

const routes = [
  { path: '/', exact: true, name: 'Inicio' },
  { path: '/admin/dashboard', name: 'Panel', element: AdminDashboard },
  { path: '/docente/dashboard', name: 'Panel', element: DocenteDashboard },
  { path: '/AlumnoDashboard', name: 'Panel', element: Alumno },
  { path: '/registro/estudiante', name: 'Docentes', element: Docents },
  { path: '/estudiantes', name: 'Estudiantes', element: Estudiantes, private: true },

  {
    path: '/contenidos/leccion1',
    name: 'Sistemas de numeración',
    element: SistemasNum,
    private: true,
  },
  {
    path: '/contenidos/leccion2',
    name: 'Los múltiplos y los divisores',
    element: MultiplosyDivisores,
    private: true,
  },
  {
    path: '/contenidos/leccion3',
    name: 'Operaciones con numeros naturales y decimales',
    element: OpNumerosNyD,
    private: true,
  },
  {
    path: '/contenidos/leccion4',
    name: 'Ecuaciones de primer grado',
    element: EcuacionesPG,
    private: true,
  },
  {
    path: '/contenidos/leccion5',
    name: 'Las fracciones y las operaciones',
    element: Fracciones,
    private: true,
  },

  { path: '/registro/docente', name: 'Registro Docente', element: RegistroDocente },
  { path: '/cargar/notas', name: 'Cargar Notas', element: CargarNotas, private: true },
  {
    path: '/materia/docente',
    name: 'Asignar Mat a Doc',
    element: AsignarMateriaDoc,
    private: true,
  },
  {
    path: '/inscribir/estudiante',
    name: 'Inscribir Estudiante',
    element: InscribirEstudiante,
    private: true,
  },
  {
    path: '/listado/inscripciones',
    name: 'Listado Inscripciones',
    element: ListadoInscripcion,
    private: true,
  },

  {
    path: '/materia/año',
    name: 'Asignar Materia a Año',
    element: AsignarMateriaAño,
    private: true,
  },
  {
    path: '/constancia/estudiante',
    name: 'Constancia Estudiante',
    element: ConstanciaEst,
    private: true,
  },
  { path: '/director', name: 'Director', element: Director },
  { path: '/imprimir/notas', name: 'Imprimir notas', element: ImprimirNotas, private: true },
  { path: '/constancia/docente', name: 'Constancia Docente', element: ConstanciaDoc },
  { path: '/lista', name: 'lista', element: Lista },
  { path: '/usuario', name: 'Usuario', element: Usuario },
  { path: '/anioescolar', name: 'Anio', element: Anioescolar },
  { path: '/editar', name: 'editar', element: editar },
  { path: '/EditarEstudiante', name: 'EditarEstudiante', element: EditarEstudiante },
  { path: '/Sabana', name: 'Sabana', element: Sabana },
  { path: '/administrador', name: 'Administrador', element: Administrador },
  { path: '/cortes', name: 'Cortes', element: Cortes },
  { path: '/inscripcion', name: 'inscripcion', element: Inscripcion },
  { path: '/cursosymodulos', name: 'cursos', element: Cursos },
  { path: '/recursosylecciones', name: 'recursosylecciones', element: Recursos },
  { path: '/ejerciciodocente', name: 'ejerciciodocente', element: Ejercicio },
  { path: '/examencito', name: 'examencito', element: Examen },
  { path: '/prueba', name: 'prueba', element: Prueba },
  { path: '/puntaje', name: 'puntaje', element: Puntaje },
  { path: '/usuarios', name: 'usuarios', element: Usuarios },
  { path: '/Recursos', name: 'Recursos', element: Recursosdenuevo },
  { path: '/noticas', name: 'noticas', element: Noticas },
]

export default routes
