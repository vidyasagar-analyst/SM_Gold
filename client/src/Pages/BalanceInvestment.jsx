import React, { useContext } from "react";
import { AppContext } from "../Utils/AppContext";
import InfoCard from "../Components/InfoCard";
import ProfitTable from "../Components/ProfitTable";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const BalanceInvestment = () => {
  const { capitalize, userData, customerData } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="h-fixed pt-24 flex justify-center">
      <div className="w-3/4">
        <div className="flex items-center justify-between">
          <h2>Investments and Profit Information</h2>
          <button
            className="px-4 py-2 rounded-md text-[12px] uppercase font-bold text-secondary hover:bg-gray-300/50 cursor-pointer flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <IoMdArrowRoundBack /> back
          </button>
        </div>
        <div className="flex items-center justify-between my-5">
          <InfoCard
            heading={`₹.${userData?.totalInvestment}`}
            subTitle="Total Investment"
          />
          <InfoCard
            heading={`₹.${userData?.reinvestment}`}
            subTitle="ReInvestment"
          />
          <InfoCard
            heading={`₹.${customerData?.totalProfitAmount}`}
            subTitle="Total Profit"
          />
        </div>

        <div className="">
          {customerData?.totalProfitAmount < 1 ? (
            <div className="h-[375px] mt-5 flex flex-col items-center justify-center">
              <h2 className="!text-red-500 animate-bounce">
                No Profit Information Found!
              </h2>

              <p className="!text-[12px] mt-4 tracking-wider">
                Go back to Home Page and Add a New Customer...
              </p>
            </div>
          ) : (
            <ProfitTable customerData={customerData} capitalize={capitalize} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BalanceInvestment;
