import Nav from "@/components/Nav";
import { QrCodeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import { useContext } from "react";
import AppContext from "@/context/AppContext";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";

import mexicoFlag from "../../../public/icons/mexico.png";
import usFlag from "../../../public/icons/estados-unidos.png";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "dashboard"])),
    },
  };
}

const Settings = () => {
  const { currency, setCurrency, currencies } = useContext(AppContext);
  const [changeCurrencySetting, setChangeCurrencySetting] = useState(0);

  const handleClick = (curr) => () => {
    setCurrency(curr);
  };

  const nav = {
    title: "settings",
    isSubpage: false,
    id: 4,
  };

  return (
    <div className="py-10 px-4 sm:px-8 lg:px-16 h-screen lg:overflow-y-scroll hiddenScroll">
      <Nav data={nav} />
      <div className="flex flex-col gap-12 mx-12 xl:mx-20">
        <div className="flex flex-col md:flex-row w-full items-center gap-12 rounded-lg">
          <p className="text-gray-500 p-0 m-0">Change currency:</p>
          <Menu as="div" className="flex items-center justify-center">
            <Menu.Button className="flex gap-2 justify-start items-center px-8 py-2 rounded-full border-2 border-gray-700">
              <Image
                src={currency === "usd" ? usFlag : mexicoFlag}
                className="w-[25px] md:w-[30px]"
                alt="lang"
                priority={true}
              />
              <p className="text-sm">{currency === "usd" ? "USD" : "MXN"}</p>
            </Menu.Button>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-9 w-56 origin-top-right divide-y divide-gray-100 rounded-2xl border-2 border-gray-700 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  {currencies.map((c) => (
                    <Menu.Item key={c}>
                      {({ active }) => (
                        <button
                          key={c}
                          onClick={handleClick(c)}
                          className={`${
                            active
                              ? " text-white bg-secondary dark:bg-gray-600"
                              : "text-gray-900"
                          } flex w-full gap-3 items-center justify-center rounded-md px-2 py-2`}
                        >
                          <Image
                            src={c === "usd" ? usFlag : mexicoFlag}
                            className="w-[25px] md:w-[30px]"
                            alt="lang"
                            priority={true}
                          />
                          <p className="text-sm">
                            {c === "usd" ? "USD" : "MXN"}
                          </p>
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Settings;
