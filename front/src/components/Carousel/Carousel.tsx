"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import React from "react";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
    <div
      id="carouselDarkVariant"
      className="relative w-[50%] aspect-w-16 aspect-h-9 mt-10 mx-auto"
      data-twe-carousel-init
      data-twe-ride="carousel"
    >
      <div
        className="absolute inset-x-0 bottom-0 z-[2] mx-[5%] mb-2 flex list-none justify-center p-1"
        data-twe-carousel-indicators
      >
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            data-twe-target="#carouselDarkVariant"
            data-twe-slide-to={index}
            className={`mx-[8px] h-[8px] w-[40px] cursor-pointer ${
              index === currentIndex
                ? "bg-white opacity-100"
                : "bg-gray-950 opacity-50"
            }`}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
  
      <div className="relative w-full h-[30vh] overflow-hidden rounded-lg">
        <div
          className={`relative flex w-full transition-opacity duration-[600ms] ease-in-out ${
            currentIndex === 0 ? "block" : "hidden"
          }`}
        >
          <Image
            src="/images/1.png"
            alt="dalmata"
            width={800}
            height={400}
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
            className="rounded-lg"
            priority
          />
        </div>
  
        <div
          className={`relative float-left w-full transition-opacity duration-[600ms] ease-in-out ${
            currentIndex === 1 ? "block" : "hidden"
          }`}
        >
          <Image
            src="/images/2.png"
            alt="gatito"
            width={800}
            height={400}
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
            className="block w-full"
          />
        </div>
  
        <div
          className={`relative float-left w-full transition-opacity duration-[600ms] ease-in-out ${
            currentIndex === 2 ? "block" : "hidden"
          }`}
        >
          <Image
            src="/images/4.png"
            alt="perrito"
            width={800}
            height={400}
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
            className="rounded-lg"
          />
        </div>
      </div>
  
      <button
        className="absolute left-0 top-0 z-[50] w-[10%] h-full text-black opacity-60 hover:opacity-90"
        type="button"
        onClick={handlePrev}
      >
        <span className="inline-block h-6 w-6 dark:grayscale">
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
        </span>
      </button>
  
      <button
        className="absolute right-0 top-0 z-[50] w-[10%] h-full text-black opacity-50 hover:opacity-90"
        type="button"
        onClick={handleNext}
      >
        <span className="inline-block h-6 w-6 dark:grayscale">
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
        </span>
      </button>
    </div>
  </div>
   /*  <div>
      <div
        id="carouselDarkVariant"
        className="relative w-[70%] mt-10 mx-auto"
        data-twe-carousel-init
        data-twe-ride="carousel"
      >
        <div
          className="absolute inset-x-0 bottom-0 z-[2] mx-[5%] mb-2 flex list-none justify-center p-1"
          data-twe-carousel-indicators
        >
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              data-twe-target="#carouselDarkVariant"
              data-twe-slide-to={index}
              className={`mx-[8px] h-[8px] w-[70px] cursor-pointer ${
                index === currentIndex
                  ? "bg-white opacity-100"
                  : "bg-gray-950 opacity-50"
              }`}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        <div className="relative w-full h-[40vh] overflow-hidden">
          <div
            className={`relative flex w-full transition-opacity duration-[600ms] ease-in-out ${
              currentIndex === 0 ? "block" : "hidden"
            }`}
          >
            <Image
              src="/images/1.png"
              alt="dalmata"
              width={1500}
              height={600}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              className="rounded-lg max-h-[60vh]"
              priority
            />
          </div>

          <div
            className={`relative float-left w-full transition-opacity duration-[600ms] ease-in-out ${
              currentIndex === 1 ? "block" : "hidden"
            }`}
          >
            <Image
              src="/images/3.png"
              alt="gatito"
              width={1500}
              height={600}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              className="block w-full max-h-[45vh]"
            />
            
          </div>

          <div
            className={`relative float-left w-full transition-opacity duration-[600ms] ease-in-out ${
              currentIndex === 2 ? "block" : "hidden"
            }`}
          >
            <Image
              src="/images/2.png"
              alt="perrito"
              width={1500}
              height={600}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              className="rounded-lg max-h-[95vh]"
            />
          </div>
        </div>

        <button
          className="absolute left-0 top-0 z-[50] w-[25%] h-full text-black opacity-60 hover:opacity-90"
          type="button"
          onClick={handlePrev}
        >
          <span className="inline-block h-  9 w-9 dark:grayscale">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-9 w-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </span>
        </button>

        <button
          className="absolute right-0 top-0 z-[50] w-[15%] h-full text-black opacity-50 hover:opacity-90"
          type="button"
          onClick={handleNext}
        >
          <span className="inline-block h-9 w-9 dark:grayscale">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-9 w-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
        </button>
      </div>
    </div> */
  );
};

export default Carousel;
