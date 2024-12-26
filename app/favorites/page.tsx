"use client";

import { db } from "@/firebase/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { CldImage } from "next-cloudinary";

interface ItemDetail {
  displayImage: string;
  itemName: string;
  itemDescription: string;
  itemId: string;
}

function Favorites() {
  const { user, loading } = useAuth();

  const router = useRouter();

  const [favorites, setFavorites] = useState<string[]>([]);

  const [cart, setCart] = useState<string[]>([]);

  const [favoritesDetails, setFavoritesDetails] = useState<ItemDetail[]>([]);

  useEffect(() => {
    if (user === null && loading === false) {
      router.push("/login");
    }
  }, [user, router, loading]);

  useEffect(() => {
    if (user !== null)
      try {
        const fetchFavorites = async () => {
          const userSnapshot = await getDoc(doc(db, "users", user.uid));
          if (userSnapshot.exists()) {
            const favoritesData: string[] = userSnapshot.data().favorites;
            setFavorites(favoritesData);
            setCart(userSnapshot.data().cartItems);

            const fetchFavoritesDetails = async () => {
              if (favoritesData) {
                favoritesData.forEach(async (favorite) => {
                  const favoriteDetailsSnapshot = await getDoc(
                    doc(db, "items", favorite)
                  );
                  if (favoriteDetailsSnapshot.exists()) {
                    const data = favoriteDetailsSnapshot.data();
                    const itemDetailsToPush: ItemDetail = {
                      itemId: favorite,
                      itemName: data.itemName,
                      itemDescription: data.itemDescription,
                      displayImage: data.displayImageRef,
                    };
                    setFavoritesDetails((prev) => [...prev, itemDetailsToPush]);
                  }
                });
              }
            };

            fetchFavoritesDetails();
          }
        };
        fetchFavorites();
      } catch (err) {
        console.error(err);
      }
  }, [user]);

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      wishlist
      <div className="flex flex-col gap-2">
        {favorites &&
          favorites.map((favorite) => {
            const itemDetails: ItemDetail | undefined = favoritesDetails.find(
              (item) => item.itemId === favorite
            );
            if (!itemDetails) {
              return (
                <p key={favorite}>
                  There was some error. Please Reload this Page.
                </p>
              );
            }
            return (
              <Card key={favorite} className="flex flex-row p-4">
                <CardHeader>
                  <CldImage
                    src={itemDetails.displayImage || "samples/balloons"}
                    width="300"
                    height="300"
                    alt={itemDetails.itemName}
                    className="rounded-lg shadow-lg object-cover"
                  />
                </CardHeader>
                <div className="ml-10 my-10">
                  <CardTitle className="flex flex-row gap-4 items-center">
                    {itemDetails.itemName}
                  </CardTitle>
                  <br />
                  <CardDescription className="max-w-screen-md">
                    {itemDetails.itemDescription}
                  </CardDescription>
                </div>

                <div className="flex flex-col ml-auto my-auto">
                </div>
              </Card>
            );
          })}
      </div>
    </div>
  );
}

export default Favorites;
