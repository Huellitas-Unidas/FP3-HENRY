"use client";
import GreenButton from "@/components/Buttons/GreenButton";
import { useFormik } from "formik";
import { MdAddPhotoAlternate } from "react-icons/md";
import { postPet } from "../api/petAPI";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

//! Raza --> Genero

const PetRegister: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      id: uuidv4(),
      name: "",
      type: "",
      raza: "",
      description: "",
      file: null,
      userId: "7d8b2042-4caa-4b53-aa98-a1aac8fa0f94", //!
      status: "none",
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.name) {
        errors.name = "El nombre es obligatorio.";
      }
      if (!values.type) {
        errors.type = "El tipo es obligatorio.";
      }
      if (!values.raza) {
        errors.raza = "La raza es obligatoria.";
      }
      if (!values.description) {
        errors.description = "La descripción es obligatoria.";
      }
      if (!values.file) {
        errors.file = "Es necesario subir una foto de tu mascota.";
      }
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("type", values.type);
        formData.append("raza", values.raza);
        formData.append("description", values.description);
        formData.append("status", values.status);

        formData.append("userId", values.userId);
        if (values.file) {
          formData.append("file", values.file);
        } else {
          throw new Error("El archivo no puede ser nulo");
        }

        const response = await postPet(formData);
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
    <div className="flex flex-col place-items-center my-8 px-4">
      <div className="rounded-xl border border-green500 shadow-2xl p-8 w-full sm:w-3/4 md:w-2/3 lg:w-1/3 xl:w-1/4">
        <form
          onSubmit={(e) => {
            setIsSubmitted(true);
            formik.handleSubmit(e);
          }}
          className="flex flex-col gap-4 items-center text-lg"
        >
          <input
            placeholder="Nombre de tu mascota"
            type="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="w-full py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none"
          />
          {isSubmitted && formik.errors && (
            <span className="text-red-500 text-sm text-center">
              {formik.errors.name}
            </span>
          )}

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <select
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              className="w-full sm:w-1/2 py-2 pl-4 border-2 rounded-xl bg-transparent text-gray-400 focus:outline-none"
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
              name="raza"
              value={formik.values.raza}
              onChange={formik.handleChange}
              className="w-full sm:w-1/2 py-2 pl-4 border-2 rounded-xl bg-transparent text-gray-400 focus:outline-none"
            >
              <option value="" disabled>
                Raza
              </option>
              <option value="Hembra">Hembra</option>
              <option value="Macho">Macho</option>
            </select>
          </div>
          {isSubmitted && formik.errors && (
            <span className="text-red-500 text-sm text-center">
              {formik.errors.type}
            </span>
          )}
          {isSubmitted && formik.errors && (
            <span className="text-red-500 text-sm text-center">
              {formik.errors.raza}
            </span>
          )}

          <input
            placeholder="Descripción"
            type="text"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            className="w-full py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none"
          />
          {isSubmitted && formik.errors && (
            <span className="text-red-500 text-sm text-center">
              {formik.errors.description}
            </span>
          )}

          <div className="flex flex-row gap-2">
            <MdAddPhotoAlternate className="text-2xl text-gray-500 mb-4" />

            <input
              type="file"
              name="file"
              onChange={(event) => {
                const files = event.currentTarget.files;
                if (files && files[0]) {
                  formik.setFieldValue("file", files[0]);
                }
              }}
              className="w-full py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none"
            />
          </div>

          {isSubmitted && formik.errors.file && (
            <span className="text-red-500 text-sm">{formik.errors.file}</span>
          )}

          <GreenButton props="Añadir" />
        </form>
      </div>
    </div>
  );
};

export default PetRegister;
