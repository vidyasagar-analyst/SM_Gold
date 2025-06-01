import { useContext } from "react";
import { AppContext } from "../Utils/AppContext";
import CustCard from "../Components/CustCard";

const Notifications = () => {
  const { customerData } = useContext(AppContext);

  const pendingCustomers = customerData?.allCustomersList?.filter(
    (cust) => cust?.status == "Pending"
  );

  const nextDueCustomers = pendingCustomers?.filter((cust) => {
    const endDate = new Date(cust?.interestDue);
    let beforeThree = new Date(cust?.interestDue);
    beforeThree.setDate(endDate.getDate() - 3);
    return cust?.interestDue > beforeThree;
  });

  return (
    <div className="flex justify-center pt-24 h-fixed">
      <div className="w-3/4">
        {nextDueCustomers?.length < 1 ? (
          <div className="h-[450px] mt-5 flex flex-col items-center justify-center">
            <h2 className="!text-red-500 animate-bounce">
              No Near Due Customers Found!
            </h2>

            <p className="!text-[12px] mt-4 tracking-wider">
              Go back to Home Page and Add a New Customer...
            </p>
          </div>
        ) : (
          <div>
            {nextDueCustomers?.map((cust) => {
              return (
                <CustCard
                  cust={cust}
                  id={cust._id}
                  custId={cust.custID}
                  custName={cust.custName}
                  address={cust.address}
                  mobileNumber={cust.mobile}
                  loanAmount={cust.actualLoanAmount}
                  pledgeDate={cust.pledgeDate}
                  interestDue={cust.interestDue}
                  key={cust.custID}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
