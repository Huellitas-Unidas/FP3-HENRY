"use client";
import ButtonLostAndFound from "@/components/Buttons/ButtonLostAndFound";
import CardList from "@/components/CardList/CardList";
import React, { useState, useEffect } from "react";
import { IPost } from "@/interfaces/types";
import ModalPage from "@/components/ModalPage/ModalPAge";
import { useRouter } from "next/navigation";

const LostAndFound: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [filter, setFilter] = useState<string>("todos"); // Estado para el filtro
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]); // Lista filtrada
  const router = useRouter();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Función para obtener los post de la API
  const fetchPosts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
      if (!response.ok) {
        throw new Error("Error al obtener los posts");
      }
      const data: IPost[] = await response.json();
      console.log("Todos los posts:", data);
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Filtrar los posts según el estado seleccionado
  useEffect(() => {
    if (filter === "todos") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(
        posts.filter((post) => post.status?.toLowerCase().trim() === filter)
      );
    }
  }, [filter, posts]);

  // Llamar a fetchPosts cuando el componente se monta
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-8">
      <div className="flex flex-row justify-between">
        <div className="mb-4">
          <button
            onClick={() => router.push("/misposteos")}
            className="px-8 py-4 rounded-lg text-white text-sm font-bold border-none outline-none tracking-wide bg-[#2e736b] hover:bg-teal-950 shadow-md"
          >
            Mis posteos
          </button>
        </div>

        <div className="flex justify-start mb-4">
          <button
            onClick={handleOpenModal}
            className="px-8 py-4 rounded-lg text-white text-sm font-bold border-none outline-none tracking-wide bg-[#2e736b] hover:bg-teal-950 shadow-md"
          >
            Publicar Mascota
          </button>
        </div>
      </div>

      <ButtonLostAndFound filter={filter} setFilter={setFilter} />

      {/* Lista de Tarjetas */}
      <CardList posts={filteredPosts} />

      {/* Modal (Renderizado condicional) */}
      {isModalOpen && (
        <ModalPage onClose={handleCloseModal} onRefreshList={fetchPosts} />
      )}
    </div>
  );
};

export default LostAndFound;

{
  /*'use client';

import React from 'react';
import ButtonCreatePost from '@/components/Buttons/ButtonCreatePost';
import ButtonLostAndFound from '@/components/Buttons/ButtonLostAndFound';
import CardList from '@/components/CardList/CardList';

const LostAndFound: React.FC = () => {
  return (
    <div className="p-8">
      <ButtonCreatePost />
      <ButtonLostAndFound />
      <CardList />
      
    </div>
  );
};

export default LostAndFound;*/
}

//

{
  /*

import ButtonCreatePost from '@/components/Buttons/ButtonCreatePost';
import ButtonLostAndFound from '@/components/Buttons/ButtonLostAndFound';
import CardList from '@/components/CardList/CardList'
import React from 'react'

const LostAndFound = () => {
  
  return (
    <div>
       <ButtonCreatePost/>
      <ButtonLostAndFound/>  
      <CardList />
    </div>
  );
};

export default LostAndFound;
*/
}
