"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { CldImage } from "next-cloudinary";
import Spinner from "@/components/BlocksSpinner";

function Orders() {
  const { user, loading } = useAuth();

  const router = useRouter();

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
      <CldImage
        src="cld-sample-5" // Use this sample image or upload your own via the Media Explorer
        width="1000" // Transform the image: auto-crop to square aspect_ratio
        height="500"
        alt="text"
        quality="auto"
        crop={{
          type: "auto",
          source: true,
        }}
      />
    </div>
  );
}

export default Orders;
