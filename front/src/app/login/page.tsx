"use client";
import validate from "@/helpers/validate";
import { useFormik } from "formik";
import React from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import GreenButton from "@/components/Buttons/GreenButton";


const Login: React.FC = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

  validate: validate,
  onSubmit: (values, { resetForm }) => {
    console.log(values);
    resetForm();
    localStorage.setItem("userData", JSON.stringify(values));
    window.dispatchEvent(new Event("storageChange"));
    router.push("/");
  },
}); 

  return (
    <div className="flex flex-col place-items-center mt-28">
      <div className="rounded-xl border border-green500 shadow-2xl p-8 w-1/4 ">
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
          {formik.errors && (
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
          {formik.errors && (
            <span className="text-red-500 text-sm text-center">
              {formik.errors.password}
            </span>
          )}

          <label className="text-sm mb-2">
            No tienes una cuenta?{" "}
            <Link href={"/register"} className="underline hover:no-underline">
              Regístrate
            </Link>
          </label>

          <GreenButton props="Loguearme" />
        </form>
      </div>
    </div>
  );
};

export default Login;
