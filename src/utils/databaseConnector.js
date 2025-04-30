import mongoose from "mongoose";
import dotenv from "dotenv";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { logger } from "./logger.js";
dotenv.config();

export const connectDB = catchAsyncErrors(async () => {
  await mongoose.connect(process.env.MONGODB_URI).then(() => logger.info("Database connected")).catch(err => logger.error("MongoDB connection failed"));
  console.log("Database connected successfully");
});
