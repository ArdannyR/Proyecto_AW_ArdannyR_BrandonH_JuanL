import React, { useState, useEffect } from 'react'; // <-- Se mantiene useEffect
import { Leaf, Home, Sprout, Search, Droplets, Thermometer, Wind, Sun, FlaskConical, ImageOff } from 'lucide-react';

// --- COMPONENTE 1: DASHBOARD ---
// --- COMPONENTE 1: DASHBOARD ---
function Dashboard() {
  // Estado para el país seleccionado (default: México)
  const [paisSeleccionado, setPaisSeleccionado] = useState('mx'); 
  
  // Estados para manejar los datos del clima, la carga y los errores
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Obtenemos la API Key desde las variables de entorno de Vite
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  
  useEffect(() => {
    // Función para buscar los datos del clima
    const fetchWeather = async () => {
      if (!API_KEY) {
        setError("API key de OpenWeather no encontrada. Asegúrate de añadirla a tu archivo .env");
        setLoading(false);
        return;
      }

      // 1. Obtener lat y lon del país seleccionado
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
    
    // Opcional: Refrescar los datos cada 10 minutos
    const interval = setInterval(fetchWeather, 600000);
    
    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);

  // 2. Actualizamos el array de dependencias (¡y arreglamos el warning de ESLint!)
  }, [paisSeleccionado, API_KEY]); // Se vuelve a ejecutar si el país o la API key cambian

  // --- Renderizado condicional ---
  
  // Mostramos "cargando" solo si es la primera vez (weatherData es nulo)
  if (loading && !weatherData) {
    return <div className="p-6 text-center text-gray-500">Cargando datos del clima...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500 bg-red-50 rounded-lg max-w-md mx-auto mt-4">Error: {error}</div>;
  }

  // --- Renderizado del Dashboard con datos ---
  
  // Valores predeterminados por si weatherData no carga completamente
  const temp = weatherData?.main?.temp ?? 0;
  const humidity = weatherData?.main?.humidity ?? 0;
  const windSpeed = weatherData?.wind?.speed ?? 0; // m/s
  const description = weatherData?.weather?.[0]?.description ?? "sin datos";

  return (
    <div className="flex-1 p-4 md:p-6 space-y-6">
      
      {/* Botones de tiempo y Selector de País (en la misma fila) */}
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

        {/* 3. AÑADIMOS EL MENÚ DESPLEGABLE */}
        <div>
          <select
            id="pais-select"
            value={paisSeleccionado}
            onChange={(e) => setPaisSeleccionado(e.target.value)}
            className="h-9 bg-white p-2 px-4 border border-gray-300 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {/* Mapeamos el objeto de países para crear las opciones */}
            {Object.entries(PAISES_LATAM).map(([key, { nombre }]) => (
              <option key={key} value={key}>
                {nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* --- Resto del Dashboard (Métricas y Gráficos) --- */}
      {/* Añadimos un overlay simple de "cargando" mientras se actualiza */}
      <div className={`relative ${loading ? 'opacity-50 transition-opacity' : ''}`}>
        {/* Métricas (¡Ahora con datos de OpenWeather!) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          
          {/* Datos de OpenWeather */}
          <MetricCard 
            title="Air Temperature" 
            value={`${temp.toFixed(1)}°C`} // Temperatura del aire
            change={description} // Usamos 'change' para la descripción (ej. "nubes dispersas")
            isPositive={true} 
            icon={<Thermometer size={20} />} 
          />
          <MetricCard 
            title="Air Humidity" 
            value={`${humidity}%`} // Humedad del aire
            change="Exterior" 
            isPositive={true} 
            icon={<Droplets size={20} />} // Icono de humedad (diferente al de viento)
          />
          <MetricCard 
            title="Wind Speed" 
            value={`${windSpeed.toFixed(1)} m/s`} // Velocidad del viento
            change="Exterior" 
            isPositive={false} 
            icon={<Wind size={20} />} 
          />

          {/* Datos estáticos (OpenWeather no mide esto) */}
          <MetricCard title="Soil Moisture" value="62%" change="+1.2%" isPositive={true} icon={<Droplets size={20} className="text-blue-500" />} />
          <MetricCard title="Light Intensity" value="50k Lux" change="+5.0%" isPositive={true} icon={<Sun size={20} />} />
          <MetricCard title="Nutrient Levels" value="800 PPM" change="-1.5%" isPositive={false} icon={<FlaskConical size={20} />} />
        </div>

        {/* Gráficos (sin cambios) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-[250px]">
            <div>
                <h3 className="text-gray-500 font-medium mb-1">Environmental Trends</h3>
                {/* Mostramos la temperatura de la API aquí también */}
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
      </div> {/* Fin del div relative (overlay de carga) */}
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
        {/* --- Lógica actualizada para el 'change' --- */}
        {/* Si el 'change' no es un % (ej. "nubes dispersas"), solo lo mostramos */}
        {change.includes('%') ? (
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

// --- COMPONENTE 2: PLANT SEARCH (API PÚBLICA - Perenual) ---
function PlantSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ⚠️ IMPORTANTE: Reemplaza esto con TU clave real de Perenual cuando te registres.
  // Esta es una clave de demostración y podría dejar de funcionar si se abusa de ella.
  const API_KEY = 'sk-N5sO6910bc312749c13382'; 

  const searchPlants = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;

    setLoading(true);
    setError(null);
    try {
      
      // --- SOLUCIÓN 1: Mantenemos el filtro &premium=false ---
      const response = await fetch(`https://perenual.com/api/species-list?key=${API_KEY}&q=${searchTerm}&premium=false`);

      if (!response.ok) {
          if (response.status === 429) throw new Error("Límite de API excedido. Intenta más tarde.");
          throw new Error('Error al buscar plantas');
      }
      const data = await response.json();
      const allPlants = data.data || [];

      // --- SOLUCIÓN 2: Filtramos los resultados "premium" que se colaron ---
      const freePlants = allPlants.filter(plant => {
          // Convertimos los campos a string para asegurarnos de que .includes() funcione
          const cycle = String(plant.cycle || '');
          const watering = String(plant.watering || '');
          
          // Verificamos si alguno de los campos clave contiene el mensaje de "Upgrade"
          const isPremiumAd = cycle.includes('Upgrade Plans') || 
                              watering.includes('Upgrade Plans');
          
          // Retornamos 'true' (mantenemos la planta) SÓLO si NO es un anuncio
          return !isPremiumAd;
      });
      // --- FIN DE LA MODIFICACIÓN ---

      setPlants(freePlants); // Solo ponemos las plantas filtradas en el estado

    } catch (err) {
      setError(err.message);
      // Datos falsos de respaldo por si falla la API key de demo para que veas como queda la UI
      setPlants([
          { 
              id: 1, 
              common_name: 'Tomato (Demo)', 
              scientific_name: ['Solanum lycopersicum'], 
              cycle: 'Annual', 
              watering: 'Frequent',
              default_image: { original_url: 'https://perenual.com/storage/species_image/1_abies_alba/og/1536px-Abies_alba_SkalitC3A9.jpg' } // URL de ejemplo real de Perenual
          },
          { 
              id: 2, 
              common_name: 'Potato (Demo)', 
              scientific_name: ['Solanum tuberosum'], 
              cycle: 'Annual', 
              watering: 'Average',
              // Sin imagen para probar el placeholder
          },
      ])
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Search className="text-green-600"/> Buscar en Perenual
        </h2>

        {/* Buscador */}
        <form onSubmit={searchPlants} className="flex gap-2 mb-8">
          <input
            type="text"
            placeholder="Ej. tomato, rose, oak..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          />
          <button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 disabled:opacity-50">
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>

        {error && (
          <div className="p-4 mb-6 bg-yellow-50 text-yellow-700 rounded-xl border border-yellow-200 text-sm">
            ⚠️ {error} (Mostrando datos de demostración)
          </div>
        )}

        {/* Resultados */}
        <div className="space-y-4">
          {plants.map((plant) => (
            <div key={plant.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 hover:border-green-200 transition-all">
              
              {/* Imagen de la planta */}
              <div className="w-24 h-24 shrink-0 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center border border-gray-200">
                  {plant.default_image?.original_url ? (
                      <img 
                          src={plant.default_image.original_url} 
                          alt={plant.common_name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                              e.target.onerror = null; 
                              e.target.src = ""; // Si falla, forzamos a que se oculte la img rota
                              e.target.className = "hidden";
                              e.target.parentElement.classList.add('bg-gray-50'); // Añadimos fondo al padre
                          }}
                      />
                  ) : (
                      <Leaf className="text-green-300" size={32} />
                  )}
              </div>

              {/* Info de la planta */}
              <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 capitalize leading-tight">{plant.common_name}</h3>
                    <p className="text-sm text-gray-500 italic">{plant.scientific_name?.[0]}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                      {plant.cycle && <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-medium">{plant.cycle}</span>}
                      {plant.watering && <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium flex items-center gap-1"><Droplets size={12}/> {plant.watering}</span>}
                      {plant.sunlight && <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full font-medium flex items-center gap-1"><Sun size={12}/> {plant.sunlight[0]}</span>}
                  </div>
              </div>

              {/* Botón de acción */}
              <div className="flex items-center pl-4 border-l border-gray-100">
                  <button className="bg-green-600 text-white hover:bg-green-700 p-3 rounded-xl transition-colors shadow-sm" title="Añadir a mi huerto">
                    <Sprout size={20} />
                  </button>
              </div>

            </div>
          ))}
          {plants.length === 0 && !loading && (
              <div className="text-center text-gray-400 py-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                  <Leaf size={48} className="mx-auto mb-3 opacity-20" />
                  <p>Escribe el nombre de una planta para empezar.</p>
              </div>
          )}
        </div>
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
                
            </nav>
        </div>
      </header>

      {/* --- Main Content (Renderizado Condicional) --- */}
      <main className="flex-1 max-w-7xl mx-auto w-full">
        {currentView === 'dashboard' && <Dashboard />}
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

// Objeto con países de LATAM y sus coordenadas
const PAISES_LATAM = {
  'mx': { nombre: 'México 🇲🇽', lat: 19.43, lon: -99.13 },
  'ar': { nombre: 'Argentina 🇦🇷', lat: -34.60, lon: -58.38 },
  'br': { nombre: 'Brasil 🇧🇷', lat: -15.79, lon: -47.88 },
  'cl': { nombre: 'Chile 🇨🇱', lat: -33.44, lon: -70.66 },
  'co': { nombre: 'Colombia 🇨🇴', lat: 4.71, lon: -74.07 },
  'pe': { nombre: 'Perú 🇵🇪', lat: -12.04, lon: -77.04 },
  'ec': { nombre: 'Ecuador 🇪🇨', lat: -0.18, lon: -78.46 },
};