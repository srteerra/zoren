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

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

export const useZoren = () => {
  const [avatar, setAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [userAddress, setUserAddress] = useState(undefined);
  const [userContacts, setUserContacts] = useState([]);
  const [userBalance, setUserBalance] = useState(0);
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

      connection.getBalance(publicKey).then((value) => {
        setUserBalance(value / LAMPORTS_PER_SOL);
        console.log(value);
      });

      client.createIfNotExists(userDoc).then((result) => {
        setUserAddress(result.userAddress);
        setUserName(result.userName);
        setUserContacts(result.userContacts);
      });
    }
  }, [connected]);

  const fetchData = async () => {
    const query = `*[_type == "users" && userAddress == "${userAddress}"] {
      userName,
      "imageUrl": userAvatar.asset->url
    }`;

    const collectData = await client.fetch(query);
    setAvatar(await collectData[0].imageUrl);
    setUserName(await collectData[0].userName);
  };

  useEffect(() => {
    if (userAddress != undefined) {
      fetchData();
    }
  }, [userAddress]);

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

  const updateAcc = (newN, newA) => {
    if (newA) {
      client.assets
        .upload("image", newA)
        .then(async (imageAsset) => {
          return client
            .patch(userAddress)
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
              setAvatar(builder.image(res.userAvatar).url());
              fetchData();
            });
        })
        .then(() => {
          console.log("Done!");
        });
    }
    if (newN) {
      client
        .patch(userAddress)
        .set({ userName: newN })
        .commit()
        .then((updatedAcc) => {
          console.log("Hurray, the acc is updated! New document:");
          console.log(updatedAcc);
          console.log(updatedAcc.userName);
          setUserName(updatedAcc.userName);
          fetchData();
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
    userAddress,
    userName,
    setUserName,
    avatar,
    setAvatar,
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
    userContacts,
    setUserContacts,
    userBalance,
  };
};
