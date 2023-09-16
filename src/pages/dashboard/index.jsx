import ActionCenterDashboard from "@/components/ActionDash";
import { Collections } from "@/containers/Collections";
import Nav from "@/components/Nav";
import MostRecentTransactions from "@/components/RecentTransactions";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const dashboard = () => {
  return (
    <div className="py-10 px-4 sm:px-8 lg:px-16 h-screen lg:overflow-y-scroll">
        <Nav />
        <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-2 gap-12">
          {/* Balance card */}
          <div className="bg-secondary dark:bg-gray-600 p-12 lg:p-14 rounded-3xl text-light">
            <p className="text-lg">Your balance</p>
            <p className="text-5xl font-extrabold py-2">34 SOL</p>
            <p className="text-lg">
              <span>=</span> $642.63 USD
            </p>
          </div>
          {/* Reminder card */} 
          <div className="bg-black hidden md:block dark:bg-dark p-14 rounded-3xl text-light">
            <div>
              <p className="text-4xl">
                Hi, <span className="font-bold">Terra</span>
              </p>
              <p className="text-xl pt-2 font-light">
                Welcome to your dashboard
              </p>
            </div>
            <div className="pt-12">
              <Link href="/" className="text-lg font-light underline">
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

export default dashboard;
