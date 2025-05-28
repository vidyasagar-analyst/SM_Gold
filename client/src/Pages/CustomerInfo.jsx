import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import ReceiptView from "../Components/ReceiptView";
import { AppContext } from "../Utils/AppContext";

const CustomerInfo = () => {
  const { id } = useParams();
  const { customerData, capitalize } = useContext(AppContext);

  const customer = customerData?.allCustomersList?.find(
    (cust) => cust?.custID == id
  );

  return (
    <div className="py-20 flex items-center justify-center mt-20">
      <div className="w-3/4 px-20 py-10">
        <ReceiptView customer={customer} capitalize={capitalize} />
      </div>
    </div>
  );
};

export default CustomerInfo;
