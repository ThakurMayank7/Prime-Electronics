'use client'

import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {

  const {user,loading}=useAuth();

  const router=useRouter();

  

  useEffect(()=>{

    if(user===null)
    {
      
      router.push("/login");

      
    }
  },[user,router])
  
  if(loading)
  {
    return <p>loading...</p>
  }






  return (
    <div className="flex flex-col">
    <span className="bg-pallette1">abcde</span>
    <span className="bg-pallette2">abcde</span>
    <span className="bg-pallette3">abcde</span>
    <span className="bg-pallette4">abcde</span>
    <span className="bg-pallette5">abcde</span>
    <span className="bg-pallette6">abcde</span>
    <span className="bg-MediumNeutral">abcde</span>
    <span className="bg-DarkNeutral">abcde</span>
    <span className="bg-SoftPeach">abcde</span>
    <span className="bg-RustOrange">abcde</span>
    <span className="bg-WarmGold">abcde</span>
    <Separator orientation='vertical' className='bg-black'/>
    </div>
  );
}
