import { TrashIcon } from "@heroicons/react/24/outline";

function AllFriends() {
  return (
    <div className="my-12">
      {/* Header */}
      <div>
        <h2>My friends</h2>
        <p>List of contacts</p>
      </div>
      <div className="my-12 overflow-x-scroll">
        {/* Transaction card */}
        <div className="flex items-center justify-between min-w-[800px]">
            {/* Avatar */}
            <div>a</div>
            {/* Name */}
            <div>
                <p>Jonathan Ocampo</p>
            </div>
            {/* Address */}
            <div>
                <p className="opacity-60">FWKa...45d</p>
            </div>
            {/* Concept */}
            <div>
                <button className="bg-red-300 p-3 rounded-xl">
                    <TrashIcon width={20} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default AllFriends;
