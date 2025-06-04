import React from "react";

const OrnamentTable = ({ customer, capitalize }) => {
  return (
    <div class="relative">
      <table class="w-full text-[7px] text-left rtl:text-right text-gray-700">
        <thead class="text-[7px] text-gray-700 uppercase bg-gray-50 border-b">
          <tr>
            <th scope="col" class="px-2 py-1">
              S.No
            </th>
            <th scope="col" class="px-2 py-1">
              Item Description
            </th>
            <th scope="col" class="px-2 py-1">
              Count
            </th>
            <th scope="col" class="px-2 py-1">
              Gross Wt
            </th>
            <th scope="col" class="px-2 py-1">
              Stone Wt
            </th>
            <th scope="col" class="px-2 py-1">
              Net Wt
            </th>
            <th scope="col" class="px-2 py-1">
              Item Remarks
            </th>
          </tr>
        </thead>
        <tbody>
          {customer?.ornaments?.map((orn) => {
            return (
              <tr class="bg-white border-b border-gray-700" key={orn._id}>
                <th
                  scope="row"
                  class="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {customer?.ornaments?.length}
                </th>
                <td class="px-2 py-1">{capitalize(orn?.ornamentName)}</td>
                <td class="px-2 py-1">{orn?.count}</td>
                <td class="px-2 py-1">{orn?.grossWeight}</td>
                <td class="px-2 py-1">{orn?.stoneWeight}</td>
                <td class="px-2 py-1">
                  {(orn?.grossWeight - orn?.stoneWeight).toFixed(1)}
                </td>
                <td class="px-2 py-1">{orn?.remarks}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrnamentTable;
