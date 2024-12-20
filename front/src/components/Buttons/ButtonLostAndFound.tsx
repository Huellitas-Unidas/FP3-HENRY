'use client'
import React, { useState } from 'react'

const ButtonLostAndFound = () => {
    const [filter, setFilter] = useState("all"); // Estado para manejar el filtro
    return (
        <div>
            {/* Botones de filtro */}
            <div className="flex justify-center gap-4 mb-6 mt-8">

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
        </div>
   )
}

                export default ButtonLostAndFound