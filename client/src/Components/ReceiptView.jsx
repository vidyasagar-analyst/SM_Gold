import React from "react";

const ReceiptView = ({ customer, capitalize }) => {
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
            <p>Aadhar Number</p>
            <p>Loan Amount</p>
            <p>Pledge Date</p>
            <p>Schema</p>
            <p>Loan Tenure</p>
            <p>Nominee</p>
            <p>Interest Due</p>
            <p>Maturity</p>
          </div>
          <div className="col flex flex-col gap-2">
            <p className="font-bold">: {capitalize(customer?.custName)}</p>
            <p className="font-bold">: SMG{customer?.custID}</p>
            <p className="font-bold">: {capitalize(customer?.address)}</p>
            <p className="font-bold">: {customer?.pincode}</p>
            <p className="font-bold">: {customer?.mobile}</p>
            <p className="font-bold">: {customer?.aadhar}</p>
            <p className="font-bold">: ₹. {customer?.finalLoanAmount}</p>
            <p className="font-bold">: {customer?.pledgeDate}</p>
            <p className="font-bold">: SM_GOLD_{customer?.schema}</p>
            <p className="font-bold">: 365 Days</p>
            <p className="font-bold">: {capitalize(customer?.nominee)}</p>
            <p className="font-bold">: {customer?.interestDue}</p>
            <p className="font-bold">: {customer?.maturity}</p>
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
        <p className="w-40 border-b-2 border-dotted font-bold mb-4">
          Rs. {customer?.finalLoanAmount}
        </p>
        <div className="leading-6 tracking-wide mb-10">
          <p className="inline">ON DEMAND, I </p>
          <p className="w-80 border-b-2 border-dotted inline-block px-5 font-bold">
            {capitalize(customer?.custName)}
          </p>
          <p className="inline">
            promise to pay to Sri Mahalakshmi Gold Loan or order the sum of Rs
          </p>
          <p className="w-36 border-b-2 border-dotted inline-block px-5 font-bold">
            {customer?.finalLoanAmount}
          </p>
          <p className="inline">
            {" "}
            /- together with interest from the date hereof at
          </p>
          <p className="w-28 border-b-2 border-dotted inline-block px-5 font-bold">
            30 %
          </p>
          <p className="inline">
            per annum or such other rate the Lender fix from time to time,
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
