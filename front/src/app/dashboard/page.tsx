import GreenButton from "@/components/Buttons/GreenButton";
import Image from "next/image";
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex flex-row justify-center mt-20 gap-10">
      <Image
        src="/front\public\imagenes\profile.jpg/"
        width={50}
        height={50}
        alt="profilePic"
      ></Image>
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
