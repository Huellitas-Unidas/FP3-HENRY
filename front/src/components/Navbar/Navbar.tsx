"use client";
import Link from "next/link";
import React from "react";
import logoFinal from "../../../public/images/logoFinal.png";
import Image from "next/image";

const Navbar = () => {
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
          <Link href="/aboutus">Sobre Huellas Unidas</Link>
          <Link href="not-found">🐾Recomendaciones</Link>
        </div>
        <div className="hidden w-1/5 items-center justify-evenly font-semibold md:flex">
          <div>
            <Link href={"/register"}>Registrarme</Link>
          </div>
          <div>
            <Link href={"/login"}>Iniciar Sesión</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
