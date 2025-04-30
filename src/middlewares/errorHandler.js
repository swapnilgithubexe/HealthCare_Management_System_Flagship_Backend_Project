import { logger } from "../utils/logger.js";

export class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor)
  }
}

//error handling middleware
export const errorHandlerMiddleware = (err, req, res, next) => {
  logger.error(err.message);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error"

  res.status(statusCode).json({
    success: false,
    message
  });
};