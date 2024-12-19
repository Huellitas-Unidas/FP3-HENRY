import React from 'react';
import { IPost } from '@/interfaces/types';

interface CardProps extends IPost {
  onDelete: () => void;
  onUpdate: (updatedData: Partial<IPost>) => void;
}

const Card: React.FC<CardProps> = ({ title, type, image, content, onDelete, onUpdate }) => {
  const handleUpdateClick = () => {
    const newTitle = prompt('Nuevo título:', title); // promt para actualizar el title
    if (newTitle) {
      onUpdate({ title: newTitle });
    }
  };

  return (
    <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full py-2 max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-2">
      <div className="flex items-center gap-2 px-6">
        <h3 className="text-xl text-gray-800 font-bold flex-1">{title}</h3>
        <button
          type="button"
          className="px-4 py-2 rounded-lg text-gray-800 text-sm tracking-wider bg-red-500 hover:bg-red-300 outline-none"
        >
          {type}
        </button>
      </div>
      <div className="min-h-[300px] py-2">
        {image && <img src={image} 
        alt="Post"
        className="w-full my-4" />}
      </div>
      <div className="px-6">
        <p className="text-sm text-gray-700 leading-relaxed">{content}</p>
        <div className="my-5 flex justify-between py-3">
          <button
            onClick={handleUpdateClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Actualizar
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;




{/*
  import { ICardAnimal } from "@/interfaces/types";
import React from "react";

const Card : React.FC <ICardAnimal> = ({name, type, image, description}) => {
  return (
    <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full py-2 max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-2">
      <div className="flex items-center gap-2 px-6">
        <h3 className="text-xl text-gray-800 font-bold flex-1">{name}</h3>

        <button
          type="button"
          className="px-4 py-2 rounded-lg text-gray-800 text-sm tracking-wider bg-red-500 hover:bg-red-300 outline-none"
        >
          {type}
        </button>
      </div>

      <div className="min-h-[300px] py-2">
        <img src={image} alt="perro" className="w-full my-4"/>
      </div>

      <div className="px-6">
        <p className="text-sm text-gray-700 leading-relaxed">{description}</p>

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

export default Card;
  
  
  
  
  
  
  */}