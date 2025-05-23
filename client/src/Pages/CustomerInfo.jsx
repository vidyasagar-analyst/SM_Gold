import React from "react";
import { useParams } from "react-router-dom";
import { custDetails } from "../Utils/data";
import ReceiptView from "../Components/ReceiptView";

const CustomerInfo = () => {
  const { id } = useParams();

  const customer = custDetails.find((cust) => cust?.custId == id);

  return (
    <div className="py-20 flex items-center justify-center">
      <div className="w-3/4 px-20 py-10">
        <ReceiptView
          custId={customer.custId}
          custName={customer.custName}
          address={customer.address}
          mobileNumber={customer.mobileNumber}
        />
      </div>
    </div>
  );
};

export default CustomerInfo;
