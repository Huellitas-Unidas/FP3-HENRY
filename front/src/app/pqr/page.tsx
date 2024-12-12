"use client";
import { Toast } from "@/helpers";
import React, {useState} from "react";
import Swal from "sweetalert2";

const Pqr = () => {
    const [pqrData, setPqrData] = useState({
        nombre: "Lulu Alvarado",
        email: "lulu.alvarado@mail.com",
        tipo: "queja",
        descripcion: "En este espacio puedes escribir y detallar tú solicitud",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!pqrData.nombre || !pqrData.email || !pqrData.tipo || !pqrData.descripcion) {
            Toast.fire({
                title: "Todos los campos son obligatorios",
                icon: "error",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
                },
            });
            return;
        }
        console.log("Datos del Form: ", pqrData);
        Swal.fire({
            title: "¡Gracias! Hemos recibido tu solicitud con éxito. 🌟",
            icon: "success",
            confirmButtonText: "OK",
            customClass: {
                confirmButton: "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
            },
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setPqrData((prevPqrData) => ({
            ...prevPqrData,
            [name]: value,
        }));
    };

    return (
        <section className="bg-white p-8 text-teal-700 flex justify-center min-h-screen items-center">
            <div className="w-full max-w-screen-md border-2 border-gray-300 p-10 mb-8 rounded-lg shadow-lg">
                <h1 className="text-2xl text-center font-bold mb-8">Ayúdanos a Mejorar: Sugerencias y Opiniones</h1>
                <p className="mb-6">
                    Por favor, completa este formulario para que podamos procesar tu solicitud. ¡Gracias! 😊{" "}
                </p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        className="border rounded w-full p-2"
                        name="Lulu Alvarado"
                        value={pqrData.nombre}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        placeholder="Correo Electrónico"
                        className="border rounded w-full p-2"
                        name="email"
                        value={pqrData.email}
                        onChange={handleChange}
                    />
                    <select
                        className="border rounded w-full p-2"
                        name="tipo"
                        value={pqrData.tipo}
                        onChange={handleChange}
                    >
                        <option value="peticion">Peticiónes</option>
                        <option value="queja">Quejas</option>
                        <option value="reclamo">Reclamos</option>
                    </select>

                    <textarea
                        placeholder="Descripción"
                        className="border rounded w-full p-2"
                        rows={4}
                        name="descripcion"
                        value={pqrData.descripcion}
                        onChange={handleChange}
                    ></textarea>

                    <button type="submit" className="bg-teal-500 text-white rounded px-4 py-2 hover:bg-teal-600">
                        Enviar mi Solicitud !
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Pqr;
