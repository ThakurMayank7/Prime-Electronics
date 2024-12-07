"use client";


// import { signOutUser } from "@/firebase/auth";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

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
    <div className="flex flex-col">
      

<div>
  this is banner
</div>








    </div>
  );
}
