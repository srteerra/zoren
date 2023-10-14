/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { LoginNav } from "@/components/LoginNav";
import RegionChange from "@/components/Region";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ViewfinderCircleIcon } from "@heroicons/react/24/solid";
import { Footer } from "@/components/Footer";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
const zoren = "../zoren.pdf";

// Images
import ticket from "../../public/images/ticket.png";
import friends from "../../public/images/friends.png";
import Image from "next/image";
import { Fade, Flip, Zoom } from "react-awesome-reveal";
import { useRouter } from "next/router";
import { useWallet } from "@solana/wallet-adapter-react";
// const deck = "../zoren.pdf";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "home"])),
    },
  };
}

const Home = () => {
  const router = useRouter();
  const { asPath, locale, locales } = useRouter();
  const { t } = useTranslation("home");
  const { connected } = useWallet();

  useEffect(() => {
    if (connected) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  }, [connected]);

  const downloadPdfn = () => {
    const down = document.createElement("a");
    down.href = zoren;
    down.setAttribute("download", "deck.pdf");
    down.style.display = "none";
    document.body.appendChild(down);
    down.click();
    document.body.removeChild(down);
  };

  return (
    <div className="w-full h-screen relative">
      <div className="bg-black text-center text-white py-3">
        <p>
          {t("Add1")} <span className="font-bold">{t("Add2")}</span> {t("Add3")}
        </p>
      </div>
      <LoginNav />

      {/* Fisrt section */}
      <div className="w-full lg:w-4/5 mx-auto overflow-hidden flex h-5/6 items-center pb-32">
        {/* left side */}
        <Fade direction="left" triggerOnce className="w-full md:w-1/2">
          <div className="w-full text-center md:text-start p-8 lg:p-0 overflow-hidden">
            <div className="">
              <p className="text-slate-500 my-4">{t("WantSeparateBill")}</p>
              <div>
                <h1 className="text-4xl lg:text-5xl font-light">
                  {t("GenerateQR")} <br /> {t("SplitBill")} <br />{" "}
                  {t("BetweenYFriends")}
                </h1>
              </div>
              <p className="my-6">
                Using{" "}
                <Link href={"/"}>
                  <strong>Solana</strong>
                </Link>
                {" And "}
                <Link href={"/"}>
                  {" "}
                  <strong>Phantom</strong>
                </Link>
              </p>
            </div>
            <div className="w-full flex justify-center md:justify-start items-center gap-2 my-6">
              <button
                onClick={() => router.push("/how")}
                className="bg-primary focus:bg-primary hover:bg-secondary transition suration-150 ease-linear p-2 w-36 rounded-full text-white font-bold"
              >
                {t("TryIt")}
              </button>
              <Link href={"/about"}>{t("LearnMore")}</Link>
            </div>

            <div className="my-14 text-sm">
              <p>
                {t("PleaseCheck")}{" "}
                <Link href={"/"} className="font-bold">
                  {t("PrivacyPolicy")}
                </Link>{" "}
                {t("TermsConsitions")}
              </p>
              <p>{t("ThisIsProject")}</p>
            </div>
          </div>
        </Fade>

        {/* right side */}
        <div className="w-1/2 h-full hidden md:flex pb-10">
          <div className="w-full grid grid-cols-2">
            <div className="relative">
              <div className="grid grid-rows-3 p-4 h-full">
                <div className="row-span-2 grid grid-rows-4">
                  <Fade
                    direction="down"
                    triggerOnce
                    className="h-full grid place-items-center relative row-span-2 row-start-2 max-h-[250px] lg:bg-secondary rounded-2xl "
                  >
                    <Image
                      src={ticket}
                      alt="tickets"
                      style={{ width: "60%" }}
                      priority
                      quality={100}
                      className="2xl:absolute bottom-0 left-[20%]"
                    />
                  </Fade>
                </div>
                <span className="absolute bottom-1/4 3xl:bottom-1/2 left-1/3">
                  <Zoom triggerOnce>
                    <ViewfinderCircleIcon className="h-16 w-16" />
                  </Zoom>
                </span>
              </div>
            </div>
            <div className="relative">
              <span className="absolute top-20 left-1/4">
                <Zoom triggerOnce>
                  <ViewfinderCircleIcon className="h-12 w-12" />
                </Zoom>
              </span>
              <div className="grid grid-rows-3 h-full">
                <div className="row-span-2 row-start-2 grid grid-rows-3 ">
                  <Fade
                    direction="up"
                    triggerOnce
                    className="h-full grid place-items-center relative row-span-2 max-h-[300px] row-start-2 lg:bg-secondary rounded-2xl "
                  >
                    <Image
                      src={friends}
                      alt="tickets"
                      style={{ width: "60%" }}
                      priority
                      quality={100}
                      className="2xl:absolute bottom-4 left-[20%]"
                    />
                  </Fade>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What's is zoren section */}
      <div className="w-full h-screen flex items-center justify-center p-2">
        <div className="text-center w-full h-full flex flex-col justify-around">
          <Zoom duration={300} triggerOnce>
            <h1>{t("WhatsZoren")}</h1>
          </Zoom>

          <Fade
            className="bg-slate-400 w-full md:w-1/2 h-1/2 mx-auto"
            triggerOnce
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/rmmv4c7YG9M?si=BswJRKgbHqSmPJEw"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </Fade>

          <div className="w-full sm:w-1/3 mx-auto">
            <p>
              {t("LearnMoreAbout")}{" "}
              <Link href={"/how"} className="font-bold">
                {t("HowItWorks")}
              </Link>{" "}
              {t("sections")}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-primary flex flex-col justify-between overflow-hidden h-screen w-full text-white">
        <Zoom duration={300} triggerOnce>
          <div className="h-2/6 flex text-center flex-col w-full sm:w-1/2 px-10 pt-20 lg:w-1/3 mx-auto">
            <h1 className="lg:text-5xl">{t("WhatherOcassion")}</h1>
            <p className="py-2">{t("CanUseZoren")}</p>
          </div>
        </Zoom>
        <div className="h-3/6 flex items-end justify-center bg-[url('../../public/images/banner.png')] bg-no-repeat bg-cover lg:bg-contain bg-center"></div>
      </div>

      {/* roadmap section */}
      <div className="w-full p-4">
        <Zoom
          duration={300}
          triggerOnce
          className="w-full text-center my-32 text-primary"
        >
          <h1>{t("OurRoadmap")}</h1>
        </Zoom>

        <Zoom cascade triggerOnce duration={300} className="">
          {/* stage 01 */}
          <div className="w-full md:w-3/5 lg:w-2/5 grid grid-cols-5 mx-auto">
            <div className="hidden text-primary md:block text-center">
              <h2>{t("Stage")}</h2>
              <span className="text-4xl font-bold">01</span>
            </div>
            <div className="col-span-5 md:col-span-4 md:col-start-2 md:border-l-4 pl-4 md:pl-6 border-primary">
              <div className="md:w-1/2">
                <h2 className="text-primary">{t("PlannningAndDes")}</h2>
              </div>
              <ul className="list-disc p-4 flex flex-col gap-y-4">
                <li>
                  <p>{t("projectObjectives")}</p>
                </li>
                <li>
                  <p>{t("AssessTheFeasinility")}</p>
                </li>
                <li>
                  <p>{t("DetermineTheTecnology")}</p>
                </li>
                <li>
                  <p>{t("IdentifyPotential")}</p>
                </li>
              </ul>
            </div>
          </div>

          {/* stage 02 */}
          <div className="w-full md:w-3/5 lg:w-2/5 grid grid-cols-5 mx-auto">
            <div className="hidden text-primary md:block text-center pt-10">
              <h2>{t("Stage")}</h2>
              <span className="text-4xl font-bold">02</span>
            </div>
            <div className="col-span-5 md:col-span-4 md:col-start-2 md:border-l-4 pl-4 md:pl-6 border-primary">
              <div className="md:w-1/2">
                <h2 className="text-primary pt-10">{t("Development")}</h2>
              </div>
              <ul className="list-disc p-4 flex flex-col gap-y-4">
                <li>
                  <p>{t("DevelopSolana")}</p>
                </li>
                <li>
                  <p>{t("CreateThe")}</p>
                </li>
                <li>
                  <p>{t("ImplementUser")}</p>
                </li>
              </ul>
            </div>
          </div>

          {/* stage 03 */}
          <div className="w-full md:w-3/5 lg:w-2/5 grid grid-cols-5 mx-auto">
            <div className="hidden text-primary md:block text-center pt-10">
              <h2>{t("Stage")}</h2>
              <span className="text-4xl font-bold">03</span>
            </div>
            <div className="col-span-5 md:col-span-4 md:col-start-2 md:border-l-4 pl-4 md:pl-6 border-primary">
              <div className="md:w-1/2">
                <h2 className="text-primary pt-10">{t("TestingLaunch")}</h2>
              </div>
              <ul className="list-disc p-4 flex flex-col gap-y-4">
                <li>
                  <p>{t("Invitebeta")}</p>
                </li>
                <li>
                  <p>{t("AddressIssues")}</p>
                </li>
                <li>
                  <p>{t("ConductFinal")}</p>
                </li>
                <li>
                  <p>{t("PrepareServers")}</p>
                </li>
              </ul>
            </div>
          </div>

          {/* stage 04 */}
          <div className="w-full md:w-3/5 lg:w-2/5 grid grid-cols-5 mx-auto">
            <div className="hidden text-primary md:block text-center pt-10">
              <h2>{t("Stage")}</h2>
              <span className="text-4xl font-bold">04</span>
            </div>
            <div className="col-span-5 md:col-span-4 md:col-start-2 md:border-l-4 pl-4 md:pl-6 border-primary">
              <div className="md:w-1/2">
                <h2 className="text-primary pt-10">{t("Post-Launch")}</h2>
              </div>
              <ul className="list-disc p-4 flex flex-col gap-y-4">
                <li>
                  <p>{t("ReleaseApplication")}</p>
                </li>
                <li>
                  <p>{t("DevelopNewFeatures")}</p>
                </li>
                <li>
                  <p>{t("ActivelyEngage")}</p>
                </li>
                <li>
                  <p>{t("ConsiderExpanding")}</p>
                </li>
              </ul>
            </div>
          </div>
        </Zoom>
      </div>

      <div className="w-full h-1/3 mx-auto text-center my-28 flex flex-col gap-8">
        <h1>
          {locale === "fr"
            ? "Téléchargez notre deck"
            : locale === "es"
            ? "Descarga nuestro deck"
            : locale === "pt"
            ? "Baixe nosso deck"
            : locale === "de"
            ? "Laden Sie unsere deck herunter"
            : "Download our deck"}
        </h1>
        <button
          onClick={() => downloadPdfn()}
          className="w-auto mx-auto py-2 px-8 rounded-full bg-primary text-white hover:opacity-75 transition duration-150 ease-linear"
        >
          {locale === "fr"
            ? "Télécharger"
            : locale === "es"
            ? "Descargar"
            : locale === "pt"
            ? "Baixar"
            : locale === "de"
            ? "Herunterladen"
            : "Download"}
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
