import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    gears: [
      {
        id: String,
        name: String,
        price: Number,
        image: String,
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);
