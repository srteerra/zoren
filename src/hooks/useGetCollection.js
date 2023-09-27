"use client";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
  addDoc,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
  orderBy,
  updateDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";
import { app } from "../firebase.js";

// get the firestore
const firestore = getFirestore(app);

//* Functions or endpoints

// get all collections in a wallet
export async function handleGetCollections(wallet) {
  const snapshot = await getDocs(
    collection(firestore, "wallets", wallet, "wallet-collections")
  );

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

// get all collections in a wallet with status 'open'
export async function handleGetCollectionsOpen(wallet) {
  const snapshot = await getDocs(
    query(
      collection(firestore, "wallets", wallet, "wallet-collections"),
      where("status", "==", "open")
    )
  );

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

// get all collections in a wallet with status 'paid'
export async function handleGetCollectionsPaid(wallet) {
  const snapshot = await getDocs(
    query(
      collection(firestore, "wallets", wallet, "wallet-collections"),
      where("status", "==", "paid")
    )
  );

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

// this function check in the database if the collection title exists in the wallet collection
export async function userExists(data) {
  const snapshot = await getDocs(
    query(
      collection(firestore, "wallets", data.wallet, "wallet-collections"),
      where("title", "==", data.title)
    )
  );
  const res = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return res[0] !== undefined ? true : false;
}

// check if the wallet provided exists in the db
export async function walletExists(wallet) {
  const snapshot = await getDoc(doc(firestore, "wallets", wallet));

  if (snapshot.exists()) {
    return true;
  } else {
    return false;
  }
}

// Add a collection into a wallet
// * example to call this function:
/* 
handleAddData({
  wallet: "XtIpdzPsiDtaYJEuWdZO",
  title: "pockets",
  amount: 600,
  status: "open",
  people: 2,
  hasPaid: 0,
}) 
*/
export async function handleAddData(data) {
  const wallet = walletExists(data.wallet);
  if (await wallet) {
    const exists = await userExists({ wallet: data.wallet, title: data.title });
    if (!exists) {
      try {
        const fn = await addDoc(
          collection(firestore, "wallets", data.wallet, "wallet-collections"),
          {
            amount: data.amount,
            hasPaid: data.hasPaid,
            people: data.people,
            status: data.status,
            title: data.title,
            transactions: [],
          }
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      return false;
    }
  } else {
    await setDoc(doc(firestore, "wallets", data.wallet), {
      name: data.name || data.wallet,
    });
    const fn = await addDoc(
      collection(firestore, "wallets", data.wallet, "wallet-collections"),
      {
        amount: data.amount,
        hasPaid: data.hasPaid,
        people: data.people,
        status: data.status,
        title: data.title,
        transactions: [],
      }
    );
    return true;
  }
}

// validate if the amount is completed
export const validatePaid = async (wallet, collection) => {
  const snap = await getDoc(
    doc(firestore, "wallets", wallet, "wallet-collections", collection)
  );

  const data = snap.data();
  let sum = 0;
  data.transactions.map((trans) => (sum += trans.amount));

  return sum === data.amount ? true : false;
};

// chanche the doc with new transaction
export async function handleModifyData(data) {
  if (data) {
    try {
      await updateDoc(
        doc(
          firestore,
          "wallets",
          data.walletTo,
          "wallet-collections",
          data.walletCollectionTo
        ),
        {
          hasPaid: increment(1),
          transactions: arrayUnion({
            name: data.walletFrom,
            amount: data.amount,
          }),
        }
      ).then(async () => {
        if (await validatePaid(data.walletTo, data.walletCollectionTo)) {
          await updateDoc(
            doc(
              firestore,
              "wallets",
              data.walletTo,
              "wallet-collections",
              data.walletCollectionTo
            ),
            {
              status: "paid",
            }
          );
        }
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}