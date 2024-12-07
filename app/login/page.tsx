'use client';

import { signInWithGoogle } from '@/firebase/auth'
import { useAuth } from '@/hooks/useAuth';
import { LogInIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function LoginPage() {

    const router=useRouter();


    const {user,loading}=useAuth();


    useEffect(()=>{

        if(user!==null && loading===false)
        {
            router.push("/");
        }
    },[user,loading,router]);


    const log=async()=>{
        await signInWithGoogle();
        
    }
    

  return (
    <div className="h-screen w-screen flex items-center justify-center">

    <button className="bg-white text-xl p-2 rounded flex gap-2 items-center border-2 border-black hover:text-2xl" onClick={log}><LogInIcon/>Sign In with Google</button>
    <p>{user?.displayName}</p>
    </div>
  )
}