import GreenButton from "@/components/Buttons/GreenButton";
import Image from "next/image";
import React from "react";
import profile from "../../../public/images/profile.jpg";
import { PiCameraFill } from "react-icons/pi";

const Dashboard = () => {
  return (
    <div className="flex flex-row justify-center mt-16 gap-8">
      <div className="w-1/4 p-4 border-2 border-green500 rounded-lg relative">
        <Image
          src={profile}
          alt="profilePic"
          width={500}
          height={500}
          className="w-full h-full object-cover rounded-lg"
        ></Image>
        <button
          className="absolute top-0 left-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          aria-label="changeProfilePic"
        >
          <PiCameraFill />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-semibold">Nombre:</p>
        <p>Pepito Rodriguez</p>
        <br />
        <p className="font-semibold">Email:</p>
        <p>pepito_rodriguez@mail.com</p>
        <br />
        <p className="font-semibold">Teléfono:</p>
        <p>11 2424 0606</p>
        <br />
        <GreenButton props="Editar Perfil" />
      </div>
    </div>
  );
};

export default Dashboard;
