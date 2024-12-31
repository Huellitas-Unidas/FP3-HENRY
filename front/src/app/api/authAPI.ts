/* eslint-disable @typescript-eslint/no-unused-vars */
//Operaciones relacionadas con usuarios: registro, login, obtener perfil, etc.
/* eslint-disable @typescript-eslint/no-explicit-any */
//import { Toast } from "@/helpers/index";
import { ISignUpData, IUserData } from "@/interfaces/types";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { Toast } from "@/helpers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const isFormSignUpFull = (data: ISignUpData): boolean =>
  Object.values(data).every(Boolean);

export async function register(userData: Omit<ISignUpData, "confirm">){
  try {
  
    if (!isFormSignUpFull(userData)) {
      Swal.fire({
        icon: "error",
        iconColor: "red",
        title: "Todos los campos deben ser completados",
        customClass: {
          confirmButton:
            "bg-green500 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded",
        },
      });
      return;
    }

    // Realiza la solicitud al backend con los datos formateados
    const res = await fetch(`${API_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData), // `phone` ya es un número
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      Swal.fire({
        icon: "error",
        iconColor: "red",
        title: "No se pudo completar el registro",
      });
      return;
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error desconocido en el registro";

    Swal.fire({
      icon: "error",
      iconColor: "rose",
      text: errorMessage,
      title: "No se pudo completar el registro",

    });

    console.error("Error en el registro:", errorMessage);
    throw error;
  }
}

export async function login(userData: IUserData) {
  try {
    const res = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.token) {
        Cookies.set("token", data.token, { expires: 1 });
        Swal.fire({
          icon: "success",
          iconColor: "green",
          text: "Bienvenido de nuevo.",
          title: "¡Inicio de sesión exitoso!",
          customClass: {
            confirmButton:
              "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
          },
        });
        return data;
      } else {
        throw new Error("La respuesta del servidor no contiene un token.");
      }
    } else {
      const errorResponse = await res.json();
      Toast.fire({
        icon: "error",
        title: errorResponse.message || "Credenciales incorrectas.",
      });
      throw new Error(errorResponse.message || "Credenciales incorrectas.");
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido en el login";

    Toast.fire({
      icon: "error",
      title: errorMessage,
    });

    console.error("Error en el login:", errorMessage);
    throw error;
  }
}
