"use client";

import React from "react";
import {IPost} from "@/interfaces/types";
import Link from "next/link";

const Card: React.FC<IPost> = ({
  title,
  photoUrl,
  description,
  petType,
  dateLost,
  location,
  status,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-xs w-full">
      <div className="relative">
        <img
          src={photoUrl}
          alt={title}
          className="w-full h-48 object-cover rounded-md"
        />

        <div
          className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold uppercase rounded ${
            status === "encontrado"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {status === "encontrado" ? "Encontrado" : "Perdido"}
        </div>
      </div>

            <div className="mt-4">
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-600 mt-2">{description}</p>
            </div>
            <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">{petType}</div>
            <div className="mt-4">
                <p className="text-xs text-gray-500">Fecha: {new Date(dateLost).toLocaleDateString()}</p>
              <div>
                <Link href="/maps">
                <span className="text-xs text-gray-500">
                  Ubicación: {location?.address || "No especificada"}</span>
                </Link>
              </div>
            </div>
            
        </div>
    );
};

export default Card;

{
  /*
  
  import { IPostAnimal } from "@/interfaces/types";
import React from "react";
import ButtonCard from "../Buttons/ButtonCard";

const Card : React.FC <IPostAnimal> = ({title, status, photoUrl, description}) => {

  const animalPost = { status }; // Construimos el objeto 

  return (
    <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full py-2 max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-2">
      <div className="flex items-center gap-2 px-6">
        <h3 className="text-xl text-gray-800 font-bold flex-1">{title}</h3>

        <ButtonCard animalPost={animalPost}/>
      </div>

      <div className="min-h-[300px] py-2">
        <img src={photoUrl} alt="perro" className="w-full my-4"/>
      </div>

      <div className="px-6">
        <p className="text-base text-gray-700 leading-relaxed">{description}</p>

        <div className="my-5 flex justify-end py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18px"
            className="cursor-pointer fill-rose-600 shrink-0"
            viewBox="0 0 64 64"
          >
            <path
              d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
              data-original="#000000"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Card; */
}
