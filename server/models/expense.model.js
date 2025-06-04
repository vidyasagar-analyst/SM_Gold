import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  expense: {
    type: String,
    require: true,
  },

  amount: {
    type: Number,
    require: true,
  },

  user: {
    type: String,
    default: "Raj Kumar",
  },

  expenseDate: {
    type: Date,
  },
});

export const ExpenseModel = mongoose.model("expense", ExpenseSchema);
