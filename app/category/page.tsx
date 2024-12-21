"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Category() {
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

  return <div>Category</div>;
}

export default Category;
