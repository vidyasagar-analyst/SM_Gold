import React from "react";

const ExpenseTable = ({ expenseData, capitalize }) => {
  return (
    <div className="relative overflow-y-auto max-h-[375px] shadow-md sm:rounded-lg border border-gray-400/25 ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Expense Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Expense Date
            </th>
          </tr>
        </thead>
        <tbody>
          {expenseData
            ?.map((exp) => {
              return (
                <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 ">
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="">
                      <h3>{capitalize(exp?.expense)}</h3>
                      <p className="!text-[10px]">By {capitalize(exp?.user)}</p>
                    </div>
                  </th>
                  <td className="px-6 py-2 font-semibold">₹. {exp?.amount}</td>
                  <td className="px-6 py-2">
                    {new Date(exp?.expenseDate).toDateString().slice(4)}
                  </td>
                </tr>
              );
            })
            .reverse()}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
