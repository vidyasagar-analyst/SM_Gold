import React from "react";
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <div className="w-full h-fixed flex items-center justify-center">
      <div className="p-10 w-[95%] sm:w-3/5 rounded-lg bg-white shadow-md border border-gray-400/25">
        <h1 className="text-7xl font-bold text-red-500 text-center">
          404 Not Found!
        </h1>
        <p className="text-center mt-4 !text-xl">
          Please check your URL or Click here to go back{" "}
          <Link to="/" className="text-blue-500 underline">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Missing;
