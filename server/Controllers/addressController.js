import Address from "../Models/addressSchema.js";
import User from "../Models/userSchema.js";

export const createAddress = async (req, res) => {
  const { userID, pincode, address } = req.body;
  try {
    if (!userID || !pincode || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ _id: userID });
    if (!user) {
      return res.status(400).json({ message: "No user Exist" });
    }
    const addedAddress = await Address.create({
      userID,
      pincode,
      address,
    });
    if (!addedAddress) {
      return res.status(400).json({ message: "Failed to add address" });
    }
    return res
      .status(200)
      .json({ message: "Address add successfully", addedAddress });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAddressForUser = async (req, res) => {
  const { userID } = req.query;
  if (!userID) {
    return res.status(400).json({ message: "No User ID Found" });
  }
  const user = await User.findOne({ _id: userID });
  if (!user) {
    return res.status(400).json({ message: "No user Exist" });
  }
  const getAddress = await Address.find({ userID: userID });
  if (getAddress.length == 0) {
    return res.status(400).json({ message: "No Address Found" });
  }
  return res
    .status(200)
    .json({ message: "Address Got Successfully", getAddress });
};
