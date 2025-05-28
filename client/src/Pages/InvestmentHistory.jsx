import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../Utils/AppContext";
import { IoMdArrowRoundBack } from "react-icons/io";

const InvestmentHistory = () => {
  const { capitalize, investmentData } = useContext(AppContext);
  const { id } = useParams();
  const investor = investmentData?.investors?.find(
    (investor) => investor?._id == id
  );

  const navigate = useNavigate();

  return (
    <div className="h-fixed pt-24 flex justify-center py-10">
      <div className="w-3/4">
        <div className="flex items-center justify-between">
          <h2>{capitalize(investor?.investorName)}'s Investment History</h2>
          <button
            className="px-4 py-2 rounded-md text-[12px] uppercase font-bold text-secondary hover:bg-gray-300/50 cursor-pointer flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <IoMdArrowRoundBack /> back
          </button>
        </div>

        <div className="relative overflow-y-auto mt-8 border border-gray-300/50 rounded-md shadow">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-300/25 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Investment
                </th>
                <th scope="col" className="px-6 py-3">
                  Transaction Date
                </th>
              </tr>
            </thead>
            <tbody>
              {investor?.investmentHistory
                ?.map((history) => {
                  return (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        ₹.{history?.amount}
                      </th>

                      <td className="px-6 py-4">
                        {new Date(history?.date).toDateString()}
                      </td>
                    </tr>
                  );
                })
                .reverse()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvestmentHistory;
