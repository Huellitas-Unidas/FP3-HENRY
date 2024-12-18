/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
//Operaciones relacionadas con usuarios: registro, login, obtener perfil, etc.
import {Toast} from "@/helpers/index";
import {ISignUpData, IUserData} from "@/interfaces/types";
import Swal from "sweetalert2";

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
                "Content-type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (res.ok) {
           
            Swal.fire({
                icon: "success",
                iconColor: "green",
                title: "`Bienvenido, ${data.user.name}!`",   // If backend return objeto-> user.name
            });
            return await res.json();
        } else {
            Toast.fire({
                icon: "error",
                iconColor: "red",
                title: "No se logró el inicio de sesión",
            });
        }
    } catch (error: any) {
        Toast.fire({
            icon: "error",
            iconColor: "rose",
            title: "No se logró loguear",
            customClass: {
                confirmButton: "bg-green500 hover:bg-teal-800 text-white font-bold py-10 px-8 rounded",
            },
        });
        console.error("Login error", error);
        throw new Error(error);
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
            Toast.fire({
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

export async function deleteUser(userId: string) {
    try {
        const res = await fetch(`${API_URL}/user/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
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
        } else {
            Swal.fire({
                icon: "error",
                iconColor: "red",
                title: "Se produjo un error al eliminar él usuario",
                customClass: {
                    confirmButton: "bg-green500 hover:bg-teal-800 text-white font-bold py-10 px-8 rounded",
                },
            });
        }
    } catch (error: any) {
        Toast.fire({
            icon: "error",
            iconColor: "rose",
            title: "Ocurrio un error mientras intentaba eliminar el usuario",
        });
        console.error("Delete error", error);
        throw new Error(error);
    }
}
