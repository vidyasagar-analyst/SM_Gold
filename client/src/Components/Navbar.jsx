import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import { AppContext } from "../Utils/AppContext";
import { MdNotificationsActive } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import PopupModal from "./PopupModal";

import { RiMenu3Line } from "react-icons/ri";
import { RiCloseLargeLine } from "react-icons/ri";

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
    toggleClose();
    closeMenu();
    <Navigate to="/auth/login" />;
  };

  const [openModal, setOpenModal] = useState(false);
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const toggleOpen = () => {
    setOpenModal(true);
  };

  const toggleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    closeMenu();
  }, []);

  return (
    <>
      {isAuth && (
        <div className="fixed top-0 left-0 z-50 bg-white w-full px-8 sm:px-20">
          <div className="flex items-center justify-between border-b border-b-gray-400 py-4">
            <Link to="/" className="text-xl font-bold">
              SMF
            </Link>
            <div className={`hidden sm:flex items-center gap-5 transition-all`}>
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
                onClick={toggleOpen}
              >
                <MdLogout /> Logout
              </button>
            </div>
            <button className="text-2xl sm:hidden" onClick={toggleMenu}>
              {menu ? <RiCloseLargeLine /> : <RiMenu3Line />}
            </button>

            {menu && (
              <div
                className={`flex flex-col items-center w-screen gap-5 absolute left-0 ${
                  menu ? "h-screen bg-white" : "hidden"
                } top-16 pt-20 sm:flex sm:flex-row sm:items-center sm:gap-6 sm:static transition-all`}
              >
                {currUser?.userRole == "SuperAdmin" && (
                  <NavLink
                    to="/control-center"
                    className="font-bold text-[12px] text-gray-400 hover:text-gray-500 uppercase"
                    onClick={closeMenu}
                  >
                    Control Center
                  </NavLink>
                )}
                <NavLink
                  to="/"
                  className="font-bold text-[12px] text-gray-400 hover:text-gray-500 uppercase"
                  onClick={closeMenu}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/customers"
                  className="font-bold text-[12px] text-gray-400 hover:text-gray-500 uppercase"
                  onClick={closeMenu}
                >
                  All Customers
                </NavLink>
                <NavLink
                  to="/add-customer"
                  className="font-bold text-[12px] text-gray-400 hover:text-gray-500 uppercase"
                  onClick={closeMenu}
                >
                  Add Customer
                </NavLink>
                <div className="relative flex">
                  <NavLink
                    to="/notifications"
                    className={`font-bold text-[12px] text-gray-400 hover:text-gray-500 uppercase ${
                      nextDueCustomers?.length > 0 && "animate-ping"
                    }`}
                    onClick={closeMenu}
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
                  onClick={toggleOpen}
                >
                  <MdLogout /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {openModal && (
        <PopupModal
          description="Are you sure want to Logout?"
          btnName="Logout"
          closeModal={toggleClose}
          handleClick={handleLogout}
        />
      )}
    </>
  );
};

export default Navbar;
