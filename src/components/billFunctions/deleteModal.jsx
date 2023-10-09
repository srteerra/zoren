"use client";
import { Modal, ModalClose } from "../Modal";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState, useContext } from "react";
import AppContext from "@/context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { deleteCollectionByName } from "@/hooks/useGetCollection";

const DeleteBillModal = ({ data, setModalOpen, modalOpen }) => {
  const [handleClick, setHandleClick] = useState(false);
  const { state, setListener } = useContext(AppContext);
  const router = useRouter();
  const path = router.asPath.substring(7);
  const { asPath, locale, locales } = useRouter();

  const handleDelete = async () => {
    setListener(true);
    const del = await deleteCollectionByName({
      wallet: state.userAddress,
      title: path,
    });

    if (del) {
      console.log('deleted');
      setModalOpen(false)
      setListener(false);
      router.push("/bills");
    } else {
      console.log('bad request')
      setListener(false);
    }
  };

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
              {locale === "fr" ? "Êtes-vous sûr ?" : locale === "es" ? "¿Estás seguro?" : locale === "pt" ? "Você tem certeza?" : locale === "de" ? "Bist du sicher?" : "Are you sure? "}
              </p>
              <p className="text-dark dark:text-white xl:text-md font-light">
              {locale === "fr" ? "Une fois que vous supprimez cette facture, elle sera" : locale === "es" ? "Una vez que elimines esta factura, será" : locale === "pt" ? "Depois de excluir esta conta, ela será" : locale === "de" ? "Wenn Sie diese Rechnung löschen, wird sie sein" : "Once you delete this bill, it will be"}{" "}
                <span className="font-bold">{locale === "fr" ? "supprimé définitivement" : locale === "es" ? "eliminado permanentemente" : locale === "pt" ? "excluído permanentemente" : locale === "de" ? "dauerhaft gelöscht" : "permanently deleted"}</span> {locale === "fr" ? "et vous" : locale === "es" ? "y tú" : locale === "pt" ? "e você" : locale === "de" ? "und du" : "and you"}
                {locale === "fr" ? "ne pourra pas le récupérer." : locale === "es" ? "no podrás recuperarlo." : locale === "pt" ? "não será possível recuperá-lo." : locale === "de" ? "kann es nicht wiederherstellen." : "won't be able to recover it."}
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full gap-4">
            <button
              onClick={() => handleDelete()}
              disabled={handleClick}
              className="w-full flex gap-3 justify-center text-center font-bold text-white rounded-lg bg-danger hover:bg-danger/80 dark:bg-red-400/60 py-3 px-8 dark:hover:bg-red-400/40 transition ease-out"
            >
              <TrashIcon width={20} />{locale === "fr" ? "Je comprends, supprimez-le" : locale === "es" ? "Entiendo, bórralo" : locale === "pt" ? "Eu entendo, apague-o" : locale === "de" ? "Ich verstehe, lösche es" : "I understand, delete it"}
            </button>

            <button
              onClick={() => setModalOpen(false)}
              className="w-full rounded-lg border-2 border-dark dark:border-white py-3 hover:opacity-40 opacity-60 transition ease-out"
            >
              <span className="font-medium text-dark dark:text-white">
              {locale === "fr" ? "Annuler" : locale === "es" ? "Cancelar" : locale === "pt" ? "Cancelar" : locale === "de" ? "Abbrechen" : "Cancel"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteBillModal;
