"use client";
import { FetchPosts } from "@/components/GoogleMapa/FetchPost";
import GoogleMapa from "@/components/GoogleMapa/GoogleMapa";
import { IPost } from "@/interfaces/types";
import React, { useEffect, useState } from "react";

const Maps = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [filter, setFilter] = useState<string>("todos"); // Estado para el filtro
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]); // Lista filtrada

  useEffect(() => {
    FetchPosts().then((data) => setPosts(data));
  }, []);

  // Filtrar los posts según el estado seleccionado
  useEffect(() => {
    console.log("posts", posts);
    if (filter === "todos") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(
        posts.filter((post) => post.status?.toLowerCase().trim() === filter)
      );
    }
  }, [filter, posts]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Título */}
      <main className="flex-grow">
        <section className="text-center py-6">
          <h2 className="text-2xl font-semibold">
            Mapa de Mascotas Perdidas y Encontradas
          </h2>
          <p className="text-gray-800 mt-2">
            Selecciona un filtro para ver detalles específicos.
          </p>
          <p className="text-gray-800 mt-2">
            Además puedes seleccionar en el mapa si encontraste o perdiste una
            mascota
          </p>
        </section>
      </main>

      {/* Botones de filtro */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            filter === "lost"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setFilter("perdido")}
        >
          Perdidos{" "}
        </button>

        <button
          className={`px-4 py-2 rounded ${
            filter === "found"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setFilter("encontrado")}
        >
          {" "}
          Encontrados{" "}
        </button>

        <button
          className={`px-4 py-2 rounded ${
            filter === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setFilter("todos")}
        >
          Todos
        </button>
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

      <GoogleMapa posts={filteredPosts} />
    </div>
  );
};

export default Maps;
