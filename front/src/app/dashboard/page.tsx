"use client";
import GreenButton from "@/components/Buttons/GreenButton";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import emptyProfile from "../../../public/images/emptyProfile.png";
import Link from "next/link";
// import { PiCameraFill } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { RiEmotionSadLine } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";
import { IpetForm } from "@/interfaces/types";
import { deletePet, getPetsByUser, updatePetStatus } from "../api/petAPI";
import { useSession } from "next-auth/react";
import { getUserId } from "@/helpers/userId";
import { IUserBack } from "@/interfaces/types";
import { useRouter } from "next/navigation";
import { getUserById } from "../api/userAPI";
import Swal from "sweetalert2";
import { deletePic, patchPic } from "../api/profilePicAPI";

const Dashboard = () => {
  const userId = getUserId();
  const session = useSession();
  const [pets, setPets] = useState<IpetForm[]>([]);
  const [userData, setUserData] = useState<IUserBack | null>(null);
  const profilePhoto =
    session.data?.user?.image || userData?.profilePicture || emptyProfile;
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDeleted, setisDeleted] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleUpdateStatus = async (value: string | null) => {
    if (value) {
      await updatePetStatus(value);
      setRefresh((prev) => !prev); // Cambiar el estado para forzar el refetch
      router.push("/lostandfound");
    } else {
      return;
    }
  };

  const handleDeletePet = async (value: string | null) => {
    if (value) {
      await deletePet(value);
      setRefresh((prev) => !prev); // Cambiar el estado para forzar el refetch
    } else {
      return;
    }
  };

  const handleDeletePic = async () => {
    if (userId)
      try {
        await deletePic(userId); // Llama a la función para subir la imagen
        closeModal(); // Cierra el modal después de una subida exitosa
        setRefresh((prev) => !prev); // Cambiar el estado para forzar el refetch
        setisDeleted(false);
      } catch (error) {
        console.error("Error al eliminar la foto de perfil:", error);
        // No es necesario mostrar una alerta aquí, ya que `patchPic` ya maneja los errores con Swal
      }
  };

  const handlePicButton = async () => {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No se seleccionó ningún archivo",
        text: "Por favor selecciona una imagen antes de subirla.",
        customClass: {
          confirmButton:
            "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
        },
      });
      setIsSubmitted(false);
      return;
    }
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    try {
      await patchPic(formData); // Llama a la función para subir la imagen
      closeModal(); // Cierra el modal después de una subida exitosa
      setRefresh((prev) => !prev); // Cambiar el estado para forzar el refetch
      setIsSubmitted(false);
    } catch (error) {
      console.error("Error al subir la foto de perfil:", error);
      // No es necesario mostrar una alerta aquí, ya que `patchPic` ya maneja los errores con Swal
    }
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        if (userId) {
          const userPets = await getPetsByUser(userId);
          setPets(userPets);
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
    <div className="font-sans text-lg flex flex-row my-6">
      <div className="flex flex-row gap-6 w-1/2 h-1/2 justify-start">
        <div className="w-1/4 h-1/4 p-4 relative border border-green500 rounded-lg">
          <Image
            src={profilePhoto}
            alt={`foto de ${userData?.name} ${userData?.id}`}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
          <button
            onClick={openModal}
            className="absolute top-0 left-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            aria-label="changeProfilePic"
          >
            <CiEdit />
          </button>
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
        <p className="text-green500">Mis mascotas:</p>

        {pets?.length !== 0 ? (
          <div className="grid grid-cols-3 gap-4">
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
                      onClick={() => handleUpdateStatus(animal.id)}
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

                  <button
                    onClick={() => handleDeletePet(animal.id)}
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
          <p>Aún no has registrado ninguna mascota</p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Subir nueva foto</h2>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-lg text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-green-500"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => {
                  handleDeletePic();
                  setisDeleted(true);
                }}
                className="px-2 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                {isDeleted === false ? "🗑️ Foto actual" : "🗑️ Eliminando..."}
              </button>
              <button
                onClick={closeModal}
                className="px-2 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  handlePicButton();
                  setIsSubmitted(true);
                }}
                type="submit"
                className="bg-green500 text-white p-2 rounded-lg hover:bg-white hover:text-green500 transition-all duration-300"
              >
                {isSubmitted === false ? "Subir" : "Subiendo..."}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
