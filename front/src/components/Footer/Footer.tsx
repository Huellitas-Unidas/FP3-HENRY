"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathname = usePathname();
  return (
    <footer className="rounded-lg shadow dark:bg-gray-800 bg-[#d7f0e9] border border-[#3c9083]">
      <div className="w-full mx-auto max-w-screen-xl p-5 md:flex md:justify-between sm:flex sm:items-center sm:justify-between">
        <div>
          <Link
            className={`relative top-6 text-sm transition-opacity-transform duration-300 text-customGreen-500 shadow-md shadow-white ml-4 ${
              pathname === "/lostandfound"
                ? "opacity-80 -translate-y-1"
                : "hover:opacity-80 hover:-translate-y-1"
            }`}
            href="/admin"
          >
            Admin
          </Link>
        </div>
        <div className="text-sm text-gray-700 sm:text-center dark:text-gray-400 pl-2 text-left">
          <span>© 2025.</span>
          <Link href="/" className="hover:underline pl-2">
            Huellas Unidas™.
          </Link>
          <span> Todos los derechos reservados.</span>
        </div>
        <div>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-700 dark:text-gray-400 sm:mt-0 text-right">
            <li>
              <Link href="/pqr" className="hover:underline me-4 md:me-6">
                PQR
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline me-4 md:me-6">
                Términos y Condiciones
              </Link>
            </li>
            <li>
              <Link href="donations" className="hover:underline me-4 md:me-6">
                Ayudanos donando
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
