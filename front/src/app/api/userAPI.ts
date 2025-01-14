import { IUserBack } from "@/interfaces/types";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// get user by id
export async function getUserById(id: string | number): Promise<IUserBack | null> {
  try {
    const response = await fetch(`${API_URL}/user/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data || null;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error al obtener el usuario";

    Swal.fire({
      icon: "error",
      iconColor: "rose",
      text: errorMessage,
      title: "No se logró obtener el usuario",
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
    });
    console.error("Error al obtener el usuario:", errorMessage);
    throw error;
  }
}
