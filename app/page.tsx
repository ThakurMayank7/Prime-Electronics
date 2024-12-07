"use client";






import Banner from "@/components/Banner";
// import { signOutUser } from "@/firebase/auth";
import { useAuth } from "@/hooks/useAuth";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (user === null && loading === false) {
      router.push("/login");
    }
  }, [user, router, loading]);

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div className="flex flex-col flex-1">
      <Banner/>



{/* <div className="flex-1 p-2 bg-background relative  flex-col items-center justify-center overflow-hidden">
    <Meteors/>

 
  <div className="flex-1  flex flex-col bg-gray-200 rounded p-4 relative">
    <span className="text-4xl">

    Banner Content
    </span>
    <span className="text-4xl">

    Banner Content
    </span>
    <span className="text-4xl">

    Banner Content
    </span>



  </div>
      
</div>




{/* TODO  max-->7 */}
{/*<div className="flex-1 flex flex-col  border-2 border-black ">
<div className="flex flex-1">

<span className="ml-2 text-2xl font-bold">Buy From Top Brands</span>
    
<button className="ml-auto flex justify-center items-center bg-slate-200 rounded-2xl mr-2 p-1 mt-1 hover:bg-slate-300">see more<ArrowRight/></button>

</div>
<div className="flex items-center justify-center p-2 flex-1">
  <Card>
  <CardHeader>
    <CardTitle className="text-xl font-bold text-center">Prestige</CardTitle>
    
  </CardHeader>
  <CardContent>
    
    <Image src="https://picsum.photos/200/200.jpg" alt="" width={20} height={20}
    layout="responsive"
    objectFit="cover"/>
  </CardContent>
  <CardFooter>
    
  </CardFooter>
</Card>
  <Card>
  <CardHeader>
    <CardTitle className="text-xl font-bold text-center">Prestige</CardTitle>
    
  </CardHeader>
  <CardContent>
    
    <Image src="https://picsum.photos/200/200.jpg" alt="" width={20} height={20}
    layout="responsive"
    objectFit="cover"/>
  </CardContent>
  <CardFooter>
    
  </CardFooter>
</Card>
  <Card>
  <CardHeader>
    <CardTitle className="text-xl font-bold text-center">Prestige</CardTitle>
    
  </CardHeader>
  <CardContent>
    
    <Image src="https://picsum.photos/200/200.jpg" alt="" width={20} height={20}
    layout="responsive"
    objectFit="cover"/>
  </CardContent>
  <CardFooter>
    
  </CardFooter>
</Card>
  <Card>
  <CardHeader>
    <CardTitle className="text-xl font-bold text-center">Prestige</CardTitle>
    
  </CardHeader>
  <CardContent>
    
    <Image src="https://picsum.photos/200/200.jpg" alt="" width={20} height={20}
    layout="responsive"
    objectFit="cover"/>
  </CardContent>
  <CardFooter>
    
  </CardFooter>
</Card>

</div>

</div>


*/}






{/* TODO best collections */}

{/*<Separator className="my-0.5 flex-1"/>




<div className="border-2 border-black  flex-1">
<div className="flex">

<span className="ml-2 text-2xl font-bold">Top Deals</span>
    
<button className="ml-auto flex justify-center items-center bg-slate-200 rounded-2xl mr-2 p-1 mt-1 hover:bg-slate-300">see more<ArrowRight/></button>

</div>

<div className="flex items-center justify-center p-2 flex-1">



<Card>
  <CardHeader>
    <CardTitle className="text-xl font-bold text-center">Refridgerator</CardTitle>
    
  </CardHeader>
  <CardContent>
    
    <Image src="https://picsum.photos/200/200.jpg" alt="" width={20} height={20}
    layout="responsive"
    objectFit="cover"/>
  </CardContent>
  <CardFooter>
    
  </CardFooter>
</Card>
<Card>
  <CardHeader>
    <CardTitle className="text-xl font-bold text-center">Refridgerator</CardTitle>
    
  </CardHeader>
  <CardContent>
    
    <Image src="https://picsum.photos/200/200.jpg" alt="" width={20} height={20}
    layout="responsive"
    objectFit="cover"/>
  </CardContent>
  <CardFooter>
    
  </CardFooter>
</Card>
<Card>
  <CardHeader>
    <CardTitle className="text-xl font-bold text-center">Refridgerator</CardTitle>
    
  </CardHeader>
  <CardContent>
    
    <Image src="https://picsum.photos/200/200.jpg" alt="" width={20} height={20}
    layout="responsive"
    objectFit="cover"/>
  </CardContent>
  <CardFooter>
    
  </CardFooter>
</Card>
<Card>
  <CardHeader>
    <CardTitle className="text-xl font-bold text-center">Washing Machine</CardTitle>
    
  </CardHeader>
  <CardContent>
    
    <Image src="https://picsum.photos/200/200.jpg" alt="" width={20} height={20}
    layout="responsive"
    objectFit="cover"/>
  </CardContent>
  <CardFooter>
    
  </CardFooter>
</Card>

</div>

</div>


<Separator className="my-0.5"/>






{/* TODO shop by category */}

{/*<div className="p-1 border-2 border-black  flex-1">

<div><Dot/>
  <span>Electric Kettles</span>
</div>

</div> */}



    </div>
  );
}
