import { Gear } from "../models/gears.models.js";
import { Wishlist } from "../models/wishlist.models.js";
import asyncWrapper from "../utils/asyncWrapper.js";

//Get wishlist
export const getWishlist = asyncWrapper(async (req, res) => {
  let wishlist = await Wishlist.findOne();

  if (!wishlist) {
    wishlist = await Wishlist.create({ gears: [] });
  }

  res.status(200).json({
    success: true,
    data: wishlist.gears,
  });
});

//Add gear to wishlist
export const addToWishlist = asyncWrapper(async (req, res) => {
  const { gearId } = req.body;

  const gear = await Gear.findById(gearId);
  if (!gear) {
    return res.status(404).json({
      success: false,
      message: "Gear not found",
    });
  }

  let wishlist = await Wishlist.findOne();

  if (!wishlist) {
    wishlist = new Wishlist({ gears: [] });
  }

  const existingItemIndex = wishlist.gears.findIndex(
    (item) => item.id === gearId
  );

  if (existingItemIndex > -1) {
    return res.status(404).json({
      success: false,
      message: "Gear already present",
    });
  } else {
    wishlist.gears.push({
      id: gear._id,
      name: gear.name,
      price: gear.price,
      rating: gear.rating,
      image: gear.imageUrl,
    });
  }

  await wishlist.save();

  res.status(200).json({
    success: true,
    message: "Gear added to wishlist successfully",
    data: wishlist,
  });
});

//Remove from wishlist
export const removeFromWishlist = asyncWrapper(async (req, res) => {
  const { gearId } = req.body;

  // Find the single cart
  const wishlist = await Wishlist.findOne();

  if (!wishlist || wishlist.gears.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Wishlist is empty",
    });
  }

  // Filter out the gear to remove
  const originalLength = wishlist.gears.length;
  wishlist.gears = wishlist.gears.filter((item) => item.id !== gearId);

  if (wishlist.gears.length === originalLength) {
    return res.status(404).json({
      success: false,
      message: "Gear not found in wishlist",
    });
  }

  await wishlist.save();

  res.status(200).json({
    success: true,
    message: "Gear removed from wishlist successfully",
    data: wishlist,
  });
});
