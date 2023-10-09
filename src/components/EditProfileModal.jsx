import { Modal, ModalClose } from "./Modal";
import { truncate } from "@/utils/string";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { client } from "../../lib/sanityClient";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { useZoren } from "../hooks/useZoren";
import { useContext } from "react";
import AppContext from "@/context/AppContext";
import { useRouter } from "next/router";

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

const EditProfleModal = ({
  modalOpen,
  setModalOpen,
}) => {
  const { updateAcc } = useZoren();
  const [newUsername, setNewUsername] = useState("");
  const [newAvatar, setNewAvatar] = useState("");
  const { state, updateProfile } = useContext(AppContext);
  const { asPath, locale, locales } = useRouter();

  const toastId = useRef(null);

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

  const handleUpdate = () => {
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
                backgroundImage: `url("${state.avatar}")`,
              }}
            ></div>
            <div className="my-auto">
              <p className="text-lg font-bold text-gray-800 dark:text-white">
                @{state.userName}
              </p>
              <p className="text-md font-light text-gray-600 dark:text-white">
              {locale === "fr" ? "Modifier le profil" : locale === "es" ? "Editar perfil" : locale === "pt" ? "Editar perfil" : locale === "de" ? "Profil bearbeiten" : "Edit profile"}
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
                  {locale === "fr" ? "Votre nom d'utilisateur :" : locale === "es" ? "Tu nombre de usuario:" : locale === "pt" ? "Seu nome de usuário:" : locale === "de" ? "Dein Benutzername:" : "Your username:"}
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
                  placeholder={state.userName}
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
                  {locale === "fr" ? "Changer d'avatar :" : locale === "es" ? "Cambiar avatar:" : locale === "pt" ? "Alterar avatar:" : locale === "de" ? "Avatar ändern:" : "Change Avatar:"}
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
              <p className="text-sm opacity-50">{locale === "fr" ? "*Veuillez entrer votre nom d'utilisateur pour confirmer cette action." : locale === "es" ? "*Por favor, ingresa tu nombre de usuario para confirmar esta acción." : locale === "pt" ? "*Por favor, digite seu nome de usuário para confirmar esta ação." : locale === "de" ? "*Bitte geben Sie Ihren Benutzernamen ein, um diese Aktion zu bestätigen." : "*Please enter your username to confirm this action."}</p>
            </div>
          </div>

          <div className="flex flex-col w-full gap-4">
            <button
              onClick={() => handleUpdate()}
              disabled={!newUsername}
              className="w-full rounded-lg disabled:opacity-60 disabled:hover:bg-secondary disabled:dark:bg-secondary/60 bg-secondary hover:bg-secondary/80 dark:bg-secondary/60 py-3 px-8 dark:hover:bg-secondary/30 transition ease-out"
            >
              <span className="font-bold text-white">{locale === "fr" ? "Confirmer" : locale === "es" ? "Confirmar" : locale === "pt" ? "Confirmar" : locale === "de" ? "Bestätigen" : "Confirm"}</span>
            </button>

            <button
              onClick={() => setModalOpen(false)}
              className="w-full rounded-lg border-2 border-red-300 py-3 hover:bg-opacity-70"
            >
              <span className="font-medium text-red-300">{locale === "fr" ? "Fermer" : locale === "es" ? "Cerrar" : locale === "pt" ? "Fechar" : locale === "de" ? "Schließen" : "Close"}</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditProfleModal;
