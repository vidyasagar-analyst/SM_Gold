import React, { useContext } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import { AppContext } from "../Utils/AppContext";

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
            <div className="flex items-center gap-6">
              {currUser?.userRole == "SuperAdmin" && (
                <NavLink
                  to="/control-center"
                  className="px-8 py-2 bg-gray-700/85 hover:bg-gray-700 rounded-md text-white font-bold text-[12px] cursor-pointer uppercase"
                >
                  Control Center
                </NavLink>
              )}
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
