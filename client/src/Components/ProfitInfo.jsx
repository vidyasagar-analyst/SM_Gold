import React from "react";
import ProfitTable from "./ProfitTable";
import InfoCard from "./InfoCard";

const ProfitInfo = ({ customerData, expenseData, userData, capitalize }) => {
  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between my-5">
        <InfoCard
          heading={`₹.${userData?.totalInvestment}`}
          subTitle="Total Investment"
        />
        <InfoCard
          heading={`₹.${userData?.reinvestment}`}
          subTitle="ReInvestment"
        />
        <InfoCard
          heading={`₹.${userData?.totalProfitAmount}`}
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
  );
};

export default ProfitInfo;
