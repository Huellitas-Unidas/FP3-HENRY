import { IUserBack } from "@/interfaces/types";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Obtener usuario por ID
export async function getUserById(
  id: string | number
): Promise<IUserBack | null> {
  try {
    const token = Cookies.get("token");

    const response = await fetch(`${API_URL}/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
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
      text: errorMessage,
      title: "No se logró obtener el usuario",
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
    });
    console.error("Error al obtener el usuario:", error);
    return null;
  }
}
