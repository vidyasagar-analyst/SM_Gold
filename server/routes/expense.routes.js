import express from "express";
import { ExpenseModel } from "../models/expense.model.js";
import { CustomerModel } from "../models/customer.model.js";
import { InvestmentModel } from "../models/investment.model.js";

const router = express.Router();

router.post("/add-expense", async (req, res) => {
  const { expense, amount, user } = req.body;

  try {
    // const expDate = new Date().toDateString().slice(4);

    const expenses = new ExpenseModel({
      expense,
      amount,
      user,
      expenseDate: Date.now(),
    });

    await expenses.save();
    res.status(201).json({ success: true, message: "New Expense added" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Expense Adding Failed!: ${error.message}`,
    });
  }
});

router.get("/expense-data", async (req, res) => {
  try {
    const expenses = await ExpenseModel.find();
    const customers = await CustomerModel.find();
    const investors = await InvestmentModel.find();

    const currMonth = new Date().getMonth();

    const totalProfitAmount = customers.reduce((acc, cust) => {
      return acc + cust?.totalProfit;
    }, 0);

    const pendingCustomers = customers.filter(
      (cust) => cust?.status == "Pending"
    );

    const pendingLoanAmount = pendingCustomers?.reduce((acc, cust) => {
      return acc + cust?.actualLoanAmount;
    }, 0);

    const totalInvestment = investors.reduce((acc, investor) => {
      return acc + investor?.investment;
    }, 0);

    const totalExpenses = expenses.reduce((acc, expense) => {
      return acc + expense?.amount;
    }, 0);

    const currentMonthExpenses = expenses.filter(
      (expense) => expense?.expenseDate?.getMonth() == currMonth
    );

    const currentMonthExpenseAmount = currentMonthExpenses.reduce(
      (acc, expense) => {
        return acc + expense?.amount;
      },
      0
    );

    const balanceInvestment =
      totalInvestment - pendingLoanAmount + totalProfitAmount - totalExpenses;

    res.status(200).json({
      success: true,
      message: "Expense Data Fetched Successfully",
      totalProfitAmount,
      totalExpenses,
      balanceInvestment,
      currentMonthExpenseAmount,
      currentMonthExpenses,
      expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Expense Data Fetching Failed!: ${error.message}`,
    });
  }
});

export { router as ExpenseRouter };
