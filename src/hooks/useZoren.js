import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { client } from "../../lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { useContext } from "react";
import AppContext from "@/context/AppContext";
import Base58 from "base58";

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

export const useZoren = () => {
  const { state, initialFetch, updateProfile, setContacts } =
    useContext(AppContext);
  const [amount, setAmount] = useState(0);
  const [receiver, setReceiver] = useState("");
  const [transactionPurpose, setTransactionPurpose] = useState("");
  const [newTransactionModalOpen, setNewTransactionModalOpen] = useState(false);
  const [userTransactions, setUserTransactions] = useState([]);

  const { connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  // Setting the user address if the wallet is connected
  useEffect(() => {
    if (connected) {
      const userDoc = {
        _type: "users",
        _id: publicKey.toString(),
        userName: "Unnamed",
        userAddress: publicKey.toString(),
        userContacts: [],
      };

      client.createIfNotExists(userDoc);
    }
  }, [connected]);

  const fetchData = async () => {
    const query = `*[_type == "users" && userAddress == "${publicKey.toString()}"] {
      userName,
      userContacts,
      "imageUrl": userAvatar.asset->url
    }`;

    connection.getBalance(publicKey).then(async (value) => {
      console.log(value);

      const collectData = await client.fetch(query);

      if (await collectData[0].imageUrl) {
        // Setting up the user data on fetch
        initialFetch({
          username: await collectData[0].userName,
          address: publicKey.toString(),
          balance: value / LAMPORTS_PER_SOL,
          avatar: await collectData[0].imageUrl,
          contacts: await collectData[0].userContacts,
        });
      } else {
        // Setting up the user data on fetch
        initialFetch({
          username: await collectData[0].userName,
          address: publicKey.toString(),
          balance: value / LAMPORTS_PER_SOL,
          avatar: "https://avatar.iran.liara.run/public/12",
          contacts: await collectData[0].userContacts,
        });
      }
    });
  };

  useEffect(() => {
    if (publicKey) {
      fetchData();
    }
  }, [publicKey]);

  const makeTransaction = async (fromWallet, toWallet, amount, reference) => {
    console.log(fromWallet);
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = clusterApiUrl(network);
    const connection = new Connection(endpoint);

    // blockhash
    const { blockhash } = await connection.getLatestBlockhash("finalized");

    const transaction = new Transaction({
      recentBlockhash: blockhash,
      feePayer: fromWallet,
    });

    const transferInstruction = SystemProgram.transfer({
      fromPubkey: fromWallet,
      lamports: amount.multipliedBy(LAMPORTS_PER_SOL).toNumber(),
      toPubkey: toWallet,
    });

    transferInstruction.keys.push({
      pubkey: reference,
      isSigner: false,
      isWritable: false,
    });

    transaction.add(transferInstruction);

    return transaction;
  };

  const addContact = (address) => {
    if (address) {
      client
        .patch(state.userAddress)
        .setIfMissing({ userContacts: [] })
        .append("userContacts", [{ contactAddress: address }])
        .commit({ autoGenerateArrayKeys: true })
        .then((res) => {
          setContacts(res.userContacts);
        });
    }
  };

  const removeContact = (address) => {
    if (address) {
      // const reviewsToRemove = ["reviews[0]", 'reviews[_key=="abc123"]'];
      client
        .patch(state.userAddress)
        .unset([`userContacts[contactAddress=="${address.toString()}"]`])
        .commit()
        .then((res) => {
          console.log(res);
          setContacts(res.userContacts);
        });
    }
  };

  const updateAcc = (newN, newA) => {
    if (newA) {
      client
        .patch(state.userAddress)
        .set({ userName: newN })
        .commit()
        .then((updatedAcc) => {
          client.assets
            .upload("image", newA)
            .then(async (imageAsset) => {
              return client
                .patch(state.userAddress)
                .set({
                  userAvatar: {
                    _type: "image",
                    asset: {
                      _type: "reference",
                      _ref: imageAsset._id,
                    },
                  },
                })
                .commit()
                .then((res) => {
                  console.log(res);
                  updateProfile({
                    username: updatedAcc.userName,
                    avatar: builder.image(res.userAvatar).url(),
                  });
                });
            })
            .then(() => {
              console.log("Done!");
            });
        });
    }
    if (newN) {
      client
        .patch(state.userAddress)
        .set({ userName: newN })
        .commit()
        .then((updatedAcc) => {
          console.log("Hurray, the acc is updated! New document:");
          console.log(updatedAcc);
          console.log(updatedAcc.userName);
          updateProfile({
            username: updatedAcc.userName,
            avatar: state.avatar,
          });
        });
    }
  };

  const doTransaction = async ({ amount, receiver, transactionPurpose }) => {
    const fromWallet = publicKey;
    const toWallet = new PublicKey(receiver);
    const bnAmount = new BigNumber(amount);
    const reference = Keypair.generate().publicKey;
    const transaction = await makeTransaction(
      fromWallet,
      toWallet,
      bnAmount,
      reference
    );

    const confirm = await sendTransaction(transaction, connection);
    console.log(confirm);

    const getNewId = (transactions.length + 1).toString();
    const newTransaction = {
      id: getNewId,
      from: {
        name: publicKey,
        handle: publicKey,
        avatar: avatar,
        verified: true,
      },
      to: {
        name: receiver,
        handle: "-",
        avatar: avatar,
        verified: false,
      },
      description: transactionPurpose,
      transactionDate: new Date(),
      status: "Completed",
      amount: amount,
      source: "-",
      identifier: "-",
    };
    setNewTransactionModalOpen(false);
  };

  return {
    connected,
    publicKey,
    doTransaction,
    updateAcc,
    amount,
    setAmount,
    receiver,
    setReceiver,
    transactionPurpose,
    setTransactionPurpose,
    newTransactionModalOpen,
    setNewTransactionModalOpen,
    userTransactions,
    addContact,
    removeContact,
  };
};
