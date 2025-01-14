'use client'
import React from 'react';
import Image from 'next/image';


const Thanks = () => {
  return (
    <div className="flex flex-col items-center justify-start h-screen bg-customGreen-50 px-8 pt-20">
    
      <div className="relative w-32 h-32 mb-6 hover:animate-spin">
        <Image
          src="/images/donationsImage.png"
          alt="Animales felices"
          layout="fill"
          objectFit="cover"
          className="rounded-full shadow-md animate-spinSlow"
        />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-customGreen-600 mb-6 mt-10 text-center">
        ¡Gracias por tu donación! 🐾
      </h1>
      <p className="text-base md:text-lg text-customGreen-900 mb-8 mt-6 text-center">
        Tu generosidad nos ayuda a reunir mascotas perdidas con sus dueños y a
        apoyar a más animales.
      </p>
      <button
        className="w-full md:w-auto bg-customGreen-500 text-white mt-6 py-2 px-6 rounded-lg hover:bg-customGreen-600 transition duration-300 shadow-md hover:shadow-lg"
        onClick={() => (window.location.href = "/")}
      >
        Volver al inicio
      </button>
    </div>
  );
};

export default Thanks;
 