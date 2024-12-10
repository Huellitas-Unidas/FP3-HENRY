import Link from "next/link";
import React from "react";
import LOGO from "../../assets/LOGO.png";
import Image from "next/image";

const Navbar = () => {
  return (
    <div>
      <nav className="flex shadow-lg rounded-lg justify-between md:h-16 border border-[#3c9083] bg-gray-50">
        <div className="flex w-full justify-between">
          <Link href="/">
            <Image
              src={LOGO}
              alt="logo"
              width={45}
              height={45}
              className="ml-4 pt-1"
            ></Image>
          </Link>
          <div className="hidden w-3/5 items-center justify-evenly font-semibold md:flex">
            <a href="">Buscados/Encontrados</a>
            <a href="">Ayudanos donando</a>
            <a href="">Sobre Huellitas Unidas</a>
            <a href="">Recomendaciones</a>
          </div>
          <div className="hidden w-1/5 items-center justify-evenly font-semibold md:flex">
            <button>
              <Link href={"/register"}>Registrarme</Link>
            </button>
            <button>
              <Link href={"/login"}>Iniciar Sesión</Link>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
