import Link from "next/link";
import React from "react";

const BackToAdmin: React.FC = () => {
  return (
    <div className="mb-6">
      <Link
        href="/admin"
        className="flex items-center text-customGreen-700 hover:text-customGreen-900 font-semibold transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.707-8.707a1 1 0 011.414 0l3 3a1 1 0 11-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 11-1.414-1.414l3-3z"
            clipRule="evenodd"
          />
        </svg>
        Volver al Panel de Administración
      </Link>
    </div>
  );
};

export default BackToAdmin;
