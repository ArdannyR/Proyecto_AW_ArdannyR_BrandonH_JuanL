import React, { useState, useEffect } from 'react';
import { Leaf, Home, Sprout, Search, Droplets, Thermometer, Wind, Sun, FlaskConical, ImageOff } from 'lucide-react';

// --- COMPONENTE 1: DASHBOARD (Tu código original refactorizado) ---
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

      {/* Gráficos (Placeholders visuales para no extender demasiado el código) */}
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
        // NOTA: En un entorno real, esta llamada podría fallar por CORS si Perenual no lo permite directamente desde el navegador.
        // Si eso pasa, necesitaremos un proxy, pero intentemos directo primero.
      const response = await fetch(`https://perenual.com/api/species-list?key=${API_KEY}&q=${searchTerm}`);
      if (!response.ok) {
          if (response.status === 429) throw new Error("Límite de API excedido. Intenta más tarde.");
          throw new Error('Error al buscar plantas');
      }
      const data = await response.json();
      setPlants(data.data || []);
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

// --- COMPONENTE 3: MI HUERTO (Futura API Privada) ---
function MyGarden() {
  return (
    <div className="flex-1 p-4 md:p-6 flex flex-col items-center justify-center text-center">
      <div className="bg-green-50 p-8 rounded-full mb-6">
        <Sprout size={64} className="text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Mi Huerto Personal</h2>
      <p className="text-gray-500 max-w-md">
        Aquí es donde conectaremos tu <strong>API Privada</strong>. Las plantas que añadas desde el buscador aparecerán listadas aquí.
      </p>
      <div className="mt-8 p-4 bg-gray-100 rounded-xl text-sm font-mono text-gray-600 border border-gray-200">
        Esperando conexión a: GET localhost:3000/mi-huerto...
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