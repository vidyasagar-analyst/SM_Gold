import React, { useContext, useState } from "react";
import CustCard from "../Components/CustCard";
import { custDetails } from "../Utils/data";
import { AppContext } from "../Utils/AppContext";

const AllCustomers = () => {
  const { customerData } = useContext(AppContext);
  const [searchCust, setSearchCust] = useState("");
  return (
    <div className="flex items-center justify-center py-10 mt-14">
      <div className="w-3/4">
        <h2 className="mb-4">All Customer Information</h2>
        <div className="">
          <input
            type="text"
            placeholder="Search customer by typing Customer Name or ID or Mobile..."
            className="p-3 border border-gray-400/25 bg-white rounded-md text-sm w-full tracking-wider"
            onChange={(e) => setSearchCust(e.target.value)}
          />
        </div>
        {customerData?.allCustomersList
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
                custId={cust.custID}
                custName={cust.custName}
                address={cust.address}
                mobileNumber={cust.mobile}
                key={cust.custID}
              />
            );
          })
          .reverse()}
      </div>
    </div>
  );
};

export default AllCustomers;
