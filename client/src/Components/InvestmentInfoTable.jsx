import axios from "axios";
import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import PopupModal from "./PopupModal";

const InvestmentInfoTable = ({ investmentData, capitalize }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const deleteOpen = () => {
    setOpenDeleteModal(true);
  };

  const deleteClose = () => {
    setOpenDeleteModal(false);
  };
  const handleDeleteInvestor = async (id) => {
    try {
      const result = await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/investment/delete-investor/${id}`
      );
      toast.success(result?.data?.message);
      deleteClose();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to Delete this Investor! Try Again Later!"
      );
    }
  };
  return (
    <div className="relative">
      <table className="w-full text-xs sm:text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-300/25">
          <tr>
            <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">
              Investor Name
            </th>
            <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">
              Investment
            </th>
            <th scope="col" className="px-8 py-2 sm:px-12 sm:py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {investmentData?.investors?.map((investor) => {
            return (
              <tr
                className="bg-white border-b border-gray-200 hover:bg-gray-50"
                key={investor?._id}
              >
                <th
                  scope="row"
                  className="px-4 py-2 sm:px-6 sm:py-3 font-medium text-gray-900 whitespace-nowrap"
                >
                  <Link to={`/investment-history/${investor?._id}`}>
                    {capitalize(investor?.investorName)}
                  </Link>
                </th>

                <td className="px-4 py-2 sm:px-6 sm:py-3 text-black font-bold">
                  ₹.{investor?.investment}
                </td>
                <td className="px-4 py-2 sm:px-6 sm:py-3">
                  <button
                    className="px-4 py-2 rounded-md text-[12px] font-bold text-danger hover:bg-red-300/25 cursor-pointer flex items-center gap-2"
                    onClick={deleteOpen}
                  >
                    <FaRegTrashAlt /> Remove
                  </button>{" "}
                </td>

                {openDeleteModal && (
                  <PopupModal
                    description={`Are you sure you want to Delete ${capitalize(
                      investor?.investorName
                    )} Investor?`}
                    btnName="Delete"
                    closeModal={deleteClose}
                    handleClick={() => handleDeleteInvestor(investor?._id)}
                  />
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InvestmentInfoTable;
