import ActionCenterBills from "@/components/actions/ActionBills";
import { Collections } from "@/containers/Collections";
import Nav from "@/components/Nav";
import MostRecentBills from "@/components/RecentBills";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const bills = () => {
  return (
    <div className="py-0 xl:py-10 px-4 sm:px-8 lg:px-16 h-screen lg:overflow-y-scroll hiddenScroll">
        <Nav />
        <div className="grid grid-cols-1 grid-rows-3 xl:grid-rows-1 xl:grid-cols-3 gap-12">
          {/* Reminder card */} 
          <div className="bg-secondary row-start-1 row-span-3 col-start-1 col-span-1 lg:row-span-1 xl:row-start-1 xl:col-start-1 xl:col-span-2 dark:bg-gray-600 p-8 lg:p-12 xl:p-16 rounded-3xl text-light">
            <div className="w-full xl:w-[60%]">
              <p className="text-3xl 2xl:text-4xl lg:text-3xl md:text-3xl">
                You have <span className="font-bold text-red-500 dark:text-red-400">1</span> bill <span className="font-bold text-red-500 dark:text-red-400">Incompleted</span> 
              </p>
              <p className="text-lg 2xl:text-xl lg:text-md text-md pt-2 font-light">
              take a look on your list to identify the bill
              </p>
            </div>
          </div>
          <div className="row-start-2 row-span-2 col-start-1 xl:row-start-1 xl:col-start-3">
            <ActionCenterBills />
          </div>
        </div>
        <MostRecentBills />
      </div>
  );
};

export default bills;
