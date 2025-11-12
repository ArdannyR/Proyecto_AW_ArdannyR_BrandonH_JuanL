import React, { useState, useEffect } from 'react'; // <-- Importamos hooks
// (Importa tus iconos: Droplets, Thermometer, Wind, Sun, FlaskConical)
import { Droplets, Thermometer, Wind, Sun, FlaskConical } from 'lucide-react';

// (Aquí va tu componente MetricCard actualizado)
function MetricCard({ title, value, change, isPositive, icon }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3">
      <div className="flex items-center justify-between text-gray-500">
        <p className="text-sm font-medium">{title}</p>
        <span className="text-gray-400">{icon}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <div className="flex items-center gap-1 text-xs font-medium">
        {/* --- Lógica actualizada para el 'change' --- */}
        {/* Si 'change' no es un % (ej. "nubes dispersas"), solo lo mostramos */}
        {change && change.includes('%') ? (
            <>
              <span className={isPositive ? "text-green-600" : "text-red-500"}>{change}</span>
              <div className={`w-1.5 h-1.5 rounded-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </>
        ) : (
            <span className="text-gray-500 capitalize">{change}</span>
        )}
      </div>
    </div>
  );
}


// ESTE ES TU DASHBOARD (App.jsx)
function App() {
  // --- INICIO: LÓGICA DEL CLIMA ---
  const [paisSeleccionado, setPaisSeleccionado] = useState('mx'); 
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Usamos la key de tu archivo .env directamente para evitar errores de compilación
  const API_KEY = "37d12ce61111b760e1d4f714aac8dc5a";
  
  useEffect(() => {
    const fetchWeather = async () => {
      if (!API_KEY) {
        setError("API key de OpenWeather no encontrada.");
        setLoading(false);
        return;
      }

      const { lat, lon } = PAISES_LATAM[paisSeleccionado];
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
        );
        if (!response.ok) {
          throw new Error('No se pudo obtener la información del clima.');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, [paisSeleccionado, API_KEY]);

  // --- Renderizado condicional (Carga y Error) ---
  if (loading && !weatherData) {
    return <div className="p-6 text-center text-gray-500">Cargando datos del clima...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500 bg-red-50 rounded-lg max-w-md mx-auto mt-4">Error: {error}</div>;
  }

  // --- Datos del Clima (con valores por defecto) ---
  const temp = weatherData?.main?.temp ?? 0;
  const humidity = weatherData?.main?.humidity ?? 0;
  const windSpeed = weatherData?.wind?.speed ?? 0; // m/s
  const description = weatherData?.weather?.[0]?.description ?? "sin datos";
  // --- FIN: LÓGICA DEL CLIMA ---


  return (
    // Ya no hay <header> aquí. Solo el contenido.
    <div className="flex-1 p-4 md:p-6 space-y-6">
      
      {/* Fila de Botones de tiempo y Selector de País */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Botones de tiempo */}
        <div className="flex gap-2 p-1 overflow-x-auto">
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-green-100 text-green-700 px-4 text-sm font-medium">
            Live
          </button>
          <button className="h-9 px-4 text-gray-500 hover:bg-gray-100 rounded-full text-sm font-medium transition-colors">24H</button>
          <button className="h-9 px-4 text-gray-500 hover:bg-gray-100 rounded-full text-sm font-medium transition-colors">7D</button>
          <button className="h-9 px-4 text-gray-500 hover:bg-gray-100 rounded-full text-sm font-medium transition-colors">1M</button>
        </div>
        
        {/* Selector de País (AÑADIDO) */}
        <div>
          <select
            id="pais-select"
            value={paisSeleccionado}
            onChange={(e) => setPaisSeleccionado(e.target.value)}
            className="h-9 bg-white p-2 px-4 border border-gray-300 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {Object.entries(PAISES_LATAM).map(([key, { nombre }]) => (
              <option key={key} value={key}>
                {nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Overlay de carga mientras se actualiza (AÑADIDO) */}
      <div className={`relative ${loading ? 'opacity-50 transition-opacity' : ''}`}>
        {/* Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          
          {/* Tarjetas de Clima (Dinámicas) */}
          <MetricCard 
            title="Air Temperature" 
            value={`${temp.toFixed(1)}°C`} 
            change={description} // Muestra "nubes dispersas", etc.
            isPositive={true}
            icon={<Thermometer size={20} />} 
          />
          <MetricCard 
            title="Air Humidity" 
            value={`${humidity}%`} 
            change="Exterior" 
            isPositive={true} 
            icon={<Droplets size={20} />} // Icono corregido (era Wind)
          />
          <MetricCard 
            title="Wind Speed" 
            value={`${windSpeed.toFixed(1)} m/s`} 
            change="Exterior" 
            isPositive={false} 
            icon={<Wind size={20} />} // Tarjeta nueva
          />

          {/* Tarjetas Estáticas (de tu código) */}
          <MetricCard title="Soil Moisture" value="62%" change="+1.2%" isPositive={true} icon={<Droplets size={20} className="text-blue-500" />} />
          <MetricCard title="Light Intensity" value="50k Lux" change="+5.0%" isPositive={true} icon={<Sun size={20} />} />
          <MetricCard title="Nutrient Levels" value="800 PPM" change="-1.5%" isPositive={false} icon={<FlaskConical size={20} />} />
          {/* Quité la de pH para dar espacio a Wind Speed, puedes volver a ponerla si quieres 7 tarjetas */}
        </div>

        {/* Gráficos (Placeholders) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-[250px]">
              <div>
                <h3 className="text-gray-500 font-medium mb-1">Environmental Trends</h3>
                {/* Temperatura de la API (ACTUALIZADO) */}
                <p className="text-3xl font-bold text-gray-800">{temp.toFixed(1)}°C</p>
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
    </div>
  );
}

export default App;

// Objeto con países de LATAM y sus coordenadas (AÑADIDO)
const PAISES_LATAM = {
  'mx': { nombre: 'México 🇲🇽', lat: 19.43, lon: -99.13 },
  'ar': { nombre: 'Argentina 🇦🇷', lat: -34.60, lon: -58.38 },
  'br': { nombre: 'Brasil 🇧🇷', lat: -15.79, lon: -47.88 },
  'cl': { nombre: 'Chile 🇨🇱', lat: -33.44, lon: -70.66 },
  'co': { nombre: 'Colombia 🇨🇴', lat: 4.71, lon: -74.07 },
  'pe': { nombre: 'Perú 🇵🇪', lat: -12.04, lon: -77.04 },
  'ec': { nombre: 'Ecuador 🇪🇨', lat: -0.18, lon: -78.46 },
};