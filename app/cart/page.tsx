"use client";

import Spinner from "@/components/BlocksSpinner";
import { db } from "@/firebase/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Cart() {
  const { user, loading } = useAuth();

  const router = useRouter();

  const [cartItems, setCartItems] = useState<
    { item: string; number: number }[]
  >([]);

  useEffect(() => {
    if (user === null && loading === false) {
      router.push("/login");
    }
  }, [user, router, loading]);

  useEffect(() => {
    if (user?.uid) {
      try {
        const fetchCartItems = async () => {
          const userSnapshot = await getDoc(doc(db, "users", user?.uid));
          if (userSnapshot.exists()) {
            const cart: string[] = userSnapshot.data().cartItems;
            if (cart) {
              const temp: { item: string; number: number }[] = [];
              cart.forEach((cartItem: string) => {
                if (!temp.find((item) => item.item === cartItem)) {
                  temp.push({
                    item: cartItem,
                    number: cart.filter((item: string) => item === cartItem)
                      .length,
                  });
                }
              });
              setCartItems(temp);
            }
          }
        };
        fetchCartItems();
      } catch (err) {
        console.error(err);
      }
    }
  }, [user]);

  if (loading) {
    return (
      <div className="h-screen w-screen items-center flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div>{cartItems.toString()}</div>
    </div>
  );
}

export default Cart;
