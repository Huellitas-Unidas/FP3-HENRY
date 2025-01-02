import { IpqrProps } from "@/interfaces/types";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// post - enviar el formulario de PQR
export async function postPqr(values: IpqrProps) {
  try {
    const response = await fetch(`${API_URL}/pqr`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Error al enviar");
    Swal.fire({
      title: "¡Gracias! Hemos recibido tu solicitud con éxito. 🌟",
      icon: "success",
      confirmButtonText: "OK",
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Error al enviar el formulario";

    Swal.fire({
      icon: "error",
      iconColor: "rose",
      text: errorMessage,
      title: "No se logró enviar el formulario",
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
    });
    console.error("Error al enviar el formulario:", errorMessage);
    throw error;
  }
}
