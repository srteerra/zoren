'use client';
import { Modal, ModalClose } from "../Modal";
import { useEffect, useRef, useState, useContext } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import { handleSetPaid } from "@/hooks/useGetCollection";
import AppContext from "@/context/AppContext";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { useRouter } from "next/router";

const SetBillModal = ({ data, setModalOpen, modalOpen }) => {
  const { state } = useContext(AppContext);
  const [handleClick, setHandleClick] = useState(false);
  const router = useRouter();
  const path = router.asPath.substring(7);
  const { asPath, locale, locales } = useRouter();

  const handlePaid = async () => {
    const res = await handleSetPaid({
      wallet: state.userAddress,
      title: path,
    })

    if (res) {
      console.log('Paid');
      setModalOpen(false)
      router.push("/bills");
    } else {
      console.log('bad request');
    }
  }

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
                {locale === "fr" ? "Changer de statut" : locale === "es" ? "Cambiar estado" : locale === "pt" ? "Alterar status" : locale === "de" ? "Status ändern" : "Change status"}
                </p>
                <p className="text-dark dark:text-white xl:text-md font-light">
                {locale === "fr" ? "Une fois que vous avez marqué cette facture comme terminée" : locale === "es" ? "Una vez que establezcas esta factura como completada" : locale === "pt" ? "Depois de definir esta conta como concluída" : locale === "de" ? "Sobald Sie diese Rechnung als abgeschlossen markiert haben" : "Once you set this bill completed it"} <span className="font-bold">{locale === "fr" ? "ne peut plus" : locale === "es" ? "ya no puede" : locale === "pt" ? "não pode mais" : locale === "de" ? "kann nicht mehr" : "cannot longer"} </span> {locale === "fr" ? "être modifié" : locale === "es" ? "ser modificado" : locale === "pt" ? "ser modificado" : locale === "de" ? "geändert werden" : "be modified"}
                </p>
            </div>
          </div>
          <div className="flex flex-col w-full gap-4">
            <button
              onClick={() => handlePaid()}
              disabled={handleClick}
              className="w-full flex gap-3 justify-center items-center text-center font-bold text-white rounded-lg bg-danger hover:bg-danger/80 dark:bg-red-400/60 py-3 px-8 dark:hover:bg-red-400/40 transition ease-out"
            >
              <CheckIcon width={20} />
              <span>{locale === "fr" ? "Marquer cette facture comme terminée" : locale === "es" ? "Marcar esta factura como completada" : locale === "pt" ? "Marcar esta conta como concluída" : locale === "de" ? "Diese Rechnung als abgeschlossen markieren" : "Set this bill completed"}</span>
            </button>

            <button
              onClick={() => {
                setModalOpen(false)
              }}
              className="w-full rounded-lg border-2 border-dark dark:border-white py-3 hover:opacity-40 opacity-60 transition ease-out"
            >
              <span className="font-medium text-dark dark:text-white">{locale === "fr" ? "Annuler" : locale === "es" ? "Cancelar" : locale === "pt" ? "Cancelar" : locale === "de" ? "Abbrechen" : "Cancel"}</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SetBillModal;
