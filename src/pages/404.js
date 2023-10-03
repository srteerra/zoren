/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();
  const route = usePathname();

  return (
    <main className="flex flex-col-reverse lg:flex-row">
      <p>hello 404</p>
    </main>
  );
}
