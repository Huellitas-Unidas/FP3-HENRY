import { IPost } from "@/interfaces/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getPosts = async (): Promise<IPost[]> => {
  const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) {
    throw new Error("Error al obtener posts");
  }
  return response.json();
};
