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
import { useRouter } from "next/router";

const AddFriendsModal = ({ modalOpen, setModalOpen, t }) => {
  const [searchPeople, setSearchPeople] = useState("");
  const [catchMsg, setCatchMsg] = useState("");
  const [isVerified, setIsVerified] = useState(undefined);
  const [isAdded, setIsAdded] = useState(false);
  const [contacts, setContacts] = useState([]);
  const { addContact } = useZoren();
  const { state } = useContext(AppContext);
  const { asPath, locale, locales } = useRouter();

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
              setCatchMsg(`${
                locale === "fr"
                  ? "Vous avez déjà ajouté cet utilisateur"
                  : locale === "es"
                  ? "Ya has añadido a este usuario"
                  : locale === "pt"
                  ? "Você já adicionou este usuário"
                  : locale === "de"
                  ? "Du hast diesen Benutzer bereits hinzugefügt"
                  : "You have already added this user"
              }
            }`);
              setIsAdded(true);
            } else {
              setCatchMsg(
                `${
                  locale === "fr"
                    ? "Cet utilisateur utilise Zoren !"
                    : locale === "es"
                    ? "¡Este usuario está usando Zoren!"
                    : locale === "pt"
                    ? "Este usuário está usando o Zoren!"
                    : locale === "de"
                    ? "Dieser Benutzer verwendet Zoren!"
                    : "This user is using Zoren!"
                }`
              );
              setIsAdded(false);
            }
          } else {
            setIsVerified(false);
            setCatchMsg(`${
              locale === "fr"
                ? "Cet utilisateur n'utilise pas Zoren :("
                : locale === "es"
                ? "Este usuario no está usando Zoren :("
                : locale === "pt"
                ? "Este usuário não está usando o Zoren :("
                : locale === "de"
                ? "Dieser Benutzer verwendet Zoren nicht :("
                : "This user is not using Zoren :("
            }
            `);
            setIsAdded(false);
          }
        });
      } else {
        setCatchMsg(`${
          locale === "fr"
            ? "Adresse introuvable"
            : locale === "es"
            ? "Dirección no encontrada"
            : locale === "pt"
            ? "Endereço não encontrado"
            : locale === "de"
            ? "Adresse nicht gefunden"
            : "Address not found"
        }
        `);
        setIsVerified(false);
      }
    } else {
      setCatchMsg(`${
        locale === "fr"
          ? "Veuillez entrer une adresse valide"
          : locale === "es"
          ? "Por favor, ingrese una dirección válida"
          : locale === "pt"
          ? "Por favor, digite um endereço válido"
          : locale === "de"
          ? "Bitte geben Sie eine gültige Adresse ein"
          : "Please enter a valid address"
      }
      `);
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
                <p className="mb-2 font-bold">
                  {locale === "fr"
                    ? "Ajouter un nouvel ami"
                    : locale === "es"
                    ? "Agregar nuevo amigo"
                    : locale === "pt"
                    ? "Adicionar novo amigo"
                    : locale === "de"
                    ? "Neuen Freund hinzufügen"
                    : "Add new friend"}
                </p>
                <p className="font-light">
                  {locale === "fr"
                    ? "Rechercher un utilisateur enregistré sur la plateforme"
                    : locale === "es"
                    ? "Buscar un usuario registrado en la plataforma"
                    : locale === "pt"
                    ? "Procurar por um usuário registrado na plataforma"
                    : locale === "de"
                    ? "Nach einem registrierten Benutzer auf der Plattform suchen"
                    : "Search for a registered user on the platform"}
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
                    placeholder={
                      locale === "fr"
                        ? "Saisissez une adresse Solana valide"
                        : locale === "es"
                        ? "Introduce una dirección Solana válida"
                        : locale === "pt"
                        ? "Digite um endereço Solana válido"
                        : locale === "de"
                        ? "Geben Sie eine gültige Solana-Adresse ein"
                        : "Enter a valid Solana address"
                    }
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
                {locale === "fr" ? (
                  <span className="font-bold text-white">
                    {!isVerified
                      ? "Vérifier"
                      : isAdded
                      ? "Dans les contacts"
                      : "Ajouter un ami"}
                  </span>
                ) : locale === "es" ? (
                  <span className="font-bold text-white">
                    {!isVerified
                      ? "Verificar"
                      : isAdded
                      ? "En contactos"
                      : "Agregar amigo"}
                  </span>
                ) : locale === "pt" ? (
                  <span className="font-bold text-white">
                    {!isVerified
                      ? "Verificar"
                      : isAdded
                      ? "Em contatos"
                      : "Adicionar amigo"}
                  </span>
                ) : locale === "de" ? (
                  <span className="font-bold text-white">
                    {!isVerified
                      ? "Überprüfen"
                      : isAdded
                      ? "In Kontakten"
                      : "Freund hinzufügen"}
                  </span>
                ) : (
                  <span className="font-bold text-white">
                    {!isVerified
                      ? "Verify"
                      : isAdded
                      ? "In contacts"
                      : "Add friend"}
                  </span>
                )}
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
                <span className="font-medium text-red-300">
                  {locale === "fr"
                    ? "Annuler"
                    : locale === "es"
                    ? "Cancelar"
                    : locale === "pt"
                    ? "Cancelar"
                    : locale === "de"
                    ? "Abbrechen"
                    : "Cancel"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddFriendsModal;
