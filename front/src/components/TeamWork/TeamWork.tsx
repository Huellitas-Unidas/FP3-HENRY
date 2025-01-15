import Image from "next/image";
import React from "react";

const TeamWork = () => {
  return (
    <div className="font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-gray-800 text-4xl font-extrabold">
            Conocé al equipo
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 mt-12 max-sm:max-w-xs mx-auto">
          {[
            { src: "/images/agus.jpeg", name: "Agustina", role: "Frontend" },
            { src: "/images/nidia.jpeg", name: "Nidia", role: "Frontend" },
            { src: "/images/rocio.jpeg", name: "Rocio", role: "Frontend" },
            { src: "/images/aldrin.jpeg", name: "Aldrin", role: "Backend" },
            {
              src: "/images/francisco.jpeg",
              name: "Francisco",
              role: "Backend",
            },
            { src: "/images/franco.jpg", name: "Franco", role: "Backend" },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 border rounded-lg flex flex-col items-center"
            >
              <div className="h-64 w-64 overflow-hidden flex justify-center items-center">
                <Image
                  src={member.src}
                  className="h-full w-full object-cover rounded-lg"
                  width={250}
                  height={250}
                  alt={member.name}
                />
              </div>
              <div className="text-center mt-4">
                <h4 className="text-base font-semibold text-white">
                  {member.name}
                </h4>
                <p className="text-xs mt-2 text-white">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamWork;
