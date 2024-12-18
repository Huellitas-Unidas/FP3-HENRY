/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
//Operaciones relacionadas con usuarios: registro, login, obtener perfil, etc.
import {Toast} from "@/helpers/index";
import {ISignUpData, IUserData} from "@/interfaces/types";
import Swal from "sweetalert2";
import Cookies from "js-cookie";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const isFormSignUpFull = (data: ISignUpData): boolean => Object.values(data).every(Boolean);

export async function register(userData: ISignUpData) {
    try {
        if (!isFormSignUpFull(userData)) {
            Swal.fire({
                icon: "error",
                iconColor: "red",
                title: "Todos los campos deben ser completados",
                customClass: {
                    confirmButton: "bg-green500 hover:bg-teal-800 text-white font-bold py-10 px-8 rounded",
                },

            });
            return;
        }

        const res = await fetch(`${API_URL}/user/register`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        console.log(userData)
        if (res.ok) {
            return res.json();
           
        } else {
            Toast.fire({
                icon: "error",
                iconColor: "red",
                title: "No se logró completar el registro",
                customClass: {
                    confirmButton: "bg-green500 hover:bg-teal-800 text-white font-bold py-10 px-8 rounded",
                },
            });
        }
    } catch (error: any) {
        Toast.fire({
            icon: "error",
            iconColor: "rose",
            title: "No se logró completar el registro",
            customClass: {
                confirmButton: "bg-green500 hover:bg-teal-800 text-white font-bold py-10 px-8 rounded",
            },
        });
       
        throw new Error(error);
        
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
          Swal.fire({
          icon: "error",
          iconColor: "red",
          title: "No se logró el inicio de sesión",
          customClass: {
            confirmButton:
              "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
          },
        });
        throw new Error("Credenciales incorrectas.");
      }
    } catch (error: unknown) {
        const errorMessage =
        error instanceof Error ? error.message : "Error desconocido en el login";
  
        Swal.fire({
        icon: "error",
        iconColor: "rose",
        text: errorMessage,
        title: "No se logró loguear",
        customClass: {
            confirmButton:
              "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
          },
      });
  
      console.error("Error en el login:", errorMessage);
      throw error;
    }
  }


export async function updateUser(userId: string, updatedData: Partial<IUserData>) {
    try {
        if (!Object.keys(updatedData).length) {
            Swal.fire({
                icon: "warning",
                iconColor: "orange",
                title: "No hay datos de usuario para actualizar",
                customClass: {
                    confirmButton: "bg-green500 hover:bg-teal-800 text-white font-bold py-10 px-8 rounded",
                },
            });
            return;
        }

        const res = await fetch(`${API_URL}/user/${userId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });

        if (res.ok) {
                Swal.fire({
                icon: "success",
                iconColor: "green",
                title: "Usuario actualizado con exitó",
                customClass: {
                    confirmButton: "bg-green500 hover:bg-teal-800 text-white font-bold py-10 px-8 rounded",
                },
            });
            return await res.json();
        } else {
            Swal.fire({
                icon: "error",
                iconColor: "red",
                title: "No se puede actualizar usuario",
                customClass: {
                    confirmButton: "bg-green500 hover:bg-teal-800 text-white font-bold py-10 px-8 rounded",
                },
            });
        }
    } catch (error: any) {
        Toast.fire({
            icon: "error",
            iconColor: "rose",
            title: "Se produjo un error al actualizar el usuario",
        });
        console.error("Update error", error);
        throw new Error(error);
    }
}

export async function deleteUser(userId: string, token: string) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Envía el token en el header
        },
      });

        if (res.ok) {
            Toast.fire({
                icon: "success",
                iconColor: "green",
                title: "Usuario eliminado con exitó",
                customClass: {
                    confirmButton: "bg-green500 hover:bg-teal-800 text-white font-bold py-10 px-8 rounded",
                },
            });
            return await res.json();
        } 
    } catch (error: any) {
            Toast.fire({
            icon: "error",
            iconColor: "red",
            title: "Ocurrio un error mientras intentaba eliminar el usuario",
            customClass: {
                confirmButton: "bg-green500 hover:bg-teal-800 text-white font-bold py-10 px-8 rounded",
            },
        });
        console.error("Delete error", error);
        throw new Error(error);
    }
}
