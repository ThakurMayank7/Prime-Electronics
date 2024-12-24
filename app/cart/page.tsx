"use client";

import Spinner from "@/components/BlocksSpinner";
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
  number: number;
}

function Cart() {
  const { user, loading } = useAuth();

  const router = useRouter();

  const [cartItems, setCartItems] = useState<
    { item: string; number: number }[]
  >([]);

  const [itemsDetails, setItemsDetails] = useState<ItemDetail[]>([]);

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
              fetchCartItemsDetails(temp);
            }
          }
        };
        fetchCartItems();
      } catch (err) {
        console.error(err);
      }
    }
  }, [user]);

  const fetchCartItemsDetails = async (
    cartItemsTemp: { item: string; number: number }[]
  ) => {
    const itemsDetailsToPush: ItemDetail[] = (
      await Promise.all(
        cartItemsTemp.map(async (cartItem) => {
          const itemSnap = await getDoc(doc(db, "items", cartItem.item));
          if (itemSnap.exists()) {
            const itemData = itemSnap.data();

            const temp: ItemDetail = {
              itemName: itemData.itemName,
              itemDescription: itemData.itemDescription,
              displayImage: itemData.displayImageRef,
              itemId: cartItem.item,
              number: cartItem.number,
            };

            return temp; // Return the item detail for Promise.all
          }
          return undefined; // Return undefined if no data
        })
      )
    ).filter((item): item is ItemDetail => item !== undefined);
    setItemsDetails(itemsDetailsToPush);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen items-center flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div>
        {itemsDetails &&
          itemsDetails.map((itemDetails) => (
            <div key={itemDetails.itemId}>{itemDetails.itemName}</div>
          ))}
      </div>
    </div>
  );
}

export default Cart;
