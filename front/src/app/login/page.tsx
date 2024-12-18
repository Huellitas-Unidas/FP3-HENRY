"use client";

import { useFormik } from "formik";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/app/api/authAPI"; // Servicio de login
import { Toast } from "@/helpers/index"; // Notificaciones
import validate from "@/helpers/validate"; // Validación
import GreenButton from "@/components/Buttons/GreenButton";
import Cookies from "js-cookie"

const Login: React.FC = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate, // Validación personalizada
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await login(values); // Llamada al endpoint
        if (!response || !response.token || !response.user) {
          throw new Error("Respuesta inválida del servidor.");
        }

        const { token, user } = response;

        // Guarda los datos del usuario en Cookies
        Cookies.set("userData", JSON.stringify({ token, user }), { expires: 1 });

        Toast.fire({
          icon: "success",
          iconColor: "green",
          title: "Inicio de sesión exitoso",
        });

        // Redirige al home
        router.push("/");
        resetForm();
      } catch (error) {
        console.error("Error de login:", error);
        Toast.fire({
          icon: "error",
          iconColor: "red",
          title: "Credenciales incorrectas",
        });
      }
    },
  });

  return (
    <div className="flex flex-col place-items-center mt-28">
      <div className="rounded-xl border border-green500 shadow-2xl p-8 w-1/4 ">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-2 items-center text-xl"
        >
          {/* Input Email */}
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none w-full"
          />
          {formik.errors.email && (
            <span className="text-red-500 text-sm text-center">
              {formik.errors.email}
            </span>
          )}

          {/* Input Password */}
          <input
            placeholder="Contraseña"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none w-full"
          />
          {formik.errors.password && (
            <span className="text-red-500 text-sm text-center">
              {formik.errors.password}
            </span>
          )}

          {/* Link a Registro */}
          <label className="text-sm mb-2">
            ¿No tienes una cuenta?{" "}
            <Link href={"/register"} className="underline hover:no-underline">
              Regístrate
            </Link>
          </label>

          {/* Botón de Login */}
          <GreenButton props={formik.isSubmitting ? "Cargando..." : "Loguearme"} />
        </form>
      </div>
    </div>
  );
};

export default Login;

