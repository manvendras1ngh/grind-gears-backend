import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema(
  {
    gears: [
      {
        gearId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Gear",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Orders = mongoose.model("Orders", ordersSchema);
