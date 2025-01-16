import { getUserId } from "@/helpers/userId";
import { IProfilePic } from "@/interfaces/types";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// patch - subir una foto
export const patchPic = async (formData: FormData): Promise<IProfilePic> => {
  const userId = getUserId();
  const handleRefresh = () => {
    window.location.reload();
  };

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
    }).then(() => {
      
      handleRefresh();
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

// delete - eliminar la foto
export async function deletePic(userId: string): Promise<void> {
  const handleRefresh = () => {
    window.location.reload();
  };

  try {
    const response = await fetch(
      `${API_URL}/profile/${userId}/profile-picture`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    Swal.fire({
      title: "Foto eliminada con éxito",
      icon: "success",
      confirmButtonText: "OK",
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
    }).then(() => {
      // Ejecuta handleRefresh una vez que el usuario haga clic en "OK"
      handleRefresh();
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error al eliminar la foto";

    Swal.fire({
      icon: "error",
      iconColor: "rose",
      text: errorMessage,
      title: "No se logró eliminar la foto",
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
    });

    console.error("Error al eliminar la foto:", errorMessage);
    throw error;
  }
}
