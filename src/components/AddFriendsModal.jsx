import { Modal, ModalClose } from "./Modal";
import { truncate } from "@/utils/string";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { client } from "../../lib/sanityClient";
import { PublicKey } from "@solana/web3.js";
import { useZoren } from "../hooks/useZoren";
import { useContext } from "react";
import AppContext from "@/context/AppContext";

const AddFriendsModal = ({ modalOpen, setModalOpen }) => {
  const [searchPeople, setSearchPeople] = useState("");
  const [catchMsg, setCatchMsg] = useState("");
  const [isVerified, setIsVerified] = useState(undefined);
  const [isAdded, setIsAdded] = useState(false);
  const [contacts, setContacts] = useState([]);
  const { addContact } = useZoren();
  const { state } = useContext(AppContext);

  useEffect(() => {
    state.userContacts.map((e) => {
      setContacts((contacts) => [...contacts, e.contactAddress]);
    });
  }, [state.userContacts]);

  const verifyUser = () => {
    if (searchPeople.toString().length === 44) {
      const input = searchPeople.toString().replace(/\s/g, "");
      const publicKey = new PublicKey(input);
      const isValidAddress = PublicKey.isOnCurve(publicKey);

      if (isValidAddress) {
        client.getDocument(searchPeople.toString()).then((r) => {
          if (r) {
            setIsVerified(true);
            if (contacts.includes(searchPeople.toString())) {
              setCatchMsg("You have already added this user");
              setIsAdded(true);
            } else {
              setCatchMsg("This user is using Zoren!");
              setIsAdded(false);
            }
          } else {
            setIsVerified(false);
            setCatchMsg("This user is not using Zoren :(");
            setIsAdded(false);
          }
        });
      } else {
        console.log("invalid address");
        setCatchMsg("Address not found");
        setIsVerified(false);
      }
    } else {
      console.log("invalid input");
      setCatchMsg("Please enter a valid address");
      setIsVerified(false);
    }
  };

  return (
    <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div>
        <div className="flex flex-col items-center justify-center p-4">
          <div className="flex flex-col items-center justify-center space-y-1">
            <div>
              <div className="text-center">
                <p className="mb-2 font-bold">Add new friend</p>
                <p className="font-light">
                  Search for a registered user on the platform
                </p>
              </div>
              <div className="flex flex-col gap-3 my-12">
                <div className="flex items-center gap-3 ">
                  <input
                    className={`${
                      isVerified === true
                        ? "border-green-700 placeholder-green-200 text-green-700"
                        : isVerified === false
                        ? "border-red-400 placeholder-red-200 text-red-400"
                        : "border-gray-400 text-gray-600 placeholder-gray-400"
                    } font-extrabold w-[400px] disabled:opacity-50 text-start border-2 px-6 py-2 rounded-xl bg-transparent outline-none`}
                    id="searchPurpose"
                    name="searchPurpose"
                    type="text"
                    placeholder="Enter a valid solana address"
                    value={searchPeople}
                    disabled={isVerified === true}
                    onChange={(e) => setSearchPeople(e.target.value)}
                  />
                  {isVerified === true ? (
                    <CheckCircleIcon width={20} className="text-green-700" />
                  ) : isVerified === false ? (
                    <XCircleIcon width={20} className="text-red-400" />
                  ) : (
                    <></>
                  )}
                </div>
                {catchMsg ? (
                  <div className="flex items-center justify-center w-full">
                    <p
                      className={
                        isVerified === true ? "text-green-800" : "text-red-400"
                      }
                    >
                      {catchMsg}
                    </p>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="flex gap-2 flex-col w-full">
              <button
                onClick={() => {
                  if (!isVerified) {
                    verifyUser();
                  } else if (!isAdded) {
                    addContact(searchPeople.toString());
                    setModalOpen(false);
                    setIsVerified(undefined);
                    setSearchPeople("");
                    setCatchMsg("");
                    setIsAdded(false);
                  }
                }}
                disabled={!searchPeople || isAdded}
                className="w-full rounded-lg disabled:opacity-60 disabled:hover:bg-secondary disabled:dark:bg-secondary/60 bg-secondary hover:bg-secondary/80 dark:bg-secondary/60 py-3 px-8 dark:hover:bg-secondary/30 transition ease-out"
              >
                <span className="font-bold text-white">
                  {!isVerified
                    ? "Verify"
                    : isAdded
                    ? "In contacts"
                    : "Add friend"}
                </span>
              </button>
              <button
                onClick={() => {
                  setModalOpen(false);
                  setIsVerified(undefined);
                  setSearchPeople("");
                  setCatchMsg("");
                  setIsAdded(false);
                }}
                className="w-full rounded-lg border-2 border-red-300 py-3 hover:bg-opacity-70"
              >
                <span className="font-medium text-red-300">Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddFriendsModal;
