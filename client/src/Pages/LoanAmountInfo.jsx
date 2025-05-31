import React, { useContext } from "react";
import LoanAmountTable from "../Components/LoanAmountTable";
import { AppContext } from "../Utils/AppContext";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const LoanAmountInfo = () => {
  const { customerData } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="h-fixed pt-24 flex justify-center">
      <div className="w-3/4">
        <div className="flex items-center justify-between">
          <h2>Loan Amount Information [ ₹.{customerData?.totalLoanAmount} ]</h2>
          <button
            className="px-4 py-2 rounded-md text-[12px] uppercase font-bold text-secondary hover:bg-gray-300/50 cursor-pointer flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <IoMdArrowRoundBack /> back
          </button>
        </div>

        <div className="mt-6">
          {customerData?.totalLoanAmount < 1 ? (
            <div className="h-[500px] mt-5 flex flex-col items-center justify-center">
              <h2 className="!text-red-500 animate-bounce">
                No Loan Amount Information Found!
              </h2>

              <p className="!text-[12px] mt-4 tracking-wider">
                Go back to Home Page and Add a New Customer...
              </p>
            </div>
          ) : (
            <LoanAmountTable customerData={customerData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanAmountInfo;
