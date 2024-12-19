"use client";

import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";

type brand = {
  id: string;
  displayImageId: string;
  title: string;
};

function Brands() {
  const router = useRouter();

  const [brands, setBrands] = useState<brand[]>([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const snap = await getDoc(doc(db, "featured", "brands"));

        if (snap.exists()) {
          const result = snap.data();

          // Convert fields into desired format
          const fetchedData: { position: string; brand: string }[] =
            Object.keys(result)
              .map((key) => ({
                position: key,
                brand: result[key],
              }))
              .sort((a, b) => Number(a.position) - Number(b.position));

          const finalData: brand[] = [];

          for (let i = 0; i < fetchedData.length; i++) {
            const itemSnap = await getDoc(
              doc(db, "brands", fetchedData[i].brand)
            );

            if (itemSnap.exists()) {
              const { itemName, logoRef } = itemSnap.data();

              finalData.push({
                id: fetchedData[i].brand,
                displayImageId: logoRef,
                title: itemName,
              });
            }
          }

          setBrands(finalData);
        }
      };

      fetchData();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="border-2 border-black rounded p-1 flex flex-col bg-cyan-600">
      <h2 className="text-4xl font-serif my-2">Check out The Biggest Brands!</h2>
      <div className="flex flex-row">
        {brands.map((brand) => (
          <Card
            key={brand.id}
            onClick={() => router.push(`/brands/${brand.id}`)}
            className="hover:cursor-pointer bg-teal-100"
          >
            <CardHeader>
              <CardTitle>{brand.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CldImage
                src={brand.displayImageId || "samples/balloons"}
                width="200"
                height="200"
                alt="banner"
                crop={{
                  type: "auto",
                  source: true,
                }}
              />
            </CardContent>
            <CardFooter>
              <button
                className="bg-teal-600 p-2 rounded text-white hover:bg-teal-700"
                onClick={() => router.push(`/brands/${brand.id}`)}
              >
                Check Out!
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Brands;
