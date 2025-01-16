"use client";
import React, { useEffect, useState } from "react";
import { IPost } from "@/interfaces/types";
import { getPosts } from "@/app/api/adminAPIS/getPosts";
import { deletePost } from "@/app/api/adminAPIS/deletePost";
import { FaTrash } from "react-icons/fa";

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
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error al eliminar post:", error);
    }
  };

  return (
    <div className="flex flex-col place-items-center my-8 px-4">
      <table className="rounded-3xl text-lg border border-green500 shadow-2xl p-8 w-full sm:w-3/4 md:w-2/3 lg:w-1/3 xl:w-1/4">
        <thead className="rounded-t-xl rounded-b-xl bg-customGreen-100 text-lg border border-green500 ">
          <tr>
            <th className="border border-customGreen-300 px-4 py-2 text-customGreen-900">
              Título
            </th>
            <th className="border border-customGreen-300 px-4 py-2 text-customGreen-900">
              Descripción
            </th>
            <th className="border border-customGreen-300 px-4 py-2 text-customGreen-900">
              Tipo de Mascota
            </th>
            <th className="border border-customGreen-300 px-4 py-2 text-customGreen-900">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="bg-snowWhite">
              <td className="border border-customGreen-300 px-4 py-2">
                {post.title}
              </td>
              <td className="border border-customGreen-300 px-4 py-2">
                {post.description}
              </td>
              <td className="border border-customGreen-300 px-4 py-2">
                {post.petType}
              </td>
              <td className="border border-customGreen-300 px-4 py-2">
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-300 hover:bg-red-500 text-white px-3 py-2 rounded-full shadow-md transition-all duration-300"
                >
                  <FaTrash />
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
