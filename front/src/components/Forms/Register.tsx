import validate from "@/helpers/validate";
import { useFormik } from "formik";
import React from "react";
import Link from "next/link";
import GreenButton from "../Buttons/GreenButton";

const RegisterCard: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
      phone: "",
    },
    validate: validate,
    onSubmit: validate, //!
  });

  return (
    <div className="flex flex-col place-items-center mt-9">
      <div className="rounded-xl border border-green500 shadow-2xl p-8 w-1/4 ">
        <form className="flex flex-col gap-4 items-center text-xl">
          <input
            placeholder="Nombre completo"
            type="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none"
          ></input>

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

          <input
            placeholder="Confirma tu contraseña"
            type="password"
            name="confirm"
            value={formik.values.confirm}
            onChange={formik.handleChange}
            className="py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none"
          ></input>

          <input
            placeholder="Teléfono"
            type="number"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            className="py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none"
          ></input>

          <label className="text-sm">
            Ya tienes una cuenta?{" "}
            <Link href={"/login"} className="underline hover:no-underline">
              Loguéate
            </Link>
          </label>

          <GreenButton props="Enviar" />
        </form>
      </div>
    </div>
  );
};

export default RegisterCard;
