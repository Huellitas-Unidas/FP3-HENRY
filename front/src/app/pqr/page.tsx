"use client";
import { Toast } from "@/helpers";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { sendPqr } from "../api/authAPI";

const Pqr = () => {
  const [pqrData, setPqrData] = useState({
    name: "Lulu Alvarado",
    email: "lulu.alvarado@mail.com",
    type: "peticion",
    description: "En este espacio puedes escribir y detallar tú solicitud",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !pqrData.name ||
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
    sendPqr(pqrData); //!
    console.log("Datos del Form: ", pqrData);
    Swal.fire({
      title: "¡Gracias! Hemos recibido tu solicitud con éxito. 🌟",
      icon: "success",
      confirmButtonText: "OK",
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
    });
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
            placeholder="name"
            className="py-2 pl-4 text-gray-400 border-2 rounded-xl focus:shadow-lg focus:outline-none w-full"
            name="Lulu Alvarado"
            value={pqrData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Correo Electrónico"
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
            <option value="peticion">Peticiónes</option>
            <option value="queja">Quejas</option>
            <option value="reclamo">Reclamos</option>
          </select>

          <textarea
            placeholder="Descripción"
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
