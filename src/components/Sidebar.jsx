"use client";
import { usePathname } from "next/navigation";
import {
  ArrowLeftOnRectangleIcon,
  HomeIcon,
  BanknotesIcon,
  UserIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";

// Images
import logo from "../../public/logos/horizontal-light.png";
import icon from "../../public/logos/icon-light.png";

const Sidebar = () => {
  const route = usePathname();
  const active = "text-white font-bold gap-6";
  const limits = [
    '/',
    '/how',
    '/about',
  ]
  const { disconnect } = useWallet();

  if (limits.includes(route)) {
    null;
  } else {
    return (
      <aside className="hidden 2xl:flex flex-col items-center justify-around p-4 h-screen w-3/12 w-2xl:w-4/12 bg-primary dark:bg-gray-800">
        <div>
          <div className="flex flex-col items-center">
            <Link href={"/"}>
              <Image src={logo} width={100} height={100} alt="logo" />
            </Link>
          </div>
        </div>

        <ul className="flex flex-col text-start gap-3 w-full px-12">
          {[
            ["Home", "/dashboard"],
            ["Bills", "/bills"],
            ["Friends", "/friends"],
            ["Settings", "/settings"],
          ].map(([title, href]) => (
            <li key={title}>
              <Link
                className={
                  route === href
                    ? active
                    : "text-slate-400 hover:text-white gap-6 transition duration-150 ease-linear"
                }
                href={href}
              >
                {title === "Home" ? (
                  <div className="flex gap-4 items-center">
                    <div
                      className={
                        route === href
                          ? "bg-black/40 p-4 rounded-2xl"
                          : "bg-black/10 p-4 rounded-2xl"
                      }
                    >
                      <HomeIcon width={25} />
                    </div>{" "}
                    {title}
                  </div>
                ) : title === "Bills" ? (
                  <div className="flex gap-4 items-center">
                    <div
                      className={
                        route === href
                          ? "bg-black/40 p-4 rounded-2xl"
                          : "bg-black/10 p-4 rounded-2xl"
                      }
                    >
                      <BanknotesIcon width={25} />
                    </div>{" "}
                    {title}
                  </div>
                ) : title === "Friends" ? (
                  <div className="flex gap-4 items-center">
                    <div
                      className={
                        route === href
                          ? "bg-black/40 p-4 rounded-2xl"
                          : "bg-black/10 p-4 rounded-2xl"
                      }
                    >
                      <UserIcon width={25} />
                    </div>{" "}
                    {title}
                  </div>
                ) : (
                  <div className="flex gap-4 items-center">
                    <div
                      className={
                        route === href
                          ? "bg-black/40 p-4 rounded-2xl"
                          : "bg-black/10 p-4 rounded-2xl"
                      }
                    >
                      <Cog8ToothIcon width={25} />
                    </div>{" "}
                    {title}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
        <div className="w-full flex flex-col items-center">
          <button onClick={() => disconnect()} className="w-2/3 bg-white hover:opacity-70 transition flex justify-center items-center gap-2 border-2 py-3 px-6 my-4 dark:text-dark rounded-full">
            <ArrowLeftOnRectangleIcon width={25} />
            <span>Disconnect</span>
          </button>
        </div>
        <Image src={icon} width={50} height={50} alt="icon" />
      </aside>
    );
  }
};

export { Sidebar };
