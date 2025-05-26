import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useCookies } from "react-cookie";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [cookies, setCookies, removeCookie] = useCookies(["accessToken"]);
  const [isAuth, setIsAuth] = useState(cookies.accessToken != null);

  // Current User Info
  const [currUser, setCurrUser] = useState({});
  const FetchCurrUser = async () => {
    const result = await axios.get(
      `http://localhost:8000/api/v1/auth/user/${localStorage.getItem(
        "userID"
      )}`,
      { headers: { authorization: cookies.accessToken } }
    );

    setCurrUser(result?.data);
  };

  // Fetch all Customer Info
  const [customerData, setCustomerData] = useState([]);
  const fetchCustomerData = async () => {
    const result = await axios.get(
      "http://localhost:8000/api/v1/customers/all-customers"
    );

    setCustomerData(result?.data);
  };

  // Fetch all Users Info
  const [userData, setUserData] = useState([]);
  const fetchUserData = async () => {
    const result = await axios.get(
      "http://localhost:8000/api/v1/auth/user-data"
    );

    setUserData(result?.data);
  };

  useEffect(() => {
    if (isAuth) {
      FetchCurrUser();
    }
    fetchCustomerData();
    fetchUserData();
  }, [isAuth]);

  const contextValues = {
    removeCookie,
    setCookies,
    isAuth,
    setIsAuth,
    currUser,
    FetchCurrUser,
    customerData,
    userData,
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
