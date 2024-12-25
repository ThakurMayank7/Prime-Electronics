"use client";

import { db } from "@/firebase/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Wishlist() {
  const { user, loading } = useAuth();

  const router = useRouter();

  const [wishlist, setWishlist] = useState<string[]>([]);

  const [cart, setCart] = useState<string[]>([]);

  useEffect(() => {
    if (user === null && loading === false) {
      router.push("/login");
    }
  }, [user, router, loading]);

  useEffect(() => {
    if (user !== null)
      try {
        const fetchWishlist = async () => {
          const userSnapshot = await getDoc(doc(db, "users", user.uid));
          if (userSnapshot.exists()) {
            setWishlist(userSnapshot.data().wishlist);
            setCart(userSnapshot.data().cartItems);
          }
        };
        fetchWishlist();
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
        {wishlist}
        {cart}
      </div>
    </div>
  );
}

export default Wishlist;
