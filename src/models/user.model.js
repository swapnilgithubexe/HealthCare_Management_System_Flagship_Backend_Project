import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [3, "Name must be at least 3 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password should be at least 8 characters"],
    select: false
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\d{10}$/, "Phone number should be exactly 10 digits"]
  },
  role: {
    type: String,
    enum: ["admin", "patient", "doctor"],
    default: "patient"
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const saltRounds = 12;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
})



export const User = mongoose.model("Users", userSchema);