"use client";
import GreenButton from "@/components/Buttons/GreenButton";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import emptyProfile from "../../../public/images/emptyProfile.png";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { RiEmotionSadLine } from "react-icons/ri";
import { IpetForm } from "@/interfaces/types";
import { getPetsByUser } from "../api/petAPI";
import { useSession } from "next-auth/react";
import { getUserId } from "@/helpers/userId";
import { IUserBack } from "@/interfaces/types";
import { getUserById } from "../api/userAPI";
import ModalDashboardPic from "@/components/ModalPage/ModalDashboardPic";
import ModalDashboardForm from "@/components/ModalPage/ModalDashboardForm";

const Dashboard = () => {
  const userId = getUserId();
  const session = useSession();
  const [pets, setPets] = useState<IpetForm[]>([]);
  const [userData, setUserData] = useState<IUserBack | null>(null);
  const profilePhoto =
    session.data?.user?.image || userData?.profilePicture || emptyProfile;
  const [refresh, setRefresh] = useState(false);

  const [activeModal, setActiveModal] = useState<
    "profilePicModal" | "petFormModal" | null
  >(null);
  const [selectedPet, setSelectedPet] = useState<IpetForm | null>(null); // Para almacenar la mascota seleccionada

  const openModal = (
    modal: "profilePicModal" | "petFormModal",
    pet?: IpetForm
  ) => {
    setActiveModal(modal);
    if (pet) setSelectedPet(pet); // Establecer la mascota seleccionada, si aplica
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedPet(null);
  };

  // const handleUpdateStatus = async (value: string | null) => {
  //   if (value) {
  //     await updatePetStatus(value);
  //     setRefresh((prev) => !prev); // Cambiar el estado para forzar el refetch
  //     router.push("/lostandfound");
  //   } else {
  //     return;
  //   }
  // };

  // const handleDeletePet = async (value: string | null) => {
  //   if (value) {
  //     await deletePet(value);
  //     setRefresh((prev) => !prev);
  //   } else {
  //     return;
  //   }
  // };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        if (userId) {
          const userPets = await getPetsByUser(userId);
          setPets(userPets);
          setRefresh((prev) => !prev);
        } else {
          console.error("No se encontraron las mascotas");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPets();
  }, [userId, refresh]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (userId) {
          const user = await getUserById(userId);
          setUserData(user);
        } else {
          console.error("No se encontró el usuario");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [userId, refresh]);

  return (
    <div className="font-sans text-lg flex flex-col md:flex-row my-6">
      <div className="flex flex-row gap-6 w-full md:w-1/2 h-1/2 justify-start">
        <div className="w-1/4 h-1/4 p-4 relative border border-green500 rounded-lg">
          <Image
            src={profilePhoto}
            alt={`foto de ${userData?.name} ${userData?.id}`}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
          {session?.data?.user?.image ? null : (
            <button
              onClick={() => openModal("profilePicModal")}
              className="absolute top-0 left-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              aria-label="changeProfilePic"
            >
              <CiEdit />
            </button>
          )}
        </div>

        <div className="flex flex-col h-full gap-3 mr-28">
          <p className="font-semibold">Nombre:</p>
          <p className="inline-flex gap-2">
            {session.data?.user ? session.data?.user.name : userData?.name}
          </p>
          <br />
          <p className="font-semibold">Email:</p>
          <p>
            {session.data?.user ? session.data?.user.email : userData?.email}
          </p>
          <br />
          <p className="font-semibold">Teléfono:</p>
          <p className="inline-flex gap-2">
            {userData?.phone}
            {/* <button className="text-lg">
              <CiEdit />
            </button> */}
          </p>
          <br />
          {/* <p className="underline text-sm hover:no-underline">
            Modificar contraseña
          </p> */}
          <Link href={"/petregister"}>
            <GreenButton props="Añadir mascota" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col p-4 gap-4 w-full md:w-1/2 mt-4 md:mt-0 border rounded-lg shadow-2xl">
        <p className="text-green500 font-semibold">Mis mascotas:</p>

        {pets?.length !== 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4">
            {pets.map((animal) => {
              return (
                <div
                  key={animal.id}
                  className="w-48 h-auto p-4 border border-gray-200 rounded-lg shadow-md flex flex-col justify-between"
                >
                  <Image
                    src={animal.imgUrl}
                    alt={`foto de ${animal.name} ${animal.id}`}
                    className="w-full h-32 object-cover rounded-lg"
                    width={500}
                    height={500}
                  />
                  <div className="flex-grow mt-2">
                    <p className="font-semibold">{animal.name}</p>
                    <p>Tipo: {animal.type}</p>
                    <p>{animal.genero}</p>
                    <p>{animal.description}</p>
                  </div>

                  {animal.status === "none" ? (
                    <button
                      onClick={() => openModal("petFormModal", animal)}
                      className="mt-2 text-sm text-green500 hover:underline flex flex-row gap-1"
                    >
                      <RiEmotionSadLine className="text-lg" />
                      Marcar como perdida
                    </button>
                  ) : (
                    <p className="mt-2 text-sm text-green500 hover:underline flex flex-row gap-1">
                      <RiEmotionSadLine className="text-lg" />
                      Perdida
                    </p>
                  )}
                  {/* 
                  <button
                    onClick={() => handleDeletePet(animal.id)}
                    className="mt-2 text-sm text-green500 hover:underline flex flex-row gap-1"
                  >
                    <TiDeleteOutline className="text-lg" />
                    Eliminar mascota
                  </button> */}
                </div>
              );
            })}
          </div>
        ) : (
          <p>Aún no has registrado ninguna mascota</p>
        )}
      </div>

      {/* Modales */}
      {activeModal === "profilePicModal" && (
        <ModalDashboardPic isOpen={activeModal} onClose={closeModal} />
      )}

      {activeModal === "petFormModal" && selectedPet && userData && (
        <ModalDashboardForm
          animal={selectedPet}
          userData={userData}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Dashboard;
