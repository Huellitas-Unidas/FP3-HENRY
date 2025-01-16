'use client';

import ButtonLostAndFound from '@/components/Buttons/ButtonLostAndFound';
import CardList from '@/components/CardList/CardList';
import React, { useState, useEffect } from 'react';
import { IPost } from '@/interfaces/types';
import ModalPage from '@/components/ModalPage/ModalPAge';
import Link from 'next/link';
import { useRouter } from "next/navigation";

const LostAndFound: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [filter, setFilter] = useState<string>("todos"); 
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]); 
  const router = useRouter();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);


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

  
  useEffect(() => {
    if (filter === "todos") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(
        posts.filter((post) => post.status?.toLowerCase().trim() === filter)
      );
    }
  }, [filter, posts]);

 
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-8">
      <div className='flex justify-start gap-4 mb-8 mt-1'>

        <Link href="/maps">
          <button className="px-8 py-4 rounded-lg text-white text-sm font-bold border-none outline-none tracking-wide bg-[#2e736b] hover:bg-teal-950 shadow-md">Ver Mapa</button>
        </Link>
      

        <button
          onClick={handleOpenModal}
          className="px-8 py-4 rounded-lg text-white text-sm font-bold border-none outline-none tracking-wide bg-[#2e736b] hover:bg-teal-950 shadow-md"
        >
          Publicar Mascota
        </button>

        <button
          onClick={() => router.push("/misposteos")}
          className="px-8 py-4 rounded-lg text-white text-sm font-bold border-none outline-none tracking-wide bg-[#2e736b] hover:bg-teal-950 shadow-md"
        >
          Mis posteos
        </button>
      </div>

      <ButtonLostAndFound filter={filter} setFilter={setFilter} />

     
      <CardList posts={filteredPosts} />

      {isModalOpen && (
        <ModalPage onClose={handleCloseModal} onRefreshList={fetchPosts} />
      )}
    </div>
  );
};

export default LostAndFound;
