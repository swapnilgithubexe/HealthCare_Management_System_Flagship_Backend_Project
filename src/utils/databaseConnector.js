import mongoose from "mongoose";
import dotenv from "dotenv";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
dotenv.config();

export const connectDB = catchAsyncErrors(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Database connected successfully");
});
