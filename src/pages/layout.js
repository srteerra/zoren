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
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "layout"])),
    },
  };
}

export default function Layout({ children }) {
  const { t } = useTranslation("layout");
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
      {/* <Toaster>
        {(t) => (
          <ToastBar
            toast={t}
            style={{
              color: "#2C3333",
              background: "#FFFFFF",
              padding: "10px 20px",
              boxShadow: "0px 20px 67px 19px rgba(0,0,0,0.1)",
            }}
            position="top-center"
          >
            {({ message }) => (
              <>
                <XCircleIcon width={25} className="text-danger" />
                <span className="m-0 p-0">{message}</span>
              </>
            )}
          </ToastBar>
        )}
      </Toaster> */}
      <Sidebar t={t}/>
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
