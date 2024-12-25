"use client";

import { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import AppSidebar from "@/components/AppSidebar";
import Footer from "@/components/Footer";

export default function LayoutContent({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const isLoginPage = pathname.startsWith("/login");

  return (
    <>
      {!isLoginPage && <Header />}
      <main className="flex flex-1 min-h-screen">
        {!isLoginPage && <AppSidebar />}

        <div className="m-1  bg-gray-100 flex-1 overflow-hidden">
          {children}
        </div>
      </main>
      {!isLoginPage && <Footer />}
    </>
  );
}
