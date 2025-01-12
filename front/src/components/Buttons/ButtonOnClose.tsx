'use client'
import React, { useEffect, useState } from 'react';
import ModalPage from '../ModalPage/ModalPAge';
import CardList from '../CardList/CardList';
import { IPost } from '@/interfaces/types';
import ButtonLostAndFound from './ButtonLostAndFound';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ButtonOnClose = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [posts, setPosts] = useState<IPost[]>([]);   // Estado para almacenar los posts
  const [filter, setFilter] = useState<string>("todos");


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRefreshList = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

 // Cargar posts cuando cambie refreshKey
 useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/posts`);
      const data = await response.json();
      setPosts(data);        // Actualizar posts en el estado
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  fetchPosts();
}, [refreshKey]);


  return (
    <div className="p-4">
     
      <div className="flex justify-end mb-4">
        <button
          onClick={handleOpenModal}
          className="px-6 py-3 rounded-lg text-white text-sm font-semibold tracking-wide bg-[#2e736b] hover:bg-green-500 shadow-lg"
        >
          Publicar Mascota
        </button>
      </div>

     
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <ModalPage onClose={handleCloseModal} onRefreshList={handleRefreshList} />
        </div>
      )}

      <ButtonLostAndFound filter={filter} setFilter={setFilter} />

      
      <CardList key={refreshKey} 
      posts={posts.filter((post) => filter === "todos" || post.status === filter)}/>
    </div>
  );
};

export default ButtonOnClose;

