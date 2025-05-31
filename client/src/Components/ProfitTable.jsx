import React from "react";

const ProfitTable = ({ capitalize, customerData }) => {
  const daysCount = (startDate, endDate) => {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let timeDifference = end - start;
    let daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return daysDifference;
  };

  const interestPerDay = (amount, interest) => {
    const interestAmount = (amount * interest) / 100;
    const intPerDay = interestAmount / 30;
    return intPerDay;
  };

  return (
    <div class="relative overflow-y-auto max-h-[400px] shadow-md border border-gray-400/25 sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-300/25 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Customer Info
            </th>
            <th scope="col" class="px-6 py-3">
              Loan Info
            </th>
            <th scope="col" class="px-6 py-3">
              Processing Fee
            </th>
            <th scope="col" class="px-6 py-3">
              Interest Amount
            </th>
            <th scope="col" class="px-6 py-3">
              Total Profit
            </th>
          </tr>
        </thead>
        <tbody>
          {customerData?.allCustomersList
            ?.filter((cust) => cust?.status == "Completed")
            ?.map((cust) => {
              return (
                <tr class="bg-white border-b border-gray-200 hover:bg-gray-50">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="">
                      <h3>{capitalize(cust?.custName)}</h3>
                      <p className="!text-[10px]">
                        Customer ID: {cust?.custID}
                      </p>
                    </div>
                  </th>
                  <td class="px-6 py-4">
                    <div className="">
                      <h3>₹. {cust?.actualLoanAmount}</h3>
                      <p className="!text-[10px]">
                        Interest Rate: {cust?.interestRate}
                      </p>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div className="">
                      <h3>₹. {cust?.processingFee}</h3>
                      <p className="!text-[10px]">
                        Date of Charge: {cust?.pledgeDate}
                      </p>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div className="">
                      <h3>₹. {cust?.interestAmount}</h3>
                      <p className="!text-[10px]">
                        Days * Per Day Interest:{" "}
                        {daysCount(cust?.pledgeDate, cust?.completedAt)} *
                        {interestPerDay(
                          cust?.actualLoanAmount,
                          cust?.interestRate
                        )}
                      </p>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div className="">
                      <h3 className="!text-green-500">
                        ₹. {cust?.totalProfit}
                      </h3>
                      <p className="!text-[10px]">
                        Profit Date:{" "}
                        {new Date(cust?.completedAt).toDateString().slice(4)}
                      </p>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ProfitTable;
