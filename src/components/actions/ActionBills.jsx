import { QrCodeIcon, LinkIcon } from "@heroicons/react/24/solid";
import TransactionQRModal from "../transaction/TransactionQRModal";
import { useState } from 'react';

function ActionCenterBills() {
  const [qrCode, setQrCode] = useState(false);
  const [transactionQRModalOpen, setTransactionQRModalOpen] = useState(false);
  return (
    <div className="hidden lg:flex flex-col gap-8 my-4 xl:my-16">
      <TransactionQRModal
        modalOpen={transactionQRModalOpen}
        setModalOpen={setTransactionQRModalOpen}
        userAddress={"BKEqwrvkZDvAivchqtihZpqptajETqiD2zSG6WQjbRs4"}
        userName={"srterra"}
        myKey={"publickey"}
        avatar={"https://picsum.photos/id/237/200/200"}
        setQrCode={setQrCode}
      />
      {/* Create session action */}
      <div className="flex items-center gap-6 text-black dark:text-white">
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
      <div className="flex items-center gap-6 text-black dark:text-white">
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

export default ActionCenterBills;
