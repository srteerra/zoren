// import ActionCenterFriends from "@/components/actions/ActionFriends";
import { Collections } from "@/containers/Collections";
import Nav from "@/components/Nav";
import { QrCodeIcon, ShareIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import ActionCenterFriends from "@/components/actions/ActionFriends";
import AllFriends from "@/components/AllFriends";
import { QRCode } from "qrcode";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "friends"])),
    },
  };
}

const Friends = () => {
  const { t } = useTranslation("friends");
  const nav = {
    title: t("Friends"),
    isSubpage: false,
    id: 3,
  };

  return (
    <div className="py-10 px-4 sm:px-8 lg:px-16 h-screen lg:overflow-y-scroll hiddenScroll">
      <Nav data={nav} />
      <div className="grid grid-cols-1 grid-rows-2 xl:grid-rows-1 xl:grid-cols-3 gap-12">
        {/* Reminder card */}
        <div className="bg-secondary row-start-1 row-span-3 col-start-1 col-span-1 lg:row-span-1 xl:row-start-1 xl:col-start-1 xl:col-span-2 dark:bg-gray-600 p-8 lg:p-12 rounded-3xl text-light">
          <div className="w-full">
            <p
              className="text-start text-3xl 2xl:text-4xl lg:text-3xl md:text-3xl font-bold"
            >
              {t("ShareZorenFrinds")}
            </p>
            <p className="w-full xl:w-[60%] text-lg 2xl:text-xl lg:text-md text-md pt-2 font-light">
            {t("ToAdd")}
            </p>
            <button
              onClick={() => {}}
              className="flex gap-3 justify-center text-center mt-5 items-center text-md font-bold text-dark bg-white hover:opacity-70 transition ease-out px-8 py-4 rounded-full"
            >
              <ShareIcon width={20} />
              {t("ShareZoren")}
            </button>
          </div>
        </div>
        <div className="row-start-2 row-span-2 col-start-1 xl:row-start-1 xl:col-start-3">
          <ActionCenterFriends t={t}/>
        </div>
      </div>
      <div className="w-full">
        {/* Friends list */}
        <AllFriends t={t}/>
      </div>
    </div>
  );
};

export default Friends;
