import Carousel from "@/components/Carousel/Carousel";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
import { BsChatLeftHeart } from "react-icons/bs";
import React from "react";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function Home() {
  return (
    <div>
      <SearchBar />
      <Carousel />
      <div className="max-w-6xl mx-auto font-[sans-serif]">
        <h2 className="text-gray-800 sm:text-4xl text-lg font-extrabold text-center my-10">
          Mirá lo que nos caracteriza
        </h2>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 max-md:max-w-lg mx-auto gap-12">
          <div className="p-4 flex gap-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300">
            <HiOutlineLocationMarker size={60} className="text-[#1e1612]" />

            <div>
              <h3 className="text-gray-800 text-xl font-semibold mb-3">
                Mapa Interactivo
              </h3>
              <p className="text-gray-600 text-sm">
                Ubica mascotas perdidas, encontradas y servicios en tu área con
                nuestro mapa interactivo.
              </p>
            </div>
          </div>

          <div className="p-4 flex gap-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300">
            <div className="flex space-x-2 mb-3">
              <HiOutlineMail size={30} className="text-[#1e1612]" />
            </div>
            <div>
              <h3 className="text-gray-800 text-xl font-semibold mb-3">
                Contacto
              </h3>
              <p className="text-gray-600 text-sm">
                Contáctanos pf3shhuellasunidas@hotmail.com
              </p>
            </div>
          </div>

          <div className="p-4 flex gap-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300">
            <BsChatLeftHeart size={70} />
            <div>
              <h3 className="text-gray-800 text-xl font-semibold mb-3">
                Comunicación
              </h3>
              <p className="text-gray-600 text-sm">
                Conéctate instantáneamente con dueños de mascotas y otros
                miembros de la comunidad a través del ChatBot.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
