//Operaciones relacionadas con usuarios: registro, login, obtener perfil, etc.
/* eslint-disable @typescript-eslint/no-explicit-any */
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
                title: "No se pudo completar el registro",
            });
        }
    } catch (error: any) {
        Toast.fire({
            icon: "error",
            iconColor: "rose",
            title: "No se pudo completar el registro",
        });
       
        throw new Error(error);
        
    }
}

/* export async function login(userData: IUserData) {
    try {
        const res = await fetch(`${APIURL}/users/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (res.ok) {
            return await res.json();
        } else {
            Toast.fire({
                icon: "error",
                iconColor: "red",
                title: "Could not log in",
            });
        }
    } catch (error: any) {
        Toast.fire({
            icon: "error",
            iconColor: "rose",
            title: "Unable to sign in",
        });
        console.error("Login error", error);
        throw new Error(error);
    }
} */
 
  