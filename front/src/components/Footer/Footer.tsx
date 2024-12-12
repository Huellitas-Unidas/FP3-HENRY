import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="rounded-lg shadow dark:bg-gray-800 bg-gray-50 border border-[#3c9083]">
        <div className="w-full mx-auto max-w-screen-xl p-5 md:flex md:justify-between sm:flex sm:items-center sm:justify-between">
          <div className="text-sm text-gray-700 sm:text-center dark:text-gray-400 pl-2 text-left">
            © 2025
            <Link href="/" className="hover:underline pl-2">
              Huellas Unidas™.
            </Link>{" "}
            Todos los derechos reservados.
          </div>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-700 dark:text-gray-400 sm:mt-0 text-right">
            <li>
              <Link href="#" className="hover:underline me-4 md:me-6">
                Sobre Huellas Unidas
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline me-4 md:me-6">
                Términos y Condiciones
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline me-4 md:me-6">
                Ayudanos donando
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
