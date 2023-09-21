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
import { DarkModeMobile } from "./DarkMode";
import RegionChange from "./Region";

// Images
import logo from "../../public/logos/horizontal-dark.png";

const Profile = () => {
  const [show, steShow] = useState(false);
  const route = usePathname();
  const active = "text-dark font-bold gap-6";
  const limits = [
    '/',
    '/how',
    '/about',
  ]

  const slide = (
    <div className="lg:hidden fixed z-20 top-0 right-0 w-full flex justify-end h-screen backdrop-brightness-75">
      <Slide direction="right" className="w-[90%] sm:w-[50%] md:w-[40%] lg:w-[30%]">
        <div className="w-full h-full bg-white rounded-l-2xl p-4 relative">
          <button
            onClick={() => steShow(!show)}
            className="absolute top-6 sm:top-10 left-6 sm:left-10 text-dark dark:text-dark"
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
            <ul className="flex flex-col text-center gap-6">
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
              <button className="w-[70%] bg-dark text-white transition duration-150 ease-linear flex justify-center items-center gap-2 border-2 py-4 px-8 my-4 rounded-full">
                <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                Disconnect
              </button>
            </div>
          </div>
        </div>
      </Slide>
    </div>
  );

  if (limits.includes(route)) {
    null;
  } else {
    return (
      <aside className="flex pt-8 xl:py-16 justify-between xl:justify-around flex-row-reverse lg:block w-full h-1/6 lg:h-screen lg:w-4/12 px-4 sm:px-8 lg:px-16 right-0">
        {show ? slide : null}
        {/* Menu title */}
        <div className="flex justify-between items-center lg:p-2">
          <button
            onClick={() => steShow(!show)}
            className="block lg:hidden text-slate-500 hover:text-slate-700"
          >
            <Bars3Icon className="h-8 w-8" />
          </button>
        </div>

        {/* Profile image */}
        <div className="flex lg:flex-col lg:my-10 lg:text-center min-[280]:justify-center items-center max-[280]:gap-2 gap-4">
          <div className="pl-2 lg:pl-0 w-[25%] lg:w-1/2 relative">
            <Image
              className="rounded-full"
              src={"https://picsum.photos/id/237/200/200"}
              alt="Profile"
              priority={true}
              height={200}
              width={200}
            />
            <button className="bg-white rounded-full h-8 w-8 hidden lg:grid place-content-center absolute right-1 -bottom-1">
              <QrCodeIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl">Terra</span>
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
            <h3 className="font-bold">My bills</h3>
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
