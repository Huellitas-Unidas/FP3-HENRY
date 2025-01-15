import React from "react";
import UserList from "@/components/Admin/UserList";
import BackToAdmin from "@/components/Admin/BackToAdmin";

const AdminUsers: React.FC = () => {
  return (
    <div className="p-4 bg-pearl min-h-screen">
        <BackToAdmin />
      <h1 className="text-2xl text-center mt-10 font-bold text-customGreen-900 mb-4">Gestión de Usuarios</h1>
      <p className="text-customGreen-700">Aquí puedes gestionar los usuarios registrados.</p>
      <UserList />
    </div>
  );
};

export default AdminUsers;

