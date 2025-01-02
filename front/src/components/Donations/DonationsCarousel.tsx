"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import React from "react";

const DonationsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    { src: "/images/cutest1.png", alt: "Rescue1", message: "Ayúdanos a reunir a más mascotas con sus dueños 🐾" }, //Tus donaciones nos permiten hacerlo mejor
    { src: "/images/cutest2.png", alt: "Rescue2", message: "Cada donación marca la diferencia ❤️" },
    { src: "/images/cutest3.png", alt: "Rescue3", message: "Tu apoyo puede cambiar su mundo 🌟" },
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-[90%] max-w-4xl mx-auto mt-10">
  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10 shadow-sm">
    {slides.map((_, index) => (
      <button
        key={index}
        className={`h-3 w-3 rounded-full transition-opacity ${
          index === currentIndex ? "bg-customGreen-500" : "bg-gray-300"
        }`}
        onClick={() => setCurrentIndex(index)}
      />
    ))}
  </div>

 
  <div className="relative h-[350px] w-full overflow-hidden rounded-lg shadow-lg mb-6">
    {slides.map((slide, index) => (
      <div
        key={index}
        className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ${
          index === currentIndex ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Image
          src={slide.src}
          alt={slide.alt}
          layout="fill"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          priority={index === currentIndex}
          className="rounded-lg opacity-85 shadow-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      
        <div className="absolute bottom-4 left-0 right-0 text-center text-white text-shadow px-4">
          <p className="bg-customGreen-600 bg-opacity-75 text-lg font-semibold py-2 px-4 rounded-lg shadow-md">
            {slide.message}
          </p>
        </div>
      </div>
    ))}
  </div>

  <button
    className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center h-8 w-8 bg-white text-black rounded-full shadow-md hover:scale-105 transition"
    onClick={handlePrev}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  </button>
  <button
    className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center h-8 w-8 bg-white text-black rounded-full shadow-md hover:scale-105 transition"
    onClick={handleNext}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  </button>
</div>

  );
};

export default DonationsCarousel;




