<<<<<<< HEAD
import Carousel from '@/components/Carousel/Carousel';
import SearchBar from '@/components/SearchBar/SearchBar';
import React from 'react'
import { HiOutlineLocationMarker, HiOutlineMail } from 'react-icons/hi';
import { BsChatLeftHeart } from "react-icons/bs";

=======
<<<<<<< HEAD
import Image from "next/image";
=======
import SearchBar from '@/components/SearchBar/SearchBar';
import React from 'react'
>>>>>>> 0190fb5b877b2d5eac0096a7d2fc0d8d93268a64
>>>>>>> 34084505c2561a86e25eeac7cbdbecc697ba10be

export default function Home() {
  return (
<<<<<<< HEAD
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
=======
    <div>
      <SearchBar/>
      <Carousel/>
      <div className="max-w-6xl mx-auto font-[sans-serif]">
      <h2 className="text-gray-800 sm:text-4xl text-lg font-extrabold text-center my-10">Mirá lo que nos caracteriza</h2>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 max-md:max-w-lg mx-auto gap-12">
        <div className="p-4 flex gap-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300">
        <HiOutlineLocationMarker size={60} className="text-[#1e1612]" />
  
          <div>
            <h3 className="text-gray-800 text-xl font-semibold mb-3">Mapa Interactivo</h3>
            <p className="text-gray-600 text-sm">
            Ubica mascotas perdidas, encontradas y servicios en tu área con nuestro mapa interactivo.</p>
          </div>
        </div>

        <div className="p-4 flex gap-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300">
          
        <div className="flex space-x-2 mb-3">
                        <HiOutlineMail size={60} className="text-[#1e1612]" />
                    </div>
          <div>
            <h3 className="text-gray-800 text-xl font-semibold mb-3">Contacto</h3>
            <p className="text-gray-600 text-sm">Contáctanos pf3shhuellasunidas@hotmail.com</p>
          </div>
        </div>

        <div className="p-4 flex gap-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300">
        <BsChatLeftHeart size={70}/>
          <div>
            <h3 className="text-gray-800 text-xl font-semibold mb-3">Comunicación</h3>
            <p className="text-gray-600 text-sm">Conéctate instantáneamente con dueños de mascotas y otros miembros de la comunidad a través del ChatBot.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
>>>>>>> 0190fb5b877b2d5eac0096a7d2fc0d8d93268a64

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
