import { Toast } from "@/helpers";
import { IDonation } from "@/interfaces/types";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getDonations = async (): Promise<IDonation[]> => {
  try {
    const response = await fetch(`${API_URL}/stripe/create`);
    if (!response.ok) {
      throw new Error("Error al obtener donaciones");
    }
    return response.json();
  } catch (unknownError) {
    if (unknownError instanceof Error) {
      console.error("Error al obtener donaciones:", unknownError.message);
      Toast.fire({
        icon: "error",
        iconColor: "red",
        title: "Error",
        text: `No se pudo obtener las donaciones: ${unknownError.message}`,
        customClass: {
          confirmButton:
            "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
        },
      });
      throw new Error(unknownError.message); // Re-lanzar el error si necesitas manejarlo más adelante
    } else {
      console.error("Error desconocido al obtener donaciones:", unknownError);
      Toast.fire({
        icon: "error",
        iconColor: "red",
        title: "Error desconocido",
        text: "Ha ocurrido un error inesperado al obtener las donaciones.",
        customClass: {
          confirmButton:
            "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
        },
      });
      throw new Error(
        "Ha ocurrido un error inesperado al obtener las donaciones."
      );
    }
  }
};

