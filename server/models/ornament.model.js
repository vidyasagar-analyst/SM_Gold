import mongoose from "mongoose";

const OrnamentSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      require: true,
    },

    ornamentImg: {
      type: String,
    },

    itemCount: {
      type: Number,
      require: true,
    },

    grossWeight: {
      type: Number,
      require: true,
    },

    stoneWeight: {
      type: Number,
      require: true,
    },

    netWeight: {
      type: Number,
      require: true,
    },

    remarks: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
);

export const OrnamentModel = mongoose.model("ornament", OrnamentSchema);
