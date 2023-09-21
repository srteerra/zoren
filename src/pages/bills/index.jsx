import ActionCenterBills from "@/components/actions/ActionBills";
import { Collections } from "@/containers/Collections";
import Nav from "@/components/Nav";
import MostRecentBills from "@/components/RecentBills";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const bills = () => {
  return (
    <div className="py-10 px-4 sm:px-8 lg:px-16 h-screen lg:overflow-y-scroll hiddenScroll">
        <Nav />
        <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-3 gap-12">
          {/* Reminder card */} 
          <div className="bg-secondary md:col-span-2 dark:bg-dark p-16 rounded-3xl text-light">
            <div className="w-[60%]">
              <p className="2xl:text-4xl lg:text-3xl md:text-3xl">
                You have <span className="font-bold text-red-400">1</span> bill <span className="font-bold text-red-400">Incompleted</span> 
              </p>
              <p className="2xl:text-xl lg:text-md text-md pt-2 font-light">
              take a look on your list to identify the bill
              </p>
            </div>
          </div>
          <ActionCenterBills />
        </div>
        <MostRecentBills />
      </div>
  );
};

export default bills;
