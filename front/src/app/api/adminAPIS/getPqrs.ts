import { IpqrProps } from "@/interfaces/types";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getPqrs(): Promise<IpqrProps[]> {
  try {
    const response = await fetch(`${API_URL}/pqr`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener las PQR");
    }

    return response.json(); // Devuelve las PQR
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Error al obtener las PQR";

    Swal.fire({
      icon: "error",
      text: errorMessage,
      title: "Error al cargar las solicitudes de PQR",
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
    });

    console.error("Error al obtener las PQR:", errorMessage);
    throw error;
  }
}
