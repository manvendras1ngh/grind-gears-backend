import express from "express";

import {
  getAddress,
  addAddress,
  updateAddress,
  removeAddress,
} from "../controllers/address.controllers.js";

const router = express();

//Get all address
router.get("/", getAddress);

//Add address
router.post("/", addAddress);

//Update add
router.post("/update", updateAddress);

//delete
router.delete("/", removeAddress);

export default router;
