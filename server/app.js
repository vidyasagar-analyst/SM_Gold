import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import { connectDB } from "./utils/connDB.js";
import { AuthRouter } from "./routes/auth.routes.js";
import { CustomerRouter } from "./routes/customer.routes.js";
import { InvestmentRouter } from "./routes/investment.routes.js";

configDotenv();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/customers", CustomerRouter);
app.use("/api/v1/investment", InvestmentRouter);

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
  connectDB();
});
