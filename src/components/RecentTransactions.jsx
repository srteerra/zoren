import { QrCodeIcon, LinkIcon } from "@heroicons/react/24/solid";

function MostRecentTransactions() {
  return (
    <div className="my-12">
      {/* Header */}
      <div>
        <h2>Most Recent</h2>
        <p>Trasactions</p>
      </div>
      <div className="my-12 overflow-x-scroll">
        {/* Transaction card */}
        <div className="flex justify-between min-w-[800px]">
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
                <p className="font-bold">Dinner</p>
            </div>
            {/* Date */}
            <div>
                <p className="opacity-60">Dec 12</p>
            </div>
            {/* Amount */}
            <div>
                <p className="font-bold text-primary">+20 SOL</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default MostRecentTransactions;
