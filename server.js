//imports here
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/utils/databaseConnector.js";
dotenv.config()

//error middlewares
import { errorHandlerMiddleware } from "./src/middlewares/errorHandler.js"
import { catchAsyncErrors } from "./src/middlewares/catchAsyncErrors.js"
import { userRouter } from "./src/routes/user.routes.js";

//server initialization
const server = express();
server.use(express.json());

//using middlewares here
server.use(errorHandlerMiddleware);

//routes
server.use("/api/v1/users", userRouter);

server.listen(process.env.PORT, () => {
  console.log("Server is running");
  connectDB();
})