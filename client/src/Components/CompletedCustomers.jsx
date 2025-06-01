import React from "react";
import CustCard from "./CustCard";

const CompletedCustomers = ({ searchCust, customerData }) => {
  const completedCustomers = customerData?.allCustomersList?.filter(
    (cust) => cust?.status == "Completed"
  );

  return (
    <div>
      {completedCustomers
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
  );
};

export default CompletedCustomers;
