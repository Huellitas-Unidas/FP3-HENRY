"use client";
import GreenButton from "@/components/Buttons/GreenButton";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import emptyProfile from "../../../public/images/emptyProfile.png";
import Link from "next/link";
import { PiCameraFill } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
// import { RiEmotionSadLine } from "react-icons/ri";
// import { TiDeleteOutline } from "react-icons/ti";
import { IpetForm } from "@/interfaces/types";
// import { deletePet, getPetsByUser, updatePetStatus } from "../api/petAPI";
import { useSession } from "next-auth/react";
import { getPetsByUser } from "../api/petAPI";
// import { IUserBack } from "@/interfaces/types";

const Dashboard = () => {
  const [pets, setPets] = useState<IpetForm[] | null>([]);
  console.log(pets);

  const session = useSession();
  // const [userData, setUserData] = useState<IUserBack | null>(null);
  const profilePhoto = session.data?.user?.image || emptyProfile;

  // const handleUpdateStatus = async (value: number | null) => {
  //   if (value) {
  //     await updatePetStatus(value);
  //   } else {
  //     return;
  //   }
  // };

  // const handleDeletePet = async (value: number | null) => {
  //   if (value) {
  //     await deletePet(value);
  //   } else {
  //     return;
  //   }
  // };

  useEffect(() => {
    const fetch = async () => {
      try {
        const userPets = await getPetsByUser();
        // console.log(userPets);

        setPets(userPets);
        // console.log(pets);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();

    // const fetchUser = async () => {
    //   try {
    //     const user = await getUser();
    //     setUserData(user);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // fetchUser();
  }, []);

  return (
    <div className="flex flex-row my-6">
      <div className="flex flex-row gap-6 w-1/2 h-1/2 justify-start">
        <div className="w-1/4 h-1/4 p-4 relative border border-green500 rounded-lg">
          <Image
            src={profilePhoto}
            alt="profilePic"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
          <button
            className="absolute top-0 left-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            aria-label="changeProfilePic"
          >
            <PiCameraFill />
          </button>
        </div>

        <div className="flex flex-col h-full gap-3 mr-28">
          <p className="font-semibold">Nombre:</p>
          <p className="inline-flex gap-2">
            {session.data?.user ? session.data?.user.name : "Cargando..."}
          </p>
          <br />
          <p className="font-semibold">Email:</p>
          <p>{session.data?.user ? session.data?.user.email : "Cargando..."}</p>
          <br />
          <p className="font-semibold">Teléfono:</p>
          <p className="inline-flex gap-2">
            {"Cargando..."}
            <button className="text-lg">
              <CiEdit />
            </button>
          </p>
          <br />
          <p className="underline text-sm hover:no-underline">
            Modificar contraseña
          </p>
          <Link href={"/petregister"}>
            <GreenButton props="Añadir mascota" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col p-4 gap-4 w-1/2 border rounded-lg shadow-2xl">
        <p className="text-lg text-green500">Mis mascotas:</p>

        {/* {pets !== null ? (
          <div className="grid grid-cols-3 gap-4">
            {pets.map((animal) => {
              return (
                <div
                  key={animal.name}
                  className="w-48 h-auto p-4 border border-gray-200 rounded-lg shadow-md flex flex-col justify-between"
                >
                  <Image
                    src={animal.name}
                    alt="animalImg"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="flex-grow mt-2">
                    <p className="font-semibold">{animal.name}</p>
                    <p>Tipo: {animal.type}</p>
                    <p>{animal.genero}</p>
                    <p>{animal.description}</p>
                    <p>{animal.status}</p>
                  </div>
                  <button
                    onClick={() =>
                      handleUpdateStatus(animal.id ? Number(animal.id) : null)
                    }
                    className="mt-2 text-sm text-green500 hover:underline flex flex-row gap-1"
                  >
                    <RiEmotionSadLine className="text-lg" />
                    Marcar como perdida
                  </button>
                  <button
                    onClick={() =>
                      handleDeletePet(animal.id ? Number(animal.id) : null)
                    }
                    className="mt-2 text-sm text-green500 hover:underline flex flex-row gap-1"
                  >
                    <TiDeleteOutline className="text-lg" />
                    Eliminar mascota
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No has registrado ninguna mascota...</p> //!
        )} */}
      </div>
    </div>
  );
};

export default Dashboard;
