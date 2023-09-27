"use client";
import ActionCenterDashboard from "@/components/actions/ActionDash";
import { Collections } from "@/containers/Collections";
import Nav from "@/components/Nav";
import MostRecentTransactions from "@/components/RecentTransactions";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useZoren } from "../../hooks/useZoren";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { connected, userName, userBalance } = useZoren();
  const nav = {
    title: "dashboard",
    isSubpage: false,
    id: 1
  };

  return (
    <div className="py-10 px-4 sm:px-8 lg:px-16 h-screen lg:overflow-y-scroll hiddenScroll">
      <Nav data={nav} />
      <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-2 gap-12">
        {/* Balance card */}
        <div className="bg-secondary dark:bg-gray-600 p-12 lg:p-14 rounded-3xl text-light">
          <p className="2xl:text-lg lg:text-md text-md">Your balance</p>
          <p className="2xl:text-5xl lg:text-4xl text-4xl font-extrabold py-2">
            {(userBalance) < 100 ? (
              userBalance.toString().slice(0, 4)
            ) : (userBalance) > 1000 ? (
              (userBalance).toString().slice(0, 7)
            ) : (
              (userBalance).toString().slice(0, 6)
            )} SOL
          </p>
          <p className="2xl:text-lg lg:text-md text-lg">
            <span>=</span> $642.63 USD
          </p>
        </div>
        {/* Reminder card */}
        <div className="bg-black hidden md:block dark:bg-dark p-14 rounded-3xl text-light">
          <div>
            <p className="2xl:text-4xl lg:text-3xl md:text-3xl">
              Hi, <span className="font-bold">{userName}</span>
            </p>
            <p className="2xl:text-xl lg:text-md text-md pt-2 font-light">
              Welcome to your dashboard
            </p>
          </div>
          <div className="pt-12">
            <Link
              href="/"
              className="2xl:text-lg lg:text-md text-md font-light underline"
            >
              Explore more
            </Link>
          </div>
        </div>
      </div>
      {/* Collection section */}
      <section className="block lg:hidden my-8">
        <div className="flex items-center justify-between">
          <span className="font-bold">My collection</span>
          <button>
            <PlusSmallIcon className="h-6 w-6" />
          </button>
        </div>
        {/* list of collections */}
        <div className="flex my-4">
          <Collections />
        </div>
      </section>
      <ActionCenterDashboard />
      <MostRecentTransactions />
    </div>
  );
};

export default Dashboard;
