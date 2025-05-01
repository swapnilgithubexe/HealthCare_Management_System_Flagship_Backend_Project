import express from "express";
import { registerValidator } from "../middlewares/schemaValidatorMiddleware.js";
import { registerUser, verifyUser } from "../controllers/user.controller.js";
import { validationResultHandler } from "../middlewares/validationResultHandler.middleware.js";

export const userRouter = express.Router();

userRouter.post("/register-new-user", [registerValidator, validationResultHandler], registerUser);
userRouter.post("/verify-user", verifyUser);