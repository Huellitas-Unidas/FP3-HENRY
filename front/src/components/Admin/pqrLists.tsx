'use client'
import { getPqrs } from "@/app/api/adminAPIS/getPqrs";
import { IpqrProps } from "@/interfaces/types";
import React, { useEffect, useState } from "react";





const PqrList: React.FC = () => {
    const [pqrs, setPqrs] = useState<IpqrProps[]>([]);
  
    useEffect(() => {
      const fetchPqrs = async () => {
        try {
          const data = await getPqrs();
          setPqrs(data);
        } catch (error) {
          console.error("Error al cargar las PQR:", error);
        }
      };
  
      fetchPqrs();
    }, []);
  
    return (
      <div className="p-6 bg-pearl min-h-screen">
        <div className="flex flex-col place-items-center my-8 px-4">
          <table className="rounded-3xl text-lg border border-green500 shadow-2xl p-8 w-full sm:w-3/4 md:w-2/3 lg:w-1/3 xl:w-1/4">
            <thead className="rounded-t-xl rounded-b-xl bg-customGreen-100 text-lg border border-green500" >
              <tr>
                <th className="border border-customGreen-300 px-4 py-2 text-customGreen-900">Nombre</th>
                <th className="border border-customGreen-300 px-4 py-2 text-customGreen-900">Correo</th>
                <th className="border border-customGreen-300 px-4 py-2 text-customGreen-900">Tipo</th>
                <th className="border border-customGreen-300 px-4 py-2 text-customGreen-900">Descripción</th>
              </tr>
            </thead>
            <tbody>
              {pqrs.map((pqr, index) => (
                <tr key={index} className="bg-snowWhite">
                  <td className="border border-customGreen-300 px-4 py-2">{pqr.fullname}</td>
                  <td className="border border-customGreen-300 px-4 py-2">{pqr.email}</td>
                  <td className="border border-customGreen-300 px-4 py-2">{pqr.type}</td>
                  <td className="border border-customGreen-300 px-4 py-2">{pqr.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default PqrList;
