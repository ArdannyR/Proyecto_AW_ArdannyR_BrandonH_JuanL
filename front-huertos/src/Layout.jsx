import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Leaf, Home, Search, LogOut } from 'lucide-react';
import useAuth from './hooks/useAuth'; // Para el botón de Cerrar Sesión

function Layout() {
    const { cerrarSesion } = useAuth();
    const location = useLocation(); // Para saber qué ruta está activa

    // Función para estilizar el link activo
    const getLinkClass = (path) => {
        return location.pathname === path
            ? 'bg-white text-green-700 shadow-sm' // Estilo activo
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'; // Estilo inactivo
    };

    return (
        <div className="min-h-screen w-full bg-gray-50 font-sans text-gray-800 flex flex-col">
            
            {/* ESTA SERÁ TU ÚNICA CABECERA */}
            <header className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-200 px-4 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                    
                    {/* Título (Panel de control) */}
                    <div className="flex items-center gap-3">
                        <div className="bg-green-600 p-2 rounded-xl">
                            <Leaf className="text-white" size={20} />
                        </div>
                        <h1 className="text-xl font-bold text-gray-900 leading-tight">
                            Panel de control
                        </h1>
                    </div>
                    
                    {/* Navegación (Sin "Mi Huerto") */}
                    <nav className="flex items-center gap-2 bg-gray-100/50 p-1 rounded-lg">
                        <Link 
                            to="/dashboard" 
                            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${getLinkClass('/dashboard')}`}
                        >
                            <Home size={18} /> 
                            <span className="hidden sm:inline">Dashboard</span>
                        </Link>
                        <Link 
                            to="/dashboard/buscar-plantas" 
                            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${getLinkClass('/dashboard/buscar-plantas')}`}
                        >
                            <Search size={18} /> 
                            <span className="hidden sm:inline">Buscar Plantas</span>
                        </Link>
                    </nav>

                    {/* Botón de Cerrar Sesión (Opcional pero recomendado) */}
                    <button 
                        onClick={cerrarSesion}
                        title="Cerrar Sesión"
                        className="p-2.5 rounded-lg text-gray-500 hover:bg-red-100 hover:text-red-600 transition-colors"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto w-full flex flex-col">
                {/* Aquí se renderiza App.jsx (Dashboard) o PlantSearch.jsx */}
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;