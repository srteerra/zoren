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
          }
        );
        return fn.id;
      } catch (error) {
        return error;
      }
    } else {
      return new Error("Collection name already exists");
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
      }
    );
    return fn.id;
  }
}

export async function handleModifyData(data) {
  console.log(data);
  const ref = doc(firestore, "usuarios", data._id);
  if (data) {
    await updateDoc(ref, {
      name: data.name,
      surname: data.surname,
      email: data.surname,
      rol: data.rol,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// export async function handleGetUser(user) {
//   const snapshot = await getDocs(collection(firestore, 'attendance', user, 'assistance'));

//   const data = snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));

//   return data;
// }

// export async function userExists(user) {
//   console.log(user, 'Este llegoooo');
//   const snapshot = await getDoc(doc(firestore, 'attendance', user));
//   console.log(snapshot, 'exist');

//   if (snapshot.exists()) {
//     return true;
//   } else {
//     return false;
//   }
// }

// export async function userStatus(user) {
//   const snapshot = await getDoc(doc(firestore, 'attendance', user));

//   const data = snapshot.data();
//   return data.status;
// }

// export async function handleAddAttendance(data) {
//   const exist = userExists(data.uid);
//   if ((await exist) === true) {
//     const status = await userStatus(data.uid);
//     addDoc(collection(firestore, 'attendance', data.uid, 'history'), {
//       uid: data.uid,
//       user: data.user,
//       inPlace: data.inPlace,
//       date: data.date,
//       status: status === 'entrada' ? 'salida' : 'entrada',
//     })
//       .then(async (res) => {
//         console.log(res.id);
//         console.log('status:', status);
//         setDoc(doc(firestore, 'attendance', data.uid), { status: status === 'entrada' ? 'salida' : 'entrada' });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   } else {
//     setDoc(doc(firestore, 'attendance', data.uid), { status: 'entrada' });
//     addDoc(collection(firestore, 'attendance', data.uid, 'history'), {
//       uid: data.uid,
//       user: data.user,
//       inPlace: data.inPlace,
//       date: data.date,
//       status: 'entrada',
//     });
//   }
// }

// export async function handleIdToName(id) {
//   const DocData = await getDoc(doc(firestore, 'usuarios', id));

//   const data = DocData.data();

//   return data.name + ' ' + data.surname;
// }

// export async function handleNameToId(email) {
//   const DocData = await getDocs(query(collection(firestore, 'usuarios'), where('email', '==', email)));

//   // console.log(DocData.docs, 'holaaaaaa');

//   const data = DocData.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));

//   return data[0].id;
// }

// export async function handleGetAllData() {
//   const snapshot = await getDocs(collection(firestore, 'usuarios'));

//   const data = snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));

//   return data;
// }

// export async function handleGetUserDates(ref) {
//   const snapshot = await getDocs(query(collection(firestore, 'attendance', ref, 'history'), orderBy('date', 'desc')));

//   const data = snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
//   return data;
// }

// export async function handleGetUserDatesPM(ref, refDate) {
//   const snapshot = await getDocs(collection(firestore, 'attendance', ref, 'history'));

//   const data = snapshot.docs.map((doc) => ({
//     ...doc.data(),
//   }));

//   const month = data.filter((date) => new Date(date.date.seconds * 1000).getMonth() === new Date(refDate).getMonth());

//   return month.length;
// }

// export async function handleGetUserDatesListPM(ref, refDate) {
//   const snapshot = await getDocs(collection(firestore, 'attendance', ref, 'history'));

//   const data = snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));

//   const month = data.filter((date) => new Date(date.date.seconds * 1000).getMonth() === new Date(refDate).getMonth());

//   return month;
// }
