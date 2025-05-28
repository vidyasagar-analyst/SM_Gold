import React, { useContext, useState } from "react";
import { AppContext } from "../Utils/AppContext";
import CustCard from "../Components/CustCard";

const CurrMonthCustomers = () => {
  const { customerData } = useContext(AppContext);
  const [searchCust, setSearchCust] = useState("");
  const month = new Date().toDateString().slice(4, 7);

  return (
    <div className="flex items-center justify-center py-10 mt-14">
      <div className="w-3/4">
        <h2 className="mb-4">{month} Month Customer Information</h2>
        <div className="">
          <input
            type="text"
            placeholder="Search customer by typing Customer Name or ID or Mobile..."
            className="p-3 border border-gray-400/25 bg-white rounded-md text-sm w-full tracking-wider"
            onChange={(e) => setSearchCust(e.target.value)}
          />
        </div>
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
                id={cust._id}
                custId={cust.custID}
                custName={cust.custName}
                address={cust.address}
                mobileNumber={cust.mobile}
                loanAmount={cust.loanAmount}
                pledgeDate={cust.pledgeDate}
                interestDue={cust.interestDue}
                key={cust.custID}
              />
            );
          })
          .reverse()}
      </div>
    </div>
  );
};

export default CurrMonthCustomers;
