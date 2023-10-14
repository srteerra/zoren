import { useState } from "react";

// Initial state value
const initialState = {
  avatar: "",
  userName: "",
  userAddress: undefined,
  userContacts: [],
  userBalance: 0,
  isConnected: false,
};

const useInitialState = () => {
  const [state, setState] = useState(initialState);
  const [listener, setListener] = useState(false);
  const [perfMenu, setPerfMenu] = useState(false);
  const [currency, setCurrency] = useState("usd");
  const [currencies, setCurrencies] = useState(["usd", "mxn"]);

  // set user avatar
  const updateProfile = (payload) => {
    setState({
      avatar: payload.avatar,
      userName: payload.username,
      userAddress: state.userAddress,
      userContacts: state.userContacts,
      userBalance: state.userBalance,
      isConnected: state.isConnected,
    });
  };

  // set user avatar
  const initialFetch = (payload) => {
    setState({
      avatar: payload.avatar,
      userName: payload.username,
      userAddress: payload.address,
      userContacts: payload.contacts,
      userBalance: payload.balance,
      isConnected: payload.isconnected,
    });
  };

  // set user avatar
  const setAvatar = (payload) => {
    setState({
      ...state,
      avatar: payload,
      userName: state.userName,
      userAddress: state.userAddress,
      userContacts: state.userContacts,
      userBalance: state.userBalance,
      isConnected: state.isConnected,
    });
  };

  // set user name
  const setName = (payload) => {
    setState({
      ...state,
      avatar: state.avatar,
      userName: payload,
      userAddress: state.userAddress,
      userContacts: state.userContacts,
      userBalance: state.userBalance,
      isConnected: state.isConnected,
    });
  };

  // set user address
  const setAddress = (payload) => {
    setState({
      ...state,
      avatar: state.avatar,
      userName: state.userName,
      userAddress: payload,
      userContacts: state.userContacts,
      userBalance: state.userBalance,
      isConnected: state.isConnected,
    });
  };

  // add/reload contacts
  const addContacts = (payload) => {
    setState({
      ...state,
      avatar: state.avatar,
      userName: state.userName,
      userAddress: state.userAddress,
      userContacts: [...state.userContacts, payload],
      userBalance: state.userBalance,
      isConnected: state.isConnected,
    });
  };

  // set user contacts
  const setContacts = (payload) => {
    setState({
      ...state,
      avatar: state.avatar,
      userName: state.userName,
      userAddress: state.userAddress,
      userContacts: payload,
      userBalance: state.userBalance,
      isConnected: state.isConnected,
    });
  };

  // set user SOL balance
  const setBalance = (payload) => {
    setState({
      ...state,
      avatar: state.avatar,
      userName: state.userName,
      userAddress: state.userAddress,
      userContacts: state.userContacts,
      userBalance: state.userBalance,
      isConnected: payload,
    });
  };

  return {
    state,
    setState,
    listener,
    setListener,
    setAvatar,
    setName,
    setAddress,
    setContacts,
    addContacts,
    setBalance,
    initialFetch,
    updateProfile,
    currency,
    setCurrency,
    currencies,
    perfMenu,
    setPerfMenu,
  };
};

export default useInitialState;
