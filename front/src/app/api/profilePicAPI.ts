import { getUserId } from "@/helpers/userId";
import { IProfilePic } from "@/interfaces/types";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// patch - subir una foto
export const patchPic = async (formData: FormData): Promise<IProfilePic> => {
  const userId = getUserId();

  try {
    const response = await fetch(
      `${API_URL}/profile/${userId}/profile-picture`,
      {
        method: "PATCH",
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    Swal.fire({
      title: "¡Foto de perfil actualizada con éxito! 📸",
      icon: "success",
      confirmButtonText: "OK",
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
    });
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error al subir la foto";

    Swal.fire({
      icon: "error",
      iconColor: "rose",
      text: errorMessage,
      title: "No se logró subir la foto",
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
    });
    console.error("Error al subir la foto:", errorMessage);
    throw error;
  }
};

//! delete - eliminar la foto
export async function deletePic(petId: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/pets/${petId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    Swal.fire({
      title: "Mascota eliminada con éxito 🌟",
      icon: "success",
      confirmButtonText: "OK",
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error al eliminar la mascota";

    Swal.fire({
      icon: "error",
      iconColor: "rose",
      text: errorMessage,
      title: "No se logró eliminar la mascota",
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
    });

    console.error("Error al eliminar la mascota:", errorMessage);
    throw error;
  }
}
