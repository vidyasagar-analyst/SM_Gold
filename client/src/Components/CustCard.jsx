import React, { useContext } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AppContext } from "../Utils/AppContext";
import axios from "axios";
import { toast } from "sonner";

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
        `http://localhost:8000/api/v1/customers/complete-customer/${id}`
      );
      toast.success(result?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div
      className={`p-4 border ${
        cust?.status == "Completed"
          ? "border-green-500/25"
          : "border-red-500/25"
      } hover:shadow rounded-lg my-3 bg-gray-200/35`}
    >
      <div className="flex flex-col">
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

          {currUser?.userRole == "SuperAdmin" && (
            <div className="flex items-center gap-1">
              {cust?.status == "Pending" && (
                <button
                  className="px-4 py-2 rounded-md text-[12px] uppercase font-bold text-green-500 hover:bg-green-300/25 cursor-pointer flex items-center gap-2"
                  onClick={() => updateCustomer(id)}
                >
                  <IoMdCheckmark /> finish
                </button>
              )}
              <button
                className="px-4 py-2 rounded-md text-[12px] uppercase font-bold text-danger hover:bg-red-300/25 cursor-pointer flex items-center gap-2"
                onClick={() => deleteCustomer(id)}
              >
                <FaRegTrashAlt /> delete
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="grid grid-cols-2 gap-20 mt-4">
            <div className="col flex flex-col gap-1.5">
              <p className="!text-[12px] font-semibold">Cust ID</p>
              <p className="!text-[12px] font-semibold">Mobile No</p>
              <p className="!text-[12px] font-semibold">Address</p>
            </div>
            <div className="col flex flex-col gap-1.5">
              <h4>{custId}</h4>
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
    </div>
  );
};

export default CustCard;
