import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import { connectDB } from "./utils/connDB.js";
import { AuthRouter } from "./routes/auth.routes.js";
import { CustomerRouter } from "./routes/customer.routes.js";
import { InvestmentRouter } from "./routes/investment.routes.js";
import { ExpenseRouter } from "./routes/expense.routes.js";

// import multer from "multer";

configDotenv();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Multer Config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },

//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// export const uploadImg = multer({ storage: storage });

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/customers", CustomerRouter);
app.use("/api/v1/investment", InvestmentRouter);
app.use("/api/v1/expense", ExpenseRouter);

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
  connectDB();
});
