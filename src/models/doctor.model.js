import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  specialization: [{ type: String, required: true }],
  experience: {
    type: Number, required: true
  },
  availableSlots: [String]
});

export const Doctor = mongoose.model("Doctor", doctorSchema);