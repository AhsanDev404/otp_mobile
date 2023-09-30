import catchAsyncError from "../middleware/catchAsyncError.js";
import { User } from "../models/userModels.js";
import ErrorHandler from "../utils/errorHandler.js";

export const sendOTP = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler(401, "User already exist"));
  }

  const otp = Math.floor(Math.random() * 1000000);

  user = await User.create({
    email,
    otp,
    otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000),
  });

  await sendMail(email, "Verify your account", `Your OTP is ${otp}`);

  return res.status(400).json({ success: true, message: "Otp send" });
});

export const verifyOTP = catchAsyncError(async (req, res, next) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler(401, "User already exist"));
  }

  if (user.otp !== otp || user.otp_expiry < new Date()) {
    return next(new ErrorHandler(401, "OTP Not verified"));
  }

  // If OTP is valid and not expired, you can send the user ID in the response
  return res
    .status(200)
    .json({
      success: true,
      userId: user._id,
      message: "OTP verified successfully",
    });
});
