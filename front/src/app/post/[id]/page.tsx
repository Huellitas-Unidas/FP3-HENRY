"use client";

import React, { useEffect, useState } from "react";
import { IPost } from "@/interfaces/types";
import { useParams } from "next/navigation";
import { Toast } from "@/helpers";
import { updatePostStatus } from "@/app/api/postAPI";
import Link from "next/link";

const EditPost: React.FC = () => {
  const params = useParams();
  const [post, setPost] = useState<IPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = async (newStatus: string) => {
    if (!post)
       return;

    try {
      const updatedPost = await updatePostStatus(post.id, newStatus);
      setPost(updatedPost);

      const toastMessage =
      updatedPost.status === 'encontrado'
        ? 'Estado actualizado a Encontrado'
        : 'Estado actualizado a Perdido';

      const toastColor = updatedPost.status === 'encontrado' ? 'green' : 'darkOrange';
      Toast.fire({
        icon: "success",
        iconColor: toastColor,
        title: toastMessage,
        customClass: {
          confirmButton:
            "bg-green500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded",
        },
      });
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      Toast.fire({
        icon: "error",
        iconColor: "red",
        title: `Error: ${(error as Error).message}`,
        customClass: {
          confirmButton:
            "bg-green500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded",
        },
      });
    }
  };

  useEffect(() => {
    if (!params?.id) {
      setError("ID del post no proporcionado.");
      setIsLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/${params.id}`
        );
        if (!response.ok) {
          throw new Error("No se pudo obtener el post.");
        }
        const data: IPost = await response.json();
        console.log("Posts recibidos:", data);
        setPost(data);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Error desconocido";
        setError(errorMessage);
        console.error("Error al obtener el post:", errorMessage);
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
        <div className="flex justify-center">
          <img
            src={post.photoUrl}
            alt={post.title}
            className="w-full h-full object-contain rounded-md shadow-md"
          />
        </div>

        <div className="px-4">
          <h1 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h1>
          <p className="text-base text-gray-700 mb-2">
            <strong>Descripción:</strong> {post.description}
          </p>
          <p className="text-base text-gray-700 mb-2">
            <strong>Tipo:</strong> {post.petType}
          </p>
          <p className="text-base text-gray-700 mb-2">
            <strong>Fecha:</strong>{" "}
            {new Date(post.dateLost).toLocaleDateString()}
          </p>
          <Link href="/maps">
            <span className="text-base text-gray-700 mb-2 font-bold">
              Ubicación: {post.location?.address || "No especificada"}
            </span>
          </Link>
          <p className="text-base text-gray-700 mb-2">
            <strong>Contacto:</strong> {post.contactInfo}
          </p>
          <p className="text-base text-gray-700 mb-2">
            <strong>Estado:</strong>{" "}
            {post.status === "encontrado" ? (
              <span className="text-customGreen-600">Encontrado</span>
            ) : (
              <span className="text-red-500">Perdido</span>
            )}
          </p>
        </div>

        <div className="flex justify-end px-4 gap-4">
          <button
            className="px-1 py-1 text-sm font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
            onClick={() => handleStatusChange("encontrado")}
          >
            Marcar como Encontrado
          </button>
          <button
            className="px-1 py-1 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-600"
            onClick={() => handleStatusChange("perdido")}
          >
            Marcar como Perdido
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <Link href="/lostandfound">
          <button className="px-6 py-2 text-sm font-semibold text-white bg-customGreen-300 rounded-md hover:bg-customGreen-800">
            Volver a Lost and Found
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EditPost;


{
  /*'use client'

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
*/
}
