import asyncWrapper from "../utils/asyncWrapper.js";
import { Address } from "../models/address.models.js";

//get all address
export const getAddress = asyncWrapper(async (req, res) => {
  const address = await Address.find();

  if (!address) {
    return res.status(400).json({
      success: false,
      message: "No Address Found",
    });
  }
  res.status(200).json({
    success: true,
    data: address,
  });
});

//add new address
export const addAddress = asyncWrapper(async (req, res) => {
  const { type, address } = req.body;

  const validTypes = ["Home", "Office", "Default"];

  if (!type || !address) {
    return res.status(400).json({
      success: false,
      message: "Please provide address and address type",
    });
  }

  if (!validTypes.includes(type)) {
    return res.status(400).json({
      success: false,
      message: `Invalid address type. Must be one of: ${validTypes.join(", ")}`,
    });
  }

  const newAddress = new Address({
    addressType: type,
    fullAddress: address,
  });
  await newAddress.save();

  res.status(200).json({
    success: true,
    message: "Address added successfully",
    data: newAddress,
  });
});

//update address
export const updateAddress = asyncWrapper(async (req, res) => {
  const { id, type, address } = req.body;

  if (!id || !type || !address) {
    return res.status(400).json({
      success: false,
      message: "Please provide id, address and type to update",
    });
  }

  const addressToUpdate = await Address.findByIdAndUpdate(
    id,
    {
      addressType: type,
      fullAddress: address,
    },
    { new: true }
  );

  if (!addressToUpdate) {
    return res.status(400).json({
      success: false,
      message: "Address not present",
    });
  }

  res.status(200).json({
    success: true,
    data: addressToUpdate,
  });
});

//delete address
export const removeAddress = asyncWrapper(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please provide address Id!",
    });
  }

  const deleteAddress = await Address.findByIdAndDelete(id);

  if (!deleteAddress) {
    return res.status(400).json({
      success: false,
      message: "Address not found",
    });
  }

  res.status(200).json({
    success: true,
    data: deleteAddress,
  });
});
