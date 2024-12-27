"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function About() {
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

  return <div>About</div>;
}

export default About;
