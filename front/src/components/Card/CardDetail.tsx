/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useEffect, useState } from 'react';
import { IPost } from '@/interfaces/types';
import { useParams } from 'next/navigation';
import ButtonCard from '../Buttons/ButtonCard';

const CardDetail: React.FC = () => {
  const params = useParams();
  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data: IPost = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  if (!post) {
    return <p className="text-center text-gray-600 mt-10">Tarjeta/post no encontrada</p>;
  }

  return (
    <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full py-8 max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto my-10">
      
      <div className="flex items-center gap-2 px-6">
        <h1 className="text-xl text-gray-800 font-bold flex-1">Usuario: {post.userId}</h1>

        <ButtonCard 
          post={post} 
          onStatusChange={(newStatus) =>
            console.log(`Estado cambiado a: ${newStatus}`)
          } 
        />

      </div>

     
      <div className="flex items-center gap-2 px-6 py-6">
        <h3 className="text-xl text-gray-800 font-bold flex-1">Nombre de la mascota: {post.title}</h3>
      </div>

     
      <div className="min-h-[300px] py-2">
        <img
          src={post.photoUrl}
          alt={post.title}
          className="w-full my-4 object-cover rounded-md"
        />
      </div>

      <div className="px-6 space-y-4">
        <p className="text-base text-gray-700 leading-relaxed">
          <span className="font-semibold">Descripción:</span> {post.description}
        </p>
        <p className="text-base text-gray-700 leading-relaxed">
          <span className="font-semibold">Tipo:</span> {post.petType}
        </p>
        <p className="text-base text-gray-700 leading-relaxed">
          <span className="font-semibold">Fecha:</span> {post.dateLost ? new Date(post.dateLost).toLocaleDateString() : 'No especificada'}
        </p>
        <p className="text-base text-gray-700 leading-relaxed">
          <span className="font-semibold">Ubicación:</span> {post.location?.address || 'No especificada'}
        </p>
        <p className="text-base text-gray-700 leading-relaxed">
          <span className="font-semibold">Latitud:</span> {post.location?.latitude || 'No especificada'}
        </p>
        <p className="text-base text-gray-700 leading-relaxed">
          <span className="font-semibold">Longitud:</span> {post.location?.longitude || 'No especificada'}
        </p>
        <p className="text-base text-gray-700 leading-relaxed">
          <span className="font-semibold">Contacto:</span> {post.contactInfo}
        </p>
      </div>
    </div>
  );
};

export default CardDetail;



