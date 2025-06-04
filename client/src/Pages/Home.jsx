import React, { useContext } from "react";
import { FaPlus } from "react-icons/fa";
import CustCard from "../Components/CustCard";
import { Link } from "react-router-dom";
import InfoCard from "../Components/InfoCard";
import { AppContext } from "../Utils/AppContext";

const Home = () => {
  const currMonth = new Date().toDateString().slice(4, 7);
  const currYear = new Date().getFullYear();

  const { customerData } = useContext(AppContext);

  const pendingCustomers = customerData?.allCustomersList?.filter(
    (cust) => cust?.status == "Pending"
  );

  return (
    <div className="flex justify-center h-fixed pt-28 pb-5">
      <div className="w-3/4">
        <div className="flex items-center justify-between mb-5">
          <InfoCard
            heading={customerData?.totalCustomerCount}
            subTitle="Total Customers"
            redirectPath="/customers"
          />
          <InfoCard
            heading={customerData?.currentMonthCustomerCount}
            subTitle={`${currMonth} Month - ${currYear} customers`}
            redirectPath="/curr-month-customers"
          />
          <InfoCard
            heading={`₹.${customerData?.currentMonthLoanAmount}`}
            subTitle={`${currMonth} Month - ${currYear} Loan Amount`}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="">
            <h3>Recent Customers</h3>
            <p>View and Update the Recent 5 customers info</p>
          </div>
          <Link
            to="/add-customer"
            className="px-4 py-2 flex items-center gap-2 border-2 text-[12px] border-gray-800 rounded-lg hover:shadow cursor-pointer uppercase font-bold hover:border-green-600 hover:text-green-600 hover:bg-green-300/25 transition-all ease-in-out"
          >
            <FaPlus /> add new cust
          </Link>
        </div>

        {pendingCustomers?.length < 1 ? (
          <div className="h-[350px] flex flex-col items-center justify-center mt-4">
            <h2 className="!text-red-500 animate-bounce">
              No Customers Found!
            </h2>
            <p className="!text-[12px] mt-4 tracking-wider">
              Click Add New Cust to Add a New Customer...
            </p>
          </div>
        ) : (
          <div className="mt-8 h-[360px] overflow-y-auto">
            {customerData?.allCustomersList
              ?.slice(-5)
              ?.reverse()
              ?.filter((cust) => cust?.status == "Pending")
              ?.map((cust) => {
                return (
                  <CustCard
                    cust={cust}
                    id={cust._id}
                    custId={cust.custID}
                    custName={cust.custName}
                    address={cust.address}
                    mobileNumber={cust.mobile}
                    loanAmount={cust.actualLoanAmount}
                    pledgeDate={cust.pledgeDate}
                    interestDue={cust.interestDue}
                    key={cust.custID}
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
