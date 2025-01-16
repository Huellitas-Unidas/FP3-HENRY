'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
//import { jwtDecode } from "jwt-decode";
import Link from "next/link";

const Admin = () => {
  const router = useRouter(); 

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      // Si no hay token, redirige al login
      router.push("/login");
    }

    // Aquí puedes agregar validaciones adicionales según sea necesario
  }, [router]);
  
  return (
    <div className="bg-pearl min-h-screen flex flex-col justify-center items-center py-6 px-6 mt-10">
      <h1 className="text-5xl font-extrabold text-customGreen-900 mb-44 text-center">
        Panel de Administración
      </h1>
      <div className="text-center py-10 px-10">
        <Link href="/admin/adminRegister">
          <button className="bg-customGreen-700 text-white py-2 px-4 rounded hover:bg-customGreen-300">
            Registrar Nuevo Administrador
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl px-4 mb-40">
        <Link
          href="/admin/users"
          className="bg-customGreen-500 hover:bg-customGreen-700 text-snowWhite font-semibold text-center py-8 px-6 rounded-xl shadow-lg border-4 border-customGreen-200 transition-all duration-300 transform hover:scale-105"
        >
          Gestión de Usuarios
        </Link>

        <Link
          href="/admin/posts"
          className="bg-gray-500 hover:bg-gray-700 text-snowWhite font-semibold text-center py-8 px-6 rounded-xl shadow-lg border-4 border-gray-300 transition-all duration-300 transform hover:scale-105"
        >
          Gestión de Posts
        </Link>

        <Link
          href="/admin/donations"
          className="bg-orange-400 hover:bg-orange-600 text-snowWhite font-semibold text-center py-8 px-6 rounded-xl shadow-lg border-4 border-orange-200 transition-all duration-300 transform hover:scale-105"
        >
          Gestión de Donaciones
        </Link>

        <Link
          href="/admin/pqr"
          className="bg-blue-500 hover:bg-blue-700 text-snowWhite font-semibold text-center py-8 px-6 rounded-xl shadow-lg border-4 border-blue-300 transition-all duration-300 transform hover:scale-105"
        >
          Gestión de PQR
        </Link>
      </div>
    </div>
  );
};

export default Admin;
