import React, { useState } from "react";
import CustCard from "../Components/CustCard";
import { custDetails } from "../Utils/data";

const AllCustomers = () => {
  const [searchCust, setSearchCust] = useState("");
  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-3/4">
        <h2 className="mb-4">All Customer Information</h2>
        <div className="">
          <input
            type="text"
            placeholder="Search customer by typing Customer Name or ID or Mobile..."
            className="p-3 border border-gray-400 rounded-md text-sm w-full tracking-wider"
            onChange={(e) => setSearchCust(e.target.value)}
          />
        </div>
        {custDetails
          .filter((cust) => {
            return (
              cust?.custName?.toLowerCase().includes(searchCust) ||
              String(cust?.custId).includes(searchCust) ||
              cust?.mobileNumber.includes(searchCust)
            );
          })
          .map((cust) => {
            return (
              <CustCard
                custId={cust.custId}
                custName={cust.custName}
                address={cust.address}
                mobileNumber={cust.mobileNumber}
                key={cust.custId}
              />
            );
          })
          .reverse()}
      </div>
    </div>
  );
};

export default AllCustomers;
