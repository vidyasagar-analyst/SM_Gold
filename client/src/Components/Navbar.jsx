import React, { useContext, useEffect } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import { AppContext } from "../Utils/AppContext";
import { MdNotificationsActive } from "react-icons/md";

const Navbar = () => {
  const { removeCookie, isAuth, setIsAuth, currUser } = useContext(AppContext);

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
            <div className="flex items-center gap-2">
              {currUser?.userRole == "SuperAdmin" && (
                <NavLink
                  to="/control-center"
                  className="px-8 py-2 bg-gray-700/85 hover:bg-gray-700 rounded-md text-white font-bold text-[12px] cursor-pointer uppercase"
                >
                  Control Center
                </NavLink>
              )}
              <div className="relative flex">
                <NavLink
                  to="/notifications"
                  className="p-1.5 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-bold text-[12px] cursor-pointer uppercase"
                >
                  <MdNotificationsActive size={21} />
                </NavLink>
                <h4 className="h-4 w-4 flex items-center justify-center !text-white !text-sm rounded-full bg-red-500 absolute -top-1 left-5">
                  3
                </h4>
              </div>
              <NavLink
                to="/customers"
                className="px-8 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-bold text-[12px] cursor-pointer uppercase"
              >
                All Customers
              </NavLink>
              <button
                className="px-8 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white font-bold text-[12px] cursor-pointer uppercase"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
