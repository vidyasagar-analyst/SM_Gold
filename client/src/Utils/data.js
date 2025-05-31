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
    maxLength: 25,
    placeholder: "Enter a Borrower Name",
  },
  {
    label: "Mobile Number",
    id: "mobile",
    name: "mobile",
    inputType: "text",
    maxLength: 10,
    placeholder: "+91 99999 99999",
  },
  {
    label: "Aadhar Number",
    id: "aadhar",
    name: "aadhar",
    inputType: "text",
    maxLength: 12,
    placeholder: "Enter Valid Aadhar number",
  },
  {
    label: "Address",
    id: "address",
    name: "address",
    inputType: "text",
    maxLength: null,
    placeholder: "Street, City",
  },
  {
    label: "Pin Code",
    id: "pincode",
    name: "pincode",
    inputType: "text",
    maxLength: 6,
    placeholder: "635 108",
  },
  {
    label: "Loan Amount",
    id: "actualLoanAmount",
    name: "actualLoanAmount",
    inputType: "number",
    maxLength: null,
    placeholder: "100000",
  },
  // {
  //   label: "Interest Rate",
  //   id: "interestRate",
  //   name: "interestRate",
  //   inputType: "number",
  //   maxLength: null,
  //   placeholder: "Enter Rate of Interest",
  // },

  {
    label: "Nominee Name",
    id: "nominee",
    name: "nominee",
    inputType: "text",
    maxLength: 50,
    placeholder: "Nominee Name",
  },

  {
    label: "Customer Image",
    id: "customerImg",
    name: "customerImg",
    inputType: "file",
    maxLength: null,
    placeholder: "Choose a Customer Photo",
  },

  // {
  //   label: "Ornament Image",
  //   id: "ornamentImg",
  //   name: "ornamentImg",
  //   inputType: "file",
  //   maxLength: null,
  //   placeholder: "Choose a Ornament Photo",
  // },
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

const alert = new Date(
  now.getFullYear(),
  now.getMonth() + 1,
  now.getDate() - 7
).toDateString();

// console.log(today.slice(4).replaceAll(" ", "-"));

// console.log(alert.slice(4));
