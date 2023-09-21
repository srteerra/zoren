import { faMugHot, faMoneyBills } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

const Bill = (data) => {
  const icons = [faMugHot, faMoneyBills];
  return (
    <button className="flex flex-col gap-8 justify-between p-10 bg-terce dark:bg-gray-800 rounded-2xl min-w-[280px] w-auto hover:brightness-90 hover:shadow-2xl group transition ease-out">
      {/* Head */}
      <div>
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <FontAwesomeIcon
              className="w-7 2xl:w-8 text-dark dark:text-white"
              icon={faMoneyBills}
            />
            <p className="font-bold pr-6 text-xl text-dark dark:text-white">Dinner</p>
          </div>
          <p className="font-bold text-xl text-primary dark:text-terce">5/5</p>
        </div>
        <div className="w-[30%] h-2 my-3 rounded-full bg-primary dark:bg-terce"></div>
      </div>
      {/* Foot */}
      <div className="flex justify-between group-hover:justify-center">
        <p className="group-hover:hidden flex gap-1">+5 People</p>
        <div className="hidden group-hover:flex gap-2">
          <p>Open</p>
          <ArrowTopRightOnSquareIcon width={20} />
        </div>
        <div className="group-hover:hidden flex gap-1 relative">
          <div className="w-7 h-7 absolute right-10 bottom-0 bg-dark rounded-full"></div>
          <div className="w-7 h-7 absolute right-5 bottom-0 bg-red-500 rounded-full"></div>
          <div className="w-7 h-7 absolute right-0 bottom-0 bg-blue-400 rounded-full"></div>
        </div>
      </div>
    </button>
  );
};

export { Bill };
