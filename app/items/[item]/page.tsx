"use client";

import { Button } from "@/components/ui/button";
import { CldImage } from "next-cloudinary";
import { usePathname } from "next/navigation";
import React from "react";

function ItemPage() {
  // Get the current pathname from usePathname
  const pathname = usePathname();

  // Extract the itemId from the pathname (e.g., /items/[item])
  const itemId = pathname?.split("/")[2]; // Assuming the path is /items/[item]

  const item = {
    title: "AlienWare AB24",
    description: "The best gaming laptop for 2024 with the latest technology!",
    price: 1599.99,
    featuredImage: "https://www.example.com/alienware-ab24.jpg",
    images: [
      "https://www.example.com/alienware-ab24-1.jpg",
      "https://www.example.com/alienware-ab24-2.jpg",
      "https://www.example.com/alienware-ab24-3.jpg",
    ],
    features: ["16GB RAM", "NVIDIA RTX 3080", "1TB SSD", "144Hz display"],
  };

  return (
    <div>
      {itemId}
      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Item Details Section */}
        <div className="flex flex-col lg:flex-row">
          {/* Left Column: Item Image Gallery */}
          <div className="lg:w-1/2 flex flex-col items-center space-y-4">
            <CldImage
              src={item.featuredImage}
              width="500"
              height="500"
              alt={item.title}
              className="rounded-lg shadow-lg object-cover"
            />
            <div className="flex space-x-4">
              {item.images.map((image, index) => (
                <CldImage
                  key={index}
                  src={image}
                  width="100"
                  height="100"
                  alt={`Additional image ${index + 1}`}
                  className="rounded-lg shadow-md cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* Right Column: Item Info */}
          <div className="lg:w-1/2 lg:pl-10 mt-8 lg:mt-0">
            <h1 className="text-3xl font-semibold text-gray-800">
              {item.title}
            </h1>
            <p className="text-xl text-gray-600 mt-2">${item.price}</p>
            <p className="text-lg text-gray-700 mt-4">{item.description}</p>

            {/* Features List */}
            <div className="mt-6">
              <h3 className="text-2xl font-medium text-gray-800">Features:</h3>
              <ul className="list-disc pl-6 text-gray-600 mt-2">
                {item.features.map((feature, index) => (
                  <li key={index} className="mt-1">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Call to Action */}
            <div className="mt-8 flex space-x-4">
              <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700">
                Add to Cart
              </Button>
              <Button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
