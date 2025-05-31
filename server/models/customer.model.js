import mongoose, { Schema } from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    custID: {
      type: Number,
    },
    custName: {
      type: String,
      require: true,
    },

    custImg: {
      type: String,
      require: false,
    },

    address: {
      type: String,
      require: true,
    },

    pincode: {
      type: String,
    },

    mobile: {
      type: String,
      require: true,
    },

    aadhar: {
      type: String,
    },

    actualLoanAmount: {
      type: Number,
      require: true,
    },

    finalLoanAmount: {
      // Detect processing fee actualLoanAmount - processingFee
      type: Number,
    },

    pledgeDate: {
      type: String,
      // require: true,
    },

    interestRate: {
      type: Number,
      require: true,
    },

    processingFee: Number,

    interestAmount: Number,

    totalProfit: Number,

    status: {
      type: String,
      default: "Pending",
    },

    completedAt: Date,

    schema: {
      type: Number,
      default: 1,
    },

    nominee: {
      type: String,
    },

    interestDue: {
      type: String,
    },

    maturity: {
      type: String,
    },

    // ornaments: [{ type: Schema.Types.ObjectId, ref: "ornament", default: [] }],
  },
  { timestamps: true }
);

export const CustomerModel = mongoose.model("customer", CustomerSchema);
