//import { IPost } from "@/interfaces/types";

// Función para obtener los post de la API
export const FetchPosts = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
    if (!response.ok) {
      throw new Error("Error al obtener los posts");
    }
    const data = await response.json();
    console.log("Todos los posts:", data);
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};
