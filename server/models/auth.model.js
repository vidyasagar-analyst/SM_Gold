import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
    },

    role: {
      type: String,
      default: "Admin",
      require: false,
    },

    investment: {
      type: Number,
      require: false,
      default: 0,
    },

    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("user", UserSchema);
