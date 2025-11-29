import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.css';

//metodo para construir rutas

// se importa la ruta de inicio
import Home from './routes/web/inicio/inicio';

// se importa la ruta de administracion
import Login from './routes/admin/admin';


import Colegios from './routes/admin/colegios/colegios';
import Estudiantes from './routes/admin/estudiantes/estudiantes';
import Docentes from './routes/admin/docentes/docentes';

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/login/colegios',
    element: <Colegios />,
  },
  {
    path: '/login/estudiantes',
    element: <Estudiantes />,
  },
  {
    path: '/login/docentes',
    element: <Docentes />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
