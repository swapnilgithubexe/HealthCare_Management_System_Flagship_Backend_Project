//imports here
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/utils/databaseConnector.js";
dotenv.config()

//error middlewares
import { errorHandlerMiddleware } from "./src/middlewares/errorHandler.js"
import { catchAsyncErrors } from "./src/middlewares/catchAsyncErrors.js"

//server initialization
const server = express();

//using middlewares here
server.use(errorHandlerMiddleware);

server.listen(process.env.PORT, () => {
  console.log("Server is running");
  connectDB();
})