import { IPost } from "@/interfaces/types";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getPosts = async (): Promise<IPost[]> => {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("No se encontró el token de autorización. Inicia sesión nuevamente.");
  }

  const response = await fetch(`${API_URL}/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener posts");
  }

  return response.json();
};
