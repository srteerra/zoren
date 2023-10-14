/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();
  const route = usePathname();

  return (
    <main className="flex items-center justify-center w-full h-screen">
      <div className="text-center w-full flex flex-col gap-6">
        <h1 className="text-8xl">404</h1>
        <p className="text-2xl">Page not found</p>
        <button
          onClick={() => window.history.go(-1)}
          className="w-1/2 sm:w-1/3 lg:w-1/4 2xl:w-1/5 mx-auto hover:opacity-75 transition duartion-150 ease-linear py-2 px-4 bg-primary text-white rounded-full"
        >
          Go back
        </button>
      </div>
    </main>
  );
}
