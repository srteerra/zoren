import {
  EllipsisHorizontalIcon,
  QrCodeIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/solid";
import { Collections } from "@/containers/Collections";
import Image from "next/image";

const Profile = () => {
  return (
    <aside className="lg:fixed flex lg:mt-10 justify-between md:justify-around flex-row-reverse lg:block w-full h-1/6 lg:h-screen lg:w-2/12 p2 sm:p-10 md:p-2 right-0">
      {/* Menu title */}
      <div className="flex justify-between p-2 lg:p-0">
        <h3 className="hidden lg:block">My profile</h3>
        <button className="text-slate-500 hover:text-slate-700">
          <EllipsisHorizontalIcon className="h-8 w-8" />
        </button>
      </div>

      {/* Profile image */}
      <div className="flex lg:flex-col lg:my-10 lg:text-center min-[280]:justify-center items-center max-[280]:gap-2 gap-4">
        <div className="max-[240px]:w-1/2 pl-2 lg:pl-0 w-1/3 lg:w-1/2 relative">
          <Image
            className="rounded-full"
            src={"https://picsum.photos/id/237/200/200"}
            alt="Profile"
            priority={true}
            height={200}
            width={200}
          />
          <button className="bg-white rounded-full h-8 w-8 hidden md:grid place-content-center absolute right-1 -bottom-1">
            <QrCodeIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="max-[280px]:hidden flex flex-col">
          <span className="font-bold">Terra</span>
          <span className="text-slate-500 hover:cursor-copy" onClick={() => navigator.clipboard.writeText('Hola')}>BKEq...Rs4</span>
        </div>
      </div>

      {/* Collection section */}
      <section className="hidden lg:block p-0 xl:p-2">
        <div className="flex items-center justify-between">
          <span className="font-bold">My collection</span>
          <button>
            <PlusSmallIcon className="h-6 w-6" />
          </button>
        </div>
        {/* list of collections */}
        <div className="my-6">
          <Collections />
        </div>
      </section>
    </aside>
  );
};

export { Profile };
