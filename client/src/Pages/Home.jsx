import React, { useContext } from "react";
import { FaPlus } from "react-icons/fa";
import CustCard from "../Components/CustCard";
import { custDetails } from "../Utils/data";
import { Link } from "react-router-dom";
import InfoCard from "../Components/InfoCard";
import { AppContext } from "../Utils/AppContext";

const Home = () => {
  const currMonth = new Date().toDateString().slice(4, 7);
  const currYear = new Date().getFullYear();

  const { customerData } = useContext(AppContext);
  return (
    <div className="flex justify-center py-10 mt-[80px]">
      <div className="w-3/4">
        <div className="flex items-center justify-between mb-5">
          <InfoCard
            heading={customerData?.totalCustomerCount}
            subTitle="Total Customers"
          />
          <InfoCard
            heading={customerData?.currentMonthCustomerCount}
            subTitle={`${currMonth} Month - ${currYear} customers`}
          />
          <InfoCard
            heading={`₹.${customerData?.currentMonthLoanAmount}`}
            subTitle={`${currMonth} Month - ${currYear} Loan Amount`}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="">
            <h3>Recent Customer Information</h3>
            <p>View and Update your customer details</p>
          </div>
          <Link
            to="/add-customer"
            className="px-4 py-2 flex items-center gap-2 border-2 text-[12px] border-gray-800 rounded-lg hover:shadow cursor-pointer uppercase font-bold hover:border-gray-600 hover:text-gray-600 hover:bg-gray-300/25"
          >
            <FaPlus /> add new cust
          </Link>
        </div>

        <div className="mt-8">
          {customerData?.allCustomersList
            ?.slice(-5)
            ?.reverse()
            ?.map((cust) => {
              return (
                <CustCard
                  custId={cust.custID}
                  custName={cust.custName}
                  address={cust.address}
                  mobileNumber={cust.mobile}
                  key={cust.custID}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
