import express from "express";
import { loginValidator, registerValidator } from "../middlewares/schemaValidatorMiddleware.js";
import { loginUserUsingPassword, loginUsingOTP, registerUser, verifyLoginOTP, verifyUser } from "../controllers/user.controller.js";
import { validationResultHandler } from "../middlewares/validationResultHandler.middleware.js";

export const userRouter = express.Router();

userRouter.post("/register-new-user", [registerValidator, validationResultHandler], registerUser);
userRouter.post("/verify-user", verifyUser);

userRouter.post("/login-pass", [loginValidator, validationResultHandler], loginUserUsingPassword);

userRouter.post("/login-otp", [loginValidator, validationResultHandler], loginUsingOTP);
userRouter.post("/verify-login-otp", verifyLoginOTP);