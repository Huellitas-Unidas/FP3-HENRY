'use client'
import React from 'react'

const Thanks = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-customGreen-50 px-8">
      <h1 className="text-2xl md:text-3xl font-bold text-customGreen-600 mb-12">
        ¡Gracias por tu donación! 🐾
      </h1>
      <p className="text-base md:text-lg text-customGreen-900 mb-10 text-center">
        Tu generosidad nos ayuda a reunir mascotas perdidas con sus dueños y a
        apoyar a más animales.
      </p>
      <button
        className="w-full md:w-auto bg-customGreen-500 text-white py-2 px-6 rounded-lg hover:bg-customGreen-600 transition duration-300 shadow-md hover:shadow-lg"
        onClick={() => (window.location.href = "/")}
      >
        Volver al inicio
      </button>
    </div>
  );
};


export default Thanks; 