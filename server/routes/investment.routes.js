import express from "express";
import { InvestmentModel } from "../models/investment.model.js";

const router = express.Router();

router.post("/investment-update", async (req, res) => {
  const { investorName, investment } = req.body;

  try {
    let investor = await InvestmentModel.findOne({ investorName });

    if (!investor) {
      const count = await InvestmentModel.countDocuments();

      if (count >= 4) {
        return res.json({ message: "Investor Limit exceed!" });
      }
      investor = new InvestmentModel({
        investorName,
        investment,
        investmentHistory: [{ amount: investment }],
      });
    } else {
      investor.investment += investment;
      investor.investmentHistory.push({ amount: investment });
    }

    await investor.save();
    res.status(201).json({
      success: true,
      message: `₹.${investment} Added to ${investor?.investorName?.toUpperCase()}'s Account`,
      investor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Investment Info Error: ${error.message}`,
    });
  }
});

router.get("/investment-info", async (req, res) => {
  try {
    const investors = await InvestmentModel.find({});

    if (!investors) {
      return res
        .status(404)
        .json({ success: false, message: "Investors Not Found!" });
    }

    const totalInvestment = investors?.reduce((acc, investor) => {
      return acc + investor?.investment;
    }, 0);

    res.status(200).json({
      success: true,
      message: "Investment Info Fetched Successfully",
      totalInvestment,
      investors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Investment Info Fetching Error: ${error.message}`,
    });
  }
});

router.delete("/delete-investor/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const investor = await InvestmentModel.findByIdAndDelete(id);
    if (!investor) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Investor ID" });
    }
    res.status(200).json({
      success: true,
      message: `${investor?.investorName?.toUpperCase()}'s Info was Deleted!`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Investor Ddeletion Error: ${error.message}`,
    });
  }
});

export { router as InvestmentRouter };
