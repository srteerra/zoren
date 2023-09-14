import { faMugHot, faMoneyBills } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CollectionItem = (data) => {
  const icons = [
    faMugHot,
    faMoneyBills,
  ];
  return (
    <div className="w-full p-2 lg:p-0 my-2 flex flex-col justify-center lg:justify-normal lg:flex-row  items-center lg:gap-4 transition ease-linear duration-150 hover:bg-slate-200 rounded-lg hover:cursor-pointer">
      <div className="w-10 h-10 rounded-lg text-dark bg-secondary grid place-items-center">
        <FontAwesomeIcon className="w-5 h-5" icon={icons[data.icon]} />
      </div>

      <div className="flex flex-col justify-center items-center lg:items-start">
        <span className="font-bold text-sm">{data.title}</span>
        <span className="text-xs">6 Contributors</span>
      </div>
    </div>
  );
};

export { CollectionItem };
