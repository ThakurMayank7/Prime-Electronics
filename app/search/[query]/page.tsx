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
import { CldImage } from "next-cloudinary";

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

  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

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
      setIsRedirecting(true);
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

  if (loading || isRedirecting) {
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
      <h1>Related Items</h1>
      <div className="flex flex-col gap-2">
        {itemsData?.map((item) => (
          <div key={item.id}>
            <Card className="flex flex-row p-4">
              <CardHeader>
                <CldImage
                  className="mx-10"
                  src={item.displayImage || "samples/balloons"}
                  width="200" // Transform the image: auto-crop to square aspect_ratio
                  height="200"
                  alt="banner"
                  crop={{
                    type: "auto",
                    source: true,
                  }}
                />
              </CardHeader>
              <CardContent className="ml-10">
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <p>Card Content</p>
              </CardContent>
              <CardFooter className="ml-auto">
                {/* TODO add to cart */}
                {/* TODO add to wishlist */}
                {/* TODO buy now */}
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      <br />
      <h1>Related Brands</h1>
      <div className="flex flex-row gap-2">
        {brandsData?.map((brand) => (
          <Card key={brand.id}>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <CldImage
                src={brand.displayImage || "samples/balloons"}
                width="200" // Transform the image: auto-crop to square aspect_ratio
                height="200"
                alt="banner"
                crop={{
                  type: "auto",
                  source: true,
                }}
              />
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      <br />
      <h1>Related Categories</h1>
      <div className="flex flex-row gap-2">
        {categoriesData?.map((category) => (
          <Card
            key={category.id}
            className="flex flex-row items-center p-4 gap-4"
          >
            <div>
              <CardTitle className="text-4xl">{category.displayName}</CardTitle>
            </div>
            <div className="flex justify-center items-center w-full h-full my-auto">
              <button className="bg-pallette3 text-white p-2 rounded">
                See more
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
