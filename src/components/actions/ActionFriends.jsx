import { PlusIcon } from "@heroicons/react/24/solid";
import { useState } from 'react';
import AddFriendsModal from "../AddFriendsModal";

function ActionCenterFriends({t}) {
  const [addFriendsModalOpen, setAddFriendsModalOpen] = useState(false);

  return (
    <div className="hidden lg:flex flex-col gap-8 my-4">
      <AddFriendsModal
        modalOpen={addFriendsModalOpen}
        setModalOpen={setAddFriendsModalOpen}
      />
      {/* Create session action */}
      <div className="flex items-center gap-6 text-black dark:text-white">
        <button
          onClick={() => setAddFriendsModalOpen(!addFriendsModalOpen)}
          className="bg-black dark:bg-dark p-4 rounded-xl hover:opacity-80 text-white transition ease"
        >
          <PlusIcon width={35} />
        </button>
        <div>
          <p className="text-lg font-bold">{t('C-AddFriend')}</p>
          <p className="text-lg">{t('C-SolanaAddress')}</p>
        </div>
      </div>
    </div>
  );
}

export default ActionCenterFriends;
