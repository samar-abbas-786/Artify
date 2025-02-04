import Address from "../Models/addressSchema.js";
import Order from "../Models/orderSchema.js";
import Painting from "../Models/paintingSchema.js";
import User from "../Models/userSchema.js";

export const createOrder = async (req, res) => {
  const { paintingID, quantity, userID, addressID, orderDate } = req.body;

  try {
    if (!paintingID || !userID || !addressID) {
      return res.status(400).json({ message: "All Fields required" });
    }
    const painting = await Painting.findById(paintingID);
    if (!painting) {
      return res.status(400).json({ message: "No Painting Found" });
    }

    const user = await User.findById({ _id: userID });
    if (!user) {
      return res.status(400).json({ message: "No User Found" });
    }
    const address = await Address.findById({ _id: addressID });
    if (!address) {
      return res.status(400).json({ message: "No Address Found" });
    }

    const orderCreated = await Order.create({
      paintingID,
      quantity,
      userID,
      addressID,
      orderDate,
    });
    res
      .status(200)
      .json({ message: "Order Placed Successfully", orderCreated });
  } catch (error) {
    console.log("Error occured in create order", error);
  }
};

export const getMyOrder = async (req, res) => {
  const { userID } = req.query;
  if (!userID) {
    return res.status(400).json({ message: "No User ID Found" });
  }
  const myOrder = await Order.find({ userID: userID });
  if (!myOrder) {
    return res.status(400).json({ message: "No Order Found" });
  }

  const allPaintings = await Promise.all(
    myOrder.map(async (item) => {
      const painting = await Painting.findOne({ _id: item.paintingID });
      if (!painting) return null;

      return {
        ...painting.toObject(),
        orderDate: item.orderDate,
        quantity: item.quantity,
      };
    })
  );

  const flattenedPaintings = allPaintings.flat();
  return res
    .status(200)
    .json({ message: "Order Found Successfully", flattenedPaintings });
};
