import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";

const Login = () => {
  const [showPwd, setShowPwd] = useState(false);

  const togglePwd = () => {
    setShowPwd((prev) => !prev);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-[30%] p-8 bg-white rounded-md">
        <h2 className=" mb-6">Welcome To SMGL</h2>
        <form>
          <div className="flex flex-col gap-2 mb-5">
            <label htmlFor="emailAddress" className="text-sm font-semibold">
              Email Address
            </label>
            <input
              type="text"
              placeholder="name@gmail.com"
              id="emailAddress"
              className="p-3 border border-gray-400 rounded-md text-[12px]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPwd ? "text" : "password"}
                placeholder="*********"
                id="password"
                className="p-3 border border-gray-400 rounded-md text-[12px] w-full"
              />
              <div
                className="absolute right-3 text-gray-400 cursor-pointer"
                onClick={togglePwd}
              >
                {showPwd ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>

          <button className="uppercase font-bold px-7 py-[14px] text-sm text-white bg-[#212121] rounded-md w-full mt-6 cursor-pointer">
            Sign in
          </button>

          <div className="relative mt-4">
            <Link className="text-gray-500 hover:text-gray-700 text-sm absolute right-0 font-semibold">
              Forgot Password
            </Link>
          </div>

          <div className="mt-10 text-gray-500">
            Not Registered?{" "}
            <Link
              to="/auth/signup"
              className="text-gray-700 text-sm font-semibold"
            >
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
