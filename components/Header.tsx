"use client";

import Link from "next/link";
import MobSidebar from "./MobSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ShineBorder from "./ui/shine-border";
import { signOutUser } from "@/firebase/auth";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import SearchBar from "./SearchBar";

function Header() {

  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  const signOutHandler = async () => {
    signOutUser();
  };
  const mockFetchSuggestions = async (query: string): Promise<string[]> => {
    // Replace this with your API call
    const suggestions = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
    return suggestions.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <header className="bg-pallette1 p-4 flex flex-row items-center">
      <MobSidebar />
      <span className="text-white font-bold text-2xl mr-auto">
        <Link href="/">Prime Electronics</Link>
      </span>

      <div className="text-white mx-auto rounded p-0.5 border-2 border-pallette3 ">
        <SearchBar fetchSuggestions={mockFetchSuggestions}/>
      </div>

      <div
        className={`ml-auto text-white flex gap-1 mr-2 p-1 bg-pallette3 rounded-full hover:border-2`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="rounded-full">
              <AvatarImage
                className="rounded-full"
                src={user?.photoURL || "https://github.com/shadcn.png"}
                alt={user?.displayName?.charAt(0) ?? "N/A"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <ShineBorder>
              <DropdownMenuLabel className="">
                <span className="text-xl flex justify-center">
                  {user?.displayName}
                </span>
                <span className="font-thin">{user?.email}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:cursor-pointer">
                <Link href="/profile">
                  <span className="text-lg">Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer">
                <Link href="/orders">
                  <span className="text-lg">Orders</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer">
                <Link href="/wishlist">
                  <span className="text-lg">Wishlist</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer">
                <Link href="/cart">
                  <span className="text-lg">Cart</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="bg-red-600 p-2 rounded font-bold text-white hover:text-base">
                      Sign Out
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action will signout this account on this device.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 hover:bg-red-800"
                        onClick={signOutHandler}
                      >
                        Confirm Sign Out
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
            </ShineBorder>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Header;
