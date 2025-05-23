import React from "react";

const ReceiptView = ({ custId, custName, address, mobileNumber }) => {
  const now = new Date();
  const today = now.toDateString();

  const newDate = today.slice(4).replaceAll(" ", "-");
  console.log(newDate);

  const nextDueMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate()
  ).toDateString();
  const nextDueYear = new Date(
    now.getFullYear() + 1,
    now.getMonth(),
    now.getDate()
  ).toDateString();

  console.log(nextDueMonth);
  console.log(nextDueYear);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <h2>SM Gold Loan</h2>
        <p className="w-2/4 text-center">
          Sri Mahalakshmi Gold Loan Limited, Engol Pudhur, Krishnagiri-dist
          Tamil Nadu-635 108, 07708554421{" "}
        </p>
        <p className="!text-[12px]">Gold Pledge Card</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-5 mt-10">
        {/* First col */}
        <div className="col-span-2 grid grid-cols-2 gap-5 border-b border-r pb-10">
          <div className="col flex flex-col gap-2">
            <p>Borrower</p>
            <p>Customer ID</p>
            <p>Address</p>
            <p>Pin Code</p>
            <p>Mobile</p>
            <p>Loan Amount</p>
            <p>Loan</p>
            <p>Pledge Date</p>
            <p>Schema</p>
            <p>LTV(%)</p>
            <p>Loan Tenure</p>
            <p>Nominee</p>
            <p>Interest Due</p>
            <p>Maturity</p>
          </div>
          <div className="col flex flex-col gap-2">
            <p className="font-bold">{custName}</p>
            <p className="font-bold">{custId}</p>
            <p className="font-bold">{address}</p>
            <p className="font-bold">635108</p>
            <p className="font-bold">{mobileNumber}</p>
            <p className="font-bold">50000</p>
            <p className="font-bold">00990088779900</p>
            <p className="font-bold">{newDate}</p>
            <p className="font-bold">SM_GOLD</p>
            <p className="font-bold">75</p>
            <p className="font-bold">365 Days</p>
            <p className="font-bold">{custName + " Nominee"}</p>
            <p className="font-bold">{nextDueMonth}</p>
            <p className="font-bold">{nextDueYear}</p>
          </div>
        </div>

        {/* second col */}
        <div className="col-span-2 bg-amber-700">col2</div>

        {/* third col */}
        <div className="col-span-1 flex flex-col justify-between pb-8 border-b">
          {/* Top */}
          <div className="grid grid-cols-2 items-center gap-3 border-b p-2">
            <p className="!text-[12px]">Branch Name</p>
            <p className="!text-[12px]">KRISHNAGIRI</p>
            <p className="!text-[12px]">Phone</p>
            <p className="!text-[12px]">9988009988</p>
            <p className="!text-[12px]">Print Date</p>
            <p className="!text-[12px]">{new Date().toDateString()}</p>
          </div>
          {/* Table */}
          <div className="border-b border-r"></div>
          {/* Bottom */}
          <div className="p-1">
            <p className="font-semibold !text-[10px] !text-black">
              Penal Charges at 4% on Principal outstanding will be leveled after
              maturity date for the defaulted days.
            </p>
          </div>
        </div>
      </div>

      {/* Acknowledgement */}
      <div className="grid grid-cols-3 gap-7 items-center justify-between px-10 py-5">
        <div className="col grid grid-cols-2 justify-between">
          <p className="font-bold">Date</p>
          <p></p>
        </div>
        <div className="col grid grid-cols-2 justify-between">
          <p className="font-bold">BM </p>
          <p>RajKumar</p>
        </div>
        <div className="col grid grid-cols-2 justify-between">
          <p className="font-bold">Customer</p>
          <p>ramesh</p>
        </div>
        <div className="col grid grid-cols-2 justify-between">
          <p className="font-bold">Place</p>
          <p></p>
        </div>
        <div className="col grid grid-cols-2 justify-between">
          <p className="font-bold">BM Sign</p>
          <p></p>
        </div>
        <div className="col grid grid-cols-2 justify-between">
          <p className="font-bold">Customer Sign</p>
          <p></p>
        </div>
      </div>

      {/* Demand Note */}
      <div className="border-2 border-black p-4 my-10">
        <h3 className="underline underline-offset-4 mb-4">
          Demand Promissory Note:
        </h3>
        <p className="w-40 border-b-2 border-dotted font-bold mb-4">Rs.</p>
        <div className="leading-6 tracking-wide mb-10">
          <p className="inline">ON DEMAND, I </p>
          <p className="w-80 border-b-2 border-dotted inline-block px-5">
            {custName}
          </p>
          <p className="inline">
            promise to pay to Sri Mahalakshmi Gold Loan or order the sum of Rs
          </p>
          <p className="w-36 border-b-2 border-dotted inline-block px-5">
            00.00
          </p>
          <p className="inline">
            {" "}
            /- together with interest from the date hereof at
          </p>
          <p className="w-28 border-b-2 border-dotted inline-block px-5">30%</p>
          <p className="inline">
            % per annum or such other rate the Lender fix from time to time,
            compounding and payable with daily/monthly/quaterly rests for value
            received.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-bold">Date:</p>
          <p className="font-bold">Borrower</p>
          <div className="h-16 w-20 border-2 border-black"></div>
        </div>
      </div>

      {/* Confirmation */}
      <div className="border-2 border-black p-4">
        <h3 className="underline underline-offset-4 mb-4">
          Ornament Release Confirmation
        </h3>

        <p className="leading-6 tracking-wide mb-10">
          I hereby acknowledge that, I havve received all the gold ornaments
          which has been mentioned in above table in its original shape and
          condition without any damage. And indemnify that I shall have no claim
          on this gold loan in future.
        </p>
        <div className="flex items-center justify-between">
          <p>Date: </p>
          <p className="pr-40">Borrower Signature</p>
        </div>
      </div>
    </>
  );
};

export default ReceiptView;
