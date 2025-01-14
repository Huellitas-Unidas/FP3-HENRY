"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logoFondoVerdeSinLetras from "../../../public/images/logoFondoVerdeSinLetras.png";
import emptyProfile from "../../../public/images/emptyProfile.png";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { getUserId } from "@/helpers/userId";
import { getUserById } from "@/app/api/userAPI";
import Cookies from "js-cookie";

const Navbar = () => {
  const userId = getUserId();
  const [userPic, setUserPic] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  const profilePhoto = session.data?.user?.image || userPic || emptyProfile;

  // const handleRefresh = () => {
  //   window.location.reload();
  // };

  const handleLogout = async () => {
    try {
      await Swal.fire({
        title: "Sesión cerrada",
        text: "Hasta la próxima!",
        icon: "success",
        confirmButtonText: "Ok",
        customClass: {
          confirmButton:
            "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
        },
      });
      localStorage.removeItem("userData");
      localStorage.removeItem("userId");
      Cookies.remove("token");
      await signOut({ redirect: false });
      router.push("/");
      // setTimeout(() => {
      //   handleRefresh();
      // }, 500);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (userId) {
          const user = await getUserById(userId);
          if (user) setUserPic(user.profilePicture);
          else {
            setUserPic(null);
          }
        } //else {
        //console.error("No se encontró el usuario");
        //}
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [userId, session.data?.user?.image, userPic, profilePhoto]); // useEffect que maneja el renderizado de la profilePic

  return (
    <nav className="font-sans font-semibold text-lg flex shadow-lg rounded-lg justify-between md:max-h-16 border border-[#3c9083] bg-[#d7f0e9]">
      <div className="flex w-full justify-between">
        <Link href="/">
          <Image
            src={logoFondoVerdeSinLetras}
            alt="logo"
            width={60}
            height={60}
            className="ml-4"
          ></Image>
        </Link>
        <div className="hidden w-3/5 items-center justify-evenly md:flex">
          <Link
            className={`transition-opacity-transform duration-300 ${
              pathname === "/lostandfound"
                ? "opacity-80 -translate-y-1"
                : "hover:opacity-80 hover:-translate-y-1"
            }`}
            href="/lostandfound"
          >
            Buscados / Encontrados
          </Link>
          <Link
            className={`transition-opacity-transform duration-300 ${
              pathname === "/donations"
                ? "opacity-80 -translate-y-1"
                : "hover:opacity-80 hover:-translate-y-1"
            }`}
            href="donations"
          >
            Ayudanos donando
          </Link>
          <Link
            className={`transition-opacity-transform duration-300 ${
              pathname === "/aboutUs"
                ? "opacity-80 -translate-y-1"
                : "hover:opacity-80 hover:-translate-y-1"
            }`}
            href="/aboutUs"
          >
            Sobre Huellas Unidas
          </Link>
          <Link
            className={`transition-opacity-transform duration-300 ${
              pathname === "/not-found"
                ? "opacity-80 -translate-y-1"
                : "hover:opacity-80 hover:-translate-y-1"
            }`}
            href="not-found"
          >
            🐾Recomendaciones
          </Link>
        </div>

        {userId || session?.data?.user ? (
          <div className="hidden w-1/5 items-center justify-evenly md:flex">
            <div className="flex items-center">
              <Image
                src={profilePhoto || emptyProfile}
                alt="ProfilePic"
                className="rounded-full object-cover w-10 h-10 mr-3 border border-gray-300 shadow-sm"
                width={40}
                height={40}
              />
              <Link
                href="/dashboard"
                className={`transition-opacity-transform duration-300 ${
                  pathname === "/dashboard"
                    ? "opacity-80 -translate-y-1"
                    : "hover:opacity-80 hover:-translate-y-1"
                }`}
              >
                Mi perfil
              </Link>
            </div>
            <div>
              <button
                className="hover:opacity-80 hover:-translate-y-1 transition-opacity-transform duration-300"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        ) : (
          <div className="hidden w-1/5 items-center justify-evenly md:flex">
            <div>
              <Link
                className={`transition-opacity-transform duration-300 ${
                  pathname === "/admin"
                    ? "opacity-80 -translate-y-1"
                    : "hover:opacity-80 hover:-translate-y-1"
                }`}
                href="/admin"
              >
                Admin
              </Link>
            </div>
            <div>
              <Link
                className={`transition-opacity-transform duration-300 ${
                  pathname === "/register"
                    ? "opacity-80 -translate-y-1"
                    : "hover:opacity-80 hover:-translate-y-1"
                }`}
                href={"/register"}
              >
                Registrarme
              </Link>
            </div>
            <div>
              <Link
                className={`transition-opacity-transform duration-300 ${
                  pathname === "/login"
                    ? "opacity-80 -translate-y-1"
                    : "hover:opacity-80 hover:-translate-y-1"
                }`}
                href={"/login"}
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
