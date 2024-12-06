'use client';

import Link from 'next/link';
// import React, { useState } from 'react'
import MobSidebar from './MobSidebar';

function Header() {
// const [opened,setOpened]=useState();

// const headerSidebarAction=()=>{};

  return (
    <header className="bg-pallette1 p-4 flex flex-row items-center">

        <MobSidebar/>
        <span className='text-white font-bold text-lg mr-auto'>
            <Link href='/'>Prime Electronics</Link>
            </span>
        <div className='text-white mx-auto'>Search
            <input className='rounded mx-1 text-black p-1' type="text" />
        </div>
        <div className='ml-auto text-white flex gap-1 mr-2'>

            Profile
        </div>
    </header>
  )
}

export default Header