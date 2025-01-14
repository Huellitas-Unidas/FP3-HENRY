import { IUserBack } from "@/interfaces/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUsers = async (): Promise<IUserBack[]> => {
  const response = await fetch(`${API_URL}/user`);
  if (!response.ok) {
    throw new Error("Error al obtener usuarios");
  }
  return response.json();
};
