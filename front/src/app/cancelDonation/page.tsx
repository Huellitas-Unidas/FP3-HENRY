'use client'
import React from 'react'

const CancelDonation = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-customGreen-50 px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
          Donación cancelada
        </h1>
        <p className="text-base md:text-lg text-customGreen-900 mb-6 text-center">
          Parece que no completaste tu donación. Si fue un error, ¡puedes intentarlo nuevamente!
        </p>
        <button
          className="bg-customGreen-500 text-white py-2 px-6 rounded-lg hover:bg-customGreen-600 transition duration-300 shadow-md hover:shadow-lg"
          onClick={() => (window.location.href = "/donations")}
        >
          Volver a intentarlo
        </button>
      </div>
    );
  };
  
  export default CancelDonation;
  