"use client";

import { Button } from "@/components/ui/button";
import { CldImage } from "next-cloudinary";
import { usePathname } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/BlocksSpinner";
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

interface ItemDetails {
  id: string;
  displayName: string;
  description: string;
  displayImage: string;
  price: number;
  features: string[];
  images: string[];
  brandId: string;
  category: string[];
}

function ItemPage() {
  const pathname = usePathname();

  const itemId = pathname?.split("/")[2]; // Assuming the path is /items/[item]

  const { user, loading } = useAuth();

  const router = useRouter();

  const [itemDetails, setItemDetails] = React.useState<ItemDetails | null>(
    null
  );

  useEffect(() => {
    try {
      const fetchItemDetails = async () => {
        const itemSnapshot = await getDoc(doc(db, "items", itemId));

        if (itemSnapshot.exists()) {
          const itemData = itemSnapshot.data();
          setItemDetails({
            id: itemSnapshot.id,
            displayName: itemData.itemName,
            description: itemData.itemDescription,
            displayImage: itemData.displayImageRef,
            price: itemData.price,
            features: itemData.features,
            images: itemData.imagesRefs,
            brandId: itemData.brandId,
            category: itemData.category,
          });
        }
      };
      fetchItemDetails();
    } catch (e) {
      console.log(e);
    }
  }, [itemId]);

  useEffect(() => {
    if (user === null && loading === false) {
      router.push("/login");
    }
  }, [user, router, loading]);

  if (loading || itemDetails === null) {
    return (
      <div className="h-screen w-screen items-center flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Item Details Section */}
        <div className="flex flex-col lg:flex-row">
          {/* Left Column: Item Image Gallery */}
          <div className="lg:w-1/2 flex flex-col items-center space-y-4">
            <CldImage
              src={itemDetails.displayImage || "samples/balloons"}
              width="500"
              height="500"
              alt={itemDetails.displayName}
              className="rounded-lg shadow-lg object-cover"
            />
            <div className="flex space-x-4">
              {itemDetails.images.map((image, index) => (
                <CldImage
                  key={index}
                  src={image || "samples/balloons"}
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
              {itemDetails.displayName}
            </h1>
            <p className="text-xl text-gray-600 mt-2">
              ₹{Intl.NumberFormat("en-IN").format(itemDetails.price)}
            </p>
            <p className="text-lg text-gray-700 mt-4">
              {itemDetails.description}
            </p>

            {/* Features List */}
            <div className="mt-6">
              <h3 className="text-2xl font-medium text-gray-800">Features:</h3>
              <ul className="list-disc pl-6 text-gray-600 mt-2">
                {itemDetails &&
                  itemDetails?.features?.map((feature, index) => (
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
      <div>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 flex flex-col items-center space-y-4">
            asd
          </div>
          <div className="lg:w-1/2 lg:pl-10 mt-8 lg:mt-0">
            sd
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
