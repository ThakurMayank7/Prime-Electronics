"use client";

import { checkExistingUser, createNewUser } from "@/actions/action";
import ShineBorder from "@/components/ui/shine-border";
import { signInWithGoogle, signOutUser } from "@/firebase/auth";
import { useAuth } from "@/hooks/useAuth";
import { LogInIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

type user = {
  uid: string;
  email: string;
  name: string;
  dob: string;
  contact: string;
  gender: string;
  photoUrl: string;
};

export default function LoginPage() {
  const router = useRouter();

  const { user, loading } = useAuth();

  const [additionalPage, setAdditionalPage] = useState<boolean>(false);

  const [date, setDate] = useState("");

  const [phone, setPhone] = useState<string>("");

  const [gender, setGender] = useState("");

  const [alert, setAlert] = useState<boolean>(false);

  const [userCreated, setUserCreated] = useState<boolean>(false);

  useEffect(() => {
    if (user === null && loading === false && additionalPage === true) {
      setAdditionalPage(false);
    }

    if (user !== null && loading === false && userCreated) {
      router.push("/");
    }

    if (user !== null && loading === false) {
      const checkUser = async () => {
        try {
          const existing = await checkExistingUser(user.uid);

          if (existing === true) {
            router.push("/");

            console.log("user exists");
          } else {
            console.log("user do not exist");
            setAdditionalPage(true);
          }
        } catch (error) {
          console.error(error);
        }
      };
      checkUser();
    }
  }, [user, loading, router, additionalPage, userCreated]);

  const log = async () => {
    await signInWithGoogle();
  };

  const handleCreateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (phone.length !== 10) setAlert(true);

    if (date && phone.length === 10 && gender) {
      if (user?.displayName && user.email && user.uid) {
        const newUser: user = {
          name: user?.displayName,
          email: user?.email,
          contact: phone,
          uid: user?.uid,
          dob: date,
          gender: gender,
          photoUrl: user?.photoURL || "",
        };
        const result: boolean = await createNewUser(newUser);
        if (result === true) {
          setUserCreated(true);
          router.push("/");
        } else {
          console.error("Some Error Occurred in creating Account!");
        }
      }
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleGenderChange = (value: string) => {
    setGender(value); // Update state with selected value
  };

  const handleGoBack = () => {
    signOutUser();
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className=" w-fit bg-gray-200">
        {!additionalPage ? (
          <div className="">
            <ShineBorder className="flex items-center flex-col gap-10 p-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.34 0 6.17 1.19 8.49 3.13l6.36-6.36C35.41 3.18 30.11 1 24 1 14.73 1 7.13 6.48 3.7 14.15l7.69 5.93C13.06 14.24 17.92 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.1 24.5c0-1.63-.15-3.21-.43-4.72H24v9h12.7c-.61 3.06-2.49 5.66-5.31 7.43l7.62 5.89c4.45-4.1 7.09-10.15 7.09-17.6z"
                />
                <path
                  fill="#FBBC04"
                  d="M12.9 29.85C11.97 27.9 11.5 25.76 11.5 23.5s.47-4.4 1.4-6.35L5.2 11.22C3.4 14.58 2.5 18.34 2.5 23c0 4.66.9 8.42 2.7 11.78l7.7-5.93z"
                />
                <path
                  fill="#34A853"
                  d="M24 46c6.11 0 11.29-2.01 15.06-5.45l-7.62-5.89c-2.1 1.4-4.79 2.24-7.44 2.24-6.07 0-11.23-4.04-13.06-9.47l-7.69 5.93C7.13 41.52 14.73 46 24 46z"
                />
                <path fill="none" d="M2 2h44v44H2z" />
              </svg>

              <button
                className="bg-white text-xl p-2 rounded flex gap-2 items-center border-2 border-black hover:text-2xl"
                onClick={log}
              >
                <LogInIcon />
                Sign In with Google
              </button>
            </ShineBorder>
          </div>
        ) : (
          <div className="bg-white border-2 border-black rounded p-10">
            <form onSubmit={handleCreateUser} className="w-fit">
              <div className="flex flex-col items-center">
                <Avatar>
                  <AvatarImage
                    className="rounded-full"
                    src={user?.photoURL || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <span className="text-4xl font-semibold">
                  {user?.displayName}
                </span>
                <span className="text-sm bg-black text-white rounded-full p-1 mt-2">
                  {user?.email}
                </span>
              </div>
              <br />

              <div className="flex flex-row my-4">
                <span className="w-1/2 text-lg mr-1">Date of Birth :</span>

                <input
                  className="border-2 border-black rounded p-1"
                  type="date"
                  value={date}
                  onChange={handleDateChange}
                  required
                />
              </div>
              <div className="flex flex-row my-4">
                <span className="w-1/2 text-lg mr-1">Gender :</span>
                <div className="border-2 border-black rounded">
                  <Select required onValueChange={handleGenderChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Enter your Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-row my-4">
                <span className="w-1/2 text-lg mr-1">Contact (IN) :</span>
                <input
                  type="tel"
                  className="w-fit ml-4 text-center border-2 border-black rounded"
                  required
                  value={phone}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPhone(event.target.value)
                  }
                />
              </div>

              <div className="flex flex-col items-center">
                <br />

                {alert && (
                  <>
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        Please enter a valid Mobile Number!
                      </AlertDescription>
                    </Alert>
                    <br />
                  </>
                )}

                <div>
                  <Checkbox required />
                  <span className="ml-1">
                    Accept{" "}
                    <Link className="font-semibold" href="/tandc">
                      Terms and Conditions
                    </Link>
                  </span>
                </div>
                <button
                  className="p-2 bg-black text-white text-lg rounded"
                  type="submit"
                >
                  Create Account
                </button>
              </div>
            </form>
            <button
              className="mt-4  p-1 border-2 hover:bg-gray-200 rounded"
              onClick={handleGoBack}
            >
              Choose other Gmail
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
