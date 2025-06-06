import express from "express";

import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} from "../controllers/cart.controllers.js";

const router = express();

router.get("/", getCart);
router.post("/add", addToCart);
router.post("/update", updateCartItemQuantity);
router.delete("/remove", removeFromCart);
router.delete("/clear", clearCart);

export default router;
