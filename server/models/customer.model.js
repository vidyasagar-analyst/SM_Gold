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

    loanAmount: {
      type: Number,
      require: true,
    },

    pledgeDate: {
      type: String,
      // require: true,
    },

    schema: {
      type: String,
      default: "SM_GOLD",
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
