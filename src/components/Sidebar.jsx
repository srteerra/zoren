"use client";
import { usePathname } from "next/navigation";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";

// Images
import logo from "../../public/logos/horizontal-light.png";
import icon from "../../public/logos/icon-light.png";

const Sidebar = () => {
  const route = usePathname();
  const active = "text-white gap-6";
  if (route === "/") {
    null;
  } else {
    return (
      <aside className="hidden lg:flex flex-col items-center justify-around p-4 h-screen w-3/12 w-2xl:w-4/12 bg-primary dark:bg-gray-800">
        <div>
          <div className="flex flex-col items-center">
            <Link href={"/"}>
              <Image src={logo} width={100} height={100} alt="logo" />
            </Link>
          </div>
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
                    : "text-slate-400 hover:text-white gap-6 transition duration-150 ease-linear"
                }
                href={href}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="w-full flex flex-col items-center">
          <button className="w-2/3 bg-white transition flex justify-center items-center gap-2 border-2 py-2 px-4 my-4 dark:text-dark rounded-full">
            <ArrowLeftOnRectangleIcon className="w-6 h-6" />
            Disconnect
          </button>
        </div>
        <Image src={icon} width={50} height={50} alt="icon" />
      </aside>
    );
  }
};

export { Sidebar };
