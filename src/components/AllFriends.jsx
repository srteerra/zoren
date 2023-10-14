import { TrashIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import AppContext from "@/context/AppContext";
import FriendItem from "./FriendItem";

function AllFriends({t}) {
  const [friendsList, setFriendsList] = useState([]);
  const { state } = useContext(AppContext);

  useEffect(() => {
    setFriendsList(state.userContacts);
  }, [state.userContacts]);

  return (
    <div className="my-12">
      {/* Header */}
      <div>
        <h2>{t('C-MyFriends')}</h2>
        <p>{t('C-ListContacts')}</p>
      </div>
      <div className="hiddenScroll my-12 overflow-x-scroll">
        {!state.userContacts ? (
          <div className="flex items-center justify-between min-w-[800px]">
            <p>{t('C-DontHaveAdded')}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {friendsList.map((contact, key) => (
              <FriendItem key={key} address={contact.contactAddress} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllFriends;
