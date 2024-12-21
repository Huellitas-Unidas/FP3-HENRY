'use client';

import React, { useEffect, useState } from 'react';
import { IPost } from '@/interfaces/types';
import { useParams } from 'next/navigation';

const EditPost: React.FC = () => {
  const params = useParams();
  const [post, setPost] = useState<IPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = async (newStatus: string) => {
    if (!post) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${post.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('No se pudo actualizar el estado del post.');
      }

      const updatedPost = await response.json();
      setPost((prev) => ({ ...prev, ...updatedPost }));
      alert(`Estado actualizado a: ${newStatus}`);
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      alert(`Error: ${(error as Error).message}`);
    }
  };

  useEffect(() => {
    if (!params?.id) {
      setError('ID del post no proporcionado.');
      setIsLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${params.id}`);
        if (!response.ok) {
          throw new Error('No se pudo obtener el post.');
        }
        const data: IPost = await response.json();
        setPost(data);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        setError(errorMessage);
        console.error('Error al obtener el post:', errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params?.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Cargando detalles del post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-200 text-red-800 p-4 rounded-md shadow-md">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Post no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-96 mx-auto my-6 mt-24">
      <div className="flex flex-col gap-4">
        {/* Contenedor de la imagen centrado */}
        <div className="flex justify-center">
          <img
            src={post.photoUrl}
            alt={post.title}
            className="w-full h-full  object-contain rounded-md shadow-md"
          />
        </div>
        {/* Detalles del post */}
        <div className="px-4">
          <h1 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h1>
          <p className="text-base text-gray-700 mb-2">
            <strong>Descripción:</strong> {post.description}
          </p>
          <p className="text-base text-gray-700 mb-2">
            <strong>Tipo:</strong> {post.petType}
          </p>
          <p className="text-base text-gray-700 mb-2">
            <strong>Fecha:</strong> {new Date(post.dateLost).toLocaleDateString()}
          </p>
          <p className="text-base text-gray-700 mb-2">
            <strong>Ubicación:</strong> {post.location?.address || 'No especificada'}
          </p>
          <p className="text-base text-gray-700 mb-2">
            <strong>Contacto:</strong> {post.contactInfo}
          </p>
        </div>

        {/* Botones de Estado alineados a la derecha */}
        <div className="flex justify-end px-4">
          <button
            className="px-6 py-3 text-sm font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 mr-4"
            onClick={() => handleStatusChange('encontrado')}
          >
            Marcar como Encontrado
          </button>
          <button
            className="px-6 py-3 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-600"
            onClick={() => handleStatusChange('perdido')}
          >
            Marcar como Perdido
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;














{/*'use client'

import CardDetail from '@/components/Card/CardDetail';
import animalsArray from '@/helpers/animalsArray';
import { IPost } from '@/interfaces/types';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const EditPost: React.FC = () => {
  const params = useParams();
  const [post, setPost] = useState<IPost | null>(null)

  useEffect(() => {
    const postId = parseInt(params?.id as string, 10); // Convierte el string a número

    const selectPost = animalsArray.find((item) => item.id === postId) as IPost;
    setPost(selectPost || null);
  }
    , [params])

  if (!post) {
    return <p>Tarjeta/post no encontrada</p>
  }

  return (
    <div>
     <CardDetail {...post}/>
    </div>
  )
};

export default EditPost;
*/}










