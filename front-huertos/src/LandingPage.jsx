import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importamos useNavigate
import { Leaf, Home, Sprout, Search, Droplets, Thermometer, Wind, Sun, FlaskConical, Activity, Bell } from 'lucide-react';

// =========================================
// COMPONENTE: LandingPage
// =========================================
function LandingPage() {
  const navigate = useNavigate(); // 2. Creamos la función de navegación

  const handleStart = () => navigate('/login'); // 3. Esta función nos llevará a la ruta del login

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800 font-sans flex flex-col">
      
      {/* --- Header --- */}
      <header className="w-full px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 p-2 rounded-xl shadow-sm">
              <Leaf className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Greenhouse A1
            </h1>
          </div>
          <button 
            onClick={handleStart} 
            className="hidden sm:inline-flex items-center bg-white text-green-700 px-6 py-2.5 rounded-xl text-sm font-semibold border border-green-100 hover:border-green-300 hover:shadow-sm transition-all"
          >
            Acceder a la Plataforma
          </button>
        </div>
      </header>

      {/* --- Hero Section --- */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 px-4 py-1.5 rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-green-700">
              Proyecto de IoT & Desarrollo Web
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-8">
            El futuro de tu huerto <br className="hidden md:block"/> empieza con <span className="text-green-600 relative inline-block">
              datos inteligentes
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                <path d="M0 5c30-5 70-5 100 0" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.3" />
              </svg>
            </span>.
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Monitorea, analiza y optimiza el crecimiento de tus cultivos con nuestra plataforma de gestión agrícola de precisión.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={handleStart} 
              className="w-full sm:w-auto bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition-all shadow-lg hover:shadow-green-200 hover:-translate-y-1"
            >
              Comenzar Ahora
            </button>
            <a href="#features" className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all">
              Saber más
            </a>
          </div>
        </div>
      </main>

      {/* --- Features Section --- */}
      <section id="features" className="w-full bg-white py-24 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Todo lo que tu huerto necesita
            </h3>
            <p className="text-gray-600 max-w-xl mx-auto">
              Nuestra plataforma integra hardware y software para darte el control total.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Feature 1 */}
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-green-200 transition-colors group">
              <div className="bg-white w-14 h-14 flex items-center justify-center rounded-2xl shadow-sm mb-6 group-hover:scale-110 transition-transform">
                <Activity className="text-green-600" size={28} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Sensores en Tiempo Real</h4>
              <p className="text-gray-600 leading-relaxed">
                Visualiza datos críticos de humedad del suelo, temperatura ambiental y niveles de luz al instante.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-blue-200 transition-colors group">
              <div className="bg-white w-14 h-14 flex items-center justify-center rounded-2xl shadow-sm mb-6 group-hover:scale-110 transition-transform">
                <Droplets className="text-blue-500" size={28} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Gestión de Riego</h4>
              <p className="text-gray-600 leading-relaxed">
                Optimiza el uso del agua activando el riego solo cuando tus plantas realmente lo necesitan.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-yellow-200 transition-colors group">
              <div className="bg-white w-14 h-14 flex items-center justify-center rounded-2xl shadow-sm mb-6 group-hover:scale-110 transition-transform">
                <Bell className="text-yellow-500" size={28} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Alertas Preventivas</h4>
              <p className="text-gray-600 leading-relaxed">
                Recibe notificaciones inmediatas si las condiciones ambientales salen del rango ideal para tu cultivo.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="w-full bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Leaf className="text-green-500" size={24} />
            <span className="text-white font-bold text-lg">Greenhouse A1</span>
          </div>
          <p className="text-sm">
            © 2025 Proyecto Académico - Desarrollo de Aplicaciones Web
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
