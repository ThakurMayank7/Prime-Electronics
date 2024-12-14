'use client'

import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import Spinner from "./BlocksSpinner";

function Banner() {

  const [loading,setLoading]=useState<boolean>(false);

  useEffect(()=>{
setLoading(true);

    try{


      setLoading(false);

    }
    catch(e)
    {console.error(e)}
  },[])


  return (
    <div className="border-2 border-black rounded p-1">
      {loading?
    <div className="flex items-center justify-center">

      <Spinner/>
    </div>
    
    :  
    
      <Carousel/>
    }
    </div>
  );
}

export default Banner;
