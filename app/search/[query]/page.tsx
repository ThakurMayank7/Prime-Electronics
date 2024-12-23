"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Spinner from "@/components/BlocksSpinner";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

function SearchPage() {
  const { user, loading } = useAuth();

  const router = useRouter();

  const pathname = usePathname();
  const queryParameter = pathname?.split("/")[2]; // Assuming the path is /search/[query]

  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const value = searchParams.get("value");

  useEffect(() => {
    if (user === null && loading === false) {
      router.push("/login");
    }
  }, [user, router, loading]);

  useEffect(() => {
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
  }, [type, value, router]);

  useEffect(() => {
    try {
      const fetchSearchResults = async () => {
        const itemsQuery = query(
          collection(db, "items"),
          where("category", "array-contains", queryParameter)
        );
        const itemsSnap = await getDocs(itemsQuery);
        itemsSnap.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
        const brandsQuery = query(
          collection(db, "brands"),
          where("category", "array-contains", queryParameter)
        );
        const brandsSnap = await getDocs(brandsQuery);
        brandsSnap.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      };
      fetchSearchResults();
    } catch (err) {
      console.log(err);
    }
  }, [queryParameter]);

  if (loading) {
    return (
      <div className="h-screen w-screen items-center flex justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      {queryParameter}
      <p>as</p>
      <br />
      {type}
      <br />
      {value}
    </div>
  );
}

export default SearchPage;
