"use client";
import { useContext } from "react";
import AppContext from "@/context/AppContext";
import { DarkMode } from "./DarkMode";
import RegionChange from "./Region";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";

function Nav({ data }) {
  const { perfMenu, setPerfMenu } = useContext(AppContext);
  const router = useRouter();
  return (
    <div className="w-full hidden lg:flex items-center justify-between py-12">
      <div className="flex gap-4">
        <button type="button" onClick={() => router.back()}>
          <ArrowLeftCircleIcon width={25} />
        </button>
        {data.isSubpage ? (
          <h2 className="capitalize">
            <Link
              href={`/${data.title}`}
              ref={data.id}
              className="opacity-60 capitalize"
            >
              {data.title} /{" "}
            </Link>
            {router.query.name}
          </h2>
        ) : (
          <h2 className="capitalize">{data.title}</h2>
        )}
      </div>
      <div className="items-center gap-4 hidden lg:flex">
        <DarkMode />
        <RegionChange />
        <button className="2xl:hidden" onClick={() => setPerfMenu(!perfMenu)}>
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default Nav;
