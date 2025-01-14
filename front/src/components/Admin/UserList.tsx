'use client'
import React, { useEffect, useState } from "react";
import { getUsers } from "@/app/api/adminAPIS/getUsers"; // Asegúrate de tener estas funciones en `helpers`
import { IUserBack } from "@/interfaces/types";
import { deleteUser } from "@/app/api/adminAPIS/deleteUser";

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
  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id)); // Actualizar la lista local
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-customGreen-300">
        <thead className="bg-customGreen-100">
          <tr>
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
              <td className="border border-customGreen-300 px-4 py-2">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-300 hover:bg-gray-700 text-snowWhite px-2 py-1 rounded"
                >
                  Eliminar
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
