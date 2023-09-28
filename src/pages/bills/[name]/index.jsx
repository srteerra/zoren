import Nav from "@/components/Nav";
import { TrashIcon, CheckIcon } from "@heroicons/react/24/solid";
import { ExclamationCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import DeleteBillModal from "@/components/billFunctions/deleteModal";
import axios from "axios";
import SetBillModal from "@/components/billFunctions/setBillModal";
import { useEffect, useState } from "react";

const BillView = (data) => {
  const [deleteBillModalOpen, setDeleteBillModalOpen] = useState(false);
  const [billModalOpen, setBillModalOpen] = useState(false);
  const [balanceUSD, setBalanceUSD] = useState(0);
  const router = useRouter();
  const nav = {
    title: "bills",
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
  }, []);

  const trunacteNumbers = (conv) => {
    if (balanceUSD * conv < 100) {
      return (balanceUSD * conv).toString().slice(0, 5)
    } else if (balanceUSD * conv > 1000) {
      return (balanceUSD * conv).toString().slice(0, 7)
    } else {
      return (balanceUSD * conv).toString().slice(0, 6)
    }
  }

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
      {false ? (
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
            <p>🍕 Dinner</p>
            <p>4 People</p>
            <div className="flex flex-col gap-2">
              <p>{"40"} SOL</p>
              <p className="opacity-50 font-semibold">${trunacteNumbers(40)} USD</p>
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
            <p>{"2"} / {"4"}</p>
            <div className="flex flex-col gap-2">
              <p className="text-danger">{"20"} SOL</p>
              <p className="text-danger opacity-70 font-semibold">${trunacteNumbers(20)} USD</p>
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
          {true ? (<button onClick={() => setBillModalOpen(true)} className="flex gap-3 justify-center text-center items-center text-sm font-bold text-white bg-primary dark:bg-success/40 px-8 py-4 rounded-full">
            <CheckIcon width={20} />
            Set completed
          </button>) : <></>}
        </div>
      </div>
    </div>
  );
};

export default BillView;
