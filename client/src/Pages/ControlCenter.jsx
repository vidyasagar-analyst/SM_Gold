import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Utils/AppContext";
import InfoCard from "../Components/InfoCard";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "sonner";
import PopupModal from "../Components/PopupModal";

const ControlCenter = () => {
  const { currUser, userData, capitalize } = useContext(AppContext);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const deleteOpen = () => {
    setOpenDeleteModal(true);
  };

  const deleteClose = () => {
    setOpenDeleteModal(false);
  };

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/delete-user/${id}`
      );
      toast.success(result?.data?.message);
      deleteClose();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to Delete this User! Try Again Later!"
      );
    }
  };

  return (
    <div className="h-fixed pt-24 flex justify-center">
      <div className="w-[95%] sm:w-3/4 ">
        <h2>Welcome Mr. {capitalize(currUser?.currentUser)}</h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-5">
          <InfoCard
            heading={`₹.${userData?.totalInvestment}`}
            subTitle="Total Investment"
            redirectPath="/investment-info"
            title="Click to View All Investment Info"
          />
          <InfoCard
            heading={`₹.${userData?.pendingLoanAmount}`}
            subTitle="Pending Loan Amount"
            redirectPath="/loan-amount-info"
            title="Click to View All Loan amount Info"
          />
          <InfoCard
            heading={`₹.${userData?.balanceInvestment}`}
            subTitle="Balance Investment"
            redirectPath="/balance-investment"
            title="Click to View Profit and Expense Info"
          />
        </div>

        <div className="my-5">
          <div className="mb-4">
            <h3>User Information</h3>
            <p className="mt-1">Super User can update and Delete User</p>
          </div>
          {userData?.users?.map((user) => {
            return (
              <div
                className="flex items-center justify-between p-2 sm:p-4 border border-gray-400/25 hover:shadow rounded-lg my-3 bg-gray-200/35"
                key={user?._id}
              >
                <h4>{user?.username?.toUpperCase()}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                  <p className="font-semibold hidden sm:flex">{user?.role}</p>
                  <p className="font-semibold hidden sm:flex">{user?.email}</p>
                  <div className="flex">
                    <button
                      className={`px-4 py-2 rounded-md text-[12px] uppercase font-bold text-secondary ${
                        user?.role != "SuperAdmin" ? "hover:bg-gray-300/50" : ""
                      } cursor-pointer flex items-center gap-2`}
                      // disabled={user?.role == "SuperAdmin"}
                    >
                      <MdOutlineEdit /> Edit
                    </button>
                    <button
                      className={`px-4 py-2 rounded-md text-[12px] uppercase font-bold text-danger ${
                        user?.role != "SuperAdmin" ? "hover:bg-red-300/25" : ""
                      } cursor-pointer flex items-center gap-2`}
                      // disabled={user?.role == "SuperAdmin"}
                      onClick={deleteOpen}
                    >
                      <FaRegTrashAlt /> delete
                    </button>
                  </div>
                </div>

                {openDeleteModal && (
                  <PopupModal
                    description={`Are you sure you want to Delete ${capitalize(
                      user?.username
                    )} User?`}
                    btnName="Delete"
                    closeModal={deleteClose}
                    handleClick={() => handleDelete(user?._id)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ControlCenter;
