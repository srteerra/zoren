import { Fade } from "react-awesome-reveal";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmerica } from "@fortawesome/free-solid-svg-icons";

import mexicoFlag from "../../public/icons/mexico.png";
import usFlag from "../../public/icons/estados-unidos.png";

const RegionChange = () => {
  const [click, setClick] = useState(false);
  const { locale, locales, pathname, push } = useRouter();

  const handleClick = (l) => () => {
    push(pathname, undefined, { locale: l });
  };

  return (
    <Menu as="div" className="flex items-center justify-center">
      <div>
        <Menu.Button className="flex gap-2 justify-center items-center">
        <FontAwesomeIcon className="w-5 h-5 hover:scale-105 transition duration-150 ease-linear" icon={faEarthAmerica} />
        </Menu.Button>
      </div>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-9 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            {locales.map((l) => (
              <Menu.Item key={l}>
                {({ active }) => (
                  <button
                    key={l}
                    onClick={handleClick(l)}
                    className={`${
                      active ? " text-white bg-secondary dark:bg-gray-600" : "text-gray-900"
                    } flex w-full gap-3 items-center justify-center rounded-md px-2 py-2`}
                  >
                    <Image
                      src={l === "en" ? usFlag : mexicoFlag}
                      className="w-[25px] md:w-[30px]"
                      alt="lang"
                      priority={true}
                    />
                    <p className="text-sm">
                      {l === "en" ? "English" : "Spanish"}
                    </p>
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default RegionChange;
