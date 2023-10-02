"use client";
import { Modal, ModalClose } from "../Modal";
import EmojiStyle from "emoji-picker-react";
import EmojiClickData from "emoji-picker-react";
import { Emoji } from "emoji-picker-react";
import { truncate } from "@/utils/string";
import axios from "axios";
import {
  createQR,
  encodeURL,
  findReference,
  validateTransfer,
  FindReferenceError,
  ValidateTransferError,
} from "@solana/pay";
import { PublicKey, Keypair, Connection, Commitment } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { useConnection } from "@solana/wallet-adapter-react";
import { useZoren } from "../../hooks/useZoren";
import { useEffect, useRef, useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  handleAddData,
  handleGetCollection,
  handleModifyData,
} from "@/hooks/useGetCollection";
import AppContext from "@/context/AppContext";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { app } from "@/firebase";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Ring } from "@uiball/loaders";

// import toast, { ToastBar, Toaster } from "react-hot-toast";

// Get the firestore
const firestore = getFirestore(app);

// Images import
import friends2 from "../../../public/images/friends2.png";
import coinsIcon from "../../../public/images/coins.png";
import receiptIcon from "../../../public/images/mobile-receipt.png";
import swapIcon from "../../../public/images/swap.png";

const TransactionQRModal = ({
  modalOpen,
  setModalOpen,
  userAddress,
  userName,
  avatar,
  setQrCode,
  publicKey,
}) => {
  const qrRef = useRef();
  const [handleClick, setHandleClick] = useState(false);
  const [swapCurrency, setSwapCurrency] = useState(true);
  const [amountInput, setAmountInput] = useState("");
  const [amountInputCrypto, setAmountInputCrypto] = useState("");
  const [peopleInput, setPeopleInput] = useState("");
  const [conceptInput, setConceptInput] = useState("");
  const [pickerValue, setPickerValue] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [stepModal, setStepModal] = useState(1);
  const [col, setCol] = useState("");
  const [newAdded, setNewAdded] = useState("");
  const { listener, setListener, state } = useContext(AppContext);
  const [counter, setCounter] = useState(0);
  const [solanaUSD, setSolanaUSD] = useState(0);
  const [transactionsList, setTransactionsList] = useState(undefined);

  const { userTransactions, setUserTransactions } = useZoren();
  const { connection: cc } = useConnection();

  const toastId = useRef(null);
  // const dismiss = () =>  toast.dismiss(toastId.current);
  const confirmTrans = () => toast.update(toastId.current, { render: "Bill Completed", type: toast.TYPE.SUCCESS, autoClose: 5000 });

  const handleClickPicker = (emojiData) => {
    setPickerValue(emojiData.emoji);
    setSelectedEmoji(emojiData.emoji);
    setShowPicker(false);
  };

  const trans = () => toastId.current = toast("Waiting for payments...", { autoClose: false, position: "bottom-right" });

  const notify = () =>
    toast.update(toastId.current, {
      position: "bottom-right",
      render: "Transaction Request Cancelled",
      type: toast.TYPE.WARNING,
      isLoading: false,
      closeOnClick: true,
      autoClose: 3000,
    });
  const setError = (text) =>
    toast.error(text, {
      position: "bottom-right",
      isLoading: false,
      closeOnClick: true,
      autoClose: 3000,
    });

  const clearInputs = () => {
    setShowPicker(false);
    setAmountInput("");
    setPeopleInput("");
    setConceptInput("");
  };

  const { connection } = useConnection();

  if (userAddress) {
    if (listener) {
      onSnapshot(
        query(
          collection(firestore, "wallets", userAddress, "wallet-collections")
        ),
        (snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            if (change.type === "modified") {
              setCounter(counter + 1);
            }
          });
        }
      );
    } else null;
  }

  const loadQr = async () => {
    setListener(true);
    const register = await handleAddData({
      wallet: userAddress,
      amount: Number(amountInputCrypto),
      people: Number(peopleInput),
      icon: pickerValue || "💸",
      title: conceptInput,
    });
    if (register) {
      setNewAdded(register);
      setCol(await handleGetCollection(userAddress, register));
      setQrCode(true);
      setHandleClick(true);
      setTransactionsList(0);
      trans();
    } else {
      loadOff();
      setStepModal(4);
      setModalOpen(false);
      setError("Something went wrong!, try again");
      setCounter(0);
    }
  };

  const loadOff = () => {
    setModalOpen(false);
    setHandleClick(false);
    notify();
    setTimeout(() => setListener(false), 1000);
  };

  const completeQR = () => {
    setHandleClick(false);
    confirmTrans();
  };

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
      )
      .then((res) => {
        setSolanaUSD(res.data.solana.usd);
      });
  }, []);

  useEffect(() => {
    if (!swapCurrency) {
      if (amountInput <= 0) {
        setAmountInputCrypto(0);
      }
    } else {
      if (amountInputCrypto <= 0) {
        setAmountInput(0);
      }
    }
  }, [swapCurrency]);

  const AmountChangeFiat = (amount) => {
    setAmountInput(Number(amount));
    setAmountInputCrypto((amount / solanaUSD).toFixed(0));
  };

  const AmountChangeCrypto = (amount) => {
    setAmountInputCrypto(Number(amount));
    setAmountInput((amount * solanaUSD).toFixed(0));
  };

  useEffect(() => {
    if (userAddress) {
      const recipient = new PublicKey(userAddress);
      const amount = new BigNumber(amountInputCrypto);
      const reference = Keypair.generate().publicKey;
      const label = "Zoren Payment";
      const message = pickerValue + " " + conceptInput;
      const urlParams = {
        recipient,
        amount,
        reference,
        label,
        message,
      };

      const urlEncoded = encodeURL(urlParams);

      const qr = createQR(urlEncoded, 350, "transparent");

      if (qrRef.current && amount.isGreaterThan(0)) {
        qrRef.current.innerHTML = "";
        qr.append(qrRef.current);
      }

      if (transactionsList < peopleInput) {
        const interval = 
          setInterval(async () => {
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
                  reference,
                },
                { commitment: "confirmed" }
              );

              const newID = (userTransactions.length + 1).toString();
              const newTransaction = {
                id: newID,
                from: {
                  name: recipient,
                },
                to: {
                  name: reference,
                },
                date: new Date(),
                status: "Completed",
                amount: amount,
              };

              console.log(newTransaction);
              console.log(newTransaction.from.name.toString());
              console.log(newTransaction.to.name.toString());

              setTransactionsList(transactionsList + 1);

              clearInterval(interval);
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
          }, 5000);
      } else {
        completeQR();
        setTransactionsList(undefined)
      }
    }
  }, [transactionsList]);

  return (
    <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div>
        <div className="flex flex-col items-center justify-center space-y-1 p-4">
          {stepModal === 1 ? (
            <div>
              <div className="flex flex-col mx-auto text-center w-2/3">
                <Image
                  className="mx-auto"
                  src={friends2}
                  alt="Profile"
                  priority={true}
                  width={180}
                />
                <p className="text-dark dark:text-white mb-2 text-lg xl:text-2xl font-bold">
                  Set the contributors
                </p>
                <p className="text-dark dark:text-white xl:text-md font-light">
                  Specify the amount of people that will be separated.
                </p>
              </div>
              <div className="my-12 flex gap-3 justify-center">
                <button className="bg-gray-500 w-3 h-3 rounded-full"></button>
                <button
                  onClick={() => setStepModal(2)}
                  className="bg-gray-300 w-3 h-3 rounded-full"
                ></button>
                <button
                  onClick={() => setStepModal(3)}
                  className="bg-gray-300 w-3 h-3 rounded-full"
                ></button>
              </div>
              <div className="flex flex-col w-full gap-4">
                <button
                  onClick={() => setStepModal(2)}
                  disabled={handleClick}
                  className="w-full rounded-lg bg-secondary hover:bg-secondary/80 dark:bg-secondary/60 py-3 px-8 dark:hover:bg-secondary/30 transition ease-out"
                >
                  <span className="font-bold text-white">Next</span>
                </button>

                <button
                  onClick={() => setModalOpen(false)}
                  className="w-full rounded-lg border-2 border-red-300 py-3 hover:bg-opacity-70"
                >
                  <span className="font-medium text-red-300">Close</span>
                </button>
              </div>
            </div>
          ) : stepModal === 2 ? (
            <div>
              <div className="flex flex-col mx-auto text-center w-2/3">
                <Image
                  className="mx-auto my-8"
                  src={coinsIcon}
                  alt="Profile"
                  priority={true}
                  width={120}
                />
                <p className="text-dark dark:text-white mb-2 text-lg xl:text-2xl font-bold">
                  Set an amount
                </p>
                <p className="text-dark dark:text-white xl:text-md font-light">
                  Zoren will calculate the amount to pay by number of
                  contributors.
                </p>
              </div>
              <div className="my-12 flex gap-3 justify-center">
                <button
                  onClick={() => setStepModal(1)}
                  className="bg-gray-300 w-3 h-3 rounded-full"
                ></button>
                <button className="bg-gray-500 w-3 h-3 rounded-full"></button>
                <button
                  onClick={() => setStepModal(3)}
                  className="bg-gray-300 w-3 h-3 rounded-full"
                ></button>
              </div>
              <div className="flex flex-col w-full gap-4">
                <button
                  onClick={() => setStepModal(3)}
                  disabled={handleClick}
                  className="w-full rounded-lg bg-secondary hover:bg-secondary/80 dark:bg-secondary/60 py-3 px-8 dark:hover:bg-secondary/30 transition ease-out"
                >
                  <span className="font-bold text-white">Next</span>
                </button>

                <button
                  onClick={() => setModalOpen(false)}
                  className="w-full rounded-lg border-2 border-red-300 py-3 hover:bg-opacity-70"
                >
                  <span className="font-medium text-red-300">Close</span>
                </button>
              </div>
            </div>
          ) : stepModal === 3 ? (
            <div>
              <div className="flex flex-col mx-auto text-center w-[75%] px-12">
                <Image
                  className="mx-auto my-8"
                  src={receiptIcon}
                  alt="Profile"
                  priority={true}
                  width={100}
                />
                <p className="text-dark dark:text-white mb-2 text-lg xl:text-2xl font-bold">
                  Add a concept
                </p>
                <p className="text-dark dark:text-white xl:text-md font-light">
                  To separate a bill into a group and organize them.
                </p>
              </div>
              <div className="my-12 flex gap-3 justify-center">
                <button
                  onClick={() => setStepModal(1)}
                  className="bg-gray-300 w-3 h-3 rounded-full"
                ></button>
                <button
                  onClick={() => setStepModal(2)}
                  className="bg-gray-300 w-3 h-3 rounded-full"
                ></button>
                <button className="bg-gray-500 w-3 h-3 rounded-full"></button>
              </div>
              <div className="flex flex-col w-full gap-4">
                <button
                  onClick={() => setStepModal(4)}
                  disabled={handleClick}
                  className="w-full rounded-lg bg-secondary hover:bg-secondary/80 dark:bg-secondary/60 py-3 px-8 dark:hover:bg-secondary/30 transition ease-out"
                >
                  <span className="font-bold text-white">Ok, got it</span>
                </button>

                <button
                  onClick={() => setModalOpen(false)}
                  className="w-full rounded-lg border-2 border-red-300 py-3 hover:bg-opacity-70"
                >
                  <span className="font-medium text-red-300">Close</span>
                </button>
              </div>
            </div>
          ) : stepModal === 4 ? (
            <>
              <div className="flex gap-4">
                <div
                  className="rounded-full w-[50px] h-[50px] bg-no-repeat bg-center bg-cover"
                  style={{
                    backgroundImage: `url("${avatar}")`,
                  }}
                ></div>
                <div className="my-auto">
                  <p className="text-lg font-bold text-gray-800 dark:text-white">
                    @{userName}
                  </p>
                  <p className="text-sm font-light text-gray-600 dark:text-white">
                    Create a code
                  </p>
                </div>
              </div>

              <div className="w-full flex gap-4 flex-col py-12">
                {swapCurrency ? (
                  <>
                    <div className="flex w-full justify-between gap-4 rounded-lg">
                      <div>
                        <label
                          className="text-gray-500"
                          htmlFor="cryptoPurpose"
                        >
                          Amount:
                        </label>
                      </div>
                      <div className="flex w-[40%] justify-end">
                        <input
                          className="font-extrabold text-end text-gray-600 dark:text-white placeholder-gray-400 bg-transparent outline-none"
                          id="cryptoPurpose"
                          name="cryptoPurpose"
                          type="number"
                          placeholder="0"
                          value={amountInputCrypto}
                          onChange={(e) => AmountChangeCrypto(e.target.value)}
                        />
                        <p className="font-bold ml-2">SOL</p>
                      </div>
                    </div>
                    <div className="flex w-full justify-end gap-4 rounded-lg">
                      <button onClick={() => setSwapCurrency(!swapCurrency)}>
                        <Image
                          className=""
                          src={swapIcon}
                          alt="SwapButton"
                          priority={true}
                          width={20}
                        />
                      </button>
                    </div>
                    <div className="flex w-full justify-end gap-4 rounded-lg">
                      <div className="flex w-[40%] justify-end">
                        <input
                          className="font-bold text-end disabled:opacity-70 text-gray-600 dark:text-white placeholder-gray-400 bg-transparent outline-none"
                          id="fiatPurpose"
                          name="fiatPurpose"
                          type="number"
                          placeholder="0"
                          disabled={true}
                          value={parseFloat(amountInput.toString()).toFixed(2)}
                        />
                        <p className="font-medium ml-2 opacity-70 text-gray-600 dark:text-white">
                          USD
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex w-full justify-between gap-4 rounded-lg">
                      <div>
                        <label className="text-gray-500" htmlFor="fiatPurpose">
                          Amount:
                        </label>
                      </div>
                      <div className="flex w-[40%] justify-end">
                        <input
                          className="font-extrabold text-end text-gray-600 dark:text-white placeholder-gray-400 bg-transparent outline-none"
                          id="fiatPurpose"
                          name="fiatPurpose"
                          type="number"
                          placeholder="0"
                          value={amountInput}
                          onChange={(e) => AmountChangeFiat(e.target.value)}
                        />
                        <p className="font-bold ml-2">USD</p>
                      </div>
                    </div>
                    <div className="flex w-full justify-end gap-4 rounded-lg">
                      <button onClick={() => setSwapCurrency(!swapCurrency)}>
                        <Image
                          className=""
                          src={swapIcon}
                          alt="SwapButton"
                          priority={true}
                          width={20}
                        />
                      </button>
                    </div>
                    <div className="flex w-full justify-end gap-4 rounded-lg">
                      <div className="flex w-[40%] justify-end">
                        <input
                          className="font-bold text-end disabled:opacity-70 text-gray-600 dark:text-white placeholder-gray-400 bg-transparent outline-none"
                          id="cryptoPurpose"
                          name="cryptoPurpose"
                          type="number"
                          placeholder="0"
                          disabled={true}
                          value={parseFloat(
                            amountInputCrypto.toString()
                          ).toFixed(2)}
                        />
                        <p className="font-medium ml-2 opacity-70 text-gray-600 dark:text-white">
                          SOL
                        </p>
                      </div>
                    </div>
                  </>
                )}
                <div className="flex w-full justify-between gap-4 rounded-lg">
                  <div>
                    <label className="text-gray-500" htmlFor="peoplePurpose">
                      Amount of people:
                    </label>
                  </div>
                  <input
                    className="w-full font-extrabold text-end text-gray-800 dark:text-white placeholder-gray-400 bg-transparent outline-none"
                    id="peoplePurpose"
                    name="peoplePurpose"
                    type="number"
                    placeholder="How many people?"
                    value={peopleInput}
                    onChange={(e) => setPeopleInput(e.target.value)}
                  />
                </div>
                <div className="flex w-full justify-between gap-4 rounded-lg">
                  <div>
                    <label className="text-gray-500" htmlFor="msgPurpose">
                      Concept:
                    </label>
                  </div>
                  <input
                    className="w-full font-extrabold text-end text-primary dark:text-white placeholder-gray-400 bg-transparent outline-none"
                    id="msgPurpose"
                    name="msgPurpose"
                    type="text"
                    placeholder="Enter a concept"
                    value={conceptInput}
                    onChange={(e) => setConceptInput(e.target.value)}
                  />
                </div>
                <div className="flex w-full justify-between items-center rounded-lg">
                  <p className="text-gray-500">Icon:</p>
                  <div>
                    <button
                      className="flex text-lg justify-around items-center overflow-hidden rounded-lg"
                      onClick={() => setShowPicker(!showPicker)}
                    >
                      {pickerValue || "💸"}
                    </button>
                    {showPicker && (
                      <div className="flex pb-10">
                        <EmojiStyle onEmojiClick={handleClickPicker} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full gap-4">
                <button
                  onClick={() => {
                    loadQr();
                    setStepModal(5);
                  }}
                  disabled={!peopleInput || !conceptInput || !amountInput}
                  className="w-full rounded-lg disabled:opacity-60 disabled:hover:bg-secondary disabled:dark:bg-secondary/60 bg-secondary hover:bg-secondary/80 dark:bg-secondary/60 py-3 px-8 dark:hover:bg-secondary/30 transition ease-out"
                >
                  <span className="font-bold text-white">Load QR code</span>
                </button>

                <button
                  onClick={() => {
                    setModalOpen(false);
                    clearInputs();
                  }}
                  className="w-full rounded-lg border-2 border-red-300 py-3 hover:bg-opacity-70"
                >
                  <span className="font-medium text-red-300">Close</span>
                </button>
              </div>
            </>
          ) : (
            <div>
              <div className="flex flex-col gap-6 items-center justify-center space-y-1">
                <div className="w-full flex justify-between font-bold">
                  <p className="text-dark dark:text-white text-lg">
                    {col.people || 0} People
                  </p>
                  <p className="text-primary dark:text-white text-lg">
                    {col.icon} {col.title || "..."}
                  </p>
                  <p className="text-dark dark:text-white text-lg">
                    {col.amount || 0} SOL
                  </p>
                </div>
                <div className="text-white bg-white rounded-3xl" ref={qrRef} />
                <div className="flex justify-center flex-col gap-4 text-center">
                  <div className="mx-auto flex flex-col gap-2 items-center">
                    <div className="font-normal flex gap-3 text-2xl">
                      <Ring size={25} lineWeight={5} speed={2} color="black" />{" "}
                      <p>Waiting...</p>
                    </div>
                    <div className="flex justify-center">
                      <p className="font-extrabold text-xl text-primary dark:text-white">
                        {transactionsList || 0}/{peopleInput || 0} Contributions
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    loadOff();
                    setStepModal(4);
                    setModalOpen(false);
                  }}
                  className="w-full rounded-lg border-2 border-red-300 py-3 hover:bg-opacity-70"
                >
                  <span className="font-medium text-red-300">Cancel</span>
                </button>
                <div className="w-[60%] flex justify-center mx-auto text-center">
                  <p className="font-normal text-md opacity-60 mx-auto">
                    Dont close this window or the transaction waiting will end.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TransactionQRModal;
