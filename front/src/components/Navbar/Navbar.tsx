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
import { getUserById } from "@/app/api/userAPI";

const Navbar = () => {
  const [userPic, setUserPic] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await Swal.fire({
        toast: true,
        position: "top-right",
        icon: "success",
        title: "Sesión cerrada",
        text: "Hasta la próxima!",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        iconColor: "#f6ad55",
      });

      Cookies.remove("token");
      Cookies.remove("userId");
      localStorage.removeItem("userData");
      localStorage.removeItem("userId");

      await signOut({ redirect: false });

      setIsLoggedIn(false);
      setIsAdmin(false);

      setTimeout(() => {
        window.location.reload();
        router.replace("/");
      }, 3000);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const isTokenExpired = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp ? payload.exp < now : true;
    } catch {
      return true;
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
        console.error("Error al obtener datos del usuario:", error);
        setUserPic(null);
        setIsAdmin(false);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
      if (isLoggedIn && pathname !== "/") {
        router.push("/"); // Redirige a la página principal
    }
};

   fetchUserData();
}, [isLoggedIn, pathname, router, session?.user?.image]);

  if (loading) {
    return null; // Mientras carga, no renderiza nada
  }

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
              pathname === "/not-found"
                ? "opacity-80 -translate-y-1"
                : "hover:opacity-80 hover:-translate-y-1"
            }`}
            href="/not-found"
          >
            🐾Recomendaciones
          </Link>
        </div>

        {/* Controles de usuario */}
        <div className="hidden w-1/5 items-center justify-evenly md:flex">
          {isLoggedIn ? (
            <>
              <div className="flex items-center">
                <Image
                  src={userPic || emptyProfile}
                  alt="ProfilePic"
                  className="rounded-full object-cover w-10 h-10 mr-3 border border-gray-300 shadow-sm"
                  width={40}
                  height={40}
                />
                <Link
                  href="/"
                  className={`transition-opacity-transform duration-300 ${
                    pathname === "/"
                      ? "opacity-80 -translate-y-1"
                      : "hover:opacity-80 hover:-translate-y-1"
                  }`}
                >
                  Inicio
                </Link>
              </div>
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
