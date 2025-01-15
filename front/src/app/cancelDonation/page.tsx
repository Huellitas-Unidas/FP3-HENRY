"use client";
import React from "react";
import Image from "next/image";

const CancelDonation = () => {
  return (
    <div className="flex flex-col items-center justify-start h-screen bg-customGreen-50 px-4 pt-20 ">
      <div
        className="relative w-40 h-40 overflow-hidden hover:animate-spinReverse animate-spinSlowReverse opacity-85"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
      >
        <Image
          src="/images/logoFondoVerde.png"
          alt="Animales rescatados"
          width={400} 
          height={600} 
          style={{ objectFit: "cover", width: "100%",  height: "100%",  objectPosition: "center",  }}
          className="shadow-md"
          priority 
        />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-red-400 mt-20 mb-4">
        Donación cancelada
      </h1>
      <p className="text-base md:text-lg text-customGreen-900 mt-10 mb-4 text-center">
        Parece que no completaste tu donación. Si fue un error, ¡puedes
        intentarlo nuevamente!
      </p>
      <button
        className="bg-customGreen-500 text-white py-2 px-6 mt-10 rounded-lg hover:bg-customGreen-600 transition duration-300 shadow-md hover:shadow-lg"
        onClick={() => (window.location.href = "/donations")}
      >
        Volver a intentarlo
      </button>
    </div>
  );
};

export default CancelDonation;
