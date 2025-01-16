"use client";
import GreenButton from "@/components/Buttons/GreenButton";
import { useFormik } from "formik";
import { MdAddPhotoAlternate } from "react-icons/md";
import { postPet } from "../api/petAPI";
import Swal from "sweetalert2";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getUserId } from "@/helpers/userId";
// import { getUserId } from "@/helpers/userId";

const PetRegister: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const [userData, setUserData] = useState<string>("");
  const router = useRouter();

  // useEffect(() => {
  //   const userId = getUserId();
  //   if (userId) {
  //     setUserData(userId);
  //     console.log(userData);
  //   } else {
  //     console.error("No se encontró el userId");
  //   }
  // }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      genero: "",
      status: "none",
      description: "",
      file: null,
      userId: getUserId(),
      //"042138bf-1613-4e96-8be0-e3467ab81fca", //! Hardcodeado por ahora
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.name) {
        errors.name = "El nombre es obligatorio.";
      }
      if (!values.type) {
        errors.type = "El tipo es obligatorio.";
      }
      if (!values.genero) {
        errors.genero = "El género es obligatorio.";
      }
      if (!values.description) {
        errors.description = "La descripción es obligatoria.";
      }
      if (!values.file) {
        errors.file = "Es necesario subir una foto de tu mascota.";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("type", values.type);
        formData.append("genero", values.genero);
        formData.append("status", values.status);
        formData.append("description", values.description);
        if (values.file) {
          formData.append("file", values.file);
        } else {
          throw new Error("El archivo no puede ser nulo");
        }
        if (values.userId) {
          formData.append("userId", values.userId);
        } else {
          throw new Error("El userId no puede ser nulo");
        }

        await postPet(formData);
        router.push("/dashboard");
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
          encType="multipart/form-data"
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
              className={`w-full sm:w-1/2 py-2 px-4 border-2 rounded-xl bg-white focus:outline-none ${
                formik.values.type ? "text-gray-900" : "text-gray-400"
              }`}
            >
              <option value="" disabled hidden>
                Tipo
              </option>
              <option value="Gato">Gato</option>
              <option value="Perro">Perro</option>
              <option value="Otro">Otro</option>
            </select>

            <select
              name="genero"
              value={formik.values.genero}
              onChange={formik.handleChange}
              className={`w-full sm:w-1/2 py-2 px-4 border-2 rounded-xl bg-white focus:outline-none ${
                formik.values.genero ? "text-gray-900" : "text-gray-400"
              }`}
            >
              <option value="" disabled hidden>
                Género
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
              {formik.errors.genero}
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
            <span className="text-red-500 text-sm text-center">
              {typeof formik.errors.file === "string" ? formik.errors.file : ""}
            </span>
          )}

          <GreenButton
            props={formik.isSubmitting ? "Añadiendo..." : "Añadir"}
          />
        </form>
      </div>
    </div>
  );
};

export default PetRegister;
