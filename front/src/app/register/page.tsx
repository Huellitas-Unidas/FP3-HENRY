/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";

import Swal from "sweetalert2";
import GreenButton from "@/components/Buttons/GreenButton";
import { ISignUpData } from "@/interfaces/types";
import validate from "@/helpers/validate";
import { register } from "../api/authAPI";

const Register: React.FC = () => {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik<ISignUpData>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
      phone: "",
    },
    validate: validate,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: async ({ confirm, phone, ...userData }, { resetForm }) => {
      try {
        const formattedUserData = {
          ...userData,
          phone: Number(phone), // Convertir phone a número
        };

        const registrationResult = await register(formattedUserData);

        if (registrationResult) {
          Swal.fire({
            icon: "success",
            iconColor: "green",
            title: "Usuario registrado con éxito",
            text: "Ya puedes iniciar sesión.",
            customClass: {
              confirmButton:
                "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            }
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
              "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          }
        });
      }
    }
  });

  return (
    <div className="flex flex-col place-items-center my-8 px-4">
      <div className="rounded-xl border border-green500 shadow-2xl p-8 w-full sm:w-3/4 md:w-2/3 lg:w-1/3 xl:w-1/4">
        <form
          onSubmit={(e) => {
            formik.handleSubmit(e);
            setIsSubmitted(true);
          }}
          className="flex flex-col gap-4 items-center text-lg"
        >
          <input
            placeholder="Nombre completo"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none w-full"
          />
          {isSubmitted && formik.errors.name && (
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
          {isSubmitted && formik.errors.email && (
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
          {isSubmitted && formik.errors.password && (
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
          {isSubmitted && formik.errors.confirm && (
            <span className="text-red-500 text-sm">
              {formik.errors.confirm}
            </span>
          )}

          <input
            placeholder="Teléfono"
            type="number"
            name="phone"
            value={formik.values.phone} 
            onChange={formik.handleChange}
            className="py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none w-full"
          />
          {isSubmitted && formik.errors.phone && (
            <span className="text-red-500 text-sm">{formik.errors.phone}</span>
          )}

          <label className="text-sm mb-2 text-center">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="underline hover:no-underline">
              Loguéate
            </Link>
          </label>

          <GreenButton
            props={formik.isSubmitting ? "Registrando..." : "Registrarme"}
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
