'use client';
import { usePathname } from "next/navigation";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Sidebar = () => {
  const route = usePathname();
  const active = "text-white gap-6"
  if (route === "/") {
    null;
  } else {
    return (
      <aside className="hidden lg:flex flex-col items-center justify-around p-4 h-screen w-3/12 w-2xl:w-4/12 bg-primary">
        <div>
          <div className="flex flex-col items-center">
            <h1 className="text-white">Logo</h1>
          </div>
        </div>

        <ul className="flex flex-col text-center gap-6">
        {
          [['Home', '/'], ['Collections', '/collections'],['Inbox', '/inbox'],['Settings', '/settings']].map(([title, href]) => <li key={title}><Link className={route===href ? active : "text-slate-400 hover:text-white gap-6 transition duration-150 ease-linear"} href={href}>{title}</Link></li>)
        }
        </ul> 
        <div className="w-full flex flex-col items-center">
          <button className="w-2/3 bg-white transition flex justify-center items-center gap-2 border-2 py-2 px-4 my-4 dark:text-dark rounded-full">
            <ArrowLeftOnRectangleIcon className="w-6 h-6" />
            Disconnect
          </button>
        </div>
      </aside>
    );
  }
};

export { Sidebar };
