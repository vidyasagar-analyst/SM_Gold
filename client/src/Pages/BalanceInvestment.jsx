import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Utils/AppContext";
import InfoCard from "../Components/InfoCard";
import ProfitTable from "../Components/ProfitTable";
import { useNavigate } from "react-router-dom";
import { BsGraphUpArrow } from "react-icons/bs";
import { BsGraphDownArrow } from "react-icons/bs";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import ProfitInfo from "../Components/ProfitInfo";
import Expenses from "../Components/Expenses";
import AddExpense from "../Components/AddExpense";

const BalanceInvestment = () => {
  const { capitalize, userData, customerData, expenseData } =
    useContext(AppContext);
  const [activeTab, setActiveTab] = useState("profit");
  const [openAddExp, setOpenAddExp] = useState(false);

  const closeAddExp = () => {
    setOpenAddExp(false);
  };

  const navigate = useNavigate();
  return (
    <div className="h-fixed pt-24 flex justify-center">
      <div className="w-[95%] sm:w-3/4">
        <div className="flex gap-3 sm:items-center flex-col sm:flex-row sm:justify-between">
          <h2>{activeTab == "profit" ? "Profit" : "Expense"} Information</h2>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-2">
            {activeTab == "expense" && (
              <button
                className={`px-4 py-2 rounded-md text-[12px] uppercase font-bold text-blue-500  hover:bg-blue-300/50 cursor-pointer flex items-center gap-2`}
                onClick={() => setOpenAddExp(true)}
              >
                <MdOutlinePlaylistAdd /> Add Exp
              </button>
            )}
            <button
              className={`px-4 py-2 rounded-md text-[12px] uppercase font-bold text-green-500 ${
                activeTab === "profit" && "bg-green-300/50"
              } hover:bg-green-300/50 cursor-pointer flex items-center gap-2`}
              onClick={() => setActiveTab("profit")}
            >
              <BsGraphUpArrow /> profit
            </button>
            <button
              className={`px-4 py-2 rounded-md text-[12px] uppercase font-bold text-red-500 ${
                activeTab === "expense" && "bg-red-300/50"
              } hover:bg-red-300/50 cursor-pointer flex items-center gap-2`}
              onClick={() => setActiveTab("expense")}
            >
              <BsGraphDownArrow /> expenses
            </button>
            <button
              className="px-4 py-2 rounded-md text-[12px] uppercase font-bold text-secondary hover:bg-gray-300/50 cursor-pointer flex items-center gap-2"
              onClick={() => navigate(-1)}
            >
              <IoMdArrowRoundBack /> back
            </button>
          </div>
        </div>

        {activeTab == "profit" && (
          <ProfitInfo
            customerData={customerData}
            expenseData={expenseData}
            userData={userData}
            capitalize={capitalize}
          />
        )}
        {activeTab == "expense" && (
          <Expenses expenseData={expenseData} capitalize={capitalize} />
        )}

        {openAddExp && <AddExpense closeAddExp={closeAddExp} />}
      </div>
    </div>
  );
};

export default BalanceInvestment;
