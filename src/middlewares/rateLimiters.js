import rateLimit from "express-rate-limit";

export const otpRequestLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, //5 mins
  max: 2,
  message: {
    success: false,
    message: "Too many OTP requests, Please wait a few minutes and try again."
  }
});

export const otpVerifyLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 2,
  message: {
    success: false,
    message: "Too many attempts, please request a new OTP later."
  }
});