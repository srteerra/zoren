"use client";
import Image from "next/image";
import { DarkMode, DarkModeMobile } from "./DarkMode";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Slide } from "react-awesome-reveal";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { useRouter } from "next/router";

require("@solana/wallet-adapter-react-ui/styles.css");

// Images
import logo from "../../public/logos/horizontal-color.png";
import logo_l from "../../public/logos/horizontal-light.png";
import RegionChange from "./Region";

const LoginNav = () => {
  const [show, steShow] = useState(false);
  const path = usePathname();
  const { connected } = useWallet();
  const { asPath, locale, locales } = useRouter();

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
                [
                  `${
                    locale === "fr"
                      ? "Accueil"
                      : locale === "es"
                      ? "Inicio"
                      : locale === "pt"
                      ? "Início"
                      : locale === "de"
                      ? "Heim"
                      : "Home"
                  }`,
                  "/",
                ],
                [
                  `${
                    locale === "fr"
                      ? "Comment ça marche ?"
                      : locale === "es"
                      ? "¿Cómo funciona?"
                      : locale === "pt"
                      ? "Como funciona?"
                      : locale === "de"
                      ? "Wie funktioniert es?"
                      : "How it works?"
                  }`,
                  "/how",
                ],
                [
                  `${
                    locale === "fr"
                      ? "À propos de nous"
                      : locale === "es"
                      ? "Sobre nosotros"
                      : locale === "pt"
                      ? "Sobre nós"
                      : locale === "de"
                      ? "Über uns"
                      : "About us"
                  }
              `,
                  "/about",
                ],
              ].map(([title, href]) => (
                <li key={title}>
                  <Link
                    className={
                      path === href
                        ? active
                        : "text-dark hover:text-secondary transition duration-150 ease-linear"
                    }
                    href={href}
                  >
                    {title}
                  </Link>
                </li>
              ))}
              <WalletMultiButton className="flex items-center wallet-btn">
                {connected ? (
                  <span className="text-sm">
                    {locale === "fr"
                      ? "Tableau de bord"
                      : locale === "es"
                      ? "Panel"
                      : locale === "pt"
                      ? "Painel"
                      : locale === "de"
                      ? "Dashboard"
                      : "Dashboard"}
                  </span>
                ) : (
                  <span className="text-sm">
                    {locale === "fr"
                      ? "Connecter le portefeuille"
                      : locale === "es"
                      ? "Conectar billetera"
                      : locale === "pt"
                      ? "Conectar carteira"
                      : locale === "de"
                      ? "Wallet verbinden"
                      : "Connect Wallet"}
                  </span>
                )}
              </WalletMultiButton>
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

        <div className="flex gap-x-8">
          <ul className="hidden relative lg:flex gap-x-10 pr-10 items-center">
            {[
              [
                `${
                  locale === "fr"
                    ? "Accueil"
                    : locale === "es"
                    ? "Inicio"
                    : locale === "pt"
                    ? "Início"
                    : locale === "de"
                    ? "Heim"
                    : "Home"
                }`,
                "/",
              ],
              [
                `${
                  locale === "fr"
                    ? "Comment ça marche ?"
                    : locale === "es"
                    ? "¿Cómo funciona?"
                    : locale === "pt"
                    ? "Como funciona?"
                    : locale === "de"
                    ? "Wie funktioniert es?"
                    : "How it works?"
                }`,
                "/how",
              ],
              [
                `${
                  locale === "fr"
                    ? "À propos de nous"
                    : locale === "es"
                    ? "Sobre nosotros"
                    : locale === "pt"
                    ? "Sobre nós"
                    : locale === "de"
                    ? "Über uns"
                    : "About us"
                }
              `,
                "/about",
              ],
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
            <div className="absolute z-20 right-0">
              <RegionChange />
            </div>
          </ul>
          {path === "/" ? (
            <div className="hidden lg:block">
              <WalletMultiButton className="flex items-center wallet-btn">
                {connected ? (
                  <span className="text-sm">
                    {locale === "fr"
                      ? "Tableau de bord"
                      : locale === "es"
                      ? "Panel"
                      : locale === "pt"
                      ? "Painel"
                      : locale === "de"
                      ? "Dashboard"
                      : "Dashboard"}
                  </span>
                ) : (
                  <span className="text-sm">
                    {locale === "fr"
                      ? "Connecter le portefeuille"
                      : locale === "es"
                      ? "Conectar billetera"
                      : locale === "pt"
                      ? "Conectar carteira"
                      : locale === "de"
                      ? "Wallet verbinden"
                      : "Connect Wallet"}
                  </span>
                )}
              </WalletMultiButton>
            </div>
          ) : null}
        </div>

        <button onClick={() => steShow(!show)} className="block lg:hidden">
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};

export { LoginNav };
