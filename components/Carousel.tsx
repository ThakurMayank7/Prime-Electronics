"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const Carousel = () => {
  // provide keys with each element here
  const slides = [
    <div
      key="1"
      className="flex flex-col items-center justify-center h-full w-full bg-blue-500 text-white"
    >
      <h1 className="text-2xl font-bold">Slide 1</h1>
      <p className="mt-2">This is the first slide content.</p>
    </div>,
    <div
      key="2"
      className="flex flex-col items-center justify-center h-full w-full bg-green-500 text-white"
    >
      <h1 className="text-2xl font-bold">Slide 2</h1>
      <p className="mt-2">This is the second slide content.</p>
    </div>,
    <div
      key="3"
      className="flex flex-col items-center justify-center h-full w-full bg-red-500 text-white"
    >
      <h1 className="text-2xl font-bold">Slide 3</h1>
      <p className="mt-2">This is the third slide content.</p>
    </div>,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-64 overflow-hidden">
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 flex items-center justify-center"
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Previous Button */}

      {slides.length > 1 && (
        <>
          <Button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-pallette6 hover:bg-pallette3 p-3 rounded shadow-lg"
          >
            <ChevronLeft /> {/* Left arrow */}
          </Button>

          <Button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-pallette6 hover:bg-pallette3 p-3 rounded shadow-lg"
          >
            <ChevronRight /> {/* Right arrow */}
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.length > 1 &&
          slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-cyan-800" : "bg-cyan-200"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
      </div>
    </div>
  );
};

export default Carousel;
