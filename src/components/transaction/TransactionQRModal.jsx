import { Modal, ModalClose } from "../Modal";
import { truncate } from "@/utils/string";
import {
  createQR,
  encodeURL,
  findReference,
  validateTransfer,
  FindReferenceError,
  ValidateTransferError,
} from "@solana/pay";
import { PublicKey, Keypair } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { useConnection } from "@solana/wallet-adapter-react";
import { useZoren } from "../../hooks/useZoren";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const TransactionQRModal = ({
  modalOpen,
  setModalOpen,
  userAddress,
  userName,
  avatar,
  setQrCode,
}) => {
  const qrRef = useRef();
  const [handleClick, setHandleClick] = useState(false);
  const [amountInput, setAmountInput] = useState("");
  const [peopleInput, setPeopleInput] = useState("");
  const [conceptInput, setConceptInput] = useState("");
  const [stepModal, setStepModal] = useState(1);

  const { transactions, setTransactions } = useZoren();
  const toastId = useRef(null);

  const trans = () =>
    (toastId.current = toast.loading("Waiting for payment...", {
      closeOnClick: false,
      closeButton: true,
    }));
  const update = () =>
    toast.update(toastId.current, {
      render: "Completed",
      type: toast.TYPE.SUCCESS,
      isLoading: false,
      closeOnClick: true,
      autoClose: 3000,
    });
  const notify = () =>
    toast.update(toastId.current, {
      render: "Transaction request cancelled",
      type: toast.TYPE.WARNING,
      isLoading: false,
      closeOnClick: true,
      autoClose: 3000,
    });

  const { connection } = useConnection();

  const loadQr = () => {
    setQrCode(true);
    setHandleClick(true);
    trans();
  };

  const loadOff = () => {
    setModalOpen(false);
    setHandleClick(false);
    notify();
  };

  useEffect(() => {
    if (userAddress != "") {
      const recipient = new PublicKey(userAddress);
      const amount = new BigNumber(amountInput);
      const reference = Keypair.generate().publicKey;
      const label = "Dashy Payment";
      const concept = conceptInput;
      const urlParams = {
        recipient,
        amount,
        reference,
        label,
        concept,
      };

      const urlEncoded = encodeURL(urlParams);

      const qr = createQR(urlEncoded, 350, "transparent");
      if (qrRef.current && amount.isGreaterThan(0)) {
        qrRef.current.innerHTML = "";
        qr.append(qrRef.current);
      }

      if (handleClick) {
        const interval = setInterval(async () => {
          try {
            // Check if there is any transaction for the reference
            const signatureInfo = await findReference(connection, reference, {
              finality: "confirmed",
            });

            // Validate that the transaction has the expected recipient, amount and SPL token
            await validateTransfer(
              connection,
              signatureInfo.signature,
              {
                recipient,
                amount,
                // splToken: usdcAddress,
                reference,
                message,
              },
              { commitment: "confirmed" }
            ).then((res) => console.log(res));

            const newID = (transactions.length + 1).toString();
            const newTransaction = {
              id: newID,
              from: recipient,
              to: reference,
              message: message,
              date: new Date(),
              status: "Completed",
              amount: amount,
            };

            console.log(newTransaction, "NEW TRANSACTIONS EXISTS");

            setModalOpen(false);
            clear();
          } catch (e) {
            if (e instanceof FindReferenceError) {
              // No transaction found yet, ignore this error
              return;
            }
            if (e instanceof ValidateTransferError) {
              // Transaction is invalid
              console.error("Transaction is invalid", e);
              return;
            }
            console.error("Unknown error", e);
          }
        }, 500);

        return () => {
          clearInterval(interval);
          notify();
        };

        function clear() {
          clearInterval(interval);
          update();
        }
      }
    }
    return;
  }, [handleClick]);

  return (
    <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div>
        <div className="flex flex-col items-center justify-center space-y-1">
          <div ref={qrRef} />
        </div>
        <div className="flex flex-col items-center justify-center space-y-1 p-4">
          {stepModal === 1 ? (
            <div>
              <div className="flex flex-col mx-auto text-center w-2/3">
                <Image
                  className="rounded-full mx-auto my-8"
                  src={"https://picsum.photos/id/237/200/200"}
                  alt="Profile"
                  priority={true}
                  height={110}
                  width={110}
                />
                <p className="text-dark dark:text-white mb-2 xl:text-2xl font-bold">
                  Set the contributors
                </p>
                <p className="text-dark dark:text-white xl:text-md font-light">
                  You can add your friends to make a whitelist or a simple
                  number
                </p>
              </div>
              <div className="my-12 flex gap-3 justify-center">
                <button className="bg-gray-500 w-4 h-4 rounded-full"></button>
                <button
                  onClick={() => setStepModal(2)}
                  className="bg-gray-300 w-4 h-4 rounded-full"
                ></button>
                <button
                  onClick={() => setStepModal(3)}
                  className="bg-gray-300 w-4 h-4 rounded-full"
                ></button>
              </div>
              <div className="flex flex-col w-full gap-4">
                <button
                  onClick={() => setStepModal(2)}
                  disabled={handleClick}
                  className="w-full rounded-lg bg-secondary py-3 px-8 hover:bg-opacity-70"
                >
                  <span className="font-bold text-white">Next</span>
                </button>

                <button
                  onClick={() => setModalOpen(false)}
                  className="w-full rounded-lg border-2 border-danger py-3 hover:bg-opacity-70"
                >
                  <span className="font-medium text-danger">Close</span>
                </button>
              </div>
            </div>
          ) : stepModal === 2 ? (
            <div>
              <div className="flex flex-col mx-auto text-center w-2/3">
                <Image
                  className="rounded-full mx-auto my-8"
                  src={"https://picsum.photos/id/237/200/200"}
                  alt="Profile"
                  priority={true}
                  height={110}
                  width={110}
                />
                <p className="text-dark dark:text-white mb-2 xl:text-2xl font-bold">
                  Set an amount
                </p>
                <p className="text-dark dark:text-white xl:text-md font-light">
                  Zoren will calculate the amount to pay per
                  number of contributors
                </p>
              </div>
              <div className="my-12 flex gap-3 justify-center">
                <button
                  onClick={() => setStepModal(1)}
                  className="bg-gray-300 w-4 h-4 rounded-full"
                ></button>
                <button className="bg-gray-500 w-4 h-4 rounded-full"></button>
                <button
                  onClick={() => setStepModal(3)}
                  className="bg-gray-300 w-4 h-4 rounded-full"
                ></button>
              </div>
              <div className="flex flex-col w-full gap-4">
                <button
                  onClick={() => setStepModal(3)}
                  disabled={handleClick}
                  className="w-full rounded-lg bg-secondary py-3 px-8 hover:bg-opacity-70"
                >
                  <span className="font-bold text-white">Next</span>
                </button>

                <button
                  onClick={() => setModalOpen(false)}
                  className="w-full rounded-lg border-2 border-danger py-3 hover:bg-opacity-70"
                >
                  <span className="font-medium text-danger">Close</span>
                </button>
              </div>
            </div>
          ) : stepModal === 3 ? (
            <div>
              <div className="flex flex-col mx-auto text-center w-2/3 px-12">
                <Image
                  className="rounded-full mx-auto my-8"
                  src={"https://picsum.photos/id/237/200/200"}
                  alt="Profile"
                  priority={true}
                  height={110}
                  width={110}
                />
                <p className="text-dark dark:text-white mb-2 xl:text-2xl font-bold">
                  Add a concept
                </p>
                <p className="text-dark dark:text-white xl:text-md font-light">
                  To separate a bill into a group and organize them
                </p>
              </div>
              <div className="my-12 flex gap-3 justify-center">
                <button
                  onClick={() => setStepModal(1)}
                  className="bg-gray-300 w-4 h-4 rounded-full"
                ></button>
                <button
                  onClick={() => setStepModal(2)}
                  className="bg-gray-300 w-4 h-4 rounded-full"
                ></button>
                <button className="bg-gray-500 w-4 h-4 rounded-full"></button>
              </div>
              <div className="flex flex-col w-full gap-4">
                <button
                  onClick={() => setStepModal(0)}
                  disabled={handleClick}
                  className="w-full rounded-lg bg-secondary py-3 px-8 hover:bg-opacity-70"
                >
                  <span className="font-bold text-white">Ok, got it</span>
                </button>

                <button
                  onClick={() => setModalOpen(false)}
                  className="w-full rounded-lg border-2 border-danger py-3 hover:bg-opacity-70"
                >
                  <span className="font-medium text-danger">Close</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2">
                <div className="flex items-center">
                  <Image
                    className="w-14 rounded-full"
                    src={avatar}
                    alt="Profile"
                    priority={true}
                    height={200}
                    width={200}
                  />
                </div>
                <div className="my-auto">
                  <p className="text-lg font-medium text-gray-800">
                    {userName}
                  </p>
                  <p className="text-sm font-light text-gray-600">
                    Create a code
                  </p>
                </div>
              </div>

              <div className="w-full flex gap-4 flex-col py-12">
                <div className="flex w-full justify-between gap-4 rounded-lg border border-gray-200">
                  <div>
                    <label className="text-gray-500" htmlFor="qrPurpose">
                      Amount:
                    </label>
                  </div>
                  <div className="flex w-[40%] justify-end">
                    <input
                      className="font-extrabold text-end text-gray-600 placeholder-gray-400 outline-none"
                      id="qrPurpose"
                      name="qrPurpose"
                      type="text"
                      placeholder="0"
                      value={amountInput}
                      onChange={(e) => setAmountInput(e.target.value)}
                    />
                    <p className="font-bold ml-2">SOL</p>
                  </div>
                </div>
                <div className="flex w-full justify-between gap-4 rounded-lg border border-gray-200">
                  <div>
                    <label className="text-gray-500" htmlFor="peoplePurpose">
                      Amount of people:
                    </label>
                  </div>
                  <input
                    className="w-full font-extrabold text-end text-gray-800 placeholder-gray-400 outline-none"
                    id="peoplePurpose"
                    name="peoplePurpose"
                    type="text"
                    placeholder="How many people?"
                    value={peopleInput}
                    onChange={(e) => setPeopleInput(e.target.value)}
                  />
                </div>
                <div className="flex w-full justify-between gap-4 rounded-lg border border-gray-200">
                  <div>
                    <label className="text-gray-500" htmlFor="msgPurpose">
                      Concept:
                    </label>
                  </div>
                  <input
                    className="w-full font-extrabold text-end text-primary placeholder-gray-400 outline-none"
                    id="msgPurpose"
                    name="msgPurpose"
                    type="text"
                    placeholder="Enter a concept"
                    value={conceptInput}
                    onChange={(e) => setConceptInput(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col w-full gap-4">
                <button
                  onClick={() => loadQr()}
                  disabled={handleClick}
                  className="w-full rounded-lg bg-secondary py-3 hover:bg-opacity-70"
                >
                  <span className="font-bold text-white">Load QR code</span>
                </button>

                <button
                  onClick={() => loadOff()}
                  className="w-full rounded-lg border-2 border-danger py-3 hover:bg-opacity-70"
                >
                  <span className="font-medium text-danger">Cancel</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TransactionQRModal;