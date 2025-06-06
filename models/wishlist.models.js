import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    gears: [
      {
        id: String,
        name: String,
        price: Number,
        rating: Number,
        image: String,
      },
    ],
  },
  { timestamps: true }
);

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);
