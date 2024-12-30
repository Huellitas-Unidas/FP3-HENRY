"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logoFinal from "../../../public/images/logoFinal.png";
import Image from "next/image";
import { IUserLogin } from "@/interfaces/types";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const [userSession, setUserSession] = useState<IUserLogin | null>(null);
  const router = useRouter();
  const session = useSession();

  const handleLogout = async () => {
    localStorage.removeItem("userData");
    setUserSession(null);
    await signOut(); //!
    await Swal.fire({
      //!
      title: "Sesión cerrada",
      text: "Hasta la próxima!",
      icon: "success",
      confirmButtonText: "Ok",
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
    });
    router.push("/");
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        const userData: IUserLogin = JSON.parse(storedUserData);
        setUserSession(userData);
      } else {
        setUserSession(null);
      }
    };

    window.addEventListener("storageChange", handleStorageChange);

    return () => {
      window.removeEventListener("storageChange", handleStorageChange);
    };
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
          <Link href="donations">Ayudanos donando</Link>
          <Link href="/aboutUs">Sobre Huellas Unidas</Link>
          <Link href="not-found">🐾Recomendaciones</Link>
        </div>

        {userSession !== null || session?.data?.user ? (
          <div className="hidden w-1/5 items-center justify-evenly font-semibold md:flex">
            <div>
              {/* <Image
                src={
                  session.data?.user?.image
                    ? session.data?.user?.image
                    : "/images/GoogleLogo.png"
                }
                alt="ProfilePic"
                className="rounded-lg object-contain w-6 h-6 mr-3"
                width={24}
                height={24}
              ></Image> */}
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
