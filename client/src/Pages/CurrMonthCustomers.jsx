import React, { useContext, useState } from "react";
import { AppContext } from "../Utils/AppContext";
import CustCard from "../Components/CustCard";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const CurrMonthCustomers = () => {
  const { customerData } = useContext(AppContext);
  const [searchCust, setSearchCust] = useState("");
  const month = new Date().toDateString().slice(4, 7);

  const navigate = useNavigate();

  return (
    <div className="flex justify-center pt-24 h-fixed">
      <div className="w-3/4">
        <div className="flex items-center justify-between mb-4">
          <h2>{month} Month Customer Information</h2>
          <button
            className="px-4 py-2 rounded-md text-[12px] uppercase font-bold text-secondary hover:bg-gray-300/50 cursor-pointer flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <IoMdArrowRoundBack /> back
          </button>
        </div>
        <div className="">
          <input
            type="text"
            placeholder="Search customer by typing Customer Name or ID or Mobile..."
            className="p-3 border border-gray-400/25 bg-white rounded-md text-sm w-full tracking-wider"
            onChange={(e) => setSearchCust(e.target.value)}
          />
        </div>

        {customerData?.currentMonthCustomers?.length < 1 ? (
          <div className="h-[450px] mt-5 flex flex-col items-center justify-center">
            <h2 className="!text-red-500 animate-bounce">
              No Customers Found in {month} Month!
            </h2>

            <p className="!text-[12px] mt-4 tracking-wider">
              Go back to Home Page and Add a New Customer...
            </p>
          </div>
        ) : (
          <div>
            {customerData?.currentMonthCustomers
              ?.filter((cust) => {
                return (
                  cust?.custName?.toLowerCase().includes(searchCust) ||
                  String(cust?.custID).includes(searchCust) ||
                  cust?.mobile.includes(searchCust)
                );
              })
              .map((cust) => {
                return (
                  <CustCard
                    cust={cust}
                    id={cust._id}
                    custId={cust.custID}
                    custName={cust.custName}
                    address={cust.address}
                    mobileNumber={cust.mobile}
                    loanAmount={cust.actualLoanAmount}
                    pledgeDate={cust.pledgeDate}
                    interestDue={cust.interestDue}
                    key={cust.custID}
                  />
                );
              })
              .reverse()}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrMonthCustomers;
