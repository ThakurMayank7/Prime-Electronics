"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, SquareArrowUpRight } from "lucide-react";
import { useState } from "react";
import { CldImage } from "next-cloudinary";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface BannerData {
  id?: string;
  featuredItemDisplayImage?: string;
  bannerTitle: string;
  bannerTitleColor: string;
  bannerDescription: string;
  bannerDescriptionColor: string;
  bannerHighlightedText: string;
  bannerHighlightedTextColor: string;
  bannerSecondaryHighlightedText: string;
  bannerSecondaryHighlightedTextColor: string;
  leftPanelColor: string;
  rightPanelColor: string;
  isNavigationButton: string; // "true" or "false"

  presence: {
    buttonPresent: boolean;
    isItemFeatured: boolean;
    isHighlightedPresent: boolean;
    isSecondaryHighlightedPresent: boolean;
    isDescriptionPresent: boolean;
    isTitlePresent: boolean;
  };

  itemFeaturedId: string;
}

interface Banners {
  banners: BannerData[];
}

const Carousel = ({ banners }: Banners) => {
  const slides = banners.map((banner) => (
    <div key={banner.id} className="w-full h-full">
      <div className="flex flex-col lg:flex-row w-full h-full bg-gray-100">
        {/* Left Section */}
        <div className="lg:w-2/3 w-full flex flex-col justify-center items-center bg-gradient-to-r from-teal-400 to-teal-600 p-10 text-center space-y-8">
          <h1 className="text-white text-5xl lg:text-7xl font-bold">
            {banner.bannerHighlightedText}
          </h1>
          <h2 className="text-white text-3xl lg:text-5xl font-serif">
            {banner.bannerTitle}
          </h2>
          <p className="text-white text-lg lg:text-2xl font-medium">
            {banner.bannerDescription}
          </p>
          <p className="text-white text-xl lg:text-3xl font-mono font-semibold">
            {banner.bannerSecondaryHighlightedText}
          </p>
          <button className="mt-6 px-6 py-3 bg-black text-white text-xl lg:text-2xl rounded-lg shadow-lg hover:bg-gray-800 transition flex items-center gap-2">
            Buy Now
            <SquareArrowUpRight />
          </button>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/3 w-full bg-teal-800 flex items-center justify-center p-6">
          <Card className="w-2/3 flex flex-col items-center">
            <CardHeader>
              <CardTitle>{banner.bannerTitle}</CardTitle>
              <CardDescription className="break-words w-fit">
                {banner.bannerDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CldImage
                src={banner.featuredItemDisplayImage || "samples/balloons"} // Use this sample image or upload your own via the Media Explorer
                width="200" // Transform the image: auto-crop to square aspect_ratio
                height="200"
                alt="banner"
                crop={{
                  type: "auto",
                  source: true,
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  ));
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
    <div className="relative w-full h-auto overflow-hidden">
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
            style={{
              minWidth: "100%", // Ensures each child div is the full width of the parent
            }}
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
