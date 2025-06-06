import { Gear } from "../models/gears.models.js";
import { Cart } from "../models/cart.models.js";
import asyncWrapper from "../utils/asyncWrapper.js";

//Get cart
export const getCart = asyncWrapper(async (req, res) => {
  let cart = await Cart.findOne();

  if (!cart) {
    cart = await Cart.create({ gears: [] });
  }

  res.status(200).json({
    success: true,
    data: cart.gears,
  });
});

//Add gear to cart
export const addToCart = asyncWrapper(async (req, res) => {
  const { gearId, quantity = 1 } = req.body;

  const gear = await Gear.findById(gearId);
  if (!gear) {
    return res.status(404).json({
      success: false,
      message: "Gear not found",
    });
  }

  if (!gear.inStock) {
    return res.status(400).json({
      success: false,
      message: "Gear is out of stock",
    });
  }

  let cart = await Cart.findOne();

  if (!cart) {
    cart = new Cart({ gears: [] });
  }

  const existingItemIndex = cart.gears.findIndex((item) => item.id === gearId);

  if (existingItemIndex > -1) {
    cart.gears[existingItemIndex].quantity += quantity;
  } else {
    cart.gears.push({
      id: gear._id,
      name: gear.name,
      price: gear.price,
      image: gear.imageUrl,
      quantity: quantity,
    });
  }

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Gear added to cart successfully",
    data: cart,
  });
});

//Remove from cart
export const removeFromCart = asyncWrapper(async (req, res) => {
  const { gearId } = req.body;

  const cart = await Cart.findOne();

  if (!cart || cart.gears.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Cart is empty",
    });
  }

  // Filter out the gear to remove
  const originalLength = cart.gears.length;
  cart.gears = cart.gears.filter((item) => item.id !== gearId);

  if (cart.gears.length === originalLength) {
    return res.status(404).json({
      success: false,
      message: "Gear not found in cart",
    });
  }

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Gear removed from cart successfully",
    data: cart,
  });
});

//clear cart
export const clearCart = asyncWrapper(async (req, res) => {
  const cart = await Cart.findOne();

  if (!cart || cart.gears.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Cart is already empty",
    });
  }

  // Clear all gears from cart
  cart.gears = [];
  await cart.save();

  res.status(200).json({
    success: true,
    message: "Cart cleared successfully",
  });
});

//update cart quantity
export const updateCartItemQuantity = asyncWrapper(async (req, res) => {
  const { gearId, quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({
      success: false,
      message: "Quantity must be at least 1",
    });
  }

  const cart = await Cart.findOne();

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "Cart not found",
    });
  }

  const itemIndex = cart.gears.findIndex((item) => item.id === gearId);

  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Gear not found in cart",
    });
  }

  cart.gears[itemIndex].quantity = quantity;

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Cart item quantity updated successfully",
    data: cart,
  });
});
