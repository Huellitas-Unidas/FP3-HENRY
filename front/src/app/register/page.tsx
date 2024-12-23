"use client";
import validate from "@/helpers/validate";
import React from "react";
import Link from "next/link";
import GreenButton from "@/components/Buttons/GreenButton";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { register } from "../api/authAPI";
import Swal from "sweetalert2";

const Register: React.FC = () => {
 const router = useRouter();
 
 const formik = useFormik({
  initialValues: {
    name: "",
    email: "",
    password: "",
    confirm: "",   // Solo para validación
    //phone: "",
  },

 validate: validate,
 onSubmit: async ({ confirm, ...userData }, { resetForm }) => {
  try {
    const registrationResult = await register(userData);
    if (registrationResult) {
        Swal.fire({
        icon: "success",
        iconColor: "green",
        title: "Usuario registrado con éxito",
        customClass: {
          confirmButton: "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
      });
      resetForm(); 
      router.push("/login"); 
    }
  } catch (error) {
    console.error("Error durante el registro:", error);
    Swal.fire({
      icon: "error",
      iconColor: "red",
        title: "No se pudo completar el registro",
        customClass: {
          confirmButton: "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
      });
    }
  },
});
    /* onSubmit: async ({ confirm, ...userData }, { resetForm }) => {
      try {
        await register(userData); 
        resetForm();
        router.push("/login"); 
      } catch (error) {
        console.error("Error durante el registro:", error);
      }
    }, */
  //});

  

    /*validate: (values) => {
      const errors = validate({ ...values, confirm: values.confirm});
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        // Excluye el campo `confirm` antes de enviar los datos
        const { ...userData } = values;     //El campo confirm se incluye solo 
        // para validación en el front-end. Antes de enviar los datos, lo excluimos utilizando destructuración ts


        // Llama a la API para registrar al usuario
        const response = await register(userData);
        console.log("Usuario registrado con éxito:", response);

        resetForm();     // Resetea el formulario tras el registro
        router.push("/login"); // Redirige al login
      } catch (error) {
        console.error("Error durante el registro:", error);
      }
    },
  }); */ 

   /*  validate: validate,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  }); */

  return (
    <div className="flex flex-col place-items-center my-8">
      <div className="rounded-xl border border-green500 shadow-2xl p-8 w-1/4 ">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-2 items-center text-xl"
        >
          <input
            placeholder="Nombre completo"
            type="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none"
          ></input>
          {formik.errors.name && (
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
            className="py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none"
          ></input>
          {formik.errors.email && (
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
          {formik.errors.password && (
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
            className="py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none"
          ></input>
          {formik.errors.confirm && (
            <span className="text-red-500 text-sm text-center">
              {formik.errors.confirm}
            </span>
          )} 

      
          {formik.errors.confirm && (
            <span className="text-red-500 text-sm text-center">
              {formik.errors.confirm}
            </span>
          )}
        

         {/*  <input
            placeholder="Teléfono"
            type="number"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            className="py-2 pl-4 border-2 rounded-xl focus:shadow-lg focus:outline-none"
          ></input>
          {formik.errors && (
            <span className="text-red-500 text-sm text-center">
              {formik.errors.phone}
            </span>
          )} */}

          <label className="text-sm mb-2">
            Ya tienes una cuenta?{" "}
            <Link href={"/login"} className="underline hover:no-underline">
              Loguéate
            </Link>
          </label>

          <GreenButton props="Registrarme" />
        </form>
      </div>
    </div>
  );
};

export default Register;
