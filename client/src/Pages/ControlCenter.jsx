import React, { useContext, useState } from "react";
import { AppContext } from "../Utils/AppContext";
import InfoCard from "../Components/InfoCard";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

const ControlCenter = () => {
  const { currUser, userData } = useContext(AppContext);

  return (
    <div className="h-fixed pt-24 flex justify-center">
      <div className="w-3/4 ">
        <h2>Welcome Mr. {currUser?.currentUser?.toUpperCase()}</h2>
        <div className="flex items-center justify-between my-5">
          <InfoCard
            heading={`₹.${userData?.totalInvestment}`}
            subTitle="Total Investment"
          />
          <InfoCard
            heading={`₹.${userData?.totalLoanAmount}`}
            subTitle="Total Loan Amount"
          />
          <InfoCard
            heading={`₹.${userData?.balanceInvestment}`}
            subTitle="Balance Investment"
          />
        </div>

        <div className="flex items-center justify-between border-b border-gray-400/25">
          <div className="mb-4">
            <h3>Add Investment</h3>
            <p className="mt-1 !text-[12px]">Last Updated on </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="Investment Amount"
              className="px-3 py-1.5 w-[200px] border border-gray-400/25 bg-gray-200/50 rounded-md text-sm"
            />
            <button className="px-8 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white font-bold text-[12px] cursor-pointer uppercase">
              Add Investment
            </button>
          </div>
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
