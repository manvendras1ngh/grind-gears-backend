import express from "express";

import asyncWrapper from "../utils/asyncWrapper.js";
import {
  getAllGears,
  getGearById,
  seedGearData,
} from "../controllers/gears.controllers.js";

const router = express();

//seed gears collection
router.post("/", seedGearData);

//Get all gears
router.get("/", getAllGears);

//Get gear by id
router.get("/:id", getGearById);

export default router;
