import React from "react";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const CustCard = ({ custId, custName, address, mobileNumber }) => {
  return (
    <div className="p-4 border border-gray-300 rounded-lg my-3">
      <div className="flex justify-between items-start">
        <div className="">
          <Link to={`/customer/${custId}`} className="flex items-center gap-2">
            <div className="border border-gray-200 rounded-md p-2.5">
              <FaUser size={25} />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3>{custName}</h3>
              <p>{address}</p>
            </div>
          </Link>
          <div className="grid grid-cols-2 gap-20 mt-4">
            <div className="col flex flex-col gap-1.5">
              <p className="!text-[12px] font-semibold">Cust ID</p>
              <p className="!text-[12px] font-semibold">Mobile No</p>
              <p className="!text-[12px] font-semibold">Address</p>
            </div>
            <div className="col flex flex-col gap-1.5">
              <h4>{custId}</h4>
              <h4>{mobileNumber}</h4>
              <h4>{address}</h4>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="px-4 py-2 rounded-md text-[12px] uppercase font-bold text-secondary hover:bg-gray-300/50 cursor-pointer flex items-center gap-2">
            <MdOutlineEdit /> Edit
          </button>
          <button className="px-4 py-2 rounded-md text-[12px] uppercase font-bold text-danger hover:bg-red-300/25 cursor-pointer flex items-center gap-2">
            <FaRegTrashAlt /> delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustCard;
