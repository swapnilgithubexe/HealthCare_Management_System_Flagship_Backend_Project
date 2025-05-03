import rateLimit from "express-rate-limit";
import { logger } from "../utils/logger.js";

export const otpRequestLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, //5 mins
  //the counter resets to 0 after 5 mins
  max: 2,
  message: {
    success: false,
    message: "Too many OTP requests, Please wait a few minutes and try again."
  },
  handler: (req, res, next, options) => {
    logger.error("Rate limit exceeded - Too many OTP requests, Requested to try again later", {
      ip: req.ip,
      route: req.originalUrl
    });
    res.status(options.statusCode).json(options.message)
  }
});

export const otpVerifyLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 2,
  message: {
    success: false,
    message: "Too many attempts, please request a new OTP later."
  },
  handler: (req, res, next, options) => {
    logger.error("Too many attempts - Requested to try again later", {
      ip: req.ip,
      route: req.originalUrl
    });
    res.status(options.statusCode).json(options.message)

  }
});