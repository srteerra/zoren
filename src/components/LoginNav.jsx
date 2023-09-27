"use clients";
import Image from "next/image";
import { DarkMode, DarkModeMobile } from "./DarkMode";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Slide } from "react-awesome-reveal";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import { useZoren } from "../hooks/useZoren";
import { truncate } from "../utils/string";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

require("@solana/wallet-adapter-react-ui/styles.css");

// Images
import logo from "../../public/logos/horizontal-color.png";
import logo_l from "../../public/logos/horizontal-light.png";
import RegionChange from "./Region";

const LoginNav = () => {
  const { t: translate } = useTranslation("loginav");
  const [show, steShow] = useState(false);
  const path = usePathname();

  const { connected } = useZoren();

  const active = "font-bold text-primary dark:text-secondary";

  const slide = (
    <div className="lg:hidden fixed z-20 top-0 right-0 w-full flex justify-end h-screen backdrop-brightness-75">
      <Slide direction="right" className="w-11/12 sm:w-8/12 lg:w-1/2">
        <div className="w-full h-full bg-white sm:rounded-l-2xl p-4 relative">
          <button
            onClick={() => steShow(!show)}
            className="absolute top-6 sm:top-10 right-[46%] sm:right-6 text-dark dark:text-dark"
          >
            <XMarkIcon className="h-8 w-8" />
          </button>
          <div className="py-6 sm:py-0 flex flex-col items-center justify-around h-full">
            <Link href={"/"} className="mx-auto">
              <Image src={logo} width={100} height={100} alt="logo" />
            </Link>
            <div className="w-full text-dark flex justify-center items-center gap-4">
              <DarkModeMobile />
              <RegionChange />
            </div>
            <ul className="flex flex-col gap-y-10 items-center">
              {[
                ["Home", "/"],
                ["How it works?", "/how"],
                ["About us", "/about"],
              ].map(([title, href]) => (
                <li key={title}>
                  <Link
                    className={
                      path === title
                        ? active
                        : "text-dark hover:text-secondary transition duration-150 ease-linear"
                    }
                    href={href}
                  >
                    {title}
                  </Link>
                </li>
              ))}
              <button className="bg-primary my-6 text-white hover:bg-secondary transition duration-150 ease-linear px-4 py-3 w-40 rounded-full">
                {translate("ConnectWallet")}
              </button>
            </ul>
          </div>
        </div>
      </Slide>
    </div>
  );

  return (
    <nav className="h-1/6 w-full">
      {show ? slide : null}
      <div className="w-4/5 h-full flex items-center justify-between mx-auto">
        <div className="block dark:hidden">
          <Image
            priority={true}
            src={logo}
            alt="logo"
            width={100}
            className="w-auto"
          />
        </div>
        <div className="hidden dark:block">
          <Image
            priority={true}
            src={logo_l}
            alt="logo"
            width={100}
            className="w-auto"
          />
        </div>

        <ul className="hidden lg:flex gap-x-10 items-center">
          {[
            ["Home", "/"],
            ["How it works?", "/how"],
            ["About us", "/about"],
          ].map(([title, href]) => (
            <li key={title}>
              <Link
                className={
                  path === href
                    ? active
                    : "hover:text-secondary transition duration-150 ease-linear"
                }
                href={href}
              >
                {title}
              </Link>
            </li>
          ))}
          <DarkMode />
          <WalletMultiButton className="flex items-center wallet-btn">
            <span className="text-sm">{translate("ConnectWallet")}</span>
          </WalletMultiButton>
          {/* <button className="bg-primary text-white hover:opacity-70 transition duration-150 ease-in px-10 py-3 rounded-full">
            Connect Wallet
          </button> */}
        </ul>

        <button onClick={() => steShow(!show)} className="block lg:hidden">
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["loginav"])),
    },
  };
}

export { LoginNav };
