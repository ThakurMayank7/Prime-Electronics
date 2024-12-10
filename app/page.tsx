"use client";

import Banner from "@/components/Banner";
import BestDeals from "@/components/BestDeals";
import Brands from "@/components/Brands";
import SearchByCategory from "@/components/SearchByCategory";
import { useAuth } from "@/hooks/useAuth";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (user === null && loading === false) {
      router.push("/login");
    }
  }, [user, router, loading]);

  if (loading) {
    return <p>loading...</p>;
  }




  return (
    <div className="flex flex-col flex-1">
      <Banner />

      <hr className="my-0.5" />

      <Brands/>
      <hr className="my-0.5" />

      <BestDeals />

      <hr className="my-0.5" />

      <SearchByCategory />
    </div>
  );
}
