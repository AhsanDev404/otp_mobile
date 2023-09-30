import express from "express";
import { sendOTP, verifyOTP } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/sendOTP").post(sendOTP);
userRouter.route("/verifyOTP").post(verifyOTP);

export default userRouter;
