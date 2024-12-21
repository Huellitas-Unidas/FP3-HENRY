'use client';

import React from 'react';
import { IPost } from '@/interfaces/types';

interface ButtonCardProps {
  post: IPost;
}

const ButtonCard: React.FC<ButtonCardProps> = ({ post }) => {
  const handleStatusChange = async (newStatus: string) => {
    try {
      // Verifica que la URL de la API esté configurada
      if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error('La URL de la API no está configurada.');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${post.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        // Si la respuesta no es válida, lanza un error con el mensaje del servidor
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el estado');
      }

      alert(`Estado actualizado a: ${newStatus}`);
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      alert(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <div className="flex gap-4">
      <button
        className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
        onClick={() => handleStatusChange('encontrado')}
      >
        Marcar como Encontrado
      </button>
      <button
        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        onClick={() => handleStatusChange('perdido')}
      >
        Marcar como Perdido
      </button>
    </div>
  );
};

export default ButtonCard;







{/*'use client';

import React from 'react';
import { IPost } from '@/interfaces/types';

interface ButtonCardProps {
  post: IPost;
}

const ButtonCard: React.FC<ButtonCardProps> = ({ post }) => {
  const handleStatusChange = async (newStatus: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${post.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el estado');
      }

      alert(`Estado actualizado a: ${newStatus}`);
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
    }
  };

  return (
    <div className="flex gap-4">
      <button
        className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
        onClick={() => handleStatusChange('encontrado')}
      >
        Marcar como Encontrado
      </button>
      <button
        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        onClick={() => handleStatusChange('perdido')}
      >
        Marcar como Perdido
      </button>
    </div>
  );
};

export default ButtonCard;*/}




{/*
    
    'use client'
import { IPostAnimal } from '@/interfaces/types'
import React from 'react'

const ButtonCard: React.FC<{ animalPost: IPostAnimal }> = ({ animalPost }) => {

    const { status } = animalPost;

    const buttonClass = status === 'lost' ? 'bg-red-500 hover:bg-red-300' : 'bg-green-500 hover:bg-green-300';

    return (
        <button
            type="button"
            className={`px-4 py-2 rounded-lg text-gray-800 text-sm font-semibold tracking-wider outline-none ${buttonClass}`}
        > {status} </button>
    )
}

export default ButtonCard    */}