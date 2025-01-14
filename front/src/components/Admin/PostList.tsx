"use client"
import React, { useEffect, useState } from "react";
import { IPost } from "@/interfaces/types";
import { getPosts } from "@/app/api/adminAPIS/getPosts";
import { deletePost } from "@/app/api/adminAPIS/deletePost";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error al obtener posts:", error);
      }
    };
    fetchPosts();
  }, []);

  
  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
      setPosts(posts.filter(post => post.id !== id)); 
    } catch (error) {
      console.error("Error al eliminar post:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-customGreen-300">
        <thead className="bg-customGreen-100">
          <tr>
            <th className="border border-customGreen-300 px-4 py-2 text-customGreen-900">Título</th>
            <th className="border border-customGreen-300 px-4 py-2 text-customGreen-900">Descripción</th>
            <th className="border border-customGreen-300 px-4 py-2 text-customGreen-900">Tipo de Mascota</th>
            <th className="border border-customGreen-300 px-4 py-2 text-customGreen-900">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id} className="bg-snowWhite">
              <td className="border border-customGreen-300 px-4 py-2">{post.title}</td>
              <td className="border border-customGreen-300 px-4 py-2">{post.description}</td>
              <td className="border border-customGreen-300 px-4 py-2">{post.petType}</td>
              <td className="border border-customGreen-300 px-4 py-2">
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-300 hover:bg-gray-700 text-snowWhite px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;

