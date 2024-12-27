import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  Heart,
  House,
  MenuIcon,
  Package,
  ShoppingCart,
  User,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";

function MobSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <MenuIcon color="white" size={36} className="block sm:hidden mr-4" />
      </SheetTrigger>
      <SheetContent side="left" className="bg-pallette2">
        <SheetHeader>
          <SheetTitle className="text-4xl text-green-100">
            Prime Electronics
          </SheetTitle>
          <SheetDescription className="">
            Lazy to go to store? We got you covered!
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4 bg-black" />
        <div className={`space-y-1`}>
          <div>
            <Link href="/">
              <div className="text-xl text- bg-pallette5 rounded p-2 font-semibold flex gap-2 items-center hover:bg-pallette6 hover:border-2 hover:cursor-pointer hover:text-white">
                <House />
                <span className="">Home</span>
              </div>
            </Link>
          </div>
          <div>
            <Link href="/profile">
              <div className="text-xl text- bg-pallette5 rounded p-2 font-semibold flex gap-2 items-center hover:bg-pallette6 hover:border-2 hover:cursor-pointer hover:text-white">
                <User />
                <span className="">Profile</span>
              </div>
            </Link>
          </div>
          <div>
            <Link href="/cart">
              <div className="text-xl text- bg-pallette5 rounded p-2  font-semibold flex gap-2 items-center hover:bg-pallette6 hover:border-2 hover:cursor-pointer hover:text-white">
                <ShoppingCart />
                <span className={``}>Cart</span>
              </div>
            </Link>
          </div>
          <div>
            <Link href="/favorites">
              <div className="text-xl text- bg-pallette5 rounded p-2  font-semibold flex gap-2 items-center hover:bg-pallette6 hover:border-2 hover:cursor-pointer hover:text-white">
                <Heart />
                <span className={``}>Favorites</span>
              </div>
            </Link>
          </div>

          <div>
            <Link href="/orders">
              <div className="text-xl text- bg-pallette5 rounded p-2 font-semibold flex gap-2 items-center hover:bg-pallette6 hover:border-2 hover:cursor-pointer hover:text-white">
                <Package />
                <span className={``}>Orders</span>
              </div>
            </Link>
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default MobSidebar;
