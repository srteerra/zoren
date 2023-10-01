import { TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { client } from "../../lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

function FriendItem({ address }) {
  const [personData, setPersonData] = useState({});

  useEffect(() => {
    client.getDocument(address).then((res) => {
      console.log(res);
      setPersonData({
        name: res.userName,
        address: res.userAddress,
        avatar: builder.image(res.userAvatar).url(),
      });
    });
  }, [address]);

  return (
    <div className="flex items-center justify-between min-w-[800px]">
      <div
        className="rounded-full w-[50px] h-[50px] bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: `url("${personData.avatar}")`,
        }}
      ></div>
      <div>
        <p>{personData.name || "..."}</p>
      </div>
      <div>
        <p className="opacity-60">{personData.address || "..."}</p>
      </div>
      <div>
        <button className="bg-red-300 p-3 rounded-xl">
          <TrashIcon width={20} />
        </button>
      </div>
    </div>
  );
}

export default FriendItem;
