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

    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("user", UserSchema);
