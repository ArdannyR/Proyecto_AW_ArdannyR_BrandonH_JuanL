import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import LandingPage from './LandingPage.jsx'

// 1. Definimos nuestras rutas
const router = createBrowserRouter([
  {
    path: "/", // La ruta raíz (ej. http://localhost:5173/) mostrará la LandingPage
    element: <LandingPage />,
  },
  {
    path: "/dashboard", // La ruta /dashboard mostrará el componente principal de la App
    element: <App />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
