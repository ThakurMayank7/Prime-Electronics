import { LogInIcon } from 'lucide-react'
import React from 'react'

export default function LoginPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">

    <button className="bg-white text-xl p-2 rounded flex gap-2 items-center border-2 border-black hover:text-2xl"><LogInIcon/>Sign In with Google</button>
    </div>
  )
}