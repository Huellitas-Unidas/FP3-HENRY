"use client";
import GreenButton from "@/components/Buttons/GreenButton";
import Image from "next/image";
import React from "react";
import profile from "../../../public/images/profile.jpg";
import { PiCameraFill } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import petsArray from "@/helpers/petsArray";

const Dashboard = () => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-row mt-16 ml-0 gap-4 w-1/2 justify-between">
        <div className="w-1/2 p-4 relative border border-green500 rounded-lg">
          <Image
            src={profile}
            alt="profilePic"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          ></Image>
          <button
            className="absolute top-0 left-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            aria-label="changeProfilePic"
          >
            <PiCameraFill />
          </button>
        </div>

        <div className="flex flex-col gap-3 mr-28">
          <p className="font-semibold">Nombre:</p>
          <p className="inline-flex gap-2">
            Pepito Rodriguez
            <button className="text-lg">
              <CiEdit />
            </button>
          </p>
          <br />
          <p className="font-semibold">Email:</p>
          <p>pepito_rodriguez@mail.com</p>
          <br />
          <p className="font-semibold">Teléfono:</p>
          <p className="inline-flex gap-2">
            11 2424 0606
            <button className="text-lg">
              <CiEdit />
            </button>
          </p>
          <br />
          <p className="underline text-sm">Modificar contraseña</p>
          <Link href={"/petregister"}>
            <GreenButton props="Añadir mascota" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col mt-16 p-4 gap-4 w-1/2 border rounded-lg shadow-2xl">
        <p className="text-lg italic">Mis mascotas:</p>

        <div className="grid grid-cols-3">
          {petsArray &&
            petsArray.map((animal) => {
              return (
                <div key={animal.id} className="w-40 h-40">
                  <img
                    src={animal.image}
                    alt="animalImg"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover rounded-lg"
                    key={animal.id}
                  ></img>
                  <div className="my-2">
                    <p className="font-semibold">{animal.name}</p>
                    <p>Tipo: {animal.type}</p>
                    <p>{animal.genre}</p>
                    <p>{animal.description}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
