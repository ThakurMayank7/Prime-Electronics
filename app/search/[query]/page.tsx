"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Spinner from "@/components/BlocksSpinner";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "@/firebase/firebaseConfig";

interface SearchResults {
  items?: string[];
  brands?: string[];
  categories?: string[];
}

function SearchPage() {
  const { user, loading } = useAuth();

  const router = useRouter();

  const searchParams = useSearchParams();

  const [searchResults, setSearchResults] = useState<SearchResults>({});

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
    setSearchResults({ items, brands, categories });
  }, [router, searchParams]);

  if (loading) {
    return (
      <div className="h-screen w-screen items-center flex justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      {searchResults.items}
      <br />
      {searchResults.brands}
      <br />
      {searchResults.categories}
    </div>
  );
}

export default SearchPage;
