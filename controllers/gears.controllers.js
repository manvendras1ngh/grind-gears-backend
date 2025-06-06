import { Gear } from "../models/gears.models.js";
import { Category } from "../models/categories.models.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import { productData } from "../utils/productsData.js";

export const seedGearData = asyncWrapper(async (req, res) => {
  const categoryMap = {
    car: {
      name: "Car Parts",
      description:
        "High-quality replacement parts and accessories for cars including engine components, brakes, filters, and electrical systems.",
    },
    bike: {
      name: "Bike Parts",
      description:
        "Premium motorcycle parts and accessories for enhanced performance, safety, and maintenance of two-wheelers.",
    },
    jet: {
      name: "Jet Engine Parts",
      description:
        "Specialized aerospace components for jet engines including turbine blades, fuel systems, and precision instruments.",
    },
    tractor: {
      name: "Tractor Parts",
      description:
        "Durable agricultural machinery parts for tractors including hydraulic systems, PTO components, and engine parts.",
    },
  };

  const categories = {};
  for (const [key, data] of Object.entries(categoryMap)) {
    let category = await Category.findOne({ slug: key });
    if (!category) {
      category = await Category.create({
        name: data.name,
        slug: key,
        description: data.description,
        imageUrl: `https://placehold.co/300x300?text=${encodeURIComponent(
          data.name
        )}`,
      });
    }
    categories[key] = category._id;
  }

  const transformedData = productData.map((product) => ({
    name: product.name,
    details: product.detail,
    category: categories[product.category],
    rating: product.rating,
    price: product.price,
    imageUrl: product.image,
    brand: product.brand,
    inStock: product.inStock,
  }));

  // await Gear.deleteMany({});

  const result = await Gear.insertMany(transformedData);

  res.status(201).json({
    success: true,
    message: `Successfully seeded ${result.length} gear items`,
    data: result,
  });
});

export const getAllGears = asyncWrapper(async (req, res) => {
  const gears = await Gear.find().populate("category");
  if (!gears) {
    return res.status(404).json({
      success: false,
      message: "Gears not found",
    });
  }
  res.status(200).json({
    success: true,
    totalGears: gears.length,
    data: gears,
  });
});

export const getGearById = asyncWrapper(async (req, res) => {
  const gearId = req.params.id;
  if (!gearId) throw new Error("Gear ID invalid!");

  const gear = await Gear.findById(gearId).populate("category");
  if (!gear) {
    return res.status(404).json({
      success: false,
      message: "Gear not found",
    });
  }

  res.status(200).json({
    success: true,
    data: gear,
  });
});
