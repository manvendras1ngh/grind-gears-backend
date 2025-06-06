import express from "express";

import {
  getCategories,
  getCategoryById,
  getProductsByCategorySlug,
} from "../controllers/categories.controllers.js";

const router = express();

// Get all categories
router.get("/", getCategories);

// Get category by ID
router.get("/:id", getCategoryById);

// Get all gears in a category by category slug
router.get("/slug/:slug", getProductsByCategorySlug);

export default router;
