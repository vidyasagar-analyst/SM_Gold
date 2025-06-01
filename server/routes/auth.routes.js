import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserModel } from "../models/auth.model.js";
import { CustomerModel } from "../models/customer.model.js";
import { InvestmentModel } from "../models/investment.model.js";

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    const users = await UserModel.find({});

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exist!" });
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const superAdmin = users.length < 1 ? "SuperAdmin" : "Admin";

    if (users.length < 4) {
      const newUser = new UserModel({
        username,
        email,
        role: superAdmin,
        password: hashedPwd,
      });
      await newUser.save();

      return res
        .status(201)
        .json({ success: true, message: "User Registered Successful" });
    }

    res
      .status(400)
      .json({ success: true, message: "User Registeration Limit Exceed" });
  } catch (error) {
    console.log(`Registeration Failed: ${error.message}`);
    res.status(500).json({
      success: false,
      message: `Registeration Failed: ${error.message}`,
    });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    const verifyPwd = await bcrypt.compare(password, user.password);

    if (!verifyPwd) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect Credentials!" });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      accessToken,
      userID: user._id,
      role: user.role,
    });
  } catch (error) {
    console.log(`Login Failed: ${error.message}`);
    res.status(500).json({
      success: false,
      message: `Login Failed: ${error.message}`,
    });
  }
});

// All Users Data
router.get("/user-data", async (req, res) => {
  try {
    const users = await UserModel.find({}).select("-password");
    const customers = await CustomerModel.find({});
    const investors = await InvestmentModel.find({});

    if (!users) {
      return res
        .status(404)
        .json({ success: false, message: "No Users Found" });
    }

    const superAdmin = users.find((user) => user?.role == "SuperAdmin");

    const completedCustomers = customers.filter(
      (cust) => cust?.status == "Completed"
    );

    const pendingCustomers = customers.filter(
      (cust) => cust?.status == "Pending"
    );

    const pendingLoanAmount = pendingCustomers?.reduce((acc, cust) => {
      return acc + cust?.actualLoanAmount;
    }, 0);

    const reinvestment = completedCustomers.reduce((acc, cust) => {
      return acc + (cust?.actualLoanAmount + cust?.totalProfit);
    }, 0);

    const totalProfitAmount = completedCustomers.reduce((acc, cust) => {
      return acc + cust?.totalProfit;
    }, 0);

    const totalInvestment = investors.reduce((acc, investor) => {
      return acc + investor?.investment;
    }, 0);

    const totalLoanAmount = customers.reduce((acc, cust) => {
      return acc + cust?.actualLoanAmount;
    }, 0);

    const balanceInvestment =
      totalInvestment - pendingLoanAmount + totalProfitAmount;

    res.status(200).json({
      success: true,
      message: "Users Data Fetched",
      totalInvestment,
      totalLoanAmount,
      reinvestment,
      balanceInvestment,
      superAdmin,
      users,
    });
  } catch (error) {
    console.log(`Users Data Fetching Failed: ${error.message}`);
    res.status(500).json({
      success: false,
      message: `Users Data Fetching Failed: ${error.message}`,
    });
  }
});

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // set the header for JWT Verify
  if (authHeader) {
    jwt.verify(authHeader, process.env.JWT_SECRET, (err) => {
      if (err) return res.sendStatus(403);
      next();
    });
  } else {
    return res.sendStatus(401);
  }
};

router.get("/user/:userID", verifyToken, async (req, res) => {
  const { userID } = req.params;

  try {
    const user = await UserModel.findById(userID);
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User Not Found!" });
    }

    res.status(200).json({ currentUser: user?.username, userRole: user?.role });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Current User data fetch failed! ${error.message}`,
    });
  }
});

router.delete("/delete-user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid User ID" });
    }
    res.status(200).json({
      success: true,
      message: `${user?.username?.toUpperCase()} Details Deleted!`,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Failed to Delete an User! ${error.message}`,
    });
  }
});

export { router as AuthRouter };
