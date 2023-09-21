import Nav from "@/components/Nav";
import { TrashIcon, CheckIcon } from "@heroicons/react/24/solid";
import { ExclamationCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";

const BillView = (data) => {
  const nav = {
    title: "bills",
    isSubpage: true,
  };
  const router = useRouter();
  return (
    <div className="py-0 xl:py-10 px-4 sm:px-8 lg:px-16 h-screen lg:overflow-y-scroll hiddenScroll">
      <Nav data={nav} />
      {false ? (
        <div className="w-full bg-success dark:bg-success/40 text-white px-8 py-3 md:py-2 rounded-full">
          <p className="text-md flex gap-3 items-center">
            <CheckCircleIcon width={20} /> This bill is already paid
          </p>
        </div>
      ) : (
        <div className="w-full bg-danger text-white px-8 py-3 md:py-2 rounded-full">
          <p className="text-md flex gap-3 items-center">
            <ExclamationCircleIcon width={20} /> This bill is incompleted
          </p>
        </div>
      )}
      <div className="my-20">
        <div className="flex justify-between">
          <div className="flex flex-col gap-8 text-start text-gray-500">
            <p>Concept</p>
            <p>Contributors</p>
          </div>
          <div className="flex flex-col gap-8 text-end font-bold">
            <p>Ana’s Party</p>
            <p>2 People</p>
          </div>
        </div>
      </div>
      <div className="w-full my-20 border-2 border-gray-400 border-dashed"></div>
      <div className="my-20">
        <div className="flex justify-between">
          <div className="flex flex-col gap-8 text-start text-gray-500">
            <p>Total</p>
            <p>Collected</p>
          </div>
          <div className="flex flex-col gap-8 text-end font-bold">
            <p>{"40"} SOL</p>
            <p className="text-danger">{"20"} SOL</p>
          </div>
        </div>
      </div>
      <div className="my-20">
        <div className="flex gap-4 flex-col md:flex-row text-center justify-end">
          <button className="flex gap-3 justify-center text-center font-bold text-danger border-danger border-2 px-10 py-4 rounded-full">
            <TrashIcon width={20} />
            Delete
          </button>
          {true ? (<button className="flex gap-3 justify-center text-center font-bold text-white bg-primary dark:bg-success/40 px-8 py-4 rounded-full">
            <CheckIcon width={20} />
            Set completed
          </button>) : <></>}
        </div>
      </div>
    </div>
  );
};

export default BillView;
