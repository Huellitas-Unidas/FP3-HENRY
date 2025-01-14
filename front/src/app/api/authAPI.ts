/* eslint-disable @typescript-eslint/no-unused-vars */
import { ISignUpData, IUserData } from "@/interfaces/types";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { Toast } from "@/helpers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const isFormSignUpFull = (data: ISignUpData): boolean =>
  Object.values(data).every(Boolean);

export async function register(userData: Omit<ISignUpData, "confirm">) {
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

    const res = await fetch(`${API_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      Swal.fire({
        icon: "error",
        iconColor: "red",
        title: "No se pudo completar el registro",
        customClass: {
          confirmButton:
            "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
        },
      });
      return;
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error desconocido en el registro";

    Swal.fire({
      icon: "error",
      iconColor: "rose",
      text: errorMessage,
      title: "No se pudo completar el registro",
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
    });

    console.error("Error en el registro:", errorMessage);
    throw error;
  }
}

export async function login(userData: IUserData) {
  interface DecodedToken {
    sub: string;
    email?: string;
    exp?: number;
  }

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
      if (data.token) {
        Cookies.set("token", data.token, { expires: 1 }); // Establecer token en la cookie
        console.log("Token recibido:", data.token);

        try {
          const decodedToken: DecodedToken = jwtDecode<DecodedToken>(
            data.token
          ); // Decodificar token

          if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
            throw new Error("El token ha expirado.");
          }

          if (decodedToken.sub) {
            localStorage.setItem("userId", decodedToken.sub); // Almacenar el ID de usuario
          } else {
            throw new Error(
              "El token no contiene un ID de usuario válido (sub)."
            );
          }
        } catch (decodeError) {
          console.error("Error al decodificar el token:", decodeError);
          throw new Error("Error al decodificar el token.");
        }

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
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido en el login";

    Swal.fire({
      icon: "error",
      title: "Error en el login",
      text: errorMessage,
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
    });

    console.error("Error en el login:", errorMessage);
    throw error;
  }
}
