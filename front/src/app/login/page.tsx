"use client";
import { useFormik } from "formik";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import GreenButton from "@/components/Buttons/GreenButton";
import Image from "next/image";
import Swal from "sweetalert2";
import { IUserData } from "@/interfaces/types";
import validate from "@/helpers/validateLogin";
import { login } from "@/app/api/authAPI";
import { signIn } from "next-auth/react";

const Login: React.FC = () => {
  const router = useRouter();

  const formik = useFormik<IUserData>({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
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
    <div className="flex flex-col place-items-center my-8 px-4">
      <div className="rounded-xl border border-green500 shadow-2xl p-8 w-full sm:w-3/4 md:w-2/3 lg:w-1/3 xl:w-1/4">
        <form
          noValidate
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 items-center text-lg"
        >
          {/* Email Field */}
          <div className="relative w-full">
            <input
              placeholder="Correo electrónico"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={() => formik.setFieldTouched("email", true)}
              className={`py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none w-full ${
                formik.touched.email && formik.errors.email
                  ? "border-red-300"
                  : formik.touched.email && !formik.errors.email
                  ? "border-customGreen-400"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <div
                className={`absolute left-0 top-full mt-1 px-4 py-2 text-sm rounded-md shadow-md z-10 bg-customGreen-300 text-white`}
              >
                {formik.errors.email}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="relative w-full">
            <input
              placeholder="Contraseña"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={() => formik.setFieldTouched("password", true)}
              className={`py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none w-full ${
                formik.touched.password && formik.errors.password
                  ? "border-red-300"
                  : formik.touched.password && !formik.errors.password
                  ? "border-customGreen-400"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <div
                className={`absolute left-0 top-full mt-1 px-4 py-2 text-sm rounded-md shadow-md z-10 bg-customGreen-300 text-white`}
              >
                {formik.errors.password}
              </div>
            )}
          </div>

          <label className="text-sm mb-2 text-center">
            ¿No tienes una cuenta?{" "}
            <span className="underline hover:no-underline">
              <Link href={"/register"}>Regístrate</Link>
            </span>
          </label>

          {/* Google Sign-In */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
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

          {/* Submit Button */}
          <GreenButton
            props={formik.isSubmitting ? "Logueando..." : "Loguearme"}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;

