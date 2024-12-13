"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logoFinal from "../../../public/images/logoFinal.png";
import Image from "next/image";
import { IUserLogin } from "@/interfaces/types";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [userSession, setUserSession] = useState<IUserLogin | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUserSession(null);
    Swal.fire({
      title: "Sesión cerrada",
      text: "Hasta la próxima!",
      icon: "warning",
      confirmButtonText: "Ok",
    });
    router.push("/");
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData: IUserLogin = JSON.parse(storedUserData);
      setUserSession(userData);
    } else {
      setUserSession(null);
    }
  }, []);

  return (
    <nav className="flex shadow-lg rounded-lg justify-between md:h-20 border border-[#3c9083]">
      <div className="flex w-full justify-between">
        <Link href="/">
          <Image
            src={logoFinal}
            alt="logo"
            width={60}
            height={60}
            className="ml-8"
          ></Image>
        </Link>
        <div className="hidden w-3/5 items-center justify-evenly font-semibold md:flex">
          <Link href="/lostandfound">Buscados / Encontrados</Link>
          <Link href="not-found">Ayudanos donando</Link>
          <Link href="/aboutUs">Sobre Huellas Unidas</Link>
          <Link href="not-found">🐾Recomendaciones</Link>
        </div>

        {userSession !== null ? (
          <div className="hidden w-1/5 items-center justify-evenly font-semibold md:flex">
            <div>
              <Link href={"/dashboard"}>Mi perfil</Link>
            </div>
            <div>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
          </div>
        ) : (
          <div className="hidden w-1/5 items-center justify-evenly font-semibold md:flex">
            <div>
              <Link href={"/register"}>Registrarme</Link>
            </div>
            <div>
              <Link href={"/login"}>Iniciar Sesión</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
