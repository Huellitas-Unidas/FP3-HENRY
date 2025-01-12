/* eslint-disable @typescript-eslint/no-unused-vars */
import { ISignUpData, IUserData } from "@/interfaces/types";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { Toast } from "@/helpers";
import { jwtDecode } from "jwt-decode";

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
        customClass: {
          confirmButton:
            "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
        },
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
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
    });

    console.error("Error en el registro:", errorMessage);
    throw error;
  }
}

//////////**************///////////////

export async function login(userData: IUserData) {
  interface DecodedToken {
    sub: string; // ID del usuario (cambia según la estructura real de tu token)
    email?: string; // Si el token incluye email
    exp?: number; // Tiempo de expiración del token
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
      console.log("Respuesta del servidor:", data);

      if (data && data.token) {
        Cookies.set("token", data.token, { expires: 1 });

        // Decodificar el token para obtener el userId (campo `sub`)
        try {
          const decodedToken: DecodedToken = jwtDecode<DecodedToken>(
            data.token
          );
          console.log("Token decodificado:", decodedToken);

          if (decodedToken && decodedToken.sub) {
            localStorage.setItem("userId", decodedToken.sub); // Guardar el `sub` como `userId`
          } else {
            throw new Error(
              "El token no contiene un ID de usuario válido (sub)."
            );
          }
        } catch (decodeError) {
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
  } catch (error: unknown) {
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

{
  /*}
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
      console.log("Respuesta del servidor:", data);

      // Validamos si la respuesta contiene `token` y `user`
      if (data && data.token) {
        Cookies.set("token", data.token, { expires: 1 });

        // Verifica que el usuario y el ID existen, si no, lanza un error
        if (data.user && data.user.id) {
          localStorage.setItem("userId", data.user.id); // Guarda el `id` del usuario en localStorage


        } else {
          console.warn("El backend no devolvió un ID de usuario válido.");
          localStorage.setItem("userId", "default-id"); // Opción: usa un valor por defecto si no existe el ID
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
}*/
}
