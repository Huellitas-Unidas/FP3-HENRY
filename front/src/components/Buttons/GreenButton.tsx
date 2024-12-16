'use client'

import { IButton } from "@/interfaces/types";

const GreenButton: React.FC<IButton> = ({ label, type = "submit", disabled }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`bg-green-500 text-white p-2 rounded-lg hover:bg-white hover:text-green-500 transition-all duration-300 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {label}
    </button>
  );
};

export default GreenButton;


