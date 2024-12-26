"use client";

import { updateCart, updateFavorites } from "@/actions/action";
import Spinner from "@/components/BlocksSpinner";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { db } from "@/firebase/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Item {
  id: string;
  itemName: string;
  displayImageRef: string;
  itemDescription: string;
}

function CategoryPage() {
  const pathname = usePathname();

  const { user, loading } = useAuth();

  const router = useRouter();

  const [items, setItems] = useState<Item[]>([]);

  const category = pathname?.split("/")[2];

  const searchParams = useSearchParams();

  const categoryDisplay = searchParams.get("category");

  const [cart, setCart] = useState<string[]>([]);

  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (category && user) {
      try {
        const fetchRelatedItems = async () => {
          const itemsRef = collection(db, "items");
          const itemsQuery = query(
            itemsRef,
            where("category", "array-contains", category)
          );
          const itemsQuerySnapshot = await getDocs(itemsQuery);

          const itemsToPush: Item[] = [];
          itemsQuerySnapshot.forEach((doc) => {
            itemsToPush.push({
              id: doc.id,
              ...doc.data(),
            } as Item);
          });
          setItems(itemsToPush);
        };
        fetchRelatedItems();
        const fetchCartAndFavorites = async () => {
          const userSnapshot = await getDoc(doc(db, "users", user.uid));

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();

            setCart(userData.cartItems);
            setFavorites(userData.favorites);
          }
        };
        fetchCartAndFavorites();
      } catch (error) {
        console.error(error);
      }
    }
  }, [category, user]);

  useEffect(() => {
    if (user === null && loading === false) {
      router.push("/login");
    }
  }, [user, router, loading]);

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
    if (cart && user?.uid && itemId) {
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

  if (loading || items === null) {
    return (
      <div className="h-screen w-screen items-center flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-center my-2 gap-4">
        <h1 className="text-4xl font-semibold">
          Items Related to {categoryDisplay}
        </h1>
      </div>
      <Separator className="my-2" />
      {items &&
        items.map((item) => (
          <Card key={item.id} className="flex flex-row p-4">
            <CardHeader>
              <CldImage
                src={item.displayImageRef || "samples/balloons"}
                width="300"
                height="300"
                alt={item.itemName}
                className="rounded-lg shadow-lg object-cover"
              />
            </CardHeader>
            <div className="ml-10 my-10">
              <CardTitle className="flex flex-row gap-4 items-center">
                {item.itemName}

                {favorites !== undefined && favorites.includes(item.id) ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <AiFillHeart
                          color="red"
                          size={24}
                          onClick={() => removeFromFavorites(item.id)}
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
                          onClick={() => addToFavorites(item.id)}
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
                {item.itemDescription}
              </CardDescription>
            </div>

            <div className="flex flex-col ml-auto my-auto">
              <div className="bg-pallette3 text-white px-6 py-3 rounded-lg shadow-lg flex min-w-72">
                {cart && cart.length > 0 && cart.includes(item.id) ? (
                  <>
                    <button
                      className=""
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Minus />
                    </button>
                    <Separator
                      orientation="vertical"
                      className="h-6 mr-auto ml-2"
                    />
                    <button
                      className="flex flex-row gap-2 mx-4"
                      onClick={() => router.push("/cart")}
                    >
                      <ShoppingCart />
                      In Cart (
                      {cart.filter((itemA) => itemA === item.id).length})
                    </button>
                    <Separator
                      orientation="vertical"
                      className="h-6 ml-auto mr-2"
                    />
                    <button className="" onClick={() => addToCart(item.id)}>
                      <Plus />
                    </button>
                  </>
                ) : (
                  <button className="w-full" onClick={() => addToCart(item.id)}>
                    Add to Cart
                  </button>
                )}
              </div>
              <button
                className="mt-10 bg-teal-600 shadow-lg rounded-lg text-white py-4 text-xl hover:bg-teal-700"
                onClick={() => router.push(`/items/${item.id}`)}
              >
                Check Out!
              </button>
            </div>
          </Card>
        ))}
    </div>
  );
}

export default CategoryPage;
