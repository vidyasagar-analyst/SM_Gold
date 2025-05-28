import express from "express";
import { CustomerModel } from "../models/customer.model.js";
import { UserModel } from "../models/auth.model.js";

const router = express.Router();

router.post("/add-customer", async (req, res) => {
  const { custName, address, pincode, mobile, loanAmount, schema, nominee } =
    req.body;

  try {
    const customer = await CustomerModel.findOne({ custName });
    const customers = await CustomerModel.find({});
    const users = await UserModel.find({});

    if (customer) {
      return res
        .status(400)
        .json({ success: false, message: "Already Customer Exists!" });
    }

    const customerID = 990001 + customers?.length;
    const now = new Date();
    const today = now.toDateString();

    const pledge = today.slice(4).replaceAll(" ", "-");

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

    const newCustomer = new CustomerModel({
      custID: customerID,
      custName,
      address,
      pincode,
      mobile,
      loanAmount,
      pledgeDate: pledge,
      schema,
      nominee,
      interestDue: nextDueMonth,
      maturity: nextDueYear,
    });

    const totalInvestment = users.reduce((acc, user) => {
      return acc + user?.investment;
    }, 0);

    const totalLoanAmount = customers.reduce((acc, cust) => {
      return acc + cust?.loanAmount;
    }, 0);

    const balanceInvestment = totalInvestment - totalLoanAmount;

    if (newCustomer?.loanAmount > balanceInvestment) {
      return res.status(400).json({
        success: false,
        message: `Insufficient Balance! ₹. ${balanceInvestment}`,
      });
    }

    await newCustomer.save();

    res
      .status(201)
      .json({ success: true, message: "Customer Added Successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Customer add Failed: ${error.message}`,
    });
  }
});

router.get("/all-customers", async (req, res) => {
  try {
    const customers = await CustomerModel.find({});

    if (!customers) {
      return res
        .status(404)
        .json({ success: false, message: "No Customers Found!" });
    }

    const now = new Date();
    const currMonth = now.toDateString().slice(4, 7);

    const currentMonthCustomers = customers.filter((cust) => {
      return cust?.pledgeDate?.slice(0, 3) == currMonth;
    });

    const currentMonthLoanAmount = currentMonthCustomers.reduce((acc, cust) => {
      return acc + cust?.loanAmount;
    }, 0);

    const totalLoanAmount = customers.reduce((acc, cust) => {
      return acc + cust?.loanAmount;
    }, 0);

    res.status(200).json({
      success: true,
      message: "Customers Data Fetched Successfully",
      totalCustomerCount: customers.length,
      currentMonthCustomerCount: currentMonthCustomers.length,
      currentMonthLoanAmount,
      totalLoanAmount,
      currentMonthCustomers,
      allCustomersList: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Customer Data Fetch Failed: ${error.message}`,
    });
  }
});

router.delete("/delete-customer/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await CustomerModel.findByIdAndDelete(id);

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Customer ID" });
    }
    res.status(200).json({
      success: true,
      message: `${customer?.custName?.toUpperCase()} Details Deleted!`,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Failed to Delete a Customer! ${error.message}`,
    });
  }
});

export { router as CustomerRouter };
