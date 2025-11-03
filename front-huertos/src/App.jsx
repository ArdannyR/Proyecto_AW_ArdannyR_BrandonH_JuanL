import React from 'react';
import './App.css'; 

function App() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">

      {/* --- Header --- */}
      <header className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm z-10 border-b border-gray-200/10 dark:border-gray-800/50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">menu</span>
          <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] text-gray-900 dark:text-white">
            Greenhouse A1 - Live Metrics
          </h1>
        </div>
        <div className="flex items-center justify-end">
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      {/* --- Main --- */}
      <main className="flex-1 p-4 md:p-6">

        {/* --- Botones de tiempo --- */}
        <div className="flex gap-2 p-3 overflow-x-auto">
          {/* Activo */}
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/20 dark:bg-primary/20 px-4">
            <p className="text-primary text-sm font-medium leading-normal">Live</p>
          </button>

          {/* Inactivos */}
          <button className="time-button"><p className="time-button-text">24H</p></button>
          <button className="time-button"><p className="time-button-text">7D</p></button>
          <button className="time-button"><p className="time-button-text">1M</p></button>
        </div>

        {/* --- Métricas --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 py-4">

          {/* Soil Moisture */}
          <div className="metric-card">
            <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
              <p className="text-base font-medium leading-normal">Soil Moisture</p>
              <span className="material-symbols-outlined text-sm">water_drop</span>
            </div>
            <p className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight">62%</p>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-green-500 font-medium leading-normal">+1.2%</span>
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            </div>
          </div>

          {/* Air Temperature */}
          <div className="metric-card">
            <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
              <p className="text-base font-medium leading-normal">Air Temperature</p>
              <span className="material-symbols-outlined text-sm">device_thermostat</span>
            </div>
            <p className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight">24°C</p>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-red-500 font-medium leading-normal">-0.5%</span>
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            </div>
          </div>

          {/* Air Humidity */}
          <div className="metric-card">
            <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
              <p className="text-base font-medium leading-normal">Air Humidity</p>
              <span className="material-symbols-outlined text-sm">humidity_percentage</span>
            </div>
            <p className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight">85%</p>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-green-500 font-medium leading-normal">+2.0%</span>
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            </div>
          </div>

          {/* Light Intensity */}
          <div className="metric-card">
            <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
              <p className="text-base font-medium leading-normal">Light Intensity</p>
              <span className="material-symbols-outlined text-sm">light_mode</span>
            </div>
            <p className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight">50k Lux</p>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-green-500 font-medium leading-normal">+5.0%</span>
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            </div>
          </div>

          {/* Nutrient Levels */}
          <div className="metric-card">
            <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
              <p className="text-base font-medium leading-normal">Nutrient Levels</p>
              <span className="material-symbols-outlined text-sm">science</span>
            </div>
            <p className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight">800 PPM</p>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-red-500 font-medium leading-normal">-1.5%</span>
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
            </div>
          </div>

          {/* pH Level */}
          <div className="metric-card">
            <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
              <p className="text-base font-medium leading-normal">pH Level</p>
              <span className="material-symbols-outlined text-sm">local_drink</span>
            </div>
            <p className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight">6.8</p>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-green-500 font-medium leading-normal">+0.1%</span>
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            </div>
          </div>
        </div>

        {/* --- Gráficos --- */}
        <div className="flex flex-col lg:flex-row flex-wrap gap-4 py-6">

          {/* Environmental Trends */}
          <div className="graph-card">
            <p className="text-gray-900 dark:text-white text-base font-medium leading-normal">Environmental Trends</p>
            <p className="text-gray-900 dark:text-white tracking-light text-[32px] font-bold leading-tight truncate">24°C</p>
            <div className="flex gap-1">
              <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Last 24 Hours</p>
              <p className="text-green-500 text-base font-medium leading-normal">+2.1%</p>
            </div>
            {/* SVG */}
            <div className="flex min-h-[180px] flex-1 flex-col gap-8 py-4">
              {/* (Tu SVG original aquí sin cambios) */}
            </div>
          </div>

          {/* Water Usage */}
          <div className="graph-card">
            <p className="text-gray-900 dark:text-white text-base font-medium leading-normal">Water Usage</p>
            <p className="text-gray-900 dark:text-white tracking-light text-[32px] font-bold leading-tight truncate">32 Liters</p>
            <div className="flex gap-1">
              <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Last 24 Hours</p>
              <p className="text-red-500 text-base font-medium leading-normal">-0.8%</p>
            </div>
            {/* Barras del gráfico */}
            <div className="grid min-h-[180px] grid-flow-col gap-6 grid-rows-[1fr_auto] items-end justify-items-center px-3 py-4">
              <div className="bg-water-blue/20 dark:bg-water-blue/30 w-full rounded-t" style={{ height: '100%' }}></div>
              <p className="text-gray-500 dark:text-gray-400 text-[13px] font-bold leading-normal tracking-[0.015em]">12am</p>
              <div className="bg-water-blue/20 dark:bg-water-blue/30 w-full rounded-t" style={{ height: '80%' }}></div>
              <p className="text-gray-500 dark:text-gray-400 text-[13px] font-bold leading-normal tracking-[0.015em]">6am</p>
              <div className="bg-water-blue/20 dark:bg-water-blue/30 w-full rounded-t" style={{ height: '40%' }}></div>
              <p className="text-gray-500 dark:text-gray-400 text-[13px] font-bold leading-normal tracking-[0.015em]">12pm</p>
              <div className="bg-water-blue/20 dark:bg-water-blue/30 w-full rounded-t" style={{ height: '20%' }}></div>
              <p className="text-gray-500 dark:text-gray-400 text-[13px] font-bold leading-normal tracking-[0.015em]">6pm</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
