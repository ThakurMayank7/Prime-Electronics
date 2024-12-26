"use client";

import Spinner from "@/components/BlocksSpinner";
import { db } from "@/firebase/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Item {
  id: string;
  itemName: string;
  displayImage: string;
  itemDescription: string;
}

function CategoryPage() {
  const pathname = usePathname();

  const { user, loading } = useAuth();

  const router = useRouter();

  const [items, setItems] = useState<Item[]>([]);

  const category = pathname?.split("/")[2];

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

  if (loading || items === null) {
    return (
      <div className="h-screen w-screen items-center flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      CategoryPage{category}
      {items && items.map((item) => <div key={item.id}>{item.itemName}</div>)}
    </div>
  );
}

export default CategoryPage;
