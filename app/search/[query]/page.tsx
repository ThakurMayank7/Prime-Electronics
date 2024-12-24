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
interface BrandData {
  id: string;
  name: string;
  description: string;
  displayImage: string;
}
interface CategoryData {
  id: string;
  displayName: string;
}

function SearchPage() {
  const { user, loading } = useAuth();

  const router = useRouter();

  const searchParams = useSearchParams();

  const [itemsData, setItemsData] = useState<ItemData[]>([]);

  const [brandsData, setBrandsData] = useState<BrandData[]>([]);

  const [categoriesData, setCategoriesData] = useState<CategoryData[]>([]);

  const [searchResultsFound, setSearchResultsFound] = useState<boolean>(true);

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
    if (
      ((items?.length || 0) >= 1 && items?.at(0) !== "") ||
      ((brands?.length || 0) >= 1 && brands?.at(0) !== "") ||
      ((categories?.length || 0) >= 1 && categories?.at(0) !== "")
    )
      fetchData({ items, brands, categories });
    else {
      setSearchResultsFound(false);
    }
  }, [router, searchParams]);

  const fetchData = async ({ items, brands, categories }: SearchResults) => {
    try {
      const itemsDataToAdd: ItemData[] = [];
      if (items) {
        for (const itemId of items) {
          const itemSnap = await getDoc(doc(db, "items", itemId));
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
      setItemsData(itemsDataToAdd);
      const brandsDataToAdd: BrandData[] = [];
      if (brands) {
        for (const brandId of brands) {
          const brandSnap = await getDoc(doc(db, "brands", brandId));
          if (brandSnap.exists()) {
            brandsDataToAdd.push({
              id: brandSnap.id,
              name: brandSnap.data().brandName,
              description: brandSnap.data().brandDescription,
              displayImage: brandSnap.data().logoRef,
            });
          }
        }
      }
      setBrandsData(brandsDataToAdd);
      const categoriesDataToAdd: CategoryData[] = [];
      if (categories) {
        const categorySnap = await getDoc(doc(db, "data", "Category"));
        if (categorySnap.exists()) {
          console.log(categorySnap.data());
          for (const index in categorySnap.data()) {
            if (categories.includes(index)) {
              const temporary: CategoryData = {
                displayName: categorySnap.data()[index],
                id: index,
              };
              categoriesDataToAdd.push(temporary);
            }
          }
        }
      }
      setCategoriesData(categoriesDataToAdd);
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
  if (!searchResultsFound) {
    return (
      <div>
        <h1>No search results found</h1>
      </div>
    );
  }
  return (
    <div>
      {itemsData?.map((item) => (
        <div key={item.id}>
          {item.name}
          {item.id}
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
