const LoanAmountTable = ({ customerData }) => {
  return (
    <div className="relative overflow-x-auto bg-white border border-gray-400/25 rounded-md shadow ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-300/25 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Customer ID
            </th>
            <th scope="col" className="px-6 py-3">
              Customer Name
            </th>
            <th scope="col" className="px-6 py-3">
              Mobile Number
            </th>
            <th scope="col" className="px-6 py-3">
              Loan Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Pledge Date
            </th>
          </tr>
        </thead>
        <tbody>
          {customerData?.allCustomersList
            ?.map((cust) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={cust?.custID}
                >
                  <td className="px-6 py-4">{cust?.custID}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {cust?.custName?.toUpperCase()}
                  </th>
                  <td className="px-6 py-4">{cust?.mobile}</td>
                  <td className="px-6 py-4 font-semibold">
                    ₹.{cust?.loanAmount}
                  </td>
                  <td className="px-6 py-4">{cust?.pledgeDate}</td>
                </tr>
              );
            })
            .reverse()}
        </tbody>
      </table>
    </div>
  );
};

export default LoanAmountTable;
