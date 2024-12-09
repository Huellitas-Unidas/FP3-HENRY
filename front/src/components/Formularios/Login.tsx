import validate from "@/helpers/validate";
import { useFormik } from "formik";
import React from "react";
import Enviar from "../Buttons/Enviar";
import Link from "next/link";

const LoginCard: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validate,
    onSubmit: validate, //!
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="rounded-xl border-2 border-green500 shadow-2xl p-8 w-1/3 ">
        <form className="flex flex-col gap-4 items-center text-2xl">
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none"
          ></input>

          <input
            placeholder="Contraseña"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none"
          ></input>

          <label className="text-base">
            No tienes una cuenta?{" "}
            <Link href={"/register"} className="underline hover:no-underline">
              Regístrate
            </Link>
          </label>

          <Enviar />
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
