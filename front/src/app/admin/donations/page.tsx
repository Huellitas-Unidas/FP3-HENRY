import DonationList from "@/components/Admin/DonationList";
import React from "react";
import BackToAdmin from "@/components/Admin/BackToAdmin";

const AdminDonations: React.FC = () => {
  return (
    <div className="p-4 bg-pearl min-h-screen">
        <BackToAdmin />
      <h1 className="text-2xl font-bold text-customGreen-900 mb-4">Gestión de Donaciones</h1>
      
      <DonationList />
    </div>
  );
};

export default AdminDonations;

