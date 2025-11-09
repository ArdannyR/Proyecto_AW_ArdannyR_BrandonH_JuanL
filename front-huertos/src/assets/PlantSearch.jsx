import React, { useState } from "react";
import { Leaf, Search, Droplets, Sun, Sprout } from "lucide-react"; // Asegúrate de que ImageOff no se use si no es necesario

function PlantSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const API_KEY = "sk-N5sO6910bc312749c13382";

    const searchPlants = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;

    setLoading(true);
    setError(null);
    setPlants([]); // Limpiar resultados anteriores al iniciar una nueva búsqueda

    try {
        const response = await fetch(
        `https://perenual.com/api/species-list?key=${API_KEY}&q=${searchTerm}`
        );

        if (!response.ok) {
            if (response.status === 429) {
                throw new Error(
                "Límite de API excedido. Intenta más tarde. (Plan gratuito de Perenual)"
            );
        }
        throw new Error(`Error al buscar plantas: ${response.statusText}`);
        }
        const data = await response.json();

      // La API de Perenual en su plan gratuito a veces devuelve mensajes de upgrade en lugar de datos.
      // Vamos a filtrarlos o manejarlos.
        const filteredPlants = (data.data || []).map((plant) => ({
        ...plant,
        // Filtramos mensajes de upgrade en watering y sunlight
        watering:
            plant.watering && !plant.watering.includes("Upgrade Plans")
            ? plant.watering
            : null,
        sunlight:
            plant.sunlight?.[0] && !plant.sunlight[0].includes("Upgrade Plans")
            ? plant.sunlight
            : null,
        cycle:
            plant.cycle && !plant.cycle.includes("Upgrade Plans")
            ? plant.cycle
            : null,
        }));

        setPlants(filteredPlants);
    } catch (err) {
        setError(err.message);
      // Datos falsos de respaldo si falla la API key de demo o hay un error
        setPlants([
        {
          id: 1,
          common_name: "Tomato (Demo)",
          scientific_name: ["Solanum lycopersicum"],
          cycle: "Annual",
          watering: "Frequent",
          default_image: {
            original_url:
              "https://perenual.com/storage/species_image/1_abies_alba/og/1536px-Abies_alba_SkalitC3A9.jpg",
          }, // URL de ejemplo real de Perenual
        },
        {
          id: 2,
          common_name: "Potato (Demo)",
          scientific_name: ["Solanum tuberosum"],
          cycle: "Annual",
          watering: "Average",
          default_image: { original_url: "" }, // Simular una planta sin imagen para ver el fallback
        },
        {
          id: 3,
          common_name: "Rose (Demo)",
          scientific_name: ["Rosa spp."],
          cycle: "Perennial",
          watering: "Average",
          sunlight: ["Full sun"],
          default_image: {
            original_url:
              "https://perenual.com/storage/species_image/324_rosa_spp/og/Rosa_spp._1.jpg",
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Search className="text-green-600" /> Buscar en Perenual
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
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </form>

        {error && (
          <div className="p-4 mb-6 bg-yellow-50 text-yellow-700 rounded-xl border border-yellow-200 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Resultados */}
        <div className="space-y-4">
          {plants.map((plant) => (
            <div
              key={plant.id}
              className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 hover:border-green-200 transition-all"
            >
              {/* Imagen de la planta */}
              <div className="w-24 h-24 shrink-0 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center border border-gray-200">
                {plant.default_image?.original_url &&
                plant.default_image.original_url !== "" ? (
                  <img
                    src={plant.default_image.original_url}
                    alt={plant.common_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Si la imagen falla en cargar, reemplazar con el icono de hoja
                      e.target.style.display = "none"; // Oculta la imagen rota
                      const parent = e.target.parentElement;
                      let fallbackIcon = parent.querySelector(".fallback-icon");
                      if (!fallbackIcon) {
                        fallbackIcon = document.createElement("div");
                        fallbackIcon.className = "fallback-icon";
                        parent.appendChild(fallbackIcon);
                      }
                      // Renderizar un nuevo componente de React o un elemento SVG/Lucide
                      // Esto es más complejo para hacer con vanilla JS aquí, se haría con estado
                      // Por ahora, solo nos aseguramos de que no haya una imagen rota
                    }}
                  />
                ) : (
                  // Icono de fallback si no hay URL de imagen o está vacía
                  <Leaf className="text-green-300" size={32} />
                )}
              </div>

              {/* Info de la planta */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h3 className="font-bold text-lg text-gray-800 capitalize leading-tight">
                    {plant.common_name}
                  </h3>
                  <p className="text-sm text-gray-500 italic">
                    {plant.scientific_name?.[0]}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {plant.cycle && (
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-medium">
                      {plant.cycle}
                    </span>
                  )}
                  {plant.watering && (
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium flex items-center gap-1">
                      <Droplets size={12} /> {plant.watering}
                    </span>
                  )}
                  {plant.sunlight && plant.sunlight.length > 0 && (
                    <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full font-medium flex items-center gap-1">
                      <Sun size={12} /> {plant.sunlight[0]}
                    </span>
                  )}
                </div>
              </div>

              {/* Botón de acción */}
              <div className="flex items-center pl-4 border-l border-gray-100">
                <button
                  className="bg-green-600 text-white hover:bg-green-700 p-3 rounded-xl transition-colors shadow-sm"
                  title="Añadir a mi huerto"
                >
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

export default PlantSearch; // Asegúrate de exportar PlantSearch si lo tienes en un archivo separado
