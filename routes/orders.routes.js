import express from "express";

import { getAllOrders, placeOrder } from "../controllers/orders.controllers.js";

const router = express();

router.get("/", getAllOrders);

router.post("/", placeOrder);

export default router;
