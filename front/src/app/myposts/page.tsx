"use client";
import CardList from "@/components/CardList/CardList";
import { getUserId } from "@/helpers/userId";
import { useEffect, useState } from "react";
import { IPost } from "@/interfaces/types";
import { useRouter } from "next/navigation";
import { getPostsByUser } from "../api/postAPI";

const MyPosts: React.FC = () => {
  const userId = getUserId();
  const [posts, setPosts] = useState<IPost[]>([]);
  const router = useRouter();

  const handleClick = () => {
    router.push("/lostandfound");
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        if (userId) {
          const userPosts = await getPostsByUser(userId);
          setPosts(userPosts);
        } else {
          console.error("No se encontraron los posts");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPets();
  }, [userId]);

  return (
    <div>
      {posts.length === 0 ? (
        <div className="mt-14 place-items-center">
          <p className="font-sans text-lg text-black">
            Aún no has realizado ningún posteo
          </p>
          <button
            onClick={handleClick}
            className="mt-4 px-8 py-4 rounded-lg text-white text-sm font-bold border-none outline-none tracking-wide bg-[#2e736b] hover:bg-teal-950 shadow-md"
          >
            Volver
          </button>
        </div>
      ) : (
        <CardList posts={posts} />
      )}
    </div>
  );
};

export default MyPosts;
