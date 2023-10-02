"use client";
import { QrCodeIcon, LinkIcon } from "@heroicons/react/24/solid";
import { useZoren } from "@/hooks/useZoren";
import { handleGetRecentTrans } from "@/hooks/useGetCollection";
import { useEffect, useState, useContext } from "react";
import AppContext from "@/context/AppContext";

const MostRecentTransactions = () => {
  const { state } = useContext(AppContext);
  const [transactions, setTransactions] = useState([]);
  const [cardList, setCardList] = useState("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      setTransactions(await handleGetRecentTrans(state.userAddress));
    };

    fetchData();
  }, [state.userAddress]);


  if(transactions) {
    const arrayList = transactions.map((transaction) => (
      <div
        key={transaction.id}
        className="flex justify-between items-center min-w-[800px]"
      >
        {/* Avatar */}
        <div>a</div>
        {/* Address */}
        <div>
          <p className="opacity-60">{transaction.address}</p>
        </div>
        {/* Concept */}
        <div>
          <p className="font-bold">{transaction.bill}</p>
        </div>
        {/* Date */}
        <div>
          <p className="opacity-60">{transaction.date}</p>
        </div>
        {/* Amount */}
        <div>
          <p className="font-bold text-primary dark:text-white">
            {transaction.amount} SOL
          </p>
        </div>
      </div>
    ));
    return (
      <div className="my-12">
        {/* Header */}
        <div>
          <h2>Most Recent</h2>
          <p>Trasactions</p>
        </div>
        <div className="hiddenScroll my-12 overflow-x-scroll">
          {/* Transaction card */}
          {arrayList}
        </div>
      </div>
    );
  } else {
    return (
      <div className="my-12">
        {/* Header */}
        <div>
          <h2>Most Recent</h2>
          <p>Trasactions</p>
        </div>
        <div className="hiddenScroll my-12 overflow-x-scroll">
          {/* Transaction card */}
          <h3>Loading...</h3>
        </div>
      </div>
    );
  }

};

export default MostRecentTransactions;
