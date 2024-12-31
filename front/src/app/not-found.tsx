import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="h-screen w-screen bg-snowWhite flex items-center justify-center">
            
            <div className="container flex flex-col md:flex-row items-center justify-center max-w-2xl">
                <div className="max-w-lg flex flex-col items-center mb-4">
                    <Image
                        src="/images/notFound.png"
                        alt="Not Found 404, vamos al inicio"
                        width={1000}
                        height={400}
                        className="w-full h-auto max-w-full rounded-3xl shadow-2xl shadow-[#244B47]"
                    />
                    <div className="absolute top-[46%] text-6xl text-[#0E2523] font-bold bg-[#9ad2c3] shadow-lg shadow-[#285D57] bg-blend-screen animate-bounce rounded-lg tracking-wider">
                        404
                    </div>

                    <Link
                        href="/"
                        className="mt-4 px-4 py-2 text-md font-medium leading-5 shadow-xl text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-[#285D57] active:bg-[#74C3B3] hover:bg-[#3C9083]"
                    >
                        Vamos al inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}
