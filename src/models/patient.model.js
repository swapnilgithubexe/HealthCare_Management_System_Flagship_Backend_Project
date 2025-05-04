import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  age: Number,
  gender: { type: String, enum: ["Male", "Female", "Others"] },
  medicalHistory: [String]
});

export const Patient = mongoose.model("Patient", patientSchema);
