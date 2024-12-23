"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Spinner from "@/components/BlocksSpinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

interface SearchResults {
  items?: string[];
  brands?: string[];
  categories?: string[];
}

interface ItemData {
  id: string;
  name: string;
  description: string;
  displayImage: string;
}

function SearchPage() {
  const { user, loading } = useAuth();

  const router = useRouter();

  const searchParams = useSearchParams();

  const [itemsData, setItemsData] = useState<ItemData[]>([]);

  // const [brandsData, setBrandsData] = useState<any[]>([]);

  // const [categoriesData, setCategoriesData] = useState<any[]>([]);

  useEffect(() => {
    if (user === null && loading === false) {
      router.push("/login");
    }
  }, [user, router, loading]);

  useEffect(() => {
    const type = searchParams.get("type");
    const value = searchParams.get("value");
    const items = searchParams.get("items")?.split(",") || undefined;
    const brands = searchParams.get("brands")?.split(",") || undefined;
    const categories = searchParams.get("categories")?.split(",") || undefined;

    if (type && value) {
      let url: string = "";
      if (type === "item") {
        url = `/items/${value}`;
      } else if (type === "brand") {
        url = `/brands/${value}`;
      } else if (type === "category") {
        url = `/category/${value}`;
      }
      router.push(url);
    }

    fetchData({ items, brands, categories });
  }, [router, searchParams]);

  const fetchData = async ({ items, brands, categories }: SearchResults) => {
    try {
      console.log("fetching data");
      console.log(items);

      const itemsDataToAdd: ItemData[] = [];
      console.log(items);
      if (items) {
        for (const itemId of items) {
          console.log("id", itemId);
          const itemSnap = await getDoc(doc(db, "items", itemId));
          // console.log(itemSnap);
          if (itemSnap.exists()) {
            itemsDataToAdd.push({
              id: itemSnap.id,
              name: itemSnap.data().itemName,
              description: itemSnap.data().itemDescription,
              displayImage: itemSnap.data().displayImageRef,
            });
          }
        }
      }
      console.log("itemsDataToAdd", itemsDataToAdd);
      setItemsData(itemsDataToAdd);
    } catch (e) {
      console.log(e);
    }
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
      {itemsData?.map((item, index) => (
        <div key={index}>
          {item.name}
          {index}
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
      ))}
      <br />
      {/* {searchResults.brands?.map((brand, index) => (
        <div key={index}>
          {brand}
          {index}
        </div>
      ))}
      <br />
      {searchResults.categories?.map((category, index) => (
        <div key={index}>
          {category}
          {index}
        </div>
      ))} */}
    </div>
  );
}

export default SearchPage;
