import { check } from "express-validator";

export const registerValidator = [
  check("name").trim().notEmpty().withMessage("Name is required").isLength({ min: 3 }).withMessage("Name must be 3 characters long"),
  check("email").isEmail().withMessage("Please fill a valid email address"),
  check("password").isLength({ min: 8 }).withMessage("Password should be at least 8 characters"),
  check("phone").matches(/^\d{10}$/).withMessage("Phone number should be exactly 10 digits"),
];

export const loginValidator = [
  check("email", "Please enter a valid email").isEmail(),
  check("password", "password is required").notEmpty()
];
