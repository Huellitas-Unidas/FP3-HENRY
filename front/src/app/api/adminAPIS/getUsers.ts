import { IUserBack } from "@/interfaces/types";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUsers = async (): Promise<IUserBack[]> => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error(
        "No se encontró el token de autorización. Inicia sesión nuevamente."
      );
    }
    const response = await fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(
        `Error al obtener usuarios: ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getUsers:", error);
    throw error;
  }
};