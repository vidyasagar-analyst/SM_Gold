import React from "react";
import { Link } from "react-router-dom";

const InfoCard = ({ heading, subTitle, redirectPath = null, title = null }) => {
  return (
    <Link
      to={redirectPath}
      className="p-5 w-[325px] rounded-lg border border-gray-400/25 shadow-md bg-gray-300/25"
      title={title}
    >
      <h1 className="text-3xl font-bold tracking-wider">{heading}</h1>
      <p className="!text-[12px] mt-2 font-semibold">{subTitle}</p>
    </Link>
  );
};

export default InfoCard;
