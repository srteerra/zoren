import { QrCodeIcon, LinkIcon } from "@heroicons/react/24/solid";

function ActionCenterDashboard() {
  return (
    <div className="hidden lg:flex gap-12 my-16">
      {/* Create session action */}
      <div className="flex gap-6 items-center text-black dark:text-white">
        <button
          onClick={() => handleClick()}
          className="bg-black dark:bg-dark p-4 rounded-xl hover:opacity-80 text-white transition ease"
        >
          <QrCodeIcon width={35} />
        </button>
        <div>
          <p className="text-lg font-bold">Start a session</p>
          <p className="text-lg">with a new QR code</p>
        </div>
      </div>
      <div className="flex gap-6 items-center text-black dark:text-white">
        <button
          onClick={() => handleClick()}
          disabled
          className="bg-black dark:bg-dark text-white p-4 rounded-xl disabled:opacity-60"
        >
          <LinkIcon width={35} />
        </button>
        <div>
          <p className="text-lg font-bold opacity-60">Join to session</p>
          <p className="text-lg opacity-60">with a new QR code</p>
        </div>
      </div>
    </div>
  );
}

export default ActionCenterDashboard;
