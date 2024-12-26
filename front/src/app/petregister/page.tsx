"use client";
import GreenButton from "@/components/Buttons/GreenButton";
import petValidate from "@/helpers/petsValidate";
import { useFormik } from "formik";
import React from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { postPet } from "../api/petAPI";
import Swal from "sweetalert2";

const PetRegister: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      genre: "",
      description: "",
      // status: "",
      imgUrl: "",
    }, //! imgUrl
    validate: petValidate,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = postPet(values);
        console.log(response);
        resetForm();
      } catch (error) {
        Swal.fire({
          icon: "error",
          iconColor: "red",
          title: "Error al enviar el formulario...",
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

          <div className="flex flex-row gap-4 mb-2">
            <select
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              className=" bg-transparent text-gray-400 focus:outline-none "
            >
              <option value="" disabled>
                Tipo
              </option>
              <option value="Gato">Gato</option>
              <option value="Perro">Perro</option>
              <option value="Ave">Ave</option>
              <option value="Roedor">Roedor</option>
              <option value="Otro">Otro</option>
            </select>
            <select
              name="genre"
              value={formik.values.genre}
              onChange={formik.handleChange}
              className=" bg-transparent text-gray-400 focus:outline-none "
            >
              <option value="" disabled>
                Género
              </option>
              <option value="Hembra">Hembra</option>
              <option value="Macho">Macho</option>
            </select>
          </div>
          {formik.errors && (
            <span className="text-red-500 text-sm text-center">
              {formik.errors.type}
            </span>
          )}
          {formik.errors && (
            <span className="text-red-500 text-sm text-center">
              {formik.errors.genre}
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

          <span className="text-gray-400">*Sube una foto de tu mascota</span>
          <button>
            <MdAddPhotoAlternate className="text-2xl text-gray-500 mb-4" />
          </button>

          <GreenButton props="Añadir" />
        </form>
      </div>
    </div>
  );
};

export default PetRegister;
