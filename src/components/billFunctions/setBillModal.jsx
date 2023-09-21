import { Modal, ModalClose } from "../Modal";
import { useEffect, useRef, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const SetBillModal = ({ data, setModalOpen, modalOpen }) => {
  const [handleClick, setHandleClick] = useState(false);

  return (
    <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div>
        <div className="flex flex-col items-center justify-center p-4">
          <div className="flex flex-col mx-auto text-center w-2/3">
            <Image
              className="rounded-full mx-auto"
              src={"https://picsum.photos/id/237/200/200"}
              alt="Profile"
              priority={true}
              height={110}
              width={110}
            />
            <div className="my-8">
                <p className="text-dark dark:text-white mb-2 text-lg xl:text-2xl font-bold">
                    Change status
                </p>
                <p className="text-dark dark:text-white xl:text-md font-light">
                    Once you set this bill completed it <span className="font-bold">cannot longer</span> be modified.
                </p>
            </div>
          </div>
          <div className="flex flex-col w-full gap-4">
            <button
              onClick={() => {}}
              disabled={handleClick}
              className="w-full flex gap-3 justify-center items-center text-center font-bold text-white rounded-lg bg-danger hover:bg-danger/80 dark:bg-red-400/60 py-3 px-8 dark:hover:bg-red-400/40 transition ease-out"
            >
              <CheckIcon width={20} />
              <span>Set this bill completed</span>
            </button>

            <button
              onClick={() => {
                setModalOpen(false)
              }}
              className="w-full rounded-lg border-2 border-dark dark:border-white py-3 hover:opacity-40 opacity-60 transition ease-out"
            >
              <span className="font-medium text-dark dark:text-white">Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SetBillModal;
