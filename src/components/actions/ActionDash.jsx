import { QrCodeIcon, LinkIcon } from "@heroicons/react/24/solid";
import TransactionQRModal from "../transaction/TransactionQRModal";
import { useState } from 'react';
import { useZoren } from "@/hooks/useZoren";
import { useContext } from "react";
import AppContext from "@/context/AppContext";
import { useTranslation } from "next-i18next";
//import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function ActionCenterDashboard() {
  const { state } = useContext(AppContext);
  const [qrCode, setQrCode] = useState(false);
  const { publicKey } = useZoren();
  const [transactionQRModalOpen, setTransactionQRModalOpen] = useState(false);
  return (
    <div className="hidden lg:flex gap-12 my-16">
      <TransactionQRModal
        modalOpen={transactionQRModalOpen}
        setModalOpen={setTransactionQRModalOpen}
        userAddress={state.userAddress}
        userName={state.userName}
        myKey={publicKey}
        avatar={state.avatar}
        setQrCode={setQrCode}
      />
      {/* Create session action */}
      <div className="flex gap-6 items-center text-black dark:text-white">
        <button
          onClick={() => setTransactionQRModalOpen(!transactionQRModalOpen)}
          className="bg-black dark:bg-dark p-4 rounded-xl hover:opacity-80 text-white transition ease"
        >
          <QrCodeIcon width={35} />
        </button>
        <div>
          <p className="text-lg font-bold">Start a session</p>
          <p className="text-lg">with a new QR code</p>
        </div>
      </div>
      <div className="flex gap-6 items-center text-black dark:text-white">
        <button
          onClick={() => handleClick()}
          disabled
          className="bg-black dark:bg-dark text-white p-4 rounded-xl disabled:opacity-60"
        >
          <LinkIcon width={35} />
        </button>
        <div>
          <p className="text-lg font-bold opacity-60">Join to session</p>
          <p className="text-lg opacity-60">with a new QR code</p>
        </div>
      </div>
    </div>
  );
}

export default ActionCenterDashboard;
