import { faMugHot, faMoneyBills } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/router";

const img = "https://i.pravatar.cc/100?img=";

const Bill = ({ data, t }) => {
  const { asPath, locale, locales } = useRouter();
  const icons = [faMugHot, faMoneyBills];
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push({
          pathname: "/bills/[name]",
          query: { name: data.title },
        });
      }}
      className="flex flex-col gap-8 justify-between p-8 bg-slate-600 dark:bg-dark rounded-2xl min-w-[280px] w-auto hover:brightness-90 hover:shadow-2xl group transition ease-out"
    >
      {/* Head */}
      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex w-full justify-between items-center pb-5">
            <div className="flex gap-3 items-center">
              <div className="bg-slate-800 dark:bg-gray-600 grid p-0 place-items-center rounded-xl w-12 h-12">
                <p className="text-xl">{data.icon}</p>
              </div>
              <p className="font-bold overflow-x-hidden w-20 pr-6 text-xl text-white">
                {data.title}
              </p>
            </div>
            <p className="font-bold text-xl text-white">
              {data.hasPaid}/{data.people}
            </p>
          </div>
        </div>
      </div>
      {/* Foot */}
      <div className="flex justify-between w-full group-hover:justify-center">
        <p className="group-hover:hidden flex gap-1 text-white">
          {data.people.lenght > 5 ? "+5" : data.people} {" "}
          {locale === "fr"
            ? "Personnes"
            : locale === "es"
            ? "Personas"
            : locale === "pt"
            ? "Pessoas"
            : locale === "de"
            ? "Menschen"
            : "People"}
        </p>
        <div className="hidden group-hover:flex justify-center gap-2 text-white">
          <p>
            {locale === "fr"
              ? "Ouvrir"
              : locale === "es"
              ? "Abrir"
              : locale === "pt"
              ? "Abrir"
              : locale === "de"
              ? "Öffnen"
              : "Open"}
          </p>
          <ArrowTopRightOnSquareIcon width={20} />
        </div>
        <div className="group-hover:hidden gap-1 relative">
          <div className="w-7 h-7 absolute right-10 bottom-0 bg-dark rounded-full overflow-hidden">
            <Image src={img + "3"} width={100} height={100} alt="avatar" />
          </div>
          <div className="w-7 h-7 absolute right-5 bottom-0 bg-dark rounded-full overflow-hidden">
            <Image src={img + "5"} width={100} height={100} alt="avatar" />
          </div>
          <div className="w-7 h-7 absolute right-0 bottom-0 bg-dark rounded-full overflow-hidden">
            <Image src={img + "10"} width={100} height={100} alt="avatar" />
          </div>
        </div>
      </div>
    </button>
  );
};

export { Bill };
