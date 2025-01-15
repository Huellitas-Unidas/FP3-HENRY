"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { signOut, useSession } from "next-auth/react";
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
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session } = useSession();
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
        toast: true,
        position: "top-right",
        icon: "success",
        title: "Sesión cerrada",
        text: "Hasta la próxima!",
        icon: "success",
        confirmButtonText: "Ok",
        customClass: {
          confirmButton:
            "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
        },
      });

      Cookies.remove("token");
      Cookies.remove("userId");
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
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("token") || null;
        const storedUserId = Cookies.get("userId") || null;

        if (!token || !storedUserId || isTokenExpired(token)) {
          setIsLoggedIn(false);
          setIsAdmin(false);
          setUserPic(null);
          setLoading(false);
          return;
        }

        const user = await getUserById(storedUserId);

        if (user) {
          setUserPic(user.profilePicture || null);
          setIsAdmin(user.role.toUpperCase() === "ADMIN");
          setIsLoggedIn(true);
        } else {
          setUserPic(null);
          setIsAdmin(false);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [userId, session.data?.user?.image, userPic, profilePhoto]); // useEffect que maneja el renderizado de la profilePic

  return (
    <nav className="font-sans font-semibold text-lg flex shadow-lg rounded-lg justify-between md:max-h-16 border border-[#3c9083] bg-[#d7f0e9]">
      <div className="flex w-full justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src={logoFondoVerdeSinLetras}
            alt="logo"
            width={60}
            height={60}
            className="ml-4"
          />
        </Link>

        {/* Rutas visibles */}
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
            href="/donations"
          >
            Ayúdanos Donando
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
              pathname === "/recommendation"
                ? "opacity-80 -translate-y-1"
                : "hover:opacity-80 hover:-translate-y-1"
            }`}
            href="recommendation"
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
                Cerrar Sesión
              </button>
              {isAdmin && (
                <Link
                  className={`relative -top-2 text-sm transition-opacity-transform duration-300 ${
                    pathname === "/admin"
                      ? "opacity-80 -translate-y-1"
                      : "hover:opacity-80 hover:-translate-y-1"
                  }`}
                  href="/admin"
                >
                  Admin
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                className={`transition-opacity-transform duration-300 ${
                  pathname === "/adminRegister"
                    ? "opacity-80 -translate-y-1"
                    : "hover:opacity-80 hover:-translate-y-1"
                }`}
                href="/adminRegister"
              >
                Admin+
              </Link>
              <Link
                className={`transition-opacity-transform duration-300 ${
                  pathname === "/register"
                    ? "opacity-80 -translate-y-1"
                    : "hover:opacity-80 hover:-translate-y-1"
                }`}
                href="/register"
              >
                Registrarme
              </Link>
              <Link
                className={`transition-opacity-transform duration-300 ${
                  pathname === "/login"
                    ? "opacity-80 -translate-y-1"
                    : "hover:opacity-80 hover:-translate-y-1"
                }`}
                href="/login"
              >
                Iniciar Sesión
              </Link>
              
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;