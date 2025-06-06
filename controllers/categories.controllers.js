import { Category } from "../models/categories.models.js";
import { Gear } from "../models/gears.models.js";
import asyncWrapper from "../utils/asyncWrapper.js";

export const getCategories = asyncWrapper(async (req, res) => {
  const categories = await Category.find();

  if (!categories || categories.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No categories found",
    });
  }

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
  });
});

export const getCategoryById = asyncWrapper(async (req, res) => {
  const categoryId = req.params.id;

  if (!categoryId) {
    return res.status(400).json({
      success: false,
      message: "Category ID is required",
    });
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  res.status(200).json({
    success: true,
    data: category,
  });
});

// Alternative: Get products by category slug
export const getProductsByCategorySlug = asyncWrapper(async (req, res) => {
  const slug = req.params.slug;

  if (!slug) {
    return res.status(400).json({
      success: false,
      message: "Category slug is required",
    });
  }

  // Find category by slug
  const category = await Category.findOne({ slug: slug.toLowerCase() });
  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  // Find all gear items with this category
  const gearItems = await Gear.find({ category: category._id }).populate(
    "category"
  );

  res.status(200).json({
    success: true,
    category: category.name,
    count: gearItems.length,
    data: gearItems,
  });
});
