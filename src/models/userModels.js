import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    otp: Number,
    otp_expiry: Date,
  },
  { timestamps: true }
);

userSchema.index({ otp_expiry: 1 }, { expireAfterSeconds: 0 });

export const User = mongoose.model("User", userSchema);
