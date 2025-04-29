import { check } from "express-validator";

export const registerValidator = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Please fill a valid email address"),
  check("password").isLength({ min: 8 }).withMessage("Password should be at least 8 characters"),
  check("phone").matches(/^\d{10}$/).withMessage("Phone number should be exactly 10 digits"),
];
