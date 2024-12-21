/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useFormik } from "formik";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toast } from "@/helpers/index";
import Cookies from "js-cookie";
import GreenButton from "@/components/Buttons/GreenButton";
import Image from "next/image";
import Swal from "sweetalert2";
import { IUserData } from "@/interfaces/types";
import validate from "@/helpers/validate";
import { login } from "../api/authAPI";
import { signIn } from "next-auth/react";


const Login: React.FC = () => {
  const router = useRouter();

  const formik = useFormik<IUserData>({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await login(values);
        Cookies.set("token", response.token, { expires: 1 });
        localStorage.setItem(
          "userData",
          JSON.stringify({ token: response.token })
        );
        window.dispatchEvent(new Event("storageChange")); // Dispara un evento personalizado para actualizar el estado global/local
        Swal.fire({
          icon: "success",
          iconColor: "green",
          title: "¡Inicio de sesión exitoso!",
          customClass: {
            confirmButton:
              "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
          },
        });

        router.push("/");
        resetForm();
      } catch (error) {
        Swal.fire({
          icon: "error",
          iconColor: "red",
          title: "Credenciales incorrectas",
          customClass: {
            confirmButton:
              "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
          },
        });
        console.error("Error en el login:", error);
      }
    },
  });

  return (
    <div className="flex flex-col place-items-center my-8">
      <div className="rounded-xl border border-green500 shadow-2xl p-8 w-1/4">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-2 items-center text-xl"
        >
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none"
          ></input>
          {formik.errors.email && (
            <span className="text-red-500 text-sm text-center">
              {formik.errors.email}
            </span>
          )}

          <input
            placeholder="Contraseña"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none"
          ></input>
          {formik.errors.password && (
            <span className="text-red-500 text-sm text-center">
              {formik.errors.password}
            </span>
          )}

          <label className="text-sm mb-2">
            ¿No tienes una cuenta?{" "}
            <Link href={"/register"} className="underline hover:no-underline">
              Regístrate
            </Link>
          </label>

          <GreenButton props="Loguearme" />
          <button
            onClick={() => signIn("google")}
            type="button"
            className="flex items-center py-2 px-3 text-sm border border-green500 rounded-lg shadow-md bg-white font-semibold text-gray-900 transition-all duration-300 hover:bg-gray-100 hover:shadow-lg"
          >
            <Image
              src="/images/GoogleLogo.png"
              alt="Google Logo"
              className="rounded-lg object-contain w-6 h-6 mr-3"
              width={24}
              height={24}
            />
            Ingresar con Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;



