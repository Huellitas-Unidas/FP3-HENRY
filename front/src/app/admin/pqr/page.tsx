import React from "react";
import PqrList from "@/components/Admin/pqrLists";
import BackToAdmin from "@/components/Admin/BackToAdmin";

const AdminPqr: React.FC = () => {
  return (
    <div className="p-4 bg-pearl min-h-screen">
        <BackToAdmin />
      <h1 className="text-2xl font-bold text-customGreen-900 mb-4">Gestión de PQR</h1>
      <PqrList />
    </div>
  );
};

export default AdminPqr;
