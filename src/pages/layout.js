"use client";
import { usePathname } from "next/navigation";
import { Profile } from "@/components/Profile";
import { Sidebar } from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useZoren } from "../hooks/useZoren";

export default function Layout({ children }) {
  const router = useRouter();
  const route = usePathname();

  const { connected, publicKey, setChangeWallet } = useZoren();
  const limits = ["/", "/how", "/about"];

  useEffect(() => {
    setChangeWallet(true);
    if (!connected) {
      router.push("/");
      setChangeWallet(false);
    }
  }, [connected]);

  return (
    <main className="flex flex-col-reverse lg:flex-row">
      <Sidebar />
      <div
        className={
          limits.includes(route)
            ? "w-full h-screen"
            : "w-full lg:w-2/3 xl:w-3/4 h-screen"
        }
      >
        {children}
      </div>
      <Profile />
    </main>
  );
}
