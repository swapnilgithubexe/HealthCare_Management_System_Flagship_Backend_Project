import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/user.model.js";
import { logger } from "../utils/logger.js";

export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  //check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User with this email already exists"
    });
  }

  //if not, create a new instance
  const newUser = new User({ name, email, password, phone });
  await newUser.save();
  logger.info(`New user has been added: ${name} with email: ${email}, and the role given is ${role}`)

  const userResponse = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    phone: newUser.phone,
    role: newUser.role
  };

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user: userResponse
  })
})