"use client";
import { Toast } from "@/helpers";
import React, { useEffect, useState } from "react";
import { postPqr } from "../api/pqrAPI";
import { getUserId } from "@/helpers/userId";
import { validateField, validateForm } from "@/helpers/validatePqr";
import { IpqrProps } from "@/interfaces/types";
import Swal from "sweetalert2";

const Pqr = () => {
  const [pqrData, setPqrData] = useState({
    fullname: "",
    email: "",
    type: "",
    description: "",
    userId: "",
  });

  const [errors, setErrors] = useState<Partial<IpqrProps>>({
    fullname: "",
    email: "",
    type: "",
    description: "",
  });

  useEffect(() => {
    // función para get el userId del token
    const userId = getUserId(); //get user esta definida en helpers/userId.ts
    if (userId) {
      setPqrData((prev) => ({ ...prev, userId }));
    } else {
      console.error("No se encontró el userId");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validateForm(pqrData); // Validar form antes de enviar
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      // Si hay errores, mensaje de no enviar
      Toast.fire({
        title: "Por favor, corrige los errores antes de enviar",
        icon: "error",
        customClass: {
          confirmButton:
            "bg-green500 hover:bg-teal-800 text-white font-bold py-10 px-8 rounded",
        },
      });
      return;
    }

    if (
      !pqrData.fullname ||
      !pqrData.email ||
      !pqrData.type ||
      !pqrData.description ||
      !pqrData.userId //userId esté siempre incluido al enviar los datos!
    ) {
      Toast.fire({
        title: "Todos los campos son obligatorios",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          confirmButton:
            "bg-green500 hover:bg-teal-500 text-white font-bold py-10 px-8 rounded",
        },
      });
      return;
    }

    postPqr(pqrData)
      .then(() => {
        // modificación breve para ajustar las validaciones en tiempo real!
        setPqrData({
          fullname: "",
          email: "",
          type: "",
          description: "",
          userId: pqrData.userId, // Preservar el userId
        });
        Swal.fire({
          title: "¡Formulario enviado con éxito!",
          icon: "success",
          customClass: {
            confirmButton:
              "bg-green500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
          },
        });
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
      });
  }; // para vaciar los campos

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setPqrData((prevPqrData) => ({
      ...prevPqrData,
      [name]: value,
    }));

    const error = validateField(name, value); // validación en tiempo real
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return (
    <section className="flex flex-col place-items-center mt-4 mb-4 px-2">
      <div className="rounded-xl border border-green500 shadow-2xl p-4 w-full max-w-lg">
        <h1 className="text-xl text-center font-bold mt-2 mb-6">
          Ayúdanos a Mejorar: Sugerencias y Opiniones
        </h1>
        <p className="mb-4 text-center text-sm">
          Por favor, completa este formulario para que podamos procesar tu
          solicitud. ¡Gracias! 😊{" "}
        </p>
        <form
          className="space-y-2 flex flex-col gap-2 items-center text-sm w-full"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Lulu Alvarado"
            className="py-2 pl-4 text-gray-400 border-2 rounded-xl focus:shadow-lg focus:outline-none w-full"
            name="fullname"
            value={pqrData.fullname}
            onChange={handleChange}
          />
          {errors.fullname && (
            <span className="text-red-500 text-sm">{errors.fullname}</span>
          )}

          <input
            type="email"
            placeholder="lulu.alvarado@mail.com"
            className="py-2 pl-4 text-gray-400 border-2 rounded-xl focus:shadow-lg focus:outline-none w-full"
            name="email"
            value={pqrData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}

          <select
            className="py-2 pl-4 text-gray-400 border-2 rounded-xl focus:shadow-lg focus:outline-none w-full"
            name="type"
            value={pqrData.type}
            onChange={handleChange}
          >
            <option value="" disabled>
              Tipo
            </option>
            <option value="peticion">Peticiones</option>
            <option value="queja">Quejas</option>
            <option value="reclamo">Reclamos</option>
          </select>
          {errors.type && (
            <span className="text-red-500 text-sm">{errors.type}</span>
          )}

          <textarea
            placeholder="En este espacio puedes escribir y detallar tu solicitud."
            className="py-2 pl-4 text-gray-400 border-2 rounded-xl focus:shadow-lg focus:outline-none w-full"
            rows={3}
            name="description"
            value={pqrData.description}
            onChange={handleChange}
          ></textarea>
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description}</span>
          )}
          <button
            type="submit"
            className="bg-green500 text-white p-2 rounded-lg hover:bg-white hover:text-green500 transition-all duration-300"
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
};

export default Pqr;
