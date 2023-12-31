"use client";
import ActionCenterDashboard from "@/components/actions/ActionDash";
import { Collections } from "@/containers/Collections";
import Nav from "@/components/Nav";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useContext } from "react";
import AppContext from "@/context/AppContext";
import axios from "axios";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";


export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "dashboard"])),
    },
  };
}


const Dashboard = () => {
  const { state, currency } = useContext(AppContext);
  const [balanceUSD, setBalanceUSD] = useState(0);
  const { t } = useTranslation("dashboard");
  const nav = {
    title: t("Dashboard"),
    isSubpage: false,
    id: 1,
  };

  useEffect(() => {
    if (currency === "usd") {
      axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
      )
      .then((res) => {
        setBalanceUSD(res.data.solana.usd);
      });
    } else {
      axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=mxn"
      )
      .then((res) => {
        setBalanceUSD(res.data.solana.mxn);
      });
    }
  }, []);

  return (
    <div className="py-10 px-4 sm:px-8 lg:px-16 h-screen lg:overflow-y-scroll hiddenScroll">
      <Nav data={nav} />
      <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-2 gap-12">
        {/* Balance card */}
        <div className="bg-secondary dark:bg-gray-600 p-12 lg:p-14 rounded-3xl text-light">
          <p className="2xl:text-lg lg:text-md text-md">{t('YourBalance')}</p>
          <p className="2xl:text-5xl lg:text-4xl text-4xl font-extrabold py-2">
            {state.userBalance < 100
              ? state.userBalance.toString().slice(0, 4)
              : state.userBalance > 1000
              ? state.userBalance.toString().slice(0, 7)
              : state.userBalance.toString().slice(0, 6)}{" "}
            SOL
          </p>
          <p className="2xl:text-lg lg:text-md text-lg">
            <span>=</span> $
            {balanceUSD * state.userBalance < 100
              ? (balanceUSD * state.userBalance).toString().slice(0, 5)
              : balanceUSD * state.userBalance > 1000
              ? (balanceUSD * state.userBalance).toString().slice(0, 7)
              : (balanceUSD * state.userBalance).toString().slice(0, 6)}{" "}
            {currency.toUpperCase()}
          </p>
        </div>
        {/* Reminder card */}
        <div className="bg-black hidden md:block dark:bg-dark p-14 rounded-3xl text-light">
          <div>
            <p className="2xl:text-4xl lg:text-3xl md:text-3xl">
              {t('Hi')}, <span className="font-bold">{state.userName}</span>
            </p>
            <p className="2xl:text-xl lg:text-md text-md pt-2 font-light">
              {t('Welcome')}
            </p>
          </div>
          <div className="pt-12">
            <Link
              href="/bills"
              className="2xl:text-lg lg:text-md text-md font-light underline"
            >
              {t('Explore')}
            </Link>
          </div>
        </div>
      </div>
      {/* Collection section */}
      <section className="block lg:hidden my-8">
        <div className="flex items-center justify-between">
          <span className="font-bold">{t('Mycollection')}</span>
          <button>
            <PlusSmallIcon className="h-6 w-6" />
          </button>
        </div>
        {/* list of collections */}
        <div className="flex flex-nowrap my-4 max-w-full overflow-x-scroll">
          <Collections />
        </div>
      </section>
      <ActionCenterDashboard t={t}/>
    </div>
  );
};

export default Dashboard;
