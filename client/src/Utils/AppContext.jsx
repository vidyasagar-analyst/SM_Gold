import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const capitalize = (str) => {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1);
  };

  const [cookies, setCookies, removeCookie] = useCookies(["accessToken"]);
  const [isAuth, setIsAuth] = useState(cookies.accessToken != null);

  // Current User Info
  const [currUser, setCurrUser] = useState({});
  const FetchCurrUser = async () => {
    const result = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_BASE_URL
      }/auth/user/${localStorage.getItem("userID")}`,
      { headers: { authorization: cookies.accessToken } }
    );

    setCurrUser(result?.data);
  };

  // Fetch all Customer Info
  const [customerData, setCustomerData] = useState([]);
  const fetchCustomerData = async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/customers/all-customers`
    );

    setCustomerData(result?.data);
  };

  // Fetch all Users Info
  const [userData, setUserData] = useState([]);
  const fetchUserData = async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/user-data`
    );

    setUserData(result?.data);
  };

  // Investment Data
  const [investmentData, setInvestmentData] = useState([]);
  const fetchInvestmentInfo = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/investment/investment-info`
      );
      setInvestmentData(result?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  // Delete a Customer
  const deleteCustomer = async (id) => {
    try {
      const result = await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/customers/delete-customer/${id}`
      );
      toast.success(result?.data?.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to Delete this Customer! Try Again Later!"
      );
    }
  };

  // Expense Details
  const [expenseData, setExpenseData] = useState([]);
  const fetchExpenseData = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/expense/expense-data`
      );
      setExpenseData(result?.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong! Try again Later!"
      );
    }
  };

  useEffect(() => {
    if (isAuth) {
      FetchCurrUser();
    }
    fetchCustomerData();
    fetchUserData();
    fetchInvestmentInfo();
  }, [isAuth, customerData]);

  useEffect(() => {
    fetchExpenseData();
  }, [expenseData]);

  const contextValues = {
    capitalize,
    removeCookie,
    setCookies,
    isAuth,
    setIsAuth,
    currUser,
    FetchCurrUser,
    customerData,
    userData,
    investmentData,
    deleteCustomer,
    expenseData,
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
