import React from "react";

const InfoCard = ({ heading, subTitle }) => {
  return (
    <div className="p-5 w-[325px] rounded-lg border border-gray-400">
      <h1 className="text-5xl font-bold tracking-wider">{heading}</h1>
      <p className="!text-[12px] mt-2 font-semibold">{subTitle}</p>
    </div>
  );
};

export default InfoCard;
