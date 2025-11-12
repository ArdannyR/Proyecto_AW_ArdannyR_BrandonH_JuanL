import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthProvider';

import './index.css';


// Páginas
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage'; // (Probablemente también tengas esta)
import App from './Dashboard';
import PlantSearch from './assets/PlantSearch';
import Layout from './Layout'; // El layout que acabamos de crear
import RutaProtegida from './RutaProtegida'; // (El componente para proteger rutas)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider> {/* El AuthProvider ENVUELVE todas las rutas */}
                <Routes>
                    {/* --- Rutas Públicas --- */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/registrar" element={<RegisterPage />} />
                    {/* <Route path="/olvide-password" element={<OlvidePassword />} /> */}

                    {/* --- Rutas Privadas --- */}
                    {/* Todas las rutas dentro de /dashboard usan el Layout y están protegidas */}
                    <Route path="/dashboard" element={<RutaProtegida />}>
                        <Route element={<Layout />}> {/* Usamos el Layout */}
                            <Route index element={<App />} />
                            <Route path="buscar-plantas" element={<PlantSearch />} />
                        </Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);