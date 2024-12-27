"use client";

import Spinner from "@/components/BlocksSpinner";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/firebase/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { CldImage } from "next-cloudinary";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import AddressInputDialog from "@/components/AddressInputDialog";
import AddressDisplay from "@/components/AddressDisplay";
import PaymentDialog from "@/components/PaymentDialog";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { createNewOrder, updateCart } from "@/actions/action";

interface Item {
  id: string;
  itemName: string;
  itemDescription: string;
  displayImageRef: string;
}

interface Address {
  fullName: "";
  phone: "";
  email: "";
  streetAddress: "";
  addressLine2: "";
  city: "";
  state: "";
  postalCode: "";
  country: "";
  deliveryInstructions: "";
}

function NewOrder() {
  const { user, loading } = useAuth();

  const router = useRouter();

  const searchParams = useSearchParams();

  //   const itemId = searchParams.get("itemId");

  const [items, setItems] = useState<Item[]>([]);

  const [orderItems, setOrderItems] = useState<string[]>([]);

  const [address, setAddress] = useState<Address>({
    fullName: "",
    phone: "",
    email: "",
    streetAddress: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    deliveryInstructions: "",
  });

  const [paymentStatus, setPaymentStatus] = useState<
    "NotInitiated" | "Initiated" | "Successful" | "Failed"
  >("NotInitiated");

  const updatePaymentStatus = (
    status: "NotInitiated" | "Initiated" | "Successful" | "Failed"
  ) => {
    setPaymentStatus(status);
  };

  const [orders, setOrders] = useState<string[]>([]);

  useEffect(() => {
    if (paymentStatus === "Successful" && user) {
      const createOrder = async () => {
        const result = await createNewOrder({
          deliveryDetails: address,
          userId: user?.uid,
          items: orderItems,
          prevOrders: orders,
        });
        await updateCart([], user.uid);
        if (result) {
          router.push("/new-order/success");
        } else {
          updatePaymentStatus("Failed");
        }
      };
      createOrder();
    }
  }, [paymentStatus, address, orderItems, orders, router, user]);

  useEffect(() => {
    const isCart = searchParams.get("cart");

    if (isCart === "true" && user !== null) {
      try {
        const fetchCart = async () => {
          const userSnapshot = await getDoc(doc(db, "users", user?.uid));
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();

            const cart: string[] = userData.cartItems;

            const ordersOld = userData.orders;

            if (ordersOld) {
              setOrders(ordersOld);
            }

            if (cart) {
              setOrderItems(cart);

              const itemsToFetch: string[] = [];
              cart.forEach((cartItem) => {
                if (!itemsToFetch.includes(cartItem)) {
                  itemsToFetch.push(cartItem);
                }
              });

              if (itemsToFetch) {
                console.log(itemsToFetch);
                itemsToFetch.forEach(async (cartItem) => {
                  const itemSnapshot = await getDoc(doc(db, "items", cartItem));

                  if (itemSnapshot.exists()) {
                    const data = itemSnapshot.data();
                    console.log(data);
                    setItems((prev) => [
                      ...prev,
                      {
                        id: cartItem,
                        itemName: data.itemName,
                        itemDescription: data.itemDescription,
                        displayImageRef: data.displayImageRef,
                      },
                    ]);
                  }
                });
                // console.log(items)
              }
            }
          }
        };
        fetchCart();
      } catch (error) {
        console.error(error);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user === null && loading === false) {
      router.push("/login");
    }
  }, [user, router, loading]);

  const updateAddress = (data: Address) => {
    setAddress(data);
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
      <h1 className="text-4xl text-center font-semibold">New Order</h1>
      <Separator className="my-4 bg-black" />
      <br />
      <div>
        <h1 className="text-center font-semibold text-3xl">
          Items in your Order
        </h1>
        <br />
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
                </CardTitle>
                <br />
                <CardDescription className="max-w-screen-md">
                  {item.itemDescription}
                </CardDescription>
                <br />
                <span>
                  Quantity:
                  {
                    orderItems.filter((itemInOrder) => itemInOrder === item.id)
                      .length
                  }
                </span>
              </div>
            </Card>
          ))}
      </div>
      <br />
      <div className="flex items-center justify-center flex-col gap-4 my-6">
        {address.phone !== "" && <AddressDisplay {...address} />}
        <AddressInputDialog update={updateAddress} />
      </div>
      {address.phone !== "" && (
        <div className="flex items-center justify-center my-10">
          <PaymentDialog
            status={paymentStatus}
            changeStatus={updatePaymentStatus}
          />
        </div>
      )}
      {paymentStatus === "Failed" && (
        <Alert variant="destructive" className="my-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Your session has expired. Please log in again.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export default NewOrder;
