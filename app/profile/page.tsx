"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Heart, Package, ShoppingCart } from "lucide-react";
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

type profile = {
  name: string;
  email: string;
  gender: string;
  dob: string;
  contact: string;
};

function Profile() {
  const { user, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (user === null && loading === false) {
      router.push("/login");
    }
  }, [user, router, loading]);

  const [profile, setProfile] = useState<profile>();

  useEffect(() => {
    try {
      const getUserData = async () => {
        if (user?.uid) {
          const ref = doc(db, "users", user?.uid);
          const snap = await getDoc(ref);

          if (snap.exists()) {
            const data = snap.data();
            const profileData: profile = {
              name: data.name || "",
              email: data.email || "",
              gender: data.gender || "",
              dob: data.dob || "",
              contact: data.contact || "",
            };
            setProfile(profileData);
          }
        }
      };

      getUserData();
    } catch (error) {
      console.error("some error occurred", error);
    }
  }, [user?.uid]);

  if (loading) {
    return <p>loading...</p>;
  }

  const signOutHandler = async () => {
    signOutUser();
  };

  return (
    <div className="bg-cyan-100">
      <br />
      <div className="flex flex-col items-center bg-cyan-100">
        <Avatar className="w-48 h-48 border-4 border-pallette3">
          <AvatarImage
            src={user?.photoURL || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>
            {user?.displayName?.charAt(0) || "CN"}
          </AvatarFallback>
        </Avatar>
        <br />
        <span className="text-4xl font-semibold">{user?.displayName}</span>
        <span className="mt-2 bg-pallette5 p-1 rounded-full">
          {profile?.email}
        </span>
      </div>
      <br />
      <div className="flex flex-col m-2 bg-cyan-50  rounded p-2">
        <div className="flex">
          <span className="w-1/3 text-center">Name</span>
          <span>{profile?.name}</span>
        </div>
        <div className="flex">
          <span className="w-1/3 text-center">Email</span>
          <span>{profile?.email}</span>
        </div>
        <div className="flex">
          <span className="w-1/3 text-center">Gender</span>
          <span>{profile?.gender}</span>
        </div>
        <div className="flex">
          <span className="w-1/3 text-center">Date of Birth</span>
          <span>{profile?.dob}</span>
        </div>
        <div className="flex">
          <span className="w-1/3 text-center">Contact</span>
          <span>{profile?.contact}</span>
        </div>
      </div>

      <div className="flex flex-row justify-center pb-4 gap-2">
        <Card className="flex flex-col items-center">
          <CardHeader>
            <CardTitle>Your Cart</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-2">
            <ShoppingCart />
            <Link
              className="bg-green-400 rounded p-2 hover:bg-green-600"
              href="/cart"
            >
              Cart
            </Link>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center">
          <CardHeader>
            <CardTitle>Your Wishlist</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-2">
            <Heart />
            <Link
              className="bg-green-400 rounded p-2 hover:bg-green-600"
              href="/favorites"
            >
              Favorites
            </Link>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-2">
            <Package />
            <Link
              className="bg-green-400 rounded p-2 hover:bg-green-600"
              href="/orders"
            >
              Orders
            </Link>
          </CardContent>
        </Card>
      </div>
      <br />
      <div className="flex justify-center">
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
      </div>
      <br />
    </div>
  );
}

export default Profile;
