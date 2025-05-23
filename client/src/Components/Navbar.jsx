import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-5 border-b border-b-gray-400">
      <h2>SRI MAHALAKSHMI GOLD LOAN</h2>
      <div className="flex items-center gap-6">
        <NavLink
          to="/customers"
          className="px-8 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-bold text-[12px] cursor-pointer uppercase"
        >
          All Customers
        </NavLink>
        <button className="px-8 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white font-bold text-[12px] cursor-pointer uppercase">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
