/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { register } from "../api/authAPI"; // Servicio de registro
import Swal from "sweetalert2";
import GreenButton from "@/components/Buttons/GreenButton";
import { ISignUpData } from "@/interfaces/types";
import validate from "@/helpers/validate"; // Validación importada

const Register: React.FC = () => {
  const router = useRouter();

  const formik = useFormik<ISignUpData>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
    },
    validate, 
    onSubmit: async ({ confirm, ...userData }, { resetForm }) => {
      try {
        
        const registrationResult = await register(userData);

        if (registrationResult) {
          Swal.fire({
            icon: "success",
            iconColor: "green",
            title: "Usuario registrado con éxito",
            text: "Ya puedes iniciar sesión.",
            customClass: {
              confirmButton:
                "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
            },
          });
          resetForm();
          router.push("/login");
        }
      } catch (error: unknown) {
        let errorMessage = "No se pudo completar el registro";

        if (error instanceof Error && error.message.includes("409")) {
          errorMessage = "El correo electrónico ya está en uso";
        }

        Swal.fire({
          icon: "error",
          iconColor: "red",
          title: "Error en el registro",
          text: errorMessage,
          customClass: {
            confirmButton:
              "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
          },
        });
      }
    },
  });

  return (
    <div className="flex flex-col place-items-center my-8">
      <div className="rounded-xl border border-green500 shadow-2xl p-8 w-1/4 ">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-2 items-center text-xl"
        >
          <input
            placeholder="Nombre completo"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none w-full"
          />
          {formik.errors.name && (
            <span className="text-red-500 text-sm">{formik.errors.name}</span>
          )}

          <input
            placeholder="Correo electrónico"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none w-full"
          />
          {formik.errors.email && (
            <span className="text-red-500 text-sm">{formik.errors.email}</span>
          )}

          <input
            placeholder="Contraseña"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none w-full"
          />
          {formik.errors.password && (
            <span className="text-red-500 text-sm">
              {formik.errors.password}
            </span>
          )}

          <input
            placeholder="Confirma tu contraseña"
            type="password"
            name="confirm"
            value={formik.values.confirm}
            onChange={formik.handleChange}
            className="py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none w-full"
          />
          {formik.errors.confirm && (
            <span className="text-red-500 text-sm text-center">
              {formik.errors.confirm}
            </span>
          )} 

      
              

         {/*  <input
            placeholder="Teléfono"
            type="number"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            className="py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none"
          ></input>
          {formik.errors && (
            <span className="text-red-500 text-sm text-center">
              {formik.errors.phone}
            </span>
          )} */}

          <label className="text-sm mb-2">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="underline hover:no-underline">
              Loguéate
            </Link>
          </label>

          <GreenButton props={formik.isSubmitting ? "Registrando..." : "Registrarme"} />
        </form>
      </div>
    </div>
  );
};

export default Register;







