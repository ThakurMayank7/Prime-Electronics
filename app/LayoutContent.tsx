"use client";

import { PropsWithChildren } from "react";
import {  usePathname } from "next/navigation";
import Header from "@/components/Header";
import AppSidebar from "@/components/AppSidebar";


export default function LayoutContent({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const isLoginPage = pathname.startsWith("/login");

  return (
    <>
      {!isLoginPage && <Header />}
      <main className="flex">
        {!isLoginPage && <AppSidebar />}

        <div className="flex-1 m-1 bg-gray-100">{children}</div>
      </main>
    </>
  );
}
