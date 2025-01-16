/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useFormik} from "formik";
import Swal from "sweetalert2";
import GreenButton from "@/components/Buttons/GreenButton";
import {ISignUpData} from "@/interfaces/types";
import validate, {validationGuide} from "@/helpers/validate";
import {register} from "../api/authAPI";


interface RegisterProps {
  role?: string; // Propiedad opcional para definir el rol del usuario
}

const Register: React.FC<RegisterProps> = ({ role = "user" }) => {
  const router = useRouter();

  const formik = useFormik<ISignUpData>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
      phone: "",
    },
    validate, 
    onSubmit: async ({ confirm, ...userData }, { resetForm }) => {
      try {
        
        const registrationResult = await register({
          ...userData,
          role: role?.toUpperCase() || "USER", 
        });

        if (registrationResult) {
          Swal.fire({
            icon: "success",
            iconColor: "green",
            title: ` ${
            role === "admin" ? "Administrador" : "Usuario"
            } registrado con éxito`,
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
      <div className="flex flex-col place-items-center my-8 px-4">
        <div className="rounded-xl border border-green500 shadow-2xl p-8 w-full sm:w-3/4 md:w-2/3 lg:w-1/3 xl:w-1/4 relative">
          <form
            noValidate
            onSubmit={(e) => {
              formik.handleSubmit(e);
              
            }}
            className="flex flex-col gap-4 items-center text-lg"
          >
            <div className="relative w-full">
              <input
                placeholder="Nombre completo"
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onFocus={() => formik.setFieldTouched("name", true)}
                className={`py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none w-full ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-300"
                    : formik.touched.name && !formik.errors.name
                    ? "border-customGreen-400"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.name && (formik.errors.name || formik.values.name.trim() === "") && (
                <div
                  className={`absolute left-0 top-full mt-1 px-4 py-2 text-sm rounded-md shadow-md z-10 ${
                    formik.errors.name
                      ? "bg-customGreen-300 text-white" 
                      : "bg-customGreen-50 text-customGreen-500" 
                  }`}
                >
                  {formik.errors.name
                    ? formik.errors.name
                    : validationGuide.name}
                </div>
              )}
            </div>

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
              {formik.touched.email && (formik.errors.email || formik.values.email.trim() === "") && (
                <div
                  className={`absolute left-0 top-full mt-1 px-4 py-2 text-sm rounded-md shadow-md z-10 ${
                    formik.errors.email
                      ? "bg-customGreen-300 text-white"
                      : "bg-customGreen-50 text-red-500"
                  }`}
                >
                  {formik.errors.email
                    ? formik.errors.email
                    : validationGuide.email}
                </div>
              )}
            </div>

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
              {formik.touched.password && (formik.errors.password || formik.values.password.trim() === "") && (
                <div
                  className={`absolute left-0 top-full mt-1 px-4 py-2 text-sm rounded-md shadow-md z-10 ${
                    formik.errors.password
                      ? "bg-customGreen-300 text-white"
                      : "bg-customGreen-50 text-red-500"
                  }`}
                >
                  {formik.errors.password
                    ? formik.errors.password
                    : validationGuide.password}
                </div>
              )}
            </div>

            <div className="relative w-full">
              <input
                placeholder="Confirma tu contraseña"
                type="password"
                name="confirm"
                value={formik.values.confirm}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onFocus={() => formik.setFieldTouched("confirm", true)}
                className={`py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none w-full ${
                  formik.touched.confirm && formik.errors.confirm
                    ? "border-red-300"
                    : formik.touched.confirm && !formik.errors.confirm && (formik.values.confirm || "").trim() !== ""
                    ? "border-customGreen-400"
                    : "border-gray-300"
                }`}
              />

              {formik.touched.confirm && (formik.errors.confirm || (formik.values.confirm || "").trim() === "") && (
                <div
                  className={`absolute left-0 top-full mt-1 px-4 py-2 text-sm rounded-md shadow-md z-10 ${
                    formik.errors.confirm
                      ? "bg-customGreen-300 text-white"
                      : "bg-customGreen-50 text-red-500"
                  }`}
                >
                  {formik.errors.confirm
                    ? formik.errors.confirm
                    : validationGuide.confirm}
                </div>
              )}
            </div>

            <div className="relative w-full">
              <input
                placeholder="Teléfono"
                type="text"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onFocus={() => formik.setFieldTouched("phone", true)}
                className={`py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none w-full ${
                  formik.touched.phone && formik.errors.phone
                    ? "border-red-300"
                    : formik.touched.phone && !formik.errors.phone
                    ? "border-customGreen-400"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.phone  && (formik.errors.phone || formik.values.phone.trim() === "") && (
                <div
                  className={`absolute left-0 top-full mt-1 px-4 py-2 text-sm rounded-md shadow-md z-10 ${
                    formik.errors.phone
                      ? "bg-customGreen-300 text-white"
                      : "bg-customGreen-50 text-red-500"
                  }`}
                >
                  {formik.errors.phone
                    ? formik.errors.phone
                    : validationGuide.phone}
                </div>
              )}
            </div>
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
