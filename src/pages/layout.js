/* eslint-disable react-hooks/exhaustive-deps */
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
  const { connected } = useZoren();
  const limits = ["/", "/how", "/about"];

  useEffect(() => {
    if (!connected) {
      router.push("/");
    } else {
      router.push("/dashboard");
    }
  }, [connected]);

  return (
    <main className="flex flex-col-reverse lg:flex-row">
      <Sidebar />
      <div
        className={
          limits.includes(route)
            ? "w-full h-screen"
            : "w-full lg:w-2/3 xl:w-3/4 max-h-screen overflow-hidden"
        }
      >
        {children}
      </div>
      <Profile />
    </main>
  );
}
