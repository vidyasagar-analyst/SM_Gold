import React, { useState } from "react";
import { formData } from "../Utils/data";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddCustomer = () => {
  const [custName, setCustName] = useState("");
  const [mobile, setMobile] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [actualLoanAmount, setActualLoanAmount] = useState(null);
  const [interestRate, setInterestRate] = useState(0);
  const [schema, setSchema] = useState(0);
  const [nominee, setNominee] = useState("");
  const [custImg, setCustImg] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("custName", custName);
    formData.append("mobile", mobile);
    formData.append("aadhar", aadhar);
    formData.append("address", address);
    formData.append("pincode", pincode);
    formData.append("actualLoanAmount", actualLoanAmount);
    formData.append("interestRate", interestRate);
    formData.append("schema", schema);
    formData.append("nominee", nominee);
    formData.append("custImg", custImg);

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/customers/add-customer`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success(result?.data?.message);
      navigate("/customers");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to Add Customer! Try Again Later!"
      );
    }
  };

  return (
    <div className="h-fixed pt-20 flex items-center justify-center">
      <div className="w-[95%] sm:w-3/4 p-4 sm:p-7 bg-white border border-gray-400/25 rounded-lg">
        <h2 className="mb-5">Add New Customer</h2>
        <form
          onSubmit={handleSubmit}
          className="h-[675px] sm:h-auto overflow-y-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="col flex flex-col gap-2">
              <label htmlFor="custName" className="text-sm font-semibold">
                Customer Name
              </label>
              <input
                type="text"
                placeholder="Enter the Customer Name"
                id="custName"
                className="p-3 border border-gray-400/25 bg-gray-200/50 rounded-md text-sm font-semibold tracking-widest"
                name="custName"
                maxLength={25}
                onChange={(e) => setCustName(e.target.value)}
                required
              />
            </div>
            <div className="col flex flex-col gap-2">
              <label htmlFor="mobile" className="text-sm font-semibold">
                Mobile Number
              </label>
              <input
                type="text"
                placeholder="Enter the mobile Number"
                id="mobile"
                className="p-3 border border-gray-400/25 bg-gray-200/50 rounded-md text-sm font-semibold tracking-widest"
                name="mobile"
                maxLength={10}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
            <div className="col flex flex-col gap-2">
              <label htmlFor="aadhar" className="text-sm font-semibold">
                Aadhar Number
              </label>
              <input
                type="text"
                placeholder="Enter the Aadhar Number"
                id="aadhar"
                className="p-3 border border-gray-400/25 bg-gray-200/50 rounded-md text-sm font-semibold tracking-widest"
                name="aadhar"
                maxLength={12}
                onChange={(e) => setAadhar(e.target.value)}
                required
              />
            </div>
            <div className="col flex flex-col gap-2">
              <label htmlFor="address" className="text-sm font-semibold">
                Customer Address
              </label>
              <input
                type="text"
                placeholder="Enter the Customer Aadhar"
                id="address"
                className="p-3 border border-gray-400/25 bg-gray-200/50 rounded-md text-sm font-semibold tracking-widest"
                name="address"
                maxLength={50}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="col flex flex-col gap-2">
              <label htmlFor="pincode" className="text-sm font-semibold">
                Pin Code
              </label>
              <input
                type="text"
                placeholder="Enter Pincode"
                id="pincode"
                className="p-3 border border-gray-400/25 bg-gray-200/50 rounded-md text-sm font-semibold tracking-widest"
                name="pincode"
                maxLength={6}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
            </div>
            <div className="col flex flex-col gap-2">
              <label
                htmlFor="actualLoanAmount"
                className="text-sm font-semibold"
              >
                Loan Amount
              </label>
              <input
                type="number"
                placeholder="Enter the Loan Amount"
                id="actualLoanAmount"
                className="p-3 border border-gray-400/25 bg-gray-200/50 rounded-md text-sm font-semibold tracking-widest"
                name="actualLoanAmount"
                maxLength={8}
                onChange={(e) => setActualLoanAmount(e.target.value)}
                required
              />
            </div>
            <div className="col flex flex-col gap-2">
              <label htmlFor="nominee" className="text-sm font-semibold">
                Nominee Name
              </label>
              <input
                type="text"
                placeholder="Enter the Nominee Name"
                id="nominee"
                className="p-3 border border-gray-400/25 bg-gray-200/50 rounded-md text-sm font-semibold tracking-widest"
                name="nominee"
                maxLength={25}
                onChange={(e) => setNominee(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="interestRate" className="text-sm font-semibold">
                Interest Rate
              </label>
              <select
                id="interestRate"
                name="interestRate"
                className="p-3 pr-4 appearance-none border border-gray-400/25 bg-gray-200/50 rounded-md text-sm font-semibold tracking-widest"
                onChange={(e) => setInterestRate(Number(e.target.value))}
              >
                <option>Select Interest Rate</option>
                <option value={"1.26"}>1.26%</option>
                <option value={"1.56"}>1.56%</option>
                <option value={"1.76"}>1.76%</option>
                <option value={"1.96"}>1.96%</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="schema" className="text-sm font-semibold">
                Scheme
              </label>
              <select
                id="schema"
                name="schema"
                className="p-3 pr-4 appearance-none border border-gray-400/25 bg-gray-200/50 rounded-md text-sm font-semibold tracking-widest"
                onChange={(e) => setSchema(Number(e.target.value))}
              >
                <option>Select Scheme</option>
                <option value={"1"}>SM_GOLD_1</option>
                <option value={"3"}>SM_GOLD_3</option>
                <option value={"6"}>SM_GOLD_6</option>
                <option value={"9"}>SM_GOLD_9</option>
                <option value={"12"}>SM_GOLD_12</option>
              </select>
            </div>

            <div className="col flex flex-col gap-2">
              <label htmlFor="custImg" className="text-sm font-semibold">
                Customer Image
              </label>
              <input
                type="file"
                placeholder="Enter the Nominee Name"
                id="custImg"
                className="p-3 border border-gray-400/25 bg-gray-200/50 rounded-md text-sm font-semibold tracking-widest"
                name="custImg"
                onChange={(e) => setCustImg(e.target.files[0])}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className=" w-full mt-5 p-3 bg-blue-500 hover:bg-blue-600 font-bold text-white uppercase cursor-pointer rounded-md text-sm"
          >
            Add Customer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
