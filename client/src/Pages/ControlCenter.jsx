import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Utils/AppContext";
import InfoCard from "../Components/InfoCard";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "sonner";

const ControlCenter = () => {
  const { currUser, userData, capitalize } = useContext(AppContext);

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(
        `http://localhost:8000/api/v1/auth/delete-user/${id}`
      );
      toast.success(result?.data?.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something Went Wrong! Try Again Later!"
      );
    }
  };

  return (
    <div className="h-fixed pt-24 flex justify-center">
      <div className="w-3/4 ">
        <h2>Welcome Mr. {capitalize(currUser?.currentUser)}</h2>
        <div className="flex items-center justify-between my-5">
          <InfoCard
            heading={`₹.${userData?.totalInvestment}`}
            subTitle="Total Investment"
            redirectPath="/investment-info"
          />
          <InfoCard
            heading={`₹.${userData?.totalLoanAmount}`}
            subTitle="Total Loan Amount"
            redirectPath="/loan-amount-info"
          />
          <InfoCard
            heading={`₹.${userData?.balanceInvestment}`}
            subTitle="Balance Investment"
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
                className="flex items-center justify-between p-4 border border-gray-400/25 hover:shadow rounded-lg my-3 bg-gray-200/35"
                key={user?._id}
              >
                <h4>{user?.username?.toUpperCase()}</h4>
                <div className="grid grid-cols-3 items-center gap-4">
                  <p className="font-semibold">{user?.role}</p>
                  <p className="font-semibold">{user?.email}</p>
                  <div className="flex">
                    <button
                      className={`px-4 py-2 rounded-md text-[12px] uppercase font-bold text-secondary ${
                        user?.role != "SuperAdmin" ? "hover:bg-gray-300/50" : ""
                      } cursor-pointer flex items-center gap-2`}
                      disabled={user?.role == "SuperAdmin"}
                    >
                      <MdOutlineEdit /> Edit
                    </button>
                    <button
                      className={`px-4 py-2 rounded-md text-[12px] uppercase font-bold text-danger ${
                        user?.role != "SuperAdmin" ? "hover:bg-red-300/25" : ""
                      } cursor-pointer flex items-center gap-2`}
                      disabled={user?.role == "SuperAdmin"}
                      onClick={() => handleDelete(user?._id)}
                    >
                      <FaRegTrashAlt /> delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ControlCenter;
