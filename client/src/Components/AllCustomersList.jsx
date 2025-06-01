import CustCard from "./CustCard";

const AllCustomersList = ({ searchCust, customerData }) => {
  return (
    <div>
      {customerData?.allCustomersList
        ?.filter((cust) => {
          return (
            cust?.custName?.toLowerCase().includes(searchCust) ||
            String(cust?.custID).includes(searchCust) ||
            cust?.mobile.includes(searchCust)
          );
        })
        .map((cust) => {
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
        })
        .reverse()}
    </div>
  );
};

export default AllCustomersList;
