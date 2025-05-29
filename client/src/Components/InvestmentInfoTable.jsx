import axios from "axios";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const InvestmentInfoTable = ({ investmentData, capitalize }) => {
  const handleDeleteInvestor = async (id) => {
    try {
      const result = await axios.delete(
        `http://localhost:8000/api/v1/investment/delete-investor/${id}`
      );
      toast.success(result?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-300/25 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Investor Name
            </th>
            <th scope="col" className="px-6 py-3">
              Investment
            </th>
            <th scope="col" className="px-12 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {investmentData?.investors?.map((investor) => {
            return (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={investor?._id}
              >
                <th
                  scope="row"
                  className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link to={`/investment-history/${investor?._id}`}>
                    {capitalize(investor?.investorName)}
                  </Link>
                </th>

                <td className="px-6 py-3 text-black font-bold">
                  ₹.{investor?.investment}
                </td>
                <td className="px-6 py-3">
                  <button
                    className="px-4 py-2 rounded-md text-[12px] font-bold text-danger hover:bg-red-300/25 cursor-pointer flex items-center gap-2"
                    onClick={() => handleDeleteInvestor(investor?._id)}
                  >
                    <FaRegTrashAlt /> Remove
                  </button>{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InvestmentInfoTable;
