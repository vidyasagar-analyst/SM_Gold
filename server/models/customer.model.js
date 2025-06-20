import mongoose from "mongoose";

const OrnamentSchema = new mongoose.Schema({
  ornamentName: {
    type: String,
    require: true,
  },

  count: {
    type: Number,
    default: 1,
  },

  grossWeight: {
    type: Number,
    require: true,
  },

  stoneWeight: {
    type: Number,
    require: true,
    default: 0,
  },

  remarks: String,

  ornamentImg: {
    type: String,
  },
});

const CustomerSchema = new mongoose.Schema(
  {
    custID: {
      type: Number,
      unique: true,
    },
    custName: {
      type: String,
      require: true,
    },

    custImg: String,

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

    ornaments: [OrnamentSchema],
  },
  { timestamps: true }
);

CustomerSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastCustomer = await mongoose
      .model("customer")
      .findOne({})
      .sort({ custID: -1 })
      .limit(1);

    this.custID = lastCustomer ? lastCustomer?.custID + 1 : 10001;
  }
  next();
});

export const CustomerModel = mongoose.model("customer", CustomerSchema);
