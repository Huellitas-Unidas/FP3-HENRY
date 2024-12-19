'use client'
import Image from "next/image";
import React, { useState } from "react";

const Maps = () => {
  const [filter, setFilter] = useState("all"); // Estado para manejar el filtro

  return (
    <div className="min-h-screen flex flex-col">

      {/* Título */}
      <main className="flex-grow">
        <section className="text-center py-6">
          <h2 className="text-2xl font-semibold">Mapa de Mascotas Perdidas y Encontradas</h2>
          <p className="text-gray-800 mt-2">Selecciona un filtro para ver detalles específicos.</p>
          <p className="text-gray-800 mt-2">Además puedes seleccionar en el mapa si encontraste o perdiste una mascota</p>
        </section>

        {/* Botones de filtro */}
        <div className="flex justify-center gap-4 mb-6">

          <button className={`px-4 py-2 rounded ${filter === "lost" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
            }`} onClick={() => setFilter("lost")}>Perdidos </button>

          <button
            className={`px-4 py-2 rounded ${filter === "found" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
              }`}
            onClick={() => setFilter("found")} > Encontrados </button>

          <button
            className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
              }`}
            onClick={() => setFilter("all")}>Todos</button>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          <div className="flex justify-center items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 bg-red-500 rounded-full inline-block"></span>
              <span>Perdidos</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 bg-green-500 rounded-full inline-block"></span>
              <span>Encontrados</span>
            </div>
          </div>
        </div>

        {/* Mapa estático */}
        <div className="relative w-full max-w-4xl mx-auto my-6">
          <Image 
          src='/images/mapa.png' 
          alt="Mapa de mascotas perdidas y encontradas" 
          width={500} 
          height={300} 
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
            className="rounded-lg"
            priority
         />

          {/* Puntos en el mapa */}
          {filter !== "found" && (
            <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-red-500 rounded-full border border-white"></div>
          )}
          {filter !== "lost" && (
            <div className="absolute top-1/2 left-2/3 w-4 h-4 bg-green-500 rounded-full border border-white"></div>
          )}
        </div>

      </main>
    </div>
  );
};

export default Maps;