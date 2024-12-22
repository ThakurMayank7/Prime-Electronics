"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Spinner from "@/components/BlocksSpinner";

function SearchPage() {
  const { user, loading } = useAuth();

  const router = useRouter();

  const pathname = usePathname();
  const query = pathname?.split("/")[2]; // Assuming the path is /search/[query]

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
      {query}
      <p>as</p>
    </div>
  );
}

export default SearchPage;
