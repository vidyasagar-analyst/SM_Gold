import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const AddExpense = ({ closeAddExp }) => {
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState(null);
  const [user, setuser] = useState("Raj");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!expense) {
      toast.error("Enter the Expense Name!");
    }
    if (!amount) {
      toast.error("Enter the Expense Amount!");
    }

    if (expense && amount) {
      try {
        const result = await axios.post(
          "http://localhost:8000/api/v1/expense/add-expense",
          { expense, amount, user }
        );

        toast.success(result?.data?.message);
        closeAddExp();
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Something Went Wrong! Try Again Later!"
        );
      }
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div className="modal overflow-hidden z-50">
      <div className="modalOverlay"></div>
      <div className="bg-white shadow-lg rounded-md p-8 z-50 flex flex-col justify-center items-center absolute top-32 left-[600px]">
        <form onSubmit={handleSubmit}>
          <h2 className="font-bold text-center">Add Todays Expense</h2>
          <div className="flex flex-col gap-2 mb-5">
            <label htmlFor="expenseName" className="text-sm font-semibold">
              Expense Name
            </label>
            <input
              type="text"
              placeholder="Enter the Expense Name"
              id="expenseName"
              className="p-3 border border-gray-400/25 bg-gray-200/50 rounded-md text-[12px] font-semibold tracking-widest"
              onChange={(e) => setExpense(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 mb-5">
            <label htmlFor="expenseAmount" className="text-sm font-semibold">
              Expense Amount
            </label>
            <input
              type="number"
              placeholder="Enter A valid Amount"
              id="expenseAmount"
              className="p-3 border border-gray-400/25 bg-gray-200/50 rounded-md text-[12px] font-semibold tracking-widest"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 mb-5">
            <label htmlFor="user" className="text-sm font-semibold">
              User Name
            </label>
            <input
              type="text"
              placeholder="rajkumar"
              id="user"
              className="p-3 border border-gray-400/25 bg-gray-200/50 rounded-md text-[12px] font-semibold tracking-widest"
              onChange={(e) => setuser(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-5 mt-8">
            <button
              className="text-[12px] font-bold cursor-pointer uppercase border border-green-500 hover:bg-green-300/50 text-green-500 px-6 py-2 rounded-md"
              // onClick={handleClick}
              type="submit"
            >
              Add Expense
            </button>
            <button
              className="text-[12px] font-bold cursor-pointer uppercase border border-gray-500 hover:bg-gray-300/50 text-gray-500 px-6 py-2 rounded-md"
              onClick={closeAddExp}
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
