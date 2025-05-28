import React, { useContext } from "react";
import { AppContext } from "../Utils/AppContext";
import InfoCard from "../Components/InfoCard";
import InvestmentInfoTable from "../Components/InvestmentInfoTable";

const InvestmentInfo = () => {
  const { capitalize, investmentData } = useContext(AppContext);
  return (
    <div className="h-fixed pt-24 flex justify-center">
      <div className="w-3/4">
        <h2>Investment Information</h2>
        <div className="grid grid-cols-3 gap-5 my-5">
          <div className="col w-full flex flex-col">
            <InfoCard
              heading={`₹.${investmentData?.totalInvestment}`}
              subTitle="Total Investment"
            />

            <form className="mt-5 w-[325px] p-4 bg-white border border-gray-400/25 rounded-md shadow">
              <div className="mb-3 pb-4 border-b border-gray-300/50">
                <h3>Add Investor</h3>
              </div>
              <div className="flex flex-col gap-2 mb-5">
                <label htmlFor="investorName" className="text-sm font-semibold">
                  Investor Name
                </label>
                <input
                  type="text"
                  placeholder="rajkumar"
                  id="investorName"
                  className="p-3 border border-gray-400/25 bg-gray-200/50 rounded-md text-[12px]"
                />
              </div>
              <div className="flex flex-col gap-2 mb-5">
                <label
                  htmlFor="investmentAmt"
                  className="text-sm font-semibold"
                >
                  Investment Amount
                </label>
                <input
                  type="number"
                  placeholder="10000"
                  id="investmentAmt"
                  className="p-3 border border-gray-400/25 bg-gray-200/50 rounded-md text-[12px]"
                />
              </div>

              <button className="px-7 py-3 w-full border border-green-600 hover:bg-green-300/50 rounded-md text-green-600 font-bold text-[12px] cursor-pointer uppercase">
                Add Investor
              </button>
            </form>
          </div>

          <div className="col-span-2 border border-gray-400/25 rounded-md p-4 shadow bg-white">
            <div className="mb-3 pb-4 border-b border-gray-300/50">
              <h3>Investment History</h3>
              <p className="mt-2 !text-[12px] tracking-wider">
                Click Investor Name to View Full Investment History
              </p>
            </div>
            <InvestmentInfoTable
              investmentData={investmentData}
              capitalize={capitalize}
            />

            <form className="flex items-center gap-4 w-full mt-4">
              <select className="p-3 w-[225px] border border-gray-400/25 bg-gray-200/50 rounded-md text-sm font-semibold">
                <option>Select Investor</option>
                {investmentData?.investors?.map((investor) => {
                  return (
                    <option value={investor?.investorName} key={investor?._id}>
                      {capitalize(investor?.investorName)}
                    </option>
                  );
                })}
              </select>

              <input
                type="number"
                placeholder="10000"
                id="investmentAmt"
                className="p-3 w-[225px] border border-gray-400/25 bg-gray-200/50 rounded-md text-[12px]"
              />

              <button className="px-7 py-3 border border-green-600 hover:bg-green-300/50 rounded-md text-green-600 font-bold text-[12px] cursor-pointer uppercase">
                Add Investment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentInfo;
