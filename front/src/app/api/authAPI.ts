/* eslint-disable @typescript-eslint/no-explicit-any */
import { Toast } from "@/helpers/index";
import { ISignUpData } from "@/interfaces/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log("API_URL:", API_URL); // Esto debería mostrar "http://localhost:4000"


export async function register(userData: ISignUpData) {
  try {
    console.log("API_URL:", API_URL);
    console.log("Datos enviados:", userData);

    if (!API_URL) {
      throw new Error("API_URL no está definida. Verifica tu archivo .env.local");
    }

    const res = await fetch(`${API_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      Toast.fire({
        icon: "error",
        iconColor: "red",
        title: errorData.message || "Error al registrar el usuario.",
      });
      return;
    }

    const data = await res.json();
    Toast.fire({
      icon: "success",
      iconColor: "green",
      title: "Registro completado con éxito.",
    });

    return data;
  } catch (error: any) {
    console.error("Error en el registro:", error);
    Toast.fire({
      icon: "error",
      iconColor: "red",
      title: error.message || "No se pudo completar el registro.",
    });
    throw error;
  }
}
