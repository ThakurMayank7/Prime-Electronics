'use client';

import { MenuIcon } from 'lucide-react'
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

        <div className="bg-pallette6 hover:bg-pallette3 h-fit w-fit rounded p-1 hover:cursor-pointer"
        onClick={handleContraction}>

        <MenuIcon color='white' size={32}  className=' '/>
        </div>

<div className="my-4">
<Separator/>
</div>
    

<div className='space-y-1'>

        <div className="text-lg text- bg-pallette5 rounded p-2 font-semibold">
            <span>Profile</span>
        </div>
        <div className="text-lg text- bg-pallette5 rounded p-2  font-semibold">
            <span>Orders</span>
        </div>
        <div className="text-lg text- bg-pallette5 rounded p-2  font-semibold">
            <span>Wishlist</span>
        </div>
        <div className="text-lg text- bg-pallette5 rounded p-2 font-semibold">
            <span>Cart</span>
        </div>
</div>
       
        {/* {expand.toString()} */}
          
        
    </div>
  )
}

export default AppSidebar