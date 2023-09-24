import { faMugHot, faMoneyBills } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CollectionItem = (data) => {
  const icons = [
    faMugHot,
    faMoneyBills,
  ];
  return (
    <div className="w-full p-2 lg:p-0 my-2 xl:my-4 flex gap-4 flex-col justify-center lg:justify-normal lg:flex-row items-center transition ease-linear duration-150 dark:hover:opacity-60 hover:opacity-70 rounded-lg hover:cursor-pointer">
      <div className="w-auto p-5 rounded-2xl text-dark bg-terce dark:bg-gray-600 dark:text-white grid place-items-center">
        <FontAwesomeIcon className="w-7 2xl:w-6" icon={icons[data.icon]} />
      </div>

      <div className="flex flex-col justify-center items-center lg:items-start">
        <span className="font-bold text-md 2xl:text-lg">{data.title}</span>
        <span className="text-sm 2xl:text-md">6 Contributors</span>
      </div>
    </div>
  );
};

export { CollectionItem };
