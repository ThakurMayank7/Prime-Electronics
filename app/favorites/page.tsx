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

import { AiFillHeart } from "react-icons/ai";
import { CldImage } from "next-cloudinary";
import Spinner from "@/components/BlocksSpinner";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";
import { updateFavorites } from "@/actions/action";

import { MdHeartBroken } from 'react-icons/md';

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

  const [fetching, setFetching] = useState<boolean>(true);

  useEffect(() => {
    if (user === null && loading === false) {
      router.push("/login");
    }
  }, [user, router, loading]);

  useEffect(() => {
    if (user !== null)
      try {
        setFetching(true);
        const fetchFavorites = async () => {
          const userSnapshot = await getDoc(doc(db, "users", user?.uid));
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
      } finally {
        setFetching(false);
      }
  }, [user]);

  const removeFromFavorites = async (itemId: string) => {
    if (favorites && user?.uid && itemId) {
      if (favorites.includes(itemId)) {
        const temp: string[] = removeOneOccurrence([...favorites], itemId);
        const result = await updateFavorites(temp, user?.uid);

        if (result) {
          setFavorites(temp);
        }
      }
    }
  };

  const removeOneOccurrence = (array: string[], item: string): string[] => {
    const index = array.indexOf(item);
    if (index !== -1) {
      array.splice(index, 1);
    }
    return array;
  };

  if (loading || fetching) {
    return (
      <div className="h-screen w-screen items-center flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-center my-2 gap-4">
        <h1 className="text-4xl font-semibold">Your Favorite Items</h1>
        <AiFillHeart color="red" size={34} />
      </div>
      <Separator className="my-2" />
      <div className="flex flex-col gap-2">
        {favorites &&
          favorites.map((favorite) => {
            const itemDetails: ItemDetail | undefined = favoritesDetails.find(
              (item) => item.itemId === favorite
            );
            if (!itemDetails) {
              return (
                <div
                  key={favorite}
                  className="h-screen w-screen items-center flex justify-center"
                >
                  <Spinner />
                </div>
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

                <Separator
                  orientation="vertical"
                  className="h-auto bg-gray-400 mr-0 ml-auto"
                />
                <div className="w-1/4 flex flex-col items-center justify-center ml-0">
                  {cart.includes(favorite) && (
                    <div className="flex flex-col items-center gap-2">
                      <p>Item is already in your Cart</p>
                      <ShoppingCart />
                      <p>
                        ( {cart.filter((item) => item === favorite).length} )
                      </p>
                    </div>
                  )}
                  <button
                    onClick={() => removeFromFavorites(favorite)}
                    className={`rounded bg-red-500 p-2 hover:bg-red-600 text-white ${
                      cart.includes(favorite) ? "mt-10" : ""
                    }`}
                  >
                    Remove from Favorite
                  </button>
                </div>
              </Card>
            );
          })}
          {favorites && favorites.length===0 && 
          <div className="flex items-center justify-center h-96">

            <p className="flex items-center justify-center gap-4">Nothing in Your Favorites
            <MdHeartBroken size={36} color="red" /></p>
          </div>
          }
      </div>
    </div>
  );
}

export default Favorites;
