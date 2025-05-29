import mongoose from "mongoose";

const InvestmentHistorySchema = new mongoose.Schema({
  amount: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

const InvestorSchema = new mongoose.Schema({
  investorName: {
    type: String,
    require: true,
  },
  investment: {
    type: Number,
    default: 0,
  },
  investmentHistory: [InvestmentHistorySchema],
});

export const InvestmentModel = mongoose.model("investment", InvestorSchema);
