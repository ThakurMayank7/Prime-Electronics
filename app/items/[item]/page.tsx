"use client";

import { CldImage } from "next-cloudinary";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/BlocksSpinner";
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Separator } from "@/components/ui/separator";

import { FaStar, FaRegStar } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { updateCart, updateWishlist } from "@/actions/action";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ItemDetails {
  id: string;
  displayName: string;
  description: string;
  displayImage: string;
  price: number;
  features: string[];
  images: string[];
  brandId: string;
  category: string[];
  reviews: {
    uid: string;
    date: string;
    rating: number;
    review: string;
  }[];
}

interface ReviewUserDetails {
  uid: string;
  displayName: string;
  photoURL: string;
}

function ItemPage() {
  const pathname = usePathname();

  const itemId = pathname?.split("/")[2]; // Assuming the path is /items/[item]

  const { user, loading } = useAuth();

  const router = useRouter();

  const [itemDetails, setItemDetails] = React.useState<ItemDetails | null>(
    null
  );

  const [reviewUserDetails, setReviewUserDetails] = useState<
    ReviewUserDetails[]
  >([]);

  const [displayedImage, setDisplayedImage] = useState<string | null>(null);

  const [cartItems, setCartItems] = useState<string[]>([]);

  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    if (user !== null) {
      try {
        const fetchItemDetails = async () => {
          const itemSnapshot = await getDoc(doc(db, "items", itemId));

          if (itemSnapshot.exists()) {
            const itemData = itemSnapshot.data();
            setItemDetails({
              id: itemSnapshot.id,
              displayName: itemData.itemName,
              description: itemData.itemDescription,
              displayImage: itemData.displayImageRef,
              price: itemData.price,
              features: itemData.features,
              images: itemData.imagesRefs,
              brandId: itemData.brandId,
              category: itemData.category,
              reviews: itemData.reviews,
            });
            setDisplayedImage(itemData.displayImageRef);
            const reviews = itemData.reviews;
            if (reviews) {
              reviews.forEach(async (review: { uid: string }) => {
                const userSnapshot = await getDoc(doc(db, "users", review.uid));
                if (userSnapshot.exists()) {
                  const userData = userSnapshot.data();
                  setReviewUserDetails((prev) => [
                    ...prev,
                    {
                      uid: review.uid,
                      displayName: userData.name,
                      photoURL: userData.photoUrl,
                    },
                  ]);
                }
              });
            }
          }
        };
        fetchItemDetails();

        const fetchCartItems = async () => {
          const userSnapshot = await getDoc(doc(db, "users", user?.uid));
          if (userSnapshot.exists()) {
            setCartItems(userSnapshot.data().cartItems);
            setWishlist(userSnapshot.data().wishlist);
          }
        };
        fetchCartItems();
      } catch (e) {
        console.log(e);
      }
    }
  }, [itemId, user]);

  useEffect(() => {
    if (user === null && loading === false) {
      router.push("/login");
    }
  }, [user, router, loading]);

  if (loading || itemDetails === null) {
    return (
      <div className="h-screen w-screen items-center flex justify-center">
        <Spinner />
      </div>
    );
  }

  const changeDisplayedImage = (newImage: string) => {
    if (displayedImage !== newImage) setDisplayedImage(newImage);
  };

  const addToCart = async () => {
    if (itemId && user?.uid) {
      const result = await updateCart([...cartItems, itemId], user?.uid);
      if (result) {
        if (cartItems) {
          setCartItems((prevItems) => [...prevItems, itemId]);
        } else {
          setCartItems([itemId]);
        }
      }
    }
  };

  const removeFromCart = async () => {
    if (cartItems && user?.uid && itemId) {
      const temp: string[] = removeOneOccurrence([...cartItems], itemId);

      const result = await updateCart(temp, user?.uid);

      if (result) {
        setCartItems(temp);
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

  const addToWishlist = async () => {
    if (itemId && user?.uid) {
      let newWishlist: string[] = [];
      if (wishlist !== undefined) {
        newWishlist = [...wishlist, itemId];
      } else {
        newWishlist = [itemId];
      }
      const result = await updateWishlist(newWishlist, user?.uid);

      if (result) {
        if (wishlist) {
          setWishlist((prevItems) => [...prevItems, itemId]);
        } else {
          setWishlist([itemId]);
        }
      }
    }
  };

  const removeFromWishlist = async () => {
    if (wishlist && user?.uid && itemId) {
      if (wishlist.includes(itemId)) {
        const temp: string[] = removeOneOccurrence([...wishlist], itemId);
        const result = await updateWishlist(temp, user?.uid);

        if (result) {
          setWishlist(temp);
        }
      }
    }
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Item Details Section */}
        <div className="flex flex-col lg:flex-row">
          {/* Left Column: Item Image Gallery */}
          <div className="lg:w-1/2 flex flex-col items-center space-y-4">
            <CldImage
              src={displayedImage || "samples/balloons"}
              width="500"
              height="500"
              alt={itemDetails.displayName}
              className="rounded-lg shadow-lg object-cover"
            />
            <div className="flex space-x-4">
              {itemDetails.images.map((image, index) => (
                <CldImage
                  key={index}
                  onClick={() => changeDisplayedImage(image)}
                  src={image || "samples/balloons"}
                  width="100"
                  height="100"
                  alt={`Additional image ${index + 1}`}
                  className="rounded-lg shadow-md cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* Right Column: Item Info */}
          <div className="lg:w-1/2 lg:pl-10 mt-8 lg:mt-0">
            <h1 className="text-3xl font-semibold text-gray-800 flex flex-row gap-4 items-center">
              {itemDetails.displayName}
              {wishlist !== undefined && wishlist.includes(itemId) ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <AiFillHeart
                        color="red"
                        size={24}
                        onClick={() => removeFromWishlist()}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Remove from Wishlist</p>
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
                        onClick={() => addToWishlist()}
                      />
                    </TooltipTrigger>
                    <TooltipContent className="bg-red-400">
                      <p>Add to Wishlist</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </h1>
            <p className="text-xl text-gray-600 mt-2">
              ₹{Intl.NumberFormat("en-IN").format(itemDetails.price)}
            </p>
            <p className="text-lg text-gray-700 mt-4">
              {itemDetails.description}
            </p>

            {/* Features List */}
            <div className="mt-6">
              <h3 className="text-2xl font-medium text-gray-800">Features:</h3>
              <ul className="list-disc pl-6 text-gray-600 mt-2">
                {itemDetails &&
                  itemDetails?.features?.map((feature, index) => (
                    <li key={index} className="mt-1">
                      {feature}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Call to Action */}
            <div className="mt-8 flex space-y-4 flex-col">
              <div className="bg-pallette3 text-white px-6 py-3 rounded-lg shadow-lg flex">
                {cartItems &&
                cartItems.length > 0 &&
                cartItems.includes(itemId) ? (
                  <>
                    <button className="" onClick={() => removeFromCart()}>
                      <Minus />
                    </button>
                    <Separator
                      orientation="vertical"
                      className="h-6 mr-auto ml-2"
                    />
                    <button
                      className="mx-auto flex flex-row gap-2"
                      onClick={() => router.push("/cart")}
                    >
                      <ShoppingCart />
                      In Cart (
                      {cartItems.filter((item) => item === itemId).length})
                    </button>
                    <Separator
                      orientation="vertical"
                      className="h-6 ml-auto mr-2"
                    />
                    <button className="" onClick={() => addToCart()}>
                      <Plus />
                    </button>
                  </>
                ) : (
                  <button className="w-full" onClick={() => addToCart()}>
                    Add to Cart
                  </button>
                )}
              </div>
              <br />
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 flex flex-col space-y-4 border-2 border-black rounded p-2">
            <h1 className="text-3xl font-semibold text-gray-800 text-center">
              Reviews
            </h1>
            <Separator className="bg-black" />
            <div className="flex flex-col gap-1">
              {itemDetails.reviews?.map((review, index) => (
                <div
                  key={index}
                  className="flex flex-col space-y-2 border-2 border-black rounded p-2"
                >
                  <h1 className="text-2xl font-semibold text-gray-800">
                    <div className="flex flex-row items-center gap-2">
                      <Avatar className="border-black border-2">
                        <AvatarImage
                          src={reviewUserDetails.at(index)?.photoURL}
                        />
                        <AvatarFallback>
                          {reviewUserDetails.at(index)?.displayName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {reviewUserDetails.at(index)?.displayName}
                      {[1, 2, 3, 4, 5].map((star, index) =>
                        star <= review.rating ? (
                          <FaStar key={index} color="gold" size={24} />
                        ) : (
                          <FaRegStar key={index} color="gold" size={24} />
                        )
                      )}
                      <p className="text-lg text-gray-600 ml-auto">
                        {review.date}
                      </p>
                    </div>
                  </h1>
                  <p className="text-lg text-gray-600">{review.review}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 lg:pl-10 mt-8 lg:mt-0">sd</div>
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
