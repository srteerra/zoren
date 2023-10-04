'use client';
import Nav from "@/components/Nav";
import { TrashIcon, CheckIcon } from "@heroicons/react/24/solid";
import { ExclamationCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import DeleteBillModal from "@/components/billFunctions/deleteModal";
import axios from "axios";
import SetBillModal from "@/components/billFunctions/setBillModal";
import { useEffect, useState, useContext } from "react";
import AppContext from "@/context/AppContext";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useZoren } from "@/hooks/useZoren";
import { getCollectionByName } from "@/hooks/useGetCollection";

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          name: 'billView',
        },
      },
    ],
    fallback: true,
  }
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "bills"])),
    },
  };
}

const BillView = (data) => {
  const [deleteBillModalOpen, setDeleteBillModalOpen] = useState(false);
  const [billModalOpen, setBillModalOpen] = useState(false);
  const [billData, setBillData] = useState('');
  const [balanceUSD, setBalanceUSD] = useState(0);
  const { state } = useContext(AppContext);
  const router = useRouter();
  const { t } = useTranslation("bills");
  const nav = {
    title: t("Bills"),
    isSubpage: true,
  };
  const res = {
    hola: "hello"
  }

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
      )
      .then((res) => {
        setBalanceUSD(res.data.solana.usd);
      });

    const fetchData = async () => {
      setBillData(await getCollectionByName({
        wallet: state.userAddress,
        title: path,
      }));
    }

    fetchData();
  }, [path]);

  const trunacteNumbers = (conv) => {
    if (balanceUSD * conv < 100) {
      return (balanceUSD * conv).toString().slice(0, 5)
    } else if (balanceUSD * conv > 1000) {
      return (balanceUSD * conv).toString().slice(0, 7)
    } else {
      return (balanceUSD * conv).toString().slice(0, 6)
    }
  }

  const getCollected = () => {
    let amount = 0;
    if(billData.transactions) {
      const sum = billData.transactions.map((tranns) => amount += tranns.amount);
      return sum;
    } else {
      return amount;
    }
  }

  if (billData && billData !== '') {
    return (
      <div className="py-8 xl:py-10 px-4 sm:px-8 lg:px-16 h-screen lg:overflow-y-scroll hiddenScroll">
        <DeleteBillModal
          modalOpen={deleteBillModalOpen}
          setModalOpen={setDeleteBillModalOpen}
          data={res}
        />
        <SetBillModal
          modalOpen={billModalOpen}
          setModalOpen={setBillModalOpen}
          data={res}
        />
        <Nav data={nav} />
        {billData.status === 'paid' ? (
          <div className="w-full bg-success dark:bg-success/40 text-white px-8 py-3 md:py-2 rounded-full">
            <p className="text-md flex gap-3 items-center">
              <CheckCircleIcon width={20} /> This bill is already paid
            </p>
          </div>
        ) : (
          <div className="w-full bg-danger text-white px-8 py-3 md:py-2 rounded-full">
            <p className="text-md flex gap-3 items-center">
              <ExclamationCircleIcon width={20} /> This bill is incompleted
            </p>
          </div>
        )}
        <div className="my-20">
          <div className="flex justify-between">
            <div className="flex flex-col gap-8 text-start text-gray-500">
              <p>Concept</p>
              <p>Contributors</p>
              <p>Total</p>
            </div>
            <div className="flex flex-col gap-8 text-end font-bold">
              <p>{billData.icon} {billData.title}</p>
              <p>{billData.people} People</p>
              <div className="flex flex-col gap-2">
                <p>{billData.amount} SOL</p>
                <p className="opacity-50 font-semibold">${trunacteNumbers(billData.amount)} USD</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full my-20 border-2 border-gray-400 border-dashed"></div>
        <div className="my-20">
          <div className="flex justify-between">
            <div className="flex flex-col gap-8 text-start text-gray-500">
              <p>Pool</p>
              <p>Collected</p>
            </div>
            <div className="flex flex-col gap-8 text-end font-bold">
              <p>{billData.hasPaid} / {billData.people}</p>
              <div className="flex flex-col gap-2">
                <p className="text-danger">{getCollected()} SOL</p>
                <p className="text-danger opacity-70 font-semibold">${trunacteNumbers(getCollected())} USD</p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-20">
          <div className="flex gap-4 flex-col md:flex-row text-center justify-end">
            <button onClick={() => setDeleteBillModalOpen(true)} className="flex gap-3 justify-center text-center items-center text-sm font-bold text-danger border-danger border-2 px-8 py-4 rounded-full">
              <TrashIcon width={20} />
              Delete
            </button>
            {billData.status === 'open' ? (<button onClick={() => setBillModalOpen(true)} className="flex gap-3 justify-center text-center items-center text-sm font-bold text-white bg-primary dark:bg-success/40 px-8 py-4 rounded-full">
              <CheckIcon width={20} />
              Set completed
            </button>) : <></>}
          </div>
        </div>
      </div>
    );
  } else {
    return(
      <div className="w-full h-screen flex items-center justify-center text-center">
        <div className="bg-red-300 text-white p-10 rounded-2xl">
          <h3>Something went wrong!</h3>
          <p className="py-2">Please try again or reload the page.</p>
        </div>
      </div>
    )
  }
};

export default BillView;
