import { Html, Head, Main, NextScript } from "next/document";
import { useZoren } from "../hooks/useZoren";
import { useEffect, useState } from "react";

export default function Document() {
  const { changeWallet } = useZoren();

  return (
    <Html lang="en">
      <Head />
      <body>
        {changeWallet ? (
          <div className="bg-black h-screen w-screen"></div>
        ) : (
          <></>
        )}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
