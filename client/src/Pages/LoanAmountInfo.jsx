import React, { useContext } from "react";
import LoanAmountTable from "../Components/LoanAmountTable";
import { AppContext } from "../Utils/AppContext";

const LoanAmountInfo = () => {
  const { customerData } = useContext(AppContext);
  console.log(customerData);
  return (
    <div className="h-fixed pt-24 flex justify-center">
      <div className="w-3/4">
        <div className="flex items-center justify-between">
          <h2>Loan Amount Information</h2>
          <h2>Total Loan Amount: ₹.{customerData?.totalLoanAmount}</h2>
        </div>

        <div className="mt-6">
          <LoanAmountTable customerData={customerData} />
        </div>
      </div>
    </div>
  );
};

export default LoanAmountInfo;
