/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { getUsers } from "@/app/api/adminAPIS/getUsers"; // Asegúrate de tener estas funciones en `helpers`
import { IUserBack } from "@/interfaces/types";
import { deleteUser } from "@/app/api/adminAPIS/deleteUser";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import Cookies from "js-cookie";


const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUserBack[]>([]);

  // Cargar la lista de usuarios desde el backend
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

  // Manejar la eliminación de un usuario
  const handleDeleteUser = async (userId: string) => {
    try {
      const token = Cookies.get("token"); // Obtener el token
      if (!token) {
        throw new Error("Token no encontrado");
      }

      await deleteUser(userId, token); // Pasa el token como segundo argumento
      Swal.fire("Éxito", "Usuario eliminado correctamente", "success");
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar el usuario", "error");
      console.error(error);
    }
  };
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-customGreen-300">
        <thead className="bg-customGreen-100">
          <tr>
            <th className="border border-customGreen-300 px-4 py-2 text-customGreen-900">
              Nombre
            </th>
            <th className="border border-customGreen-300 px-4 py-2 text-customGreen-900">
              Email
            </th>
            <th className="border border-customGreen-300 px-4 py-2 text-customGreen-900">
              Teléfono
            </th>
            <th className="border border-customGreen-300 px-4 py-2 text-customGreen-900">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="bg-snowWhite">
              <td className="border border-customGreen-300 px-4 py-2">
                {user.name}
              </td>
              <td className="border border-customGreen-300 px-4 py-2">
                {user.email}
              </td>
              <td className="border border-customGreen-300 px-4 py-2">
                {user.phone || "N/A"}
              </td>
              <td className="border border-customGreen-300 px-4 py-2">
                <button
                  onClick={() => handleDeleteUser(user.id)}
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
