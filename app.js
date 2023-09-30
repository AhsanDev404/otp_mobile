import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/userRouter.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";
import dbConnect from "./src/utils/dbConnect.js";
dotenv.config()

const app = express()

app.use(express.json());
app.use(cookieParser());

dbConnect()

app.use(`/api/v1`, userRouter);

app.use(errorMiddleware);

export default app;