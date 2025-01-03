"use client";

import Spinner from "@/components/BlocksSpinner";
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
import { CldImage } from "next-cloudinary";
import { Minus, Package, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { updateCart, updateFavorites } from "@/actions/action";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ItemDetail {
  displayImage: string;
  itemName: string;
  itemDescription: string;
  itemId: string;
}

function Cart() {
  const { user, loading } = useAuth();

  const router = useRouter();

  const [cartItems, setCartItems] = useState<
    { item: string; number: number }[]
  >([]);

  const [cart, setCart] = useState<string[]>([]);

  const [itemsDetails, setItemsDetails] = useState<ItemDetail[]>([]);

  const [initialDetailsFetch, setInitialDetailsFetch] =
    useState<boolean>(false);

  const [favorites, setFavorites] = useState<string[]>([]);

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
            setCart(cart);
            const favorites: string[] = userSnapshot.data().favorites;
            setFavorites(favorites);
          }
        };
        fetchCartItems();
      } catch (err) {
        console.error(err);
      }
    }
  }, [user]);

  useEffect(() => {
    if (cart) {
      const temp: { item: string; number: number }[] = [];
      cart.forEach((cartItem: string) => {
        if (!temp.find((item) => item.item === cartItem)) {
          temp.push({
            item: cartItem,
            number: cart.filter((item: string) => item === cartItem).length,
          });
        }
      });
      setCartItems(temp);
      // console.log(temp,'this is temp')
      if (!initialDetailsFetch && temp.length > 0) {
        // console.log('fetching details')
        fetchCartItemsDetails(temp);
        setInitialDetailsFetch(true);
      }
    }
  }, [cart, initialDetailsFetch]);

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

  const addToCart = async (itemId: string) => {
    if (itemId && user?.uid) {
      const result = await updateCart([...cart, itemId], user?.uid);
      if (result) {
        if (cart) {
          setCart((prevItems) => [...prevItems, itemId]);
        } else {
          setCart([itemId]);
        }
      }
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (cartItems && user?.uid && itemId) {
      const temp: string[] = removeOneOccurrence([...cart], itemId);

      const result = await updateCart(temp, user?.uid);

      if (result) {
        setCart(temp);
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

  const addToFavorites = async (itemId: string) => {
    if (itemId && user?.uid) {
      let newFavorites: string[] = [];
      if (favorites !== undefined) {
        newFavorites = [...favorites, itemId];
      } else {
        newFavorites = [itemId];
      }
      const result = await updateFavorites(newFavorites, user?.uid);

      if (result) {
        if (favorites) {
          setFavorites((prevItems) => [...prevItems, itemId]);
        } else {
          setFavorites([itemId]);
        }
      }
    }
  };

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

  return (
    <div>
      <div className="flex flex-col gap-2">
        {cartItems &&
          cartItems.map((cartItem) => {
            const itemDetails: ItemDetail | undefined = itemsDetails.find(
              (item) => item.itemId === cartItem.item
            );

            if (itemDetails === undefined) {
              return (
                <p key={cartItem.item}>
                  There was some error. Please Reload this Page.
                  {/* undefined{cartItem.item}
                  {cartItem.number}
                  {itemDetails + "fsa"} */}
                </p>
              );
            }

            return (
              <Card key={cartItem.item} className="flex flex-row p-4">
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

                    {favorites !== undefined &&
                    favorites.includes(cartItem.item) ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <AiFillHeart
                              color="red"
                              size={24}
                              onClick={() => removeFromFavorites(cartItem.item)}
                            />
                          </TooltipTrigger>
                          <TooltipContent className="bg-red-400">
                            <p>Remove from Favorites</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <AiOutlineHeart
                              color="red"
                              size={24}
                              onClick={() => addToFavorites(cartItem.item)}
                            />
                          </TooltipTrigger>
                          <TooltipContent className="bg-red-400">
                            <p>Add to Favorites</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </CardTitle>
                  <br />
                  <CardDescription className="max-w-screen-md">
                    {itemDetails.itemDescription}
                  </CardDescription>
                </div>

                <div className="flex flex-col ml-auto my-auto">
                  <div className="bg-pallette3 text-white px-6 py-3 rounded-lg shadow-lg flex">
                    <button
                      className=""
                      onClick={() => removeFromCart(cartItem.item)}
                    >
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
                      {cartItem.number}
                    </div>
                    <Separator
                      orientation="vertical"
                      className="h-6 ml-auto mr-2"
                    />
                    <button
                      className=""
                      onClick={() => addToCart(cartItem.item)}
                    >
                      <Plus />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        {cartItems && cartItems.length > 0 && (
          <div className="flex items-center justify-center">
            <button
              onClick={() => router.push("/new-order?cart=true")}
              className="bg-green-800 rounded shadow-lg w-fit p-4 flex items-center justify-center flex-row gap-4 text-3xl text-white font-semibold"
            >
              <Package />
              Place an Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
