import Carousel from "@/components/Carousel/Carousel";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
import { BsChatLeftHeart } from "react-icons/bs";
import React from "react";
//import SearchBar from "@/components/SearchBar/SearchBar";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/*<SearchBar />*/}
      <Carousel />
      <div className="max-w-6xl mx-auto font-[sans-serif]">
        <div className="flex flex-col text-gray-800 sm:text-4xl text-lg font-sans font-bold text-center my-10 gap-2">
          <h1>¡Bienvenid@ a Huellas Unidas!</h1>
          <h2>Mirá lo que nos caracteriza</h2>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 max-md:max-w-lg mx-auto mb-6 gap-12">
          <div className="p-4 flex gap-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300">
            <HiOutlineLocationMarker size={60} className="text-[#1e1612]" />

            <div>
              <Link href="/maps">
                <h3 className="text-gray-800 text-xl font-semibold mb-3">
                  Mapa Interactivo
                </h3>
                <p className="text-gray-600 text-sm">
                  Ubica mascotas perdidas, encontradas y servicios en tu área
                  con nuestro mapa interactivo.
                </p>
              </Link>
            </div>
          </div>


          <div className="p-4 flex gap-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300">
            <div className="flex space-x-2 mb-3">
              <HiOutlineMail size={30} className="text-[#1e1612] mt-4" />
            </div>
            <div>
              <Link href='/contact'>
                <h3 className="text-gray-800 text-xl font-semibold mb-3">
                  Contacto
                </h3>
                <p className="text-gray-600 text-sm">
                  Contáctanos pf3shhuellasunidas@hotmail.com
                </p>
              </Link>
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
                miembros de la comunidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
