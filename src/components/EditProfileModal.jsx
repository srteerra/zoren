import { Modal, ModalClose } from "./Modal";
import { truncate } from "@/utils/string";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { client } from "../../lib/sanityClient";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { useZoren } from "../hooks/useZoren";

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

const EditProfleModal = ({
  modalOpen,
  setModalOpen,
  userAddress,
  avatar,
}) => {
  const { userName, updateAcc } = useZoren();
  const [newUsername, setNewUsername] = useState("");
  const [newAvatar, setNewAvatar] = useState("");

  const toastId = useRef(null);

  const update = () =>
    toast.update(toastId.current, {
      position: "bottom-right",
      render: "Completed",
      type: toast.TYPE.SUCCESS,
      isLoading: false,
      closeOnClick: true,
      autoClose: 3000,
    });
  const notify = () =>
    toast.update(toastId.current, {
      position: "bottom-right",
      render: "Transaction Request Cancelled",
      type: toast.TYPE.WARNING,
      isLoading: false,
      closeOnClick: true,
      autoClose: 3000,
    });

  const success = () =>
    toast.success("Profile updated", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const uploadImage = (e) => {
    if (e) {
      setNewAvatar(e.target.files[0]);
    }
  };

  const onUpdate = () => {
    updateAcc(newUsername, newAvatar)
    setNewUsername("")
    setNewAvatar("")
    setModalOpen(false);
    success()
  };

  return (
    <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div>
        <div className="flex flex-col items-center justify-center space-y-1 p-4">
          <div className="grid grid-rows-2 text-center">
            <div
              className="rounded-full w-[80px] h-[80px] mx-auto bg-no-repeat bg-center bg-cover"
              style={{
                backgroundImage: `url("${avatar}")`,
              }}
            ></div>
            <div className="my-auto">
              <p className="text-lg font-bold text-gray-800 dark:text-white">
                @{userName}
              </p>
              <p className="text-md font-light text-gray-600 dark:text-white">
                Edit profile
              </p>
            </div>
          </div>

          <div className="w-full flex gap-4 flex-col py-12">
            <div className="flex w-full gap-4 rounded-lg">
              <div>
                <label
                  className="text-gray-500 dark:text-gray-200"
                  htmlFor="usernamePurpose"
                >
                  Your username:
                </label>
              </div>
              <div className="flex justify-end">
                <p className="font-bold mr-2 text-gray-600 dark:text-white">
                  @
                </p>
                <input
                  className="font-bold text-start text-gray-600 dark:text-white placeholder-gray-400 bg-transparent outline-none"
                  id="usernamePurpose"
                  name="usernamePurpose"
                  type="text"
                  placeholder={userName}
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="grid w-full grid-rows-2 gap-4 rounded-lg">
              <div>
                <label
                  className="text-gray-500 dark:text-gray-200"
                  htmlFor="avatarPurpose"
                >
                  Change Avatar:
                </label>
              </div>
              <input
                className="w-full text-end text-gray-800 dark:text-white placeholder-gray-400 bg-transparent outline-none"
                id="avatarPurpose"
                name="avatarPurpose"
                type="file"
                multiple={false}
                onChange={(e) => uploadImage(e)}
              />
            </div>
          </div>

          <div className="flex flex-col w-full gap-4">
            <button
              onClick={() => onUpdate()}
              disabled={!userName}
              className="w-full rounded-lg disabled:opacity-60 disabled:hover:bg-secondary disabled:dark:bg-secondary/60 bg-secondary hover:bg-secondary/80 dark:bg-secondary/60 py-3 px-8 dark:hover:bg-secondary/30 transition ease-out"
            >
              <span className="font-bold text-white">Confirm</span>
            </button>

            <button
              onClick={() => setModalOpen(false)}
              className="w-full rounded-lg border-2 border-red-300 py-3 hover:bg-opacity-70"
            >
              <span className="font-medium text-red-300">Close</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditProfleModal;
