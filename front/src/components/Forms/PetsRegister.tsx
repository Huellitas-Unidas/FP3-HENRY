import validate from "@/helpers/validate";
import { useFormik } from "formik";
import React from "react";
import GreenButton from "../Buttons/GreenButton";

const PetRegisterCard: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      description: "",
      status: "",
    },
    validate: validate,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
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
            placeholder="Nombre de tu mascota"
            type="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none"
          ></input>
          {formik.errors && (
            <span className="text-red-500 text-sm text-center">
              {formik.errors.name}
            </span>
          )}

          <input
            placeholder="Tipo"
            type="text"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            className="py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none"
          ></input>
          {formik.errors && (
            <span className="text-red-500 text-sm text-center">
              {formik.errors.type}
            </span>
          )}

          <input
            placeholder="Descripción"
            type="text"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            className="py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none"
          ></input>
          {formik.errors && (
            <span className="text-red-500 text-sm text-center">
              {formik.errors.description}
            </span>
          )}

          <input
            placeholder="FOTO !!!"
            type="text"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            className="py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none"
          ></input>
          {formik.errors && (
            <span className="text-red-500 text-sm text-center">
              {formik.errors.description}
            </span>
          )}

          {/* <label className="text-sm mb-2">
            Ya tienes una cuenta?{" "}
            <Link href={"/login"} className="underline hover:no-underline">
              Loguéate
            </Link>
          </label> */}

          <GreenButton props="Enviar" />
        </form>
      </div>
    </div>
  );
};

export default PetRegisterCard;
