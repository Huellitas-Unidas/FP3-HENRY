import DonationList from "@/components/Admin/DonationList";
import React from "react";
import BackToAdmin from "@/components/Admin/BackToAdmin";

const AdminDonations: React.FC = () => {
  return (
    <div className="p-4 bg-pearl min-h-screen">
        <BackToAdmin />
      <h1 className="text-2xl font-bold text-customGreen-900 mb-4">Gestión de Donaciones</h1>
      <p className="text-customGreen-700 mb-6">Aquí puedes ver y administrar las donaciones realizadas.</p>
      <DonationList />
    </div>
  );
};

export default AdminDonations;

