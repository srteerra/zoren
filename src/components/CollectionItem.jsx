import { useRouter } from "next/router";

const CollectionItem = (data) => {
  const route  = useRouter()
  const { asPath, locale, locales } = useRouter();
  return (
    <div onClick={() => route.push({
      pathname: "/bills/[name]",
      query: { name: data.title },
    })} className="w-1/4 min-w-64 lg:w-full lg: p-2 lg:p-0 my-2 xl:my-4 flex gap-4 flex-col justify-center lg:justify-normal lg:flex-row items-center transition ease-linear duration-150 dark:hover:opacity-60 hover:opacity-70 rounded-lg hover:cursor-pointer">
      <div className="w-14 h-12 p-2 rounded-2xl text-dark bg-terce dark:bg-gray-600 dark:text-white grid place-items-center">
        <span className="text-2xl">{data.icon}</span>
      </div>

      <div className="flex flex-col w-full justify-center text-center lg:text-start items-center lg:items-start">
        <span className="font-bold text-md 2xl:text-lg">{data.title}</span>
        <span className="text-sm 2xl:text-md hidden lg:inline-block">{data.contrib} {locale === "fr" ? "Contributeurs" : locale === "es" ? "Contribuidores" : locale === "pt" ? "Contribuidores" : locale === "de" ? "Mitwirkende" : "Contributors"}</span>
        <span className="text-sm 2xl:text-md flex lg:hidden">{data.contrib} / {data.placeH}</span>
      </div>
    </div>
  );
};

export { CollectionItem };
