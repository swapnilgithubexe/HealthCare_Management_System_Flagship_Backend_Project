import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/user.model.js";
import { logger } from "../utils/logger.js";
import sendMail from "../utils/sendMail.js";
import { ErrorHandler } from "../middlewares/errorHandler.js";


//Register a new user
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

  // //if not, create a new instance
  // const newUser = new User({ name, email, password, phone });
  // await newUser.save();

  // //logger function
  // logger.info(`New user has been added: ${name} with email: ${email}, and the role given is ${role}`)

  // //new response created without adding the password
  // const userResponse = {
  //   _id: newUser._id,
  //   name: newUser.name,
  //   email: newUser.email,
  //   phone: newUser.phone,
  //   role: newUser.role
  // };

  // res.status(201).json({
  //   success: true,
  //   message: "User created successfully",
  //   user: userResponse
  // });

  const tempUserData = {
    name, email, password, phone
  };

  //Generate a OTP
  const otp = Math.floor(Math.random() * 1000000);

  //token to verify the OTP
  const activationToken = jwt.sign({
    tempUserData, otp
  },
    process.env.ACTIVATION_SECRET,
    { expiresIn: "5m" });

  const data = {
    name, otp
  }
  await sendMail(email, "HealthCare Management", data);

  res.status(200).json({
    success: true,
    message: "OTP sent to the email address",
    activationToken
  });

});

//Verify OTP function
export const verifyUser = catchAsyncErrors(async (req, res, next) => {
  const { otp, activationToken } = req.body;

  //check if the token is valid
  let tokenVerification
  try {
    tokenVerification = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Oops, Looks like the given OTP is expired, Please try again later."
    });
  }


  //OTP check
  if (tokenVerification.otp !== otp) return res.status(401).json({
    success: false,
    message: "Invalid OTP: OTP did not match."
  });

  const { name, email, password, phone } = tokenVerification.tempUserData;

  const newUser = new User({
    name: name, email: email, password: password, phone: phone
  });

  await newUser.save();

  res.status(201).json({
    success: true,
    message: "User Registered",
    user: { name, email }
  })
})


//login function using password
export const loginUserUsingPassword = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //check if the user exists
  const existingUser = await User.findOne({ email }).select('+password');
  if (!existingUser) {
    return res.status(404).json({
      success: false,
      message: `No user found with this email Id: ${email}`
    })
  }

  //check password
  const isPasswordMatched = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordMatched) {
    return res.status(401).json({
      success: false,
      message: "Incorrect Password"
    });
  };

  logger.info(`${existingUser.name} just logged in.`);

  const token = jwt.sign({
    userId: existingUser._id,
    email: existingUser.email
  },
    process.env.JWT_SECRET, {
    expiresIn: "7d"
  });

  res.status(200).json({
    success: true,
    message: `Welcome Back ${existingUser.name}`,
    token: token
  });
});

//login using OTP

export const loginUsingOTP = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({
      success: false,
      message: `User not found with Id: ${email}`
    });
  }


  //Generate an OTP
  const otp = Math.floor(Math.random() * 1000000);

  //token to verify the OTP
  const activationToken = jwt.sign({
    email, otp
  },
    process.env.ACTIVATION_SECRET,
    { expiresIn: "5m" });

  const { name } = existingUser;
  const data = {
    name, otp
  }
  await sendMail(email, "HealthCare Management", data);

  res.status(200).json({
    success: true,
    message: "OTP sent to the email address",
    activationToken
  });
});


//verify OTP login
export const verifyLoginOTP = catchAsyncErrors(async (req, res, next) => {
  const { otp, activationToken } = req.body;

  //token verification
  let payload;
  try {
    payload = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);

  } catch (error) {
    return next(new ErrorHandler("OTP Expired", 400))
  }

  if (payload.otp !== otp) {

    return new ErrorHandler("Invalid OTP: OTP did not match", 401)

  }

  //get user
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    return new ErrorHandler("User not found", 400);
  }

  const token = jwt.sign({
    userId: user._id, email: user.email
  },
    process.env.JWT_SECRET,
    { expiresIn: "7d" })

  logger.info(`User logged in with email: ${payload.email}`)
  res.status(200).json({
    success: true,
    message: `Login successful`,
    token: token
  })

})