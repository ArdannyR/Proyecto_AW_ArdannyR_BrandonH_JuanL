import React, { useState, useEffect } from 'react';
import { Leaf, Home, Sprout, Search, Droplets, Thermometer, Wind, Sun, FlaskConical, ImageOff } from 'lucide-react';

// 1. IMPORTAMOS EL NUEVO COMPONENTE
import PlantSearch from './assets/plantSearch.jsx';

// --- COMPONENTE 1: DASHBOARD ---
function Dashboard() {
  return (
    <div className="flex-1 p-4 md:p-6 space-y-6">
      {/* Botones de tiempo */}
      <div className="flex gap-2 p-1 overflow-x-auto">
        <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-green-100 text-green-700 px-4 text-sm font-medium">
          Live
        </button>
        <button className="h-9 px-4 text-gray-500 hover:bg-gray-100 rounded-full text-sm font-medium transition-colors">24H</button>
        <button className="h-9 px-4 text-gray-500 hover:bg-gray-100 rounded-full text-sm font-medium transition-colors">7D</button>
        <button className="h-9 px-4 text-gray-500 hover:bg-gray-100 rounded-full text-sm font-medium transition-colors">1M</button>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard title="Soil Moisture" value="62%" change="+1.2%" isPositive={true} icon={<Droplets size={20} />} />
        <MetricCard title="Air Temperature" value="24°C" change="-0.5%" isPositive={false} icon={<Thermometer size={20} />} />
        <MetricCard title="Air Humidity" value="85%" change="+2.0%" isPositive={true} icon={<Wind size={20} />} />
        <MetricCard title="Light Intensity" value="50k Lux" change="+5.0%" isPositive={true} icon={<Sun size={20} />} />
        <MetricCard title="Nutrient Levels" value="800 PPM" change="-1.5%" isPositive={false} icon={<FlaskConical size={20} />} />
        <MetricCard title="pH Level" value="6.8" change="+0.1%" isPositive={true} icon={<Droplets size={20} className="text-blue-500" />} />
      </div>

      {/* Gráficos (Placeholders) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-[250px]">
          <div>
              <h3 className="text-gray-500 font-medium mb-1">Environmental Trends</h3>
              <p className="text-3xl font-bold text-gray-800">24°C <span className="text-sm text-green-500 font-normal">+2.1%</span></p>
          </div>
          <div className="h-32 bg-green-50 rounded-xl flex items-center justify-center text-green-300 italic">
              Gráfico de Temperatura
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-[250px]">
            <div>
              <h3 className="text-gray-500 font-medium mb-1">Water Usage</h3>
              <p className="text-3xl font-bold text-gray-800">32 L <span className="text-sm text-red-500 font-normal">-0.8%</span></p>
          </div>
          <div className="h-32 flex items-end gap-2">
              {[40, 70, 35, 50, 80, 60, 90].map((h, i) => (
                  <div key={i} className="bg-blue-100 hover:bg-blue-200 transition-all rounded-t-lg flex-1" style={{ height: `${h}%` }}></div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente auxiliar para las tarjetas de métricas
function MetricCard({ title, value, change, isPositive, icon }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3">
      <div className="flex items-center justify-between text-gray-500">
        <p className="text-sm font-medium">{title}</p>
        <span className="text-gray-400">{icon}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <div className="flex items-center gap-1 text-xs font-medium">
        <span className={isPositive ? "text-green-600" : "text-red-500"}>{change}</span>
        <div className={`w-1.5 h-1.5 rounded-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}></div>
      </div>
    </div>
  );
}


// --- COMPONENTE PRINCIPAL: APP ---
function App() {
  // Estado para controlar qué vista se muestra
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="min-h-screen w-full bg-gray-50 font-sans text-gray-800 flex flex-col">

      {/* --- Header con Navegación --- */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo / Título */}
            <div className="flex items-center gap-2">
            <div className="bg-green-600 p-2 rounded-xl">
                <Leaf className="text-white" size={20} />
            </div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">
                Greenhouse A1
            </h1>
            </div>

            {/* MENÚ DE NAVEGACIÓN */}
            <nav className="flex bg-gray-100/50 p-1 rounded-lg">
                <NavButton 
                    icon={<Home size={18} />} 
                    label="Dashboard" 
                    isActive={currentView === 'dashboard'} 
                    onClick={() => setCurrentView('dashboard')} 
                />
                <NavButton 
                    icon={<Search size={18} />} 
                    label="Buscar Plantas" 
                    isActive={currentView === 'search'} 
                    onClick={() => setCurrentView('search')} 
                />
                <NavButton 
                    icon={<Sprout size={18} />} 
                    label="Mi Huerto" 
                    isActive={currentView === 'garden'} 
                    onClick={() => setCurrentView('garden')} 
                />
            </nav>
        </div>
      </header>

      {/* --- Main Content (Renderizado Condicional) --- */}
      <main className="flex-1 max-w-7xl mx-auto w-full">
        {currentView === 'dashboard' && <Dashboard />}
        
        {/* 3. COMPONENTE IMPORTADO */}
        {currentView === 'search' && <PlantSearch />}
        
        {currentView === 'garden' && <MyGarden />}
      </main>
    </div>
  );
}

// Componente auxiliar para los botones del menú
function NavButton({ icon, label, isActive, onClick }) {
    return (
        <button 
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                isActive 
                ? 'bg-white text-green-700 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
            }`}
        >
            {icon}
            <span className="hidden sm:inline">{label}</span>
        </button>
    );
}

export default App;