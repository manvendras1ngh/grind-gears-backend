import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { instantiateConnection } from "./db/db.connect.js";

import gearRoutes from "./routes/gears.routes.js";
import categoryRoutes from "./routes/categories.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import addressRoutes from "./routes/address.routes.js";
import orderRoutes from "./routes/orders.routes.js";

dotenv.config({ path: "./.env" });
const app = express();
const PORT = process.env.PORT || 3000;

try {
  await instantiateConnection();
} catch (error) {
  throw error;
}

app.use(express.json({ limit: "16kb" })); //to receive response as json files
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// using defined routes
app.use("/api/v1/gears", gearRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/orders", orderRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is hot and ready to serve!" });
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res
    .status(statusCode)
    .json({ message: "Internal server error!", error: error.message });
});

app.listen(PORT, () => {
  console.log("Server is hot");
});
