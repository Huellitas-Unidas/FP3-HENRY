/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from "react";
import { getUsers } from "@/app/api/adminAPIS/getUsers";
import { IUserBack } from "@/interfaces/types";
import { deleteUser } from "@/app/api/adminAPIS/deleteUser";
import { FaTrash } from "react-icons/fa"; 
import Swal from "sweetalert2";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUserBack[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };
    fetchUsers();
  }, []);

  
 

const handleDelete = async (id: string) => {
  try {
    const token = localStorage.getItem("token"); 
    if (!token) {
      throw new Error("No hay token disponible. Por favor, inicia sesión.");
    }

    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará al usuario de forma permanente.",
      icon: "warning",
      iconColor: "red",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
        cancelButton:
          "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded",
      },
      buttonsStyling: false, 
    });

    if (confirm.isConfirmed) {
      await deleteUser(id, token); 
      setUsers(users.filter((user) => user.id !== id)); 

      await Swal.fire({
        title: "Usuario eliminado",
        text: "El usuario fue eliminado exitosamente.",
        icon: "success",
        iconColor: "green",
        confirmButtonText: "Aceptar",
        customClass: {
          confirmButton:
            "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
        },
      });
    }
  } catch (error: any) {
    console.error("Error al eliminar usuario:", error.message);

    await Swal.fire({
      title: "Error",
      text: `No se pudo eliminar el usuario: ${error.message}`,
      icon: "error",
      iconColor: "red",
      confirmButtonText: "Aceptar",
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
    });
  }
};


  return (
    <div className="flex flex-col place-items-center my-8 px-4">
        <table className="rounded-3xl text-lg border border-green500 shadow-2xl p-8 w-full sm:w-3/4 md:w-2/3 lg:w-1/3 xl:w-1/4">
          <thead className="rounded-t-xl rounded-b-xl bg-customGreen-100 text-lg border border-green500 ">
            <tr >
              <th className="border border-customGreen-300 px-4 py-2 text-customGreen-900">Nombre</th>
              <th className="border border-customGreen-300 px-4 py-2 text-customGreen-900">Email</th>
              <th className="border border-customGreen-300 px-4 py-2 text-customGreen-900">Teléfono</th>
              <th className="border border-customGreen-300 px-4 py-2 text-customGreen-900">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="bg-snowWhite">
                <td className="border border-customGreen-300 px-4 py-2">{user.name}</td>
                <td className="border border-customGreen-300 px-4 py-2">{user.email}</td>
                <td className="border border-customGreen-300 px-4 py-2">{user.phone || "N/A"}</td>
                <td className="border border-customGreen-300 px-4 py-2 flex justify-center">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-300 hover:bg-red-500 text-white px-3 py-2 rounded-full shadow-md transition-all duration-300"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
  );
};

export default UserList;

