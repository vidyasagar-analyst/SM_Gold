import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReceiptView from "../Components/ReceiptView";
import { AppContext } from "../Utils/AppContext";
import axios from "axios";
import { toast } from "sonner";
import { useReactToPrint } from "react-to-print";

const CustomerInfo = () => {
  const { id } = useParams();
  const { customerData, capitalize } = useContext(AppContext);

  const customer = customerData?.allCustomersList?.find(
    (cust) => cust?.custID == id
  );

  // Print the Receipt
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: `SMG${customer?.custID}-${customer?.custName}`,
    onAfterPrint: () => {
      toast.success(
        `${capitalize(customer?.custName)} was Printed Successfully`
      );
    },
  });

  const [ornamentName, setOrnamentName] = useState("");
  const [count, setCount] = useState("");
  const [grossWeight, setGrossWeight] = useState("");
  const [stoneWeight, setStoneWeight] = useState("");
  const [remarks, setRemarks] = useState("");
  const [ornamentImg, setOrnamentImg] = useState(null);

  const handleSumbit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ornamentName", ornamentName);
    formData.append("count", count);
    formData.append("grossWeight", grossWeight);
    formData.append("stoneWeight", stoneWeight);
    formData.append("remarks", remarks);
    formData.append("ornamentImg", ornamentImg);

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/customers/add-ornament/${
          customer?._id
        }`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success(result?.data?.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to Add Ornament! Try Again Later!"
      );
    }
  };

  useEffect(() => {
    handleSumbit();
  }, []);

  return (
    <div className="py-20 flex items-center justify-center mt-10">
      <div className="w-[95%] sm:w-3/4 sm:px-20">
        <div className="p-4 border border-gray-400/25 rounded-md shadow-lg mb-16">
          <h3>Add the Ornament Information</h3>
          <form
            className="grid grid-cols-2 sm:grid-cols-7 items-center gap-2 mt-2"
            onSubmit={handleSumbit}
          >
            <input
              type="text"
              placeholder="Item Desc"
              name="ornamentName"
              className="px-4 py-2 border border-gray-400/25 rounded-md text-sm font-semibold tracking-wider"
              onChange={(e) => setOrnamentName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Count"
              name="count"
              className="px-4 py-2 border border-gray-400/25 rounded-md text-sm font-semibold tracking-wider"
              onChange={(e) => setCount(e.target.value)}
            />
            <input
              type="number"
              step="0.1"
              placeholder="Gross Wt"
              name="grossWeight"
              className="px-4 py-2 border border-gray-400/25 rounded-md text-sm font-semibold tracking-wider"
              onChange={(e) => setGrossWeight(e.target.value)}
            />
            <input
              type="number"
              step="0.1"
              placeholder="Stone Wt"
              name="stoneWeight"
              className="px-4 py-2 border border-gray-400/25 rounded-md text-sm font-semibold tracking-wider"
              onChange={(e) => setStoneWeight(e.target.value)}
            />
            <input
              type="text"
              placeholder="Remarks"
              name="remarks"
              className="px-4 py-2 border border-gray-400/25 rounded-md text-sm font-semibold tracking-wider"
              onChange={(e) => setRemarks(e.target.value)}
            />
            <input
              type="file"
              placeholder="Item Img"
              name="ornamentImg"
              // disabled={customer?.ornaments[0]?.ornamentImg}
              className="px-4 py-2 border border-gray-400/25 rounded-md text-sm font-semibold tracking-wider"
              onChange={(e) => setOrnamentImg(e.target.files[0])}
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-md text-sm uppercase font-bold cursor-pointer border border-green-500 text-green-500 hover:bg-green-400/50"
            >
              add
            </button>
          </form>
        </div>
        <div className="">
          <ReceiptView
            customer={customer}
            capitalize={capitalize}
            contentRef={contentRef}
          />
        </div>

        <div className="mt-10 flex items-center justify-end px-10">
          <button
            className="px-4 py-2 rounded-md text-[12px] uppercase font-bold text-green-500 bg-green-300/25 hover:bg-green-400/25 cursor-pointer flex items-center gap-2"
            onClick={reactToPrintFn}
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
