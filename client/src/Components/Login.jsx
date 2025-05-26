import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { toast } from "sonner";
import axios from "axios";
import { AppContext } from "../Utils/AppContext";

const Login = () => {
  const { setCookies, setIsAuth, FetchCurrUser } = useContext(AppContext);

  const [showPwd, setShowPwd] = useState(false);

  const togglePwd = () => {
    setShowPwd((prev) => !prev);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const hanldeSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      toast.error("Username is Required!");
    }
    if (!password) {
      toast.error("Password is Required!");
    }

    if (username && password) {
      try {
        const result = await axios.post(
          "http://localhost:8000/api/v1/auth/login",
          { username, password }
        );
        setCookies("accessToken", result?.data?.accessToken);
        localStorage.setItem("userID", result?.data?.userID);
        toast.success(result?.data?.message);
        FetchCurrUser();
        if (result?.data?.userID) {
          setIsAuth(true);
          navigate("/");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-[30%] p-8 bg-white border border-gray-400/25 rounded-md">
        <h2 className=" mb-6">Welcome To SMGL</h2>
        <form onSubmit={hanldeSubmit}>
          <div className="flex flex-col gap-2 mb-5">
            <label htmlFor="username" className="text-sm font-semibold">
              Username
            </label>
            <input
              type="text"
              placeholder="rajkumar"
              id="username"
              className="p-3 border border-gray-400/25 bg-gray-200/50 rounded-md text-[12px]"
              onChange={(e) => setUsername(e.target.value)}
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
                className="p-3 border border-gray-400/25 bg-gray-200/50 rounded-md text-[12px] w-full"
                onChange={(e) => setPassword(e.target.value)}
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
