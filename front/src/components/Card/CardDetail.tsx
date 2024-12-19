import { IPost } from '@/interfaces/types';
import React from 'react'
import ButtonCard from '../Buttons/ButtonCard';

const CardDetail: React.FC<IPost> = ({
  id,
  userId,
  status,
  title,
  photoUrl,
  description,
  petType,
  location,
  dateLost,
  contactInfo
}) => {

  const animalPost = { status };

  return (
    <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full py-8 max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto my-10">
      <div className="flex items-center gap-2 px-6">
        <h1 className="text-xl text-gray-800 font-bold flex-1">{userId}</h1>
        <ButtonCard animalPost={animalPost} />
      </div>
      <div className="flex items-center gap-2 px-6 py-6">
        <h3 className="text-xl text-gray-800 font-bold flex-1">Nombre de la mascota: {title}</h3>
        </div>
      <div className="min-h-[300px] py-2">
        <img src={photoUrl} alt="perro" className="w-full my-4" />
      </div>

      <div className="px-6">
        <p className="text-base text-gray-700 leading-relaxed">Descripción: {description}</p>
      </div>
      <div className="px-6">
        <p className="text-base text-gray-700 leading-relaxed"> Tipo: {petType}</p>
      </div>
      <div className="px-6">
        <p className="text-base text-gray-700 leading-relaxed"> Fecha: {dateLost ? dateLost.toLocaleDateString() : "Fecha no disponible"}</p>
      </div>
      <div className="px-6">
        <p className="text-base text-gray-700 leading-relaxed"> Ubicación: {location}</p>
      </div>
      <div className="px-6">
        <p className="text-base text-gray-700 leading-relaxed"> Contacto: {contactInfo}</p>
      </div>
    </div>
  );
}

export default CardDetail