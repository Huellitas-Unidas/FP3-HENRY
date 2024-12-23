"use client";
import { Toast } from "@/helpers";
import React, { useState } from "react";
import { postPqr } from "../api/pqrAPI";

const Pqr = () => {
  const [pqrData, setPqrData] = useState({
    fullName: "",
    email: "",
    type: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !pqrData.fullName ||
      !pqrData.email ||
      !pqrData.type ||
      !pqrData.description
    ) {
      Toast.fire({
        title: "Todos los campos son obligatorios",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          confirmButton:
            "bg-green500 hover:bg-teal-800 text-white font-bold py-10 px-8 rounded",
        },
      });
      return;
    }
    postPqr(pqrData);
  };

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
  };

  return (
    <section className="flex flex-col place-items-center mt-8 mb-8">
      <div className="rounded-xl border border-green500 shadow-2xl p-8 w-1/4 ">
        <h1 className="text-xl text-center font-bold mt-2 mb-8 w-9/1212">
          Ayúdanos a Mejorar: Sugerencias y Opiniones
        </h1>
        <p className="mb-6 text-center">
          Por favor, completa este formulario para que podamos procesar tu
          solicitud. ¡Gracias! 😊{" "}
        </p>
        <form
          className="space-y-6 flex flex-col gap-2 items-center text-lg w-full"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Lulu Alvarado"
            className="py-2 pl-4 text-gray-400 border-2 rounded-xl focus:shadow-lg focus:outline-none w-full"
            name="fullName"
            value={pqrData.fullName}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="lulu.alvarado@mail.com"
            className="py-2 pl-4 text-gray-400 border-2 rounded-xl focus:shadow-lg focus:outline-none w-full"
            name="email"
            value={pqrData.email}
            onChange={handleChange}
          />
          <select
            className="py-2 pl-4 text-gray-400 border-2 rounded-xl focus:shadow-lg focus:outline-none w-full"
            name="type"
            value={pqrData.type}
            onChange={handleChange}
          >
            <option value="" disabled>
              Tipo
            </option>
            <option value="peticion">Peticiónes</option>
            <option value="queja">Quejas</option>
            <option value="reclamo">Reclamos</option>
          </select>

          <textarea
            placeholder="En este espacio puedes escribir y detallar tu solicitud."
            className="py-2 pl-4 text-gray-400 border-2 rounded-xl focus:shadow-lg focus:outline-none w-full"
            rows={4}
            name="description"
            value={pqrData.description}
            onChange={handleChange}
          ></textarea>

          <button
            type="submit"
            className="bg-green500 text-white p-2 rounded-lg hover:bg-white hover:text-green500 transition-all duration-300"
          >
            Enviar mi Solicitud
          </button>
        </form>
      </div>
    </section>
  );
};

export default Pqr;
