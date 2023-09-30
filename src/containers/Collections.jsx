"use client";
import { CollectionItem } from "@/components/CollectionItem";
import { handleGetCollections } from "@/hooks/useGetCollection";
import AppContext from "@/context/AppContext";
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';
import { app } from "@/firebase";
import { useEffect, useState, useContext } from "react";
// get the firestore
const firestore = getFirestore(app);

const Collections = () => {
  const { state, listener } = useContext(AppContext);
  const [data, setData] = useState([]);

  const q = query(collection(firestore, 'wallets'));

  useEffect(() => {
    const fetchData = async () => {
      setData(await handleGetCollections(state.userAddress));
    };

    fetchData();
  }, [state.userAddress]);

  if(listener) {
    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added') {
          setData(await handleGetCollections(state.userAddress));
        }
      });
    });
  } else null;
  



  if (data) {
    const arrayList = data.map((collection) => (
      <CollectionItem
        key={collection.title}
        title={collection.title}
        contrib={collection.hasPaid}
        icon={collection.icon}
      />
    ));

    return arrayList;
  } else {
    return (
    <></>
    );
  }
};

export { Collections };
