"use client";

import Spinner from "@/components/BlocksSpinner";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Item {
  id: string;
  itemName: string;
  itemDescription: string;
  displayImageRef: string;
}

function NewOrder() {
  const { user, loading } = useAuth();

  const router = useRouter();

  const searchParams = useSearchParams();

  const isCart = searchParams.get("cart");

  const itemId = searchParams.get("itemId");

  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (isCart === "true") {
      try {
        console.log("fetching cart");

        const fetchCart = async () => {};
        fetchCart();
      } catch (error) {
        console.error(error);
      }
    }
  }, [isCart]);

  useEffect(() => {
    if (user === null && loading === false) {
      router.push("/login");
    }
  }, [user, router, loading]);

  if (loading) {
    return (
      <div className="h-screen w-screen items-center flex justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      NewOrder
      {isCart}
      {itemId}
    </div>
  );
}

export default NewOrder;
