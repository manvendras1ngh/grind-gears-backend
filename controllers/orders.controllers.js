import { Orders } from "../models/orders.models.js";
import asyncWrapper from "../utils/asyncWrapper.js";

export const getAllOrders = asyncWrapper(async (req, res) => {
  const orders = await Orders.find().populate("shippingAddress");

  if (!orders || !orders.length) {
    return res.status(400).json({ success: false, message: "No orders found" });
  }

  res.status(200).json({
    success: true,
    data: orders,
  });
});

export const placeOrder = asyncWrapper(async (req, res) => {
  const { gears, totalAmount, shippingAddress } = req.body;

  if ((!gears, !totalAmount, !shippingAddress)) {
    res.status(400).json({
      success: false,
      message: "No order found to place",
    });
  }

  const order = new Orders({
    gears: gears,
    totalAmount: totalAmount,
    shippingAddress: shippingAddress,
  });

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order saved",
  });
});
