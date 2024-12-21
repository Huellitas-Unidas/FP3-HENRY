'use client';
import ModalPage from '@/components/ModalPage/ModalPage';
import ButtonLostAndFound from '@/components/Buttons/ButtonLostAndFound';
import CardList from '@/components/CardList/CardList';
import React, { useState, useEffect } from 'react';
import { IPost } from '@/interfaces/types';

const LostAndFound: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Control del estado del modal
  const [posts, setPosts] = useState<IPost[]>([]); 

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Función para actualizar la lista de tarjetas
  const fetchPosts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
      if (!response.ok) {
        throw new Error('Error al obtener los posts');
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Llamar a fetchPosts cuando el componente se monta
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-8">
  {/* Contenedor del botón alineado a la derecha */}
  <div className="flex justify-end mb-4">
    <button
      onClick={handleOpenModal}
      className="px-8 py-4 rounded-lg text-white text-sm font-bold border-none outline-none tracking-wide bg-[#2e736b] hover:bg-teal-950 shadow-md"
    >
      Publicar Mascota
    </button>
  </div>

      {/* Otro botón adicional */}
      <ButtonLostAndFound />

      {/* Lista de Tarjetas */}
      <CardList posts={posts} />

      {/* Modal (Renderizado condicional) */}
      {isModalOpen && <ModalPage onClose={handleCloseModal} onRefreshList={fetchPosts}
       />}
    </div>
  );
};

export default LostAndFound;







{/*'use client';

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

export default LostAndFound;*/}



// 


{/*

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
*/}



