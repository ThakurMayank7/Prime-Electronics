"use client";


import Meteors from "@/components/ui/meteors";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
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
      



<div className="w-full p-2 bg-background relative  flex-col items-center justify-center overflow-hidden">
    <Meteors/>

<NeonGradientCard className="w-full  items-center justify-center text-center">
  <div className="flex flex-col bg-gray-200 rounded p-4">
    <span className="text-4xl">

    Banner Content
    </span>
    <span className="text-4xl">

    Banner Content
    </span>
    <span className="text-4xl">

    Banner Content
    </span>
{/* <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <Meteors number={30} />
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Meteors
      </span>
    </div> */}


  </div>
      {/* <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
          Banner
      </span> */}
    </NeonGradientCard>
</div>




<div className="flex items-center justify-center p-20 w-full border-2 border-black">
  these are the brands
</div>






    </div>
  );
}
