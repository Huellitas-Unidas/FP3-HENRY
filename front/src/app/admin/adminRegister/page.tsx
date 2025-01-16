import React from "react";
import Register from "@/app/register/page";

const AdminRegister = () => {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-4">Registro de Administradores</h1>
      <Register role="admin" /> 
    </div>
  );
};

export default AdminRegister;


