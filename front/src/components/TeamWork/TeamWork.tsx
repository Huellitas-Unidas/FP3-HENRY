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

<<<<<<< HEAD
        <div className="grid sm:grid-cols-3 gap-8 max-sm:justify-center mt-12 max-sm:max-w-xs mx-auto">
            <div className="bg-gray-800 p-4 border rounded-lg">
                <Image src="/images/agus.jpeg" className="w-full object-contain object-top rounded-lg" width={250} 
          height={250} alt='agustina'/>

                <div className="text-center mt-4">
                    <h4 className="text-base font-semibold text-white">Agustina</h4>
                    <p className="text-xs mt-2 text-white">Frontend</p>
                </div>
            </div>

            <div className="bg-gray-800 p-4 border rounded-lg">
                <Image src="/images/nidia.jpeg" className="w-full object-contain object-top rounded-lg" width={250} 
          height={250} alt='nidia'/>

                <div className="text-center mt-4">
                    <h4 className="text-base font-semibold text-white">Nidia</h4>
                    <p className="text-xs mt-2 text-white">Frontend</p>
                </div>
            </div>

            <div className="bg-gray-800 p-4 border rounded-lg">
                <Image src="/images/rocio.jpg" className="w-full object-contain object-top rounded-lg" width={250} 
          height={250} alt='rocio' />

                <div className="text-center mt-4">
                    <h4 className="text-base font-semibold text-white">Rocio</h4>
                    <p className="text-xs mt-2 text-white">Frontend</p>
                </div>
            </div>
            <div className="bg-gray-800 p-4 border rounded-lg">
                <Image src="/images/aldrin.jpeg" className="w-full object-contain object-top rounded-lg" width={250} 
          height={250} alt='aldrin' />

                <div className="text-center mt-4">
                    <h4 className="text-base font-semibold text-white">Aldrin</h4>
                    <p className="text-xs mt-2 text-white">Backend</p>
                </div>
            </div>

            <div className="bg-gray-800 p-4 border rounded-lg">
                <Image src="/images/francisco.jpeg" className="w-full object-contain object-top rounded-lg" width={250} 
          height={250} alt='francisco' />

                <div className="text-center mt-4">
                    <h4 className="text-base font-semibold text-white">Francisco</h4>
                    <p className="text-xs mt-2 text-white">Backend</p>
                </div>
            </div>

            <div className="bg-gray-800 p-4 border rounded-lg">
                <Image src="/images/franco.jpg" className="w-full object-contain object-top rounded-lg" width={250} 
          height={250} alt='franco'/>

                <div className="text-center mt-4">
                    <h4 className="text-base font-semibold text-white">Franco</h4>
                    <p className="text-xs mt-2 text-white">Backend</p>
                </div>
=======
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
>>>>>>> 145c6d417d7524a6c97cf547dea0dd2173f4a554
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamWork;
