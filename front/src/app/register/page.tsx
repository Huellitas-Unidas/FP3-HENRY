/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import validate from "@/helpers/validate";
import React from "react";
import Link from "next/link";
import GreenButton from "@/components/Buttons/GreenButton";
import { useFormik } from "formik";
import { register } from "@/app/api/authAPI";
import { useRouter } from "next/navigation";

const Register: React.FC = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm: "", // Campo solo para validación
    },
    validate: validate,
    onSubmit: async ({ confirm, ...userData }, { resetForm }) => {
      try {
        await register(userData); 
        resetForm(); 
        router.push("/login"); 
      } catch (error) {
        console.error("Error durante el registro:", error);
      }
    },
  });

  return (
    <div className="flex flex-col place-items-center my-8">
      <div className="rounded-xl border border-green-500 shadow-2xl p-8 w-1/4">
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
            onBlur={formik.handleBlur}
            className={`py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none ${
              formik.errors.name && formik.touched.name ? "border-red-500" : ""
            }`}
          />
          {formik.errors.name && formik.touched.name && (
            <span className="text-red-500 text-sm text-center">
              {formik.errors.name}
            </span>
          )}

          <input
            placeholder="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none ${
              formik.errors.email && formik.touched.email ? "border-red-500" : ""
            }`}
          />
          {formik.errors.email && formik.touched.email && (
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
            onBlur={formik.handleBlur}
            className={`py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none ${
              formik.errors.password && formik.touched.password
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.errors.password && formik.touched.password && (
            <span className="text-red-500 text-sm text-center">
              {formik.errors.password}
            </span>
          )}

          <input
            placeholder="Confirma tu contraseña"
            type="password"
            name="confirm"
            value={formik.values.confirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none ${
              formik.errors.confirm && formik.touched.confirm
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.errors.confirm && formik.touched.confirm && (
            <span className="text-red-500 text-sm text-center">
              {formik.errors.confirm}
            </span>
          )}

          <label className="text-sm mb-2">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="underline hover:no-underline">
              Inicia sesión
            </Link>
          </label>

          <GreenButton label="Registrarme" />
        </form>
      </div>
    </div>
  );
};

export default Register;





