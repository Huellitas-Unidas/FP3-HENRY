/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { createCheckoutSession } from "@/app/api/donationsAPI";
import { IUserSession } from "@/interfaces/types";
import DonationsCarousel from "./DonationsCarousel";

const SUCCESS_URL = "API_URL/stripe/success";
const CANCEL_URL = "API_URL/stripe/cancel";

const Donations = ({ userSession }: { userSession?: IUserSession | null }) => {
  const [amount, setAmount] = useState<number>(25); 
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [amountError, setAmountError] = useState<string | null>(null);

  // Precio unitario para calcular "quantity" basado en "amount" (100 centavos = $1)
  const UNIT_PRICE = 500; // Precio por unidad ($5.00)

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setAmount(value);

    if (value < 1) {
      setAmountError("El monto debe ser al menos $1.");
    } else {
      setAmountError(null); // Limpia el error si el valor es válido
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Por favor, ingresa un correo electrónico válido.");
    } else {
      setEmailError(null); // Limpia el error si el correo es válido
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (amount < 1) {
      Swal.fire({
        icon: "error",
        title: "Monto inválido",
        text: "El monto debe ser al menos $1.",
        customClass: {
          confirmButton:
            "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
        },
      });
      return;
    }

    if (!userSession && (!email || emailError)) {
      Swal.fire({
        icon: "error",
        title: "Correo requerido",
        text: "Por favor, ingresa un correo electrónico válido para continuar.",
        customClass: {
          confirmButton:
            "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
        },
      });
      return;
    }

   
    const quantity = Math.ceil((amount * 100) / UNIT_PRICE);

    try {
      const emailToSend = userSession?.email || email;
      const checkoutUrl = await createCheckoutSession({
        amount,
        email: emailToSend,
        quantity, 
        // success_url: SUCCESS_URL,
      // cancel_url: CANCEL_URL,
      });

      if (checkoutUrl) {
        Swal.fire({
          icon: "success",
          iconColor: "green",
          title: "¡Gracias por tu donación!",
          text: "Serás redirigido a Stripe para completar el pago.",
          customClass: {
            confirmButton:
              "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
          },
        }).then(() => {
          window.location.href = checkoutUrl;  // este redireccionmiento es automat.
        });
      }
    } catch (error) {
      console.error("Error al procesar la donación:", error);
      Swal.fire({
        icon: "error",
        title: "Error en el proceso de pago",
        text: "Por favor, inténtalo de nuevo más tarde.",
        customClass: {
          confirmButton:
            "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
        },
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] flex items-center justify-center p-4 ">
    <div className="bg-white my-10 rounded-xl border border-green500 shadow-2xl w-[90%] sm:w-[70%] lg:w-[60%] max-w-4xl mx-auto h-auto overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
     
      <div className="relative h-[250px] w-full flex items-center justify-center p-4 ">
        <DonationsCarousel />
      </div>
  

      <div className="p-4 lg:p-6 flex flex-col justify-center">
        <h2 className="text-xl lg:text-2xl font-bold text-customGreen-950 text-center mb-4 font-sans mt-2">
          Haz tu Donación
        </h2>
        <p className="text-customGreen-900 text-sm lg:text-base text-center mb-4">
          Tu apoyo nos ayuda con nuestra misión de reunir mascotas perdidas con sus dueños.
        </p>
  
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="amount"
              className="block text-customGreen-900 font-medium text-sm lg:text-base mb-1"
            >
              Monto a donar (USD):
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none text-gray-800 text-sm lg:text-base ${
                amountError
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-customGreen-400"
              }`}
             />
            {amountError && (
              <p className="text-red-500 text-xs mt-1">{amountError}</p>
            )}
          </div>
  
          {!userSession && (
            <div>
              <label
                htmlFor="email"
                className="block text-customGreen-900 font-medium text-sm lg:text-base mb-1"
              >
                Correo electrónico:
              </label>
              <input
                id="email"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none text-gray-800 text-sm lg:text-base ${
                  emailError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-customGreen-400"
                }`}
                value={email}
                onChange={handleEmailChange}
                placeholder="Ingresa tu correo"
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>
          )}
  
          <button
            type="submit"
            className="w-full bg-customGreen-500 text-white py-2 px-4 rounded-lg text-sm lg:text-base font-semibold hover:bg-customGreen-600 transition duration-300 shadow-md hover:shadow-lg"
          >
            Donar ${amount}
          </button>
        </form>
  
        <p className="text-sm lg:text-xs text-customGreen-800 mt-4 text-center">
          Gracias por contribuir, con tu ayuda, podemos mejorar más nuestro servicio. <span className="text-lg lg:text-xl">🐾</span>
        </p>
      </div>
    </div>
  </div>
  
  
    
  );
};

export default Donations;








