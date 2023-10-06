/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { LoginNav } from "@/components/LoginNav";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ViewfinderCircleIcon } from "@heroicons/react/24/solid";
import { Footer } from "@/components/Footer";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// Images
import ticket from "../../public/images/ticket.png";
import friends from "../../public/images/friends.png";
import Image from "next/image";
import { Fade, Flip, Zoom } from "react-awesome-reveal";
import { useRouter } from "next/router";
import { useWallet } from "@solana/wallet-adapter-react";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "home"])),
    },
  };
}

const Home = () => {
  const router = useRouter();
  // const [show, setShow] = useState("friends");

  // const words = ["family", "friends", "partners", "mates", "couple"];
  const { t } = useTranslation("home");

  const { connected } = useWallet();

  useEffect(() => {
    if (connected) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  }, [connected]);

  // useEffect(() => {
  //   const changeWords = () => {
  //     let i = 0;
  //     setInterval(() => {
  //       setShow(words[i]);
  //       if (i === 2) {
  //         i = 0;
  //       } else i++;
  //     }, 4000);
  //   };

  //   changeWords();
  // }, []);

  return (
    <div className="w-full h-screen">
      <div className="bg-black text-center text-white py-3">
        <p>
          {t('Add1')}{" "}
          <span className="font-bold">{t('Add2')}</span> {t('Add3')}
        </p>
      </div>
      <LoginNav />

      {/* Fisrt section */}
      <div className="w-full lg:w-4/5 mx-auto flex h-5/6 items-center pb-32">
        {/* left side */}
        <div className="w-full text-center md:text-start md:w-1/2 p-8 lg:p-0 overflow-hidden">
          <div className="">
            <p className="text-slate-500 my-4">{t("WantSeparateBill")}</p>
            <div>
              <h1 className="text-4xl lg:text-5xl font-light">
                {t('WantSeparateBill')} <br /> {t('GenerateQR')} <br /> {t('SplitBill')}
              </h1>
            </div>
            <p className="my-6">
              <Link href={"/"}>
                <strong>Solana</strong>
              </Link>{" "}
              <Link href={"/"}>
                {" "}
                <strong>Phantom</strong>
              </Link>
            </p>
          </div>
          <div className="w-full flex justify-center md:justify-start items-center gap-2 my-6">
            <button className="bg-primary focus:bg-primary hover:bg-secondary transition suration-150 ease-linear p-2 w-36 rounded-full text-white font-bold">
              {t('TryIt')}
            </button>
            <Link href={"/"}>{t('LearnMore')}</Link>
          </div>

          <div className="my-14 text-sm">
            <p>
            {t('PleaseCheck')}{" "}
              <Link href={"/"} className="font-bold">
              {t('PrivacyPolicy')}
              </Link>{" "}
              {t('TermsConsitions')}
            </p>
            <p>{t('ThisIsProject')}</p>
          </div>
        </div>

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
                <span className="absolute bottom-40 left-32">
                  <Zoom triggerOnce>
                    <ViewfinderCircleIcon className="h-16 w-16" />
                  </Zoom>
                </span>
              </div>
            </div>
            <div className="relative">
              <span className="absolute top-40 left-14">
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

      <div className="bg-primary flex flex-col justify-between overflow-hidden h-screen w-full text-white">
        <div className="h-2/6 flex text-center flex-col w-full sm:w-1/2 px-10 pt-20 lg:w-1/3 mx-auto">
          <h1 className="lg:text-5xl">{t('WhatherOcassion')}</h1>
          <p className="py-2">{t('CanUseZoren')}</p>
        </div>
        <div className="h-3/6 flex items-end justify-center bg-[url('../../public/images/banner.png')] bg-no-repeat bg-cover lg:bg-contain bg-center"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
