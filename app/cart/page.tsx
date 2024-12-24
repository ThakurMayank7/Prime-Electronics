"use client";

import Spinner from "@/components/BlocksSpinner";
import { db } from "@/firebase/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CldImage } from "next-cloudinary";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { updateCart } from "@/actions/action";

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

  const addToCart = async () => {
      // if (itemId && user?.uid) {
      //   const result = await updateCart([...cartItems, itemId], user?.uid);
      //   if (result) {
      //     if (cartItems) {
      //       setCartItems((prevItems) => [...prevItems, itemId]);
      //     } else {
      //       setCartItems([itemId]);
      //     }
      //   }
      // }
    };
  
    const removeFromCart = async () => {
      // if (cartItems && user?.uid && itemId) {
      //   let temp: string[] = removeOneOccurrence([...cartItems], itemId);
  
      //   const result = await updateCart(temp, user?.uid);
  
      //   if (result) {
      //     setCartItems(temp);
      //   }
      // }
    };
  
    const removeOneOccurrence = (array: string[], item: string): string[] => {
      const index = array.indexOf(item);
      if (index !== -1) {
        array.splice(index, 1);
      }
      return array;
    };

  return (
    <div>
      <div>
        {itemsDetails &&
          itemsDetails.map((itemDetails) => (
            <Card key={itemDetails.itemId}
            className="flex flex-row p-4"
            >
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
                <CardTitle>{itemDetails.itemName}</CardTitle>
                <CardDescription>{itemDetails.itemDescription}</CardDescription>
              </div>
              
                {/* Call to Action */}
            <div className="flex flex-col ml-auto my-auto">
              <div className="bg-pallette3 text-white px-6 py-3 rounded-lg shadow-lg flex">
                
                    <button className="" onClick={() => removeFromCart()}>
                      <Minus />
                    </button>
                    <Separator
                      orientation="vertical"
                      className="h-6 mr-auto ml-2"
                    />
                    <div
                      className="mx-10 flex flex-row gap-2"
                      onClick={() => router.push("/cart")}
                    >
                      {itemDetails.number}
                    </div>
                    <Separator
                      orientation="vertical"
                      className="h-6 ml-auto mr-2"
                    />
                    <button className="" onClick={() => addToCart()}>
                      <Plus />
                    </button>
                  
            </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}

export default Cart;
