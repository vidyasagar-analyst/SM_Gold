import React from "react";
import OrnamentTable from "./OrnamentTable";

const ReceiptView = ({ customer, capitalize, contentRef }) => {
  return (
    <div ref={contentRef} className="sm:px-10 sm:py-7">
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
      <div className="grid grid-cols-2 sm:grid-cols-5 mt-5">
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
        <div className="col-span-2 border-b overflow-hidden">
          <div className="flex justify-center gap-5">
            <img
              src={`${customer?.custImg}`}
              alt={customer?.custName}
              className="border h-[150px] w-[150px]"
            />
            <img
              src={`${customer?.ornaments[0]?.ornamentImg}`}
              alt={customer?.ornaments[0]?.ornamentName}
              className="border h-[150px] w-[150px]"
            />
          </div>
          <h4 className="border-b py-1 text-center">
            Ornament Type | Count | Gross Wt | Deductions | Net Wt
          </h4>
          <div>
            <OrnamentTable customer={customer} capitalize={capitalize} />
          </div>
        </div>

        {/* third col */}
        <div className="col-span-1 flex flex-col justify-between pb-8 border-b border-l">
          {/* Top */}
          <div className="grid grid-cols-2 items-center gap-2 border-b p-2">
            <p className="!text-[10px]">Branch Name</p>
            <p className="!text-[10px]">KRISHNAGIRI</p>
            <p className="!text-[10px]">Phone</p>
            <p className="!text-[10px]">9988009988</p>
            <p className="!text-[10px]">Print Date</p>
            <p className="!text-[10px]">{new Date().toDateString()}</p>
          </div>
          {/* Table */}
          <div className="border-b">
            <p className="!text-[8px] my-1">
              Interest rebate is available as mentioned below, only if up to
            </p>

            <div className="grid grid-cols-4 pl-2">
              <div className="col-span-2 border-t border-r">
                <h4 className="!text-[8px] border-b pb-3">If paid within</h4>
                <p className="!text-[8px] mb-1">
                  1. Upto 35 Days From Loan Date
                </p>
                <p className="!text-[8px] mb-1">
                  2. 36 To 92 Days From Loan Date
                </p>
                <p className="!text-[8px] mb-1">
                  3. 93 To 180 Days From Loan Date
                </p>
                <p className="!text-[8px] mb-1">
                  4. 181 To 270 Days From Loan Date
                </p>
                <p className="!text-[8px] mb-1">
                  5. 271 To 366 Days From Loan Date
                </p>
                <p className="!text-[8px] mb-1">
                  6. Above 367 Days From Loan Date
                </p>
              </div>
              <div className="col border-t border-r pl-2">
                <h4 className="!text-[8px] border-b pb-3">Rebat</h4>
                <p className="!text-[8px] mb-4 mt-1">15%</p>
                <p className="!text-[8px] mb-4 mt-1">10%</p>
                <p className="!text-[8px] mb-4 mt-1">6%</p>
                <p className="!text-[8px] mb-4 mt-1">3%</p>
                <p className="!text-[8px] mb-4 mt-1">1%</p>
                <p className="!text-[8px] mb-4 mt-1">0%</p>
              </div>
              <div className="col border-t border-r pl-1">
                <h4 className="!text-[8px] border-b">Effective ROI</h4>
                <p className="!text-[8px] mb-4 mt-1">15%</p>
                <p className="!text-[8px] mb-4 mt-1">20%</p>
                <p className="!text-[8px] mb-4 mt-1">24%</p>
                <p className="!text-[8px] mb-4 mt-1">27%</p>
                <p className="!text-[8px] mb-4 mt-1">29%</p>
                <p className="!text-[8px] mb-4 mt-1">30%</p>
              </div>
            </div>
          </div>
          {/* Bottom */}
          <div className="p-1">
            <p className="font-semibold !text-[8px] !text-black">
              Penal Charges at 4% on Principal outstanding will be leveled after
              maturity date for the defaulted days.
            </p>
          </div>
        </div>
      </div>

      {/* Acknowledgement */}
      <div className="grid grid-cols-3 gap-7 items-center justify-between px-10 py-3">
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
          <p>{capitalize(customer?.custName)}</p>
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
      <div className="border-2 border-black p-4 my-5">
        <h3 className="underline underline-offset-4 mb-4">
          Demand Promissory Note:
        </h3>
        <p className="w-40 border-b-2 border-dotted font-bold mb-4">
          Rs. {customer?.finalLoanAmount}
        </p>
        <div className="leading-6 tracking-wide mb-6">
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
        <h3 className="underline underline-offset-4 mb-2">
          Ornament Release Confirmation
        </h3>

        <p className="leading-6 tracking-wide mb-3">
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
    </div>
  );
};

export default ReceiptView;
