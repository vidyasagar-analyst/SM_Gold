import React, { useContext, useEffect } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import { AppContext } from "../Utils/AppContext";
import { MdNotificationsActive } from "react-icons/md";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
  const { removeCookie, isAuth, setIsAuth, currUser, customerData } =
    useContext(AppContext);

  const pendingCustomers = customerData?.allCustomersList?.filter(
    (cust) => cust?.status == "Pending"
  );

  const nextDueCustomers = pendingCustomers?.filter(
    (cust) =>
      cust?.interestDue < new Date(cust?.interestDue - 3 * 86400).toDateString()
  );

  const handleLogout = () => {
    localStorage.clear();
    removeCookie("accessToken");
    setIsAuth(false);
    <Navigate to="/auth/login" />;
  };

  return (
    <>
      {isAuth && (
        <div className="fixed top-0 left-0 z-50 bg-white w-full px-20">
          <div className="flex items-center justify-between border-b border-b-gray-400 py-5">
            <Link to="/" className="text-xl font-bold">
              SRI MAHALAKSHMI GOLD LOAN
            </Link>
            <div className="flex items-center gap-6">
              {currUser?.userRole == "SuperAdmin" && (
                <NavLink
                  to="/control-center"
                  className="font-bold text-[12px] text-gray-400 hover:text-gray-500 uppercase"
                >
                  Control Center
                </NavLink>
              )}
              <NavLink
                to="/"
                className="font-bold text-[12px] text-gray-400 hover:text-gray-500 uppercase"
              >
                Home
              </NavLink>
              <NavLink
                to="/customers"
                className="font-bold text-[12px] text-gray-400 hover:text-gray-500 uppercase"
              >
                All Customers
              </NavLink>
              <NavLink
                to="/add-customer"
                className="font-bold text-[12px] text-gray-400 hover:text-gray-500 uppercase"
              >
                Add Customer
              </NavLink>
              <div className="relative flex">
                <NavLink
                  to="/notifications"
                  className={`font-bold text-[12px] text-gray-400 hover:text-gray-500 uppercase ${
                    nextDueCustomers?.length > 0 && "animate-ping"
                  }`}
                >
                  <MdNotificationsActive size={21} />
                </NavLink>
                {nextDueCustomers?.length > 0 && (
                  <h4 className="h-4 w-4 flex items-center justify-center !text-white !text-sm rounded-full bg-red-500 absolute -top-1 left-3">
                    {nextDueCustomers?.length}
                  </h4>
                )}
              </div>

              <button
                className="px-4 py-1.5 text-red-500 border border-red-500 hover:bg-red-300/50 rounded-md font-bold text-[12px] cursor-pointer transition-all ease-in-out uppercase flex items-center gap-2"
                onClick={handleLogout}
              >
                <MdLogout /> Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
