import React, { useContext, useState } from "react";
import CustCard from "../Components/CustCard";
import { AppContext } from "../Utils/AppContext";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import PendingCustomers from "../Components/PendingCustomers";
import CompletedCustomers from "../Components/CompletedCustomers";
import AllCustomersList from "../Components/AllCustomersList";

const AllCustomers = () => {
  const { customerData } = useContext(AppContext);
  const [searchCust, setSearchCust] = useState("");

  const [activeTab, setActiveTab] = useState("pending");

  const navigate = useNavigate();
  return (
    <div className="flex justify-center pt-24 h-fixed">
      <div className="w-3/4">
        <div className="flex items-center justify-between mb-4">
          <h2>All Customers Information</h2>
          <div className="flex items-center gap-2">
            <button
              className={`px-4 py-2 rounded-md text-[12px] uppercase font-bold text-red-500 ${
                activeTab === "pending" && "bg-red-300/50"
              } hover:bg-red-300/50 cursor-pointer flex items-center gap-2`}
              onClick={() => setActiveTab("pending")}
            >
              <FaExclamationTriangle /> Pending Customers
            </button>
            <button
              className={`px-4 py-2 rounded-md text-[12px] uppercase font-bold text-green-500 ${
                activeTab === "completed" && "bg-green-300/50"
              } hover:bg-green-300/50 cursor-pointer flex items-center gap-2`}
              onClick={() => setActiveTab("completed")}
            >
              <FaCircleCheck /> Completed Customers
            </button>
            <button
              className={`px-4 py-2 rounded-md text-[12px] uppercase font-bold text-blue-500 ${
                activeTab === "allCustomers" && "bg-blue-300/50"
              } hover:bg-blue-300/50 cursor-pointer flex items-center gap-2`}
              onClick={() => setActiveTab("allCustomers")}
            >
              <FaUsers /> All Customers
            </button>
            <button
              className="px-4 py-2 rounded-md text-[12px] uppercase font-bold text-secondary hover:bg-gray-300/50 cursor-pointer flex items-center gap-2"
              onClick={() => navigate(-1)}
            >
              <IoMdArrowRoundBack /> back
            </button>
          </div>
        </div>
        <div className="">
          <input
            type="text"
            placeholder="Search customer by typing Customer Name or ID or Mobile..."
            className="p-3 border border-gray-400/25 bg-white rounded-md text-sm w-full tracking-wider"
            onChange={(e) => setSearchCust(e.target.value)}
          />
        </div>

        {customerData?.allCustomersList?.length < 1 ? (
          <div className="h-[450px] mt-5 flex flex-col items-center justify-center">
            <h2 className="!text-red-500 animate-bounce">
              No Customers Found!
            </h2>

            <p className="!text-[12px] mt-4 tracking-wider">
              Go back to Home Page and Add a New Customer...
            </p>
          </div>
        ) : (
          <div className="h-[500px] overflow-y-scroll">
            {activeTab === "pending" && (
              <PendingCustomers
                searchCust={searchCust}
                customerData={customerData}
              />
            )}
            {activeTab === "completed" && (
              <CompletedCustomers
                searchCust={searchCust}
                customerData={customerData}
              />
            )}
            {activeTab === "allCustomers" && (
              <AllCustomersList
                searchCust={searchCust}
                customerData={customerData}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCustomers;
