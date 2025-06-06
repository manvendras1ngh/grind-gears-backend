import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    addressType: {
      type: String,
      required: true,
      enum: ["Home", "Office", "Default"],
    },
    fullAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Address = mongoose.model("Address", addressSchema);
