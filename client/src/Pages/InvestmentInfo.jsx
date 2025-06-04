import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Utils/AppContext";
import InfoCard from "../Components/InfoCard";
import InvestmentInfoTable from "../Components/InvestmentInfoTable";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import PopupModal from "../Components/PopupModal";

const InvestmentInfo = () => {
  const { capitalize, investmentData } = useContext(AppContext);

  const navigate = useNavigate();

  const [investorName, setInvestorName] = useState("");
  const [investment, setInvestment] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!investorName) {
      toast.error("Please Select the Investor Name!");
    }

    if (!investment) {
      toast.error("Please enter the Valid Investment Amount!");
    }

    if (investorName && investment) {
      try {
        const result = await axios.post(
          "http://localhost:8000/api/v1/investment/investment-update",
          { investorName, investment }
        );
        setInvestorName("");
        setInvestment("");
        toast.success(result?.data?.message);
      } catch (error) {
        toast.error(result?.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);
  return (
    <div className="h-fixed pt-24 flex justify-center">
      <div className="w-3/4">
        <div className="flex items-center justify-between">
          <h2>Investment Information</h2>
          <button
            className="px-4 py-2 rounded-md text-[12px] uppercase font-bold text-secondary hover:bg-gray-300/50 cursor-pointer flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <IoMdArrowRoundBack /> back
          </button>
        </div>
        <div className="grid grid-cols-3 gap-5 my-5">
          <div className="col w-full flex flex-col">
            <InfoCard
              heading={`₹.${investmentData?.totalInvestment}`}
              subTitle="Total Investment"
            />

            <form
              className="mt-5 w-[325px] p-4 bg-white border border-gray-400/25 rounded-md shadow-md"
              onSubmit={handleSubmit}
            >
              <div className="mb-3 pb-4 border-b border-gray-300/50">
                {investmentData?.investors?.length == 4 ? (
                  <h3>Add Investment</h3>
                ) : (
                  <h3>Add Investor</h3>
                )}
              </div>
              <div className="flex flex-col gap-2 mb-5">
                <label htmlFor="investorName" className="text-sm font-semibold">
                  Investor Name
                </label>
                {investmentData?.investors?.length == 4 ? (
                  <select
                    id="investorName"
                    className="p-3 border border-gray-400/25 bg-gray-200/50 rounded-md text-[12px] appearance-none font-semibold tracking-widest"
                    onChange={(e) => setInvestorName(e.target.value)}
                  >
                    <option value="">Select The Investor</option>
                    {investmentData?.investors?.map((investor) => {
                      return (
                        <option
                          value={investor?.investorName}
                          key={investor?._id}
                        >
                          {capitalize(investor?.investorName)}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <input
                    type="text"
                    placeholder="rajkumar"
                    id="investorName"
                    className="p-3 border border-gray-400/25 bg-gray-200/50 rounded-md text-[12px] font-semibold tracking-widest"
                    onChange={(e) => setInvestorName(e.target.value)}
                    value={investorName}
                  />
                )}
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
                  className="p-3 border border-gray-400/25 bg-gray-200/50 rounded-md text-[12px] font-semibold tracking-widest"
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  value={investment}
                />
              </div>

              <button
                type="submit"
                className="px-7 py-3 w-full border border-green-600 hover:bg-green-300/50 rounded-md text-green-600 font-bold text-[12px] cursor-pointer uppercase"
              >
                {investmentData?.investors?.length == 4
                  ? "Add Investment"
                  : "Add Investor"}
              </button>
            </form>
          </div>

          <div className="col-span-2 border border-gray-400/25 rounded-lg p-4 shadow-md bg-white">
            <div className="mb-3 pb-4 border-b border-gray-300/50">
              <h3>Investor's Info</h3>
              <p className="mt-2 !text-[12px] tracking-wider">
                Click the Investor Name to View the Full Investment History
              </p>
            </div>
            {investmentData?.investors?.length < 1 ? (
              <div className="h-[300px] flex flex-col items-center justify-center mt-4">
                <h2 className="!text-red-500 animate-bounce">
                  No Investor's Found!
                </h2>
                <p className="!text-[12px] mt-4 tracking-wider">
                  Add the New Investor to get Details...
                </p>
              </div>
            ) : (
              <InvestmentInfoTable
                investmentData={investmentData}
                capitalize={capitalize}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentInfo;
