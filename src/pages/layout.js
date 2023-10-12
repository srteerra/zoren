/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { usePathname } from "next/navigation";
import { Profile } from "@/components/Profile";
import { Sidebar } from "@/components/Sidebar";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useZoren } from "../hooks/useZoren";
import AppContext from "@/context/AppContext";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { XCircleIcon } from "@heroicons/react/24/solid";

export default function Layout({ children }) {
  const router = useRouter();
  const route = usePathname();
  const { connected, publicKey } = useZoren();
  const { state } = useContext(AppContext);
  const limits = ["/", "/how", "/about"];

  setInterval(() => {
    if (state.userAddress && window.solana.publicKey) {
      if (window.solana.publicKey.toBase58() !== state.userAddress) {
        toast("Account change detected!");
        window.location.reload();
      }
    }
  }, 10000);

  useEffect(() => {
    if (
      !connected &&
      (route === "/dashboard" ||
        route === "/bills" ||
        route === "/friends" ||
        route === "/bills/[name]" ||
        route === "/settings")
    ) {
      router.push("/");
    }
  }, [connected]);

  // useEffect(() => {
  //   if (state.userAddress) {
  //     if (window.solana.publicKey.toBase58() !== state.userAddress) {
  //       window.location.reload();
  //     }
  //   }
  // }, [window.solana.publicKey]);

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
