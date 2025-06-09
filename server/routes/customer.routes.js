import express from "express";
import { CustomerModel } from "../models/customer.model.js";
import { InvestmentModel } from "../models/investment.model.js";

// import multer from "multer";
import { upload } from "../utils/multerConfig.js";

const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },

//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// export const uploadImg = multer({ storage: storage });

router.post(
  "/add-customer",
  upload.fields([{ name: "custImg", maxCount: 1 }]),
  async (req, res) => {
    const {
      custName,
      address,
      pincode,
      mobile,
      aadhar,
      actualLoanAmount,
      interestRate,
      schema,
      nominee,
    } = req.body;

    try {
      const customer = await CustomerModel.findOne({ custName });
      const customers = await CustomerModel.find({});
      const investors = await InvestmentModel.find({});

      if (customer) {
        return res
          .status(400)
          .json({ success: false, message: "Already Customer Exists!" });
      }

      // const customerID = 1001 + customers?.length;
      const now = new Date();
      const today = now.toDateString();

      const pledge = today.slice(4).replaceAll(" ", "-");

      const nextDueMonth = new Date(
        now.getFullYear(),
        now.getMonth() + Number(schema),
        now.getDate()
      ).toDateString();
      const nextDueYear = new Date(
        now.getFullYear() + 1,
        now.getMonth(),
        now.getDate()
      ).toDateString();

      const processingFee = (actualLoanAmount * 0.4) / 100;
      const finalLoanAmount = actualLoanAmount - processingFee;

      const newCustomer = new CustomerModel({
        custName,
        custImg: req.files["custImg"]?.[0]?.path || "",
        address,
        pincode,
        mobile,
        aadhar,
        actualLoanAmount,
        finalLoanAmount,
        interestRate: Number(interestRate),
        processingFee,
        interestAmount: 0,
        totalProfit: processingFee,
        pledgeDate: pledge,
        schema,
        nominee,
        interestDue: nextDueMonth,
        maturity: nextDueYear,
      });

      const totalInvestment = investors?.reduce((acc, investor) => {
        return acc + investor?.investment;
      }, 0);

      const totalLoanAmount = customers.reduce((acc, cust) => {
        return acc + cust?.actualLoanAmount;
      }, 0);

      const balanceInvestment = totalInvestment - totalLoanAmount;

      if (newCustomer?.actualLoanAmount > balanceInvestment) {
        return res.status(400).json({
          success: false,
          message: `Insufficient Balance! ₹. ${balanceInvestment}`,
        });
      }

      await newCustomer.save();

      res.status(201).json({
        success: true,
        message: "Customer Added Successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Customer add Failed: ${error.message}`,
      });
    }
  }
);

router.post(
  "/add-ornament/:id",
  upload.fields([{ name: "ornamentImg", maxCount: 1 }]),
  async (req, res) => {
    const { ornamentName, count, grossWeight, stoneWeight, remarks } = req.body;
    const { id } = req.params;

    try {
      const customer = await CustomerModel.findById(id);

      if (!customer) {
        return res
          .status(404)
          .json({ success: false, message: "Customer Not Found!" });
      }

      const ornament = {
        ornamentName,
        count,
        grossWeight,
        stoneWeight,
        remarks,
        ornamentImg: req.files["ornamentImg"]?.[0]?.path || "",
      };

      customer.ornaments.push(ornament);
      await customer.save();

      res.status(201).json({
        success: true,
        message: "Ornament Added Successfully",
        customer,
      });
    } catch (error) {
      res.status(500).json({
        success: falsse,
        message: `Ornament Add Failed: ${error.message}`,
      });
    }
  }
);

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
      return (
        cust?.pledgeDate?.slice(0, 3) == currMonth && cust?.status == "Pending"
      );
    });

    const currentMonthLoanAmount = currentMonthCustomers.reduce((acc, cust) => {
      return acc + cust?.actualLoanAmount;
    }, 0);

    const totalLoanAmount = customers.reduce((acc, cust) => {
      return acc + cust?.actualLoanAmount;
    }, 0);

    const totalProfitAmount = customers.reduce((acc, cust) => {
      return acc + cust?.totalProfit;
    }, 0);

    res.status(200).json({
      success: true,
      message: "Customers Data Fetched Successfully",
      totalCustomerCount: customers.length,
      currentMonthCustomerCount: currentMonthCustomers.length,
      currentMonthLoanAmount,
      totalLoanAmount,
      totalProfitAmount,
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

router.put("/complete-customer/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await CustomerModel.findById(id);

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "No Customer Found!" });
    }

    let start = new Date(customer?.pledgeDate);
    let end = new Date();
    let timeDifference = end - start;
    let daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    const interestAmount =
      (customer?.actualLoanAmount * customer?.interestRate) / 100;

    const interestPerDay = interestAmount / 30;

    const totalInterest =
      daysDifference < 15
        ? interestPerDay * 15
        : interestPerDay * daysDifference;

    const totalProfit = customer?.processingFee + totalInterest;

    customer.status = "Completed";
    customer.interestAmount = Math.floor(totalInterest);
    customer.totalProfit = Math.floor(totalProfit);
    customer.completedAt = new Date();

    await customer.save();

    res.status(200).json({
      success: true,
      message: `${customer?.custName?.toUpperCase()}'s Status updated!`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Complete Customer Error: ${error.message}`,
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
