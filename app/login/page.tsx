'use client';

import { checkExistingUser } from '@/actions/action';
import ShineBorder from '@/components/ui/shine-border';
import { signInWithGoogle } from '@/firebase/auth'
import { useAuth } from '@/hooks/useAuth';
import { LogInIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



export default function LoginPage() {

    const router=useRouter();


    const {user,loading}=useAuth();

    const [additionalPage,setAdditionalPage]=useState<boolean>(true);


    // const [date, setDate] = useState<Date>()








    useEffect(()=>{

        if(user!==null && loading===false)
        {


          const checkUser=async()=>{


            try{

              const existing=await checkExistingUser(user.email);

              if(existing===true)
              {
console.log('user exists')
              }
              else{
console.log('user do not exist')
setAdditionalPage(true);
              }
            }
            catch(error) {
              console.error(error);
            }
          }
          checkUser();



          // //TODO user data
          // const existing=checkExistingUser();

          // if(existing)
          // {
          //   //route to home page
          // }
          // else
          // {
            
              
              
          //     // go to additional data


          //   }


          // }


            // router.push("/");
        }
    },[user,loading,router]);


    const log=async()=>{
        await signInWithGoogle();
        
    }


const handleCreateUser=()=>{}








    

  return (
    <div className="h-screen w-screen flex items-center justify-center">

      <div className=" w-fit bg-gray-200">


    {!additionalPage?<div className=''>
      <ShineBorder className='flex items-center flex-col gap-10 p-10'>

      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.34 0 6.17 1.19 8.49 3.13l6.36-6.36C35.41 3.18 30.11 1 24 1 14.73 1 7.13 6.48 3.7 14.15l7.69 5.93C13.06 14.24 17.92 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.1 24.5c0-1.63-.15-3.21-.43-4.72H24v9h12.7c-.61 3.06-2.49 5.66-5.31 7.43l7.62 5.89c4.45-4.1 7.09-10.15 7.09-17.6z" />
      <path fill="#FBBC04" d="M12.9 29.85C11.97 27.9 11.5 25.76 11.5 23.5s.47-4.4 1.4-6.35L5.2 11.22C3.4 14.58 2.5 18.34 2.5 23c0 4.66.9 8.42 2.7 11.78l7.7-5.93z" />
      <path fill="#34A853" d="M24 46c6.11 0 11.29-2.01 15.06-5.45l-7.62-5.89c-2.1 1.4-4.79 2.24-7.44 2.24-6.07 0-11.23-4.04-13.06-9.47l-7.69 5.93C7.13 41.52 14.73 46 24 46z" />
      <path fill="none" d="M2 2h44v44H2z" />
    </svg>
  
    <button className="bg-white text-xl p-2 rounded flex gap-2 items-center border-2 border-black hover:text-2xl" onClick={log}><LogInIcon/>Sign In with Google</button>
      </ShineBorder>
    </div>
    :










    <div className='bg-white border-2 border-black rounded p-10'>

<form onSubmit={handleCreateUser} className='w-fit'>

<div className='flex flex-col items-center'>
<Avatar>
  <AvatarImage className="rounded-full" src={user?.photoURL || "https://github.com/shadcn.png"} />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>


      <span className='text-4xl font-semibold'>{user?.displayName}</span>
      <span className='text-sm bg-black text-white rounded-full p-1 mt-2'>{user?.email}</span>
</div>
<br />




<div className='flex flex-row my-4'>
  <span className='w-1/2 text-lg mr-1'>Date of Birth :</span>


      
  <input className='border-2 border-black rounded p-1' type="date" />




</div>
<div className='flex flex-row my-4'>
  <span className='w-1/2 text-lg mr-1'>Gender :</span>
  <div className='border-2 border-black rounded'>

  <Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Gender" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Male</SelectItem>
    <SelectItem value="dark">Female</SelectItem>
    <SelectItem value="system">Other</SelectItem>
  </SelectContent>
</Select>
  </div>

</div>
<div className='flex flex-row my-4'>
  <span className='w-1/2 text-lg mr-1'>Contact (IN) :</span>
<input type="tel" className='w-fit ml-4 text-center border-2 border-black'/>
</div>

<div className='flex flex-col items-center'>
<br />
<div>
<Checkbox/>
<span className='ml-1'>Accept Terms and Conditions</span>
</div>
<button className="p-2 bg-black text-white text-lg rounded" type="submit">Create Account</button>
</div>



</form>

    </div>
    }













      </div>
    </div>
  )
}