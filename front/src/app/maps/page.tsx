"use client";
import { FetchPosts } from "@/components/GoogleMapa/FetchPost";
import GoogleMapa from "@/components/GoogleMapa/GoogleMapa";
import { IPost } from "@/interfaces/types";
import React, { useEffect, useState } from "react";


const Maps = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [filter, setFilter] = useState<string>("todos");
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);

  useEffect(() => {
    FetchPosts().then((data) => setPosts(data));
  }, []);

  useEffect(() => {
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

      {/* Filtros */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            filter === "perdido"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setFilter("perdido")}
        >
          Perdidos
        </button>

        <button
          className={`px-4 py-2 rounded ${
            filter === "encontrado"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setFilter("encontrado")}
        >
          Encontrados
        </button>

        <button
          className={`px-4 py-2 rounded ${
            filter === "todos"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setFilter("todos")}
        >
          Todos
        </button>
      </div>

      <GoogleMapa posts={filteredPosts} />
    </div>
  );
};

export default Maps;