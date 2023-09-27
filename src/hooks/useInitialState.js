import { useState } from "react";

// Initial state value
const initialState = {
  avatar: "",
  userName: "",
  userAddress: undefined,
  userContacts: [],
  userBalance: 0,
};

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  // set user avatar
  const setAvatar = (payload) => {
    setState({
      avatar: payload,
    });
  };

  // set user name
  const setName = (payload) => {
    setState({
      userName: payload,
    });
  };

  // set user address
  const setAddress = (payload) => {
    setState({
      userAddress: payload,
    });
  };

  // add/reload contacts
  const addContacts = (payload) => {
    setState({
      ...state,
      userContacts: [...state.userContacts, payload],
    });
  };

  // set user contacts
  const setContacts = (payload) => {
    setState({
      ...state,
      userContacts: payload,
    });
  };

  // set user SOL balance
  const setBalance = (payload) => {
    setState({
      userBalance: payload,
    });
  };

  return {
    state,
    setState,
    setAvatar,
    setName,
    setAddress,
    setContacts,
    addContacts,
    setBalance,
  };
};

export default useInitialState;
