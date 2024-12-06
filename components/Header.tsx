"use client";

import Link from "next/link";
// import React, { useState } from 'react'
import MobSidebar from "./MobSidebar";
import { Filter } from "lucide-react";
import { Separator } from "./ui/separator";

function Header() {
  // const [opened,setOpened]=useState();

  // const headerSidebarAction=()=>{};

  return (
    <header className="bg-pallette1 p-4 flex flex-row items-center">
      <MobSidebar />
      <span className="text-white font-bold text-2xl mr-auto">
        <Link href="/">Prime Electronics</Link>
      </span>

      <div className="text-white mx-auto bg-pallette2 p-1  rounded border-2 border-pallette3 ">
        <div className="flex flex-row items-center bg-IcyBlue text-black rounded p-1">
          <span className="bg-white  rounded p-1 hover:bg-pallette6 hover:text-white hover cursor-pointer border-2 border-black">
            Search
          </span>

          <Separator
            orientation="vertical"
            className="bg-black h-8 ml-1 w-[1px] "
          />

          <div className=" ">
            <input
              className="rounded mx-1 text-black p-1 border-2 border-DarkNeutral"
              type="text"
              placeholder='Try : "Kettles"'
            />
          </div>
          <Separator orientation="vertical" className="bg-black h-8 mr-1" />

          <div className="bg-white p-1 rounded border-2 border-black hover:cursor-pointer hover:bg-gray-200">
            <Filter className="" />
          </div>
        </div>
      </div>

      <div className="ml-auto text-white flex gap-1 mr-2">Profile</div>
    </header>
  );
}

export default Header;
