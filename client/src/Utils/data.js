export const custDetails = [
  {
    custId: 990001,
    custName: "Thirupathy",
    address: "Krishnagiri",
    mobileNumber: "7708554421",
  },
  {
    custId: 990002,
    custName: "Prasanth",
    address: "Krishnagiri",
    mobileNumber: "7708554421",
  },
  {
    custId: 990003,
    custName: "Raj Kumar",
    address: "Krishnagiri",
    mobileNumber: "7708554421",
  },
  {
    custId: 990004,
    custName: "Prabanjan",
    address: "Krishnagiri",
    mobileNumber: "7708554421",
  },
  {
    custId: 990005,
    custName: "Sornambikai",
    address: "Krishnagiri",
    mobileNumber: "7708554421",
  },
];

export const formData = [
  {
    label: "Customer Name",
    id: "custName",
    name: "custName",
    inputType: "text",
    placeholder: "Enter a Borrower Name",
  },
  {
    label: "Mobile Number",
    id: "mobile",
    name: "mobile",
    inputType: "text",
    placeholder: "+91 99999 99999",
  },
  {
    label: "Address",
    id: "address",
    name: "address",
    inputType: "text",
    placeholder: "Street, City",
  },
  {
    label: "Pin Code",
    id: "pincode",
    name: "pincode",
    inputType: "text",
    placeholder: "635 108",
  },
  {
    label: "Loan Amount",
    id: "loanAmount",
    name: "loanAmount",
    inputType: "number",
    placeholder: "100000",
  },
  {
    label: "Loan Number",
    id: "loanNumber",
    name: "loanNumber",
    inputType: "text",
    placeholder: "0099018725436",
  },
  {
    label: "Pledge Date",
    id: "pledgeDate",
    name: "pledgeDate",
    inputType: "date",
    placeholder: "Pledge date",
  },

  {
    label: "Loan Tenure",
    id: "tenure",
    name: "tenure",
    inputType: "text",
    placeholder: "Loan Tenure",
  },
  {
    label: "Nominee Name",
    id: "nominee",
    name: "nominee",
    inputType: "text",
    placeholder: "Nominee Name",
  },

  {
    label: "Customer Image",
    id: "customerImg",
    name: "customerImg",
    inputType: "file",
    placeholder: "Choose a Customer Photo",
  },

  {
    label: "Ornament Image",
    id: "ornamentImg",
    name: "ornamentImg",
    inputType: "file",
    placeholder: "Choose a Ornament Photo",
  },
];

const now = new Date();
const today = now.toDateString();

const newDate = today.slice(4).replaceAll(" ", "-");
// console.log(newDate);

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
