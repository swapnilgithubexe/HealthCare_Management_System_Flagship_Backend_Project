import { validationResult } from "express-validator";

export const validationResultHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0].msg;
    return res.status(422).json({
      success: false,
      message: firstError,
    });
  }
  next();
}