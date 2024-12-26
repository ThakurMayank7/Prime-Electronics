"use client";

import { db } from "@/firebase/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Favorites() {
  const { user, loading } = useAuth();

  const router = useRouter();

  const [favorites, setFavorites] = useState<string[]>([]);

  const [cart, setCart] = useState<string[]>([]);

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
            setFavorites(userSnapshot.data().favorites);
            setCart(userSnapshot.data().cartItems);
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
      <div>
        {favorites}
        {cart}
      </div>
    </div>
  );
}

export default Favorites;
