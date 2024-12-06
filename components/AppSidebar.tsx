'use client';

import { Heart, MenuIcon, Package, ShoppingCart, User } from 'lucide-react'
import React, { useState } from 'react'
import { Separator } from './ui/separator';

function AppSidebar() {

  const [expand,setExpand]=useState(true);


    const handleContraction=()=>{

      setExpand(!expand);
      console.log(expand);
    };


  return (
    <div className={`bg-pallette2 h-screen  
    ${expand?"w-44":"w-16 flex flex-col items-center "}  
    p-2 hidden sm:block`}>  

<div className={`${expand?"":"flex justify-center"}`}>

        <div className={`bg-pallette6 hover:bg-pallette3 h-fit w-fit rounded p-1 hover:cursor-pointer hover:border-2 `}
        onClick={handleContraction}>

        <MenuIcon color='white' size={32}  className=' '/>
        </div>
</div>

<div className="my-4">
<Separator/>
</div>
    

<div className={`space-y-1 ${expand?"":"flex flex-col items-center "}`}>

        <div className="text-xl text- bg-pallette5 rounded p-2 font-semibold flex gap-2 items-center hover:bg-pallette6 hover:border-2 hover:cursor-pointer hover:text-white">
          <User/>
            <span className={`${expand?"":"hidden"}`}>Profile</span>
        </div>
        <div className="text-xl text- bg-pallette5 rounded p-2  font-semibold flex gap-2 items-center hover:bg-pallette6 hover:border-2 hover:cursor-pointer hover:text-white">
          <Package/>
            <span className={`${expand?"":"hidden"}`}>Orders</span>
        </div>
        <div className="text-xl text- bg-pallette5 rounded p-2  font-semibold flex gap-2 items-center hover:bg-pallette6 hover:border-2 hover:cursor-pointer hover:text-white">
          <Heart/>
            <span className={`${expand?"":"hidden"}`}>Wishlist</span>
        </div>
        <div className="text-xl text- bg-pallette5 rounded p-2 font-semibold flex gap-2 items-center hover:bg-pallette6 hover:border-2 hover:cursor-pointer hover:text-white">
          <ShoppingCart/>
            <span className={`${expand?"":"hidden"}`}>Cart</span>
        </div>
</div>
       
        {/* {expand.toString()} */}
          
        
    </div>
  )
}

export default AppSidebar