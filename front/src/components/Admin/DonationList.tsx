"use client";
//import { getDonations } from "@/app/api/adminAPIS/getDonations";
//import { IDonation } from "@/interfaces/types";
//import React, { useEffect, useState } from "react";
import Image from "next/image";

const DonationList: React.FC = () => {
  /*  const [donations, setDonations] = useState<IDonation[]>([]);

  // Cargar la lista de donaciones desde el backend
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const data = await getDonations();
        setDonations(data);
      } catch (error) {
        console.error("Error al obtener donaciones:", error);
      }
    };
    fetchDonations();
  }, []);
*/
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-customGreen-300">
        <thead className="bg-customGreen-100">
          <tr>
            <th className="border border-customGreen-300 px-4 py-2 text-customGreen-900">
              Correo Electrónico
            </th>
            <th className="border border-customGreen-300 px-4 py-2 text-customGreen-900">
              Monto
            </th>
            <th className="border border-customGreen-300 px-4 py-2 text-customGreen-900">
              Moneda
            </th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <div className="h-96 w-96 overflow-hidden flex justify-center items-center mx-auto mt-10">
        <Image
          src="/images/DonationList.jpg"
          alt="Donaciones"
          className="h-full w-full object-cover rounded-lg object-center"
          width={800}
          height={800}
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
          priority
        />
      </div>

      {/*
          {donations.map((donation, index) => (
            <tr key={index} className="bg-snowWhite">
              <td className="border border-customGreen-300 px-4 py-2">{donation.email}</td>
              <td className="border border-customGreen-300 px-4 py-2">${donation.amount.toFixed(2)}</td>
              <td className="border border-customGreen-300 px-4 py-2">{donation.currency.toUpperCase()}</td>
            </tr>
          ))}*/}
    </div>
  );
};

export default DonationList;
