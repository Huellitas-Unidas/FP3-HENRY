
/* eslint-disable @typescript-eslint/no-explicit-any */
{/*import {Toast} from "@/helpers/index";
import {ISignUpData, IUserData} from "@/interfaces/types";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const isFormSignUpFull = (data: ISignUpData): boolean => Object.values(data).every(Boolean);

export async function register(userData: ISignUpData) {
    try {
        if (!isFormSignUpFull(userData)) {
            Toast.fire({
                icon: "error",
                iconColor: "red",
                title: "All fields must be filled out",
            });
            return;
        }

        const res = await fetch(`${APIURL}/users/register`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        if (res.ok) {
            return res.json();
        } else {
            Toast.fire({
                icon: "error",
                iconColor: "red",
                title: "Could not complete registration",
            });
        }
    } catch (error: any) {
        Toast.fire({
            icon: "error",
            iconColor: "rose",
            title: "Could not complete registration",
        });
        throw new Error(error);
    }
}

export async function login(userData: IUserData) {
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
}
 
*/}    