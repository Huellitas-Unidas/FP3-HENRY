'use client'

import { IButton } from "@/interfaces/types";

const GreenButton: React.FC<IButton> = ({ props }) => {
  
  return (
    <button type="submit" className="bg-green500 text-white p-2 rounded-lg
     hover:bg-white hover:text-green500 transition-all duration-300">
      {props}
    </button>
  );
};

export default GreenButton;


