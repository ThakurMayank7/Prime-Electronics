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

type item = {
  id: string;
  displayImageId: string;
  title: string;
};

function BestDeals() {
  const router = useRouter();

  const [items, setItems] = useState<item[]>([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const snap = await getDoc(doc(db, "featured", "best-deals"));

        if (snap.exists()) {
          const result = snap.data();

          // Convert fields into desired format
          const fetchedData: { position: string; item: string }[] = Object.keys(
            result
          )
            .map((key) => ({
              position: key,
              item: result[key],
            }))
            .sort((a, b) => Number(a.position) - Number(b.position));

          const finalData: item[] = [];

          for (let i = 0; i < fetchedData.length; i++) {
            const itemSnap = await getDoc(
              doc(db, "items", fetchedData[i].item)
            );

            if (itemSnap.exists()) {
              const { itemName, displayImageRef } = itemSnap.data();

              finalData.push({
                id: fetchedData[i].item,
                displayImageId: displayImageRef,
                title: itemName,
              });
            }
          }

          setItems(finalData);
        }
      };

      fetchData();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="border-2 border-black rounded p-1 flex flex-col">
      <h2 className="text-4xl font-serif">Our Best Deals!</h2>
      <div className="flex flex-row">
        {items.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CldImage
                src={item.displayImageId || "samples/balloons"} // Use this sample image or upload your own via the Media Explorer
                width="200" // Transform the image: auto-crop to square aspect_ratio
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
                onClick={() => router.push(`/items/${item.id}`)}
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

export default BestDeals;
