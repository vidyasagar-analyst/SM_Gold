import React from "react";
import InfoCard from "./InfoCard";
import ExpenseTable from "./ExpenseTable";

const Expenses = ({ expenseData, capitalize }) => {
  const month = new Date().toDateString().slice(4, 7);

  const allExpenses = expenseData?.expenses;
  const currMonthExpense = expenseData?.currentMonthExpenses;
  return (
    <div>
      <div className="flex items-center justify-between my-5">
        <InfoCard
          heading={`₹.${expenseData?.balanceInvestment}`}
          subTitle="Balance Investment "
        />
        <InfoCard
          heading={`₹.${expenseData?.totalExpenses}`}
          subTitle="Total Expenses"
        />
        <InfoCard
          heading={`₹.${expenseData?.currentMonthExpenseAmount}`}
          subTitle={`${month} Month Expense Amount`}
        />
      </div>

      <div className="">
        {expenseData?.expenses < 1 ? (
          <div className="h-[375px] mt-5 flex flex-col items-center justify-center">
            <h2 className="!text-red-500 animate-bounce">
              No Expense Information Found!
            </h2>

            <p className="!text-[12px] mt-4 tracking-wider">
              Go back to Home Page and Add a New Customer...
            </p>
          </div>
        ) : (
          //   <ProfitTable customerData={customerData} capitalize={capitalize}
          <div className="grid grid-cols-2 items-center gap-5">
            <div className="col">
              <h3 className="mb-2">All Expenses Details</h3>
              <ExpenseTable expenseData={allExpenses} capitalize={capitalize} />
            </div>

            <div className="col">
              <h3 className="mb-2">{month} Month Expenses Details</h3>
              <ExpenseTable
                expenseData={currMonthExpense}
                capitalize={capitalize}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expenses;
