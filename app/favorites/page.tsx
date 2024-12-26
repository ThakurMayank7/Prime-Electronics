"use client";

import { db } from "@/firebase/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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
            return <div key={favorite}>{itemDetails?.itemId}</div>;
          })}
      </div>
    </div>
  );
}

export default Favorites;
