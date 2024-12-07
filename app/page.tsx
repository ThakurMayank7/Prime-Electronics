'use client'

import { Separator } from "@/components/ui/separator";
import { signOutUser } from "@/firebase/auth";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";


export default function Home() {

  const {user,loading}=useAuth();

  const router=useRouter();



  

  useEffect(()=>{

    if(user===null && loading===false)
    {

      router.push("/login");

      
    }
  },[user,router,loading])
  
  
  if(loading)
  {
    return <p>loading...</p>
  }




  const sout=async()=>{signOutUser()}


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
    <p>{user?.displayName}</p>
    <button className='p-2 bg-white text-xl' onClick={sout}>Sign Out</button>
    </div>
  );
}
