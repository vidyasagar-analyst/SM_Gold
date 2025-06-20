import React, { useContext, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AppContext } from "../Utils/AppContext";
import axios from "axios";
import { toast } from "sonner";
import PopupModal from "./PopupModal";

const CustCard = ({
  cust,
  id = null,
  custId,
  custName,
  address,
  mobileNumber,
  loanAmount,
  pledgeDate,
  interestDue,
}) => {
  const { capitalize, currUser, deleteCustomer } = useContext(AppContext);

  const updateCustomer = async (id) => {
    try {
      const result = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/customers/complete-customer/${id}`
      );
      toast.success(result?.data?.message);
    } catch (error) {
      toast.error("Failed to Complete this Customer! Try Again Later!");
    }
  };

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const deleteOpen = () => {
    setOpenDeleteModal(true);
  };
  const updateOpen = () => {
    setOpenUpdateModal(true);
  };

  const deleteClose = () => {
    setOpenDeleteModal(false);
  };

  const updateClose = () => {
    setOpenUpdateModal(false);
  };

  return (
    <div
      className={`p-2 sm:p-4 border ${
        cust?.status == "Completed"
          ? "border-green-500/25 shadow-green-500/50"
          : "border-red-500/25 shadow-red-500/50"
      } hover:shadow rounded-lg my-3 bg-gray-200/35`}
    >
      <div className="sm:flex sm:flex-col">
        <div className="flex items-center justify-between">
          <Link to={`/customer/${custId}`} className="flex items-center gap-2">
            <div className="border border-gray-200 rounded-md p-2.5">
              <FaUser size={25} />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3>{capitalize(custName)}</h3>
              <p>{capitalize(address)}</p>
            </div>
          </Link>

          <div className="flex items-center gap-1">
            {cust?.status == "Pending" && (
              <button
                className="px-4 py-2 rounded-md text-[12px] uppercase font-bold text-green-500 hover:bg-green-300/25 cursor-pointer flex items-center gap-2"
                onClick={updateOpen}
              >
                <IoMdCheckmark /> finish
              </button>
            )}
            {currUser?.userRole == "SuperAdmin" && (
              <button
                className="px-4 py-2 rounded-md text-[12px] uppercase font-bold text-danger hover:bg-red-300/25 cursor-pointer flex items-center gap-2"
                onClick={deleteOpen}
              >
                <FaRegTrashAlt /> delete
              </button>
            )}
          </div>
        </div>

        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="grid grid-cols-2 gap-20 mt-4">
            <div className="col flex flex-col gap-1.5">
              <p className="!text-[12px] font-semibold">Cust ID</p>
              <p className="!text-[12px] font-semibold">Mobile No</p>
              <p className="!text-[12px] font-semibold">Address</p>
            </div>
            <div className="col flex flex-col gap-1.5">
              <h4>SMG{custId}</h4>
              <h4>{mobileNumber}</h4>
              <h4>{capitalize(address)}</h4>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-20 mt-4">
            <div className="col flex flex-col gap-1.5">
              <p className="!text-[12px] font-semibold">Loan Amount</p>
              <p className="!text-[12px] font-semibold">Pledge Date</p>
              <p className="!text-[12px] font-semibold">Interest Due</p>
            </div>
            <div className="col flex flex-col gap-1.5">
              <h4>₹.{loanAmount}</h4>
              <h4>{pledgeDate}</h4>
              <h4>{interestDue}</h4>
            </div>
          </div>
        </div>
      </div>

      {openDeleteModal && (
        <PopupModal
          description={`Are you sure want to Delete ${capitalize(
            custName
          )} Customer?`}
          btnName="Delete"
          closeModal={deleteClose}
          handleClick={() => deleteCustomer(id)}
        />
      )}
      {openUpdateModal && (
        <PopupModal
          description={`Are you sure want to Finish ${capitalize(
            custName
          )} Loan Account?`}
          btnName="Finish"
          closeModal={updateClose}
          handleClick={() => updateCustomer(id)}
        />
      )}
    </div>
  );
};

export default CustCard;
