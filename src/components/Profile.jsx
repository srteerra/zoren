"use client";
import { usePathname } from "next/navigation";
import {
  Bars3Icon,
  XMarkIcon,
  QrCodeIcon,
  PlusSmallIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Slide } from "react-awesome-reveal";
import { Collections } from "@/containers/Collections";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import DarkMode from "./DarkMode";
import RegionChange from "./Region";

// Images
import logo from "../../public/logos/horizontal-dark.png";

const Profile = () => {
  const [show, steShow] = useState(false);
  const route = usePathname();
  const active = "text-dark font-bold gap-6";

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
              <DarkMode />
              <RegionChange />
            </div>
            <ul className="flex flex-col text-center gap-6">
              {[
                ["Home", "/"],
                ["Collections", "/collections"],
                ["Inbox", "/inbox"],
                ["Settings", "/settings"],
              ].map(([title, href]) => (
                <li key={title}>
                  <Link
                    className={
                      route === href
                        ? active
                        : "text-dark text-large hover:opacity-60 gap-6 transition duration-150 ease-linear"
                    }
                    href={href}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="w-full flex flex-col items-center">
              <button className="w-1/2 hover:bg-dark dark:text-dark hover:text-white transition duration-150 ease-linear flex justify-center items-center gap-2 border-2 py-2 px-4 my-4 rounded-full">
                <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                Disconnect
              </button>
            </div>
          </div>
        </div>
      </Slide>
    </div>
  );

  if (route === "/") {
    null;
  } else {
    return (
      <aside className="flex lg:pt-10 justify-between md:justify-around flex-row-reverse lg:block w-full h-1/6 lg:h-screen lg:w-4/12 p-2 right-0">
        {show ? slide : null}
        {/* Menu title */}
        <div className="flex justify-between items-center  lg:p-2">
          <h3 className="hidden lg:block">My profile</h3>
          <button
            onClick={() => steShow(!show)}
            className="block lg:hidden text-slate-500 hover:text-slate-700"
          >
            <Bars3Icon className="h-8 w-8" />
          </button>
        </div>

        {/* Profile image */}
        <div className="flex lg:flex-col lg:my-10 lg:text-center min-[280]:justify-center items-center max-[280]:gap-2 gap-4">
          <div className="pl-2 lg:pl-0 w-1/3 lg:w-1/2 relative">
            <Image
              className="rounded-full"
              src={"https://picsum.photos/id/237/200/200"}
              alt="Profile"
              priority={true}
              height={200}
              width={200}
            />
            <button className="bg-white rounded-full h-8 w-8 hidden md:grid place-content-center absolute right-1 -bottom-1">
              <QrCodeIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Terra</span>
            <span
              className="text-slate-500 hover:cursor-copy"
              onClick={() => navigator.clipboard.writeText("Hola")}
            >
              BKEq...Rs4
            </span>
          </div>
        </div>

        {/* Collection section */}
        <section className="hidden lg:block p-0 xl:p-2">
          <div className="flex items-center justify-between">
            <span className="font-bold">My collection</span>
            <button>
              <PlusSmallIcon className="h-6 w-6" />
            </button>
          </div>
          {/* list of collections */}
          <div className="my-6">
            <Collections />
          </div>
        </section>
      </aside>
    );
  }
};

export { Profile };
