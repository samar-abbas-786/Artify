import Painting from "../Models/paintingSchema.js";
import Cart from "../Models/cartSchema.js";

export const uploadPainting = async (req, res) => {
  const { name, price, mode, userID } = req.body;
  const image = req.file.filename;
  //   console.log(req.file);

  try {
    if (!name || !image || !price || !mode || !userID) {
      return res.status(400).json({ message: "Please uploads all the field" });
    }
    const newPainting = await Painting.create({ name, image, price, mode });
    if (!newPainting) {
      return res.status(400).json({ message: "No Painting uploaded" });
    }
    res
      .status(200)
      .json({ message: "Suucessfully uploaded painting", newPainting });
  } catch (error) {
    console.log("Error occured on uploading painting", error);
  }
};

export const getAllPainting = async (req, res) => {
  try {
    const allPainting = await Painting.find();
    if (!allPainting) {
      return res.status(400).json({ message: "No Painting Found" });
    }
    // console.log(req.cookies?.token);

    res
      .status(200)
      .json({ message: "Successfully found all painting", allPainting });
  } catch (error) {
    return res.status(400).json({ message: "Error Find All Paintings" });
  }
};

export const getSpecificModePainting = async (req, res) => {
  try {
    const { mode } = req.query;
    const allmodePainting = await Painting.find({ mode });
    if (!allmodePainting) {
      return res.status(400).json({ message: "No Painting Found" });
    }
    res
      .status(200)
      .json({ message: "Successfully found all painting", allmodePainting });
  } catch (error) {
    return res.status(400).json({ message: "Error Find All Paintings" });
  }
};

export const addToCart = async (req, res) => {
  const { paintingID, userID } = req.query;

  if (!paintingID || !userID) {
    return res.status(400).json({ message: "No Painting ID or User ID found" });
  }
  const painting = await Painting.find({ _id: paintingID });

  if (painting.length == 0) {
    return res.status(400).json({ message: "Painting is not available ❌" });
  }
  const existing = await Cart.find({ paintingID: paintingID, userID: userID });
  //   console.log(existing);

  if (existing.length != 0) {
    return res.status(400).json({ message: "Already in Cart" });
  }

  const addedPaintingID = await Cart.create({ paintingID, userID });
  return res
    .status(200)
    .json({ message: "Successfully added to cart", addedPaintingID });
};

export const getAddtocart = async (req, res) => {
  try {
    const { userID } = req.query;
    if (!userID) {
      return res.status(400).json({ message: "User ID Not Found ❌" });
    }
    const added = await Cart.find({ userID: userID });
    // console.log(added);
    if (!added) {
      return res.status(400).json({ message: "No Painting Added to Cart" });
    }

    const allPaintings = await Promise.all(
      added.map(async (item) => {
        const painting = await Painting.find({
          _id: item.paintingID,
        });
        return painting;
      })
    );

    const flattenedPaintings = allPaintings.flat();

    // console.log(flattenedPaintings);

    return res
      .status(200)
      .json({ message: "Added to Cart Painting are", flattenedPaintings });
  } catch (error) {
    console.log("error occured on getAddtocart", error);
  }
};

export const RemovefromCart = async (req, res) => {
  const { paintingID, userID } = req.query;
  if (!paintingID || !userID) {
    return res.status(400).json({ message: "No IDs Found" });
  }

  const isThere = await Cart.findOne({
    paintingID: paintingID,
    userID: userID,
  });
  if (!isThere) {
    return res.status(400).json({ message: "No Item Found in Cart" });
  }

  // Remove the item from the cart
  const removed = await Cart.findOneAndDelete({
    paintingID: paintingID,
    userID: userID,
  });

  // Log and respond
  // console.log(removed);
  res.status(200).json({ message: "Removed from Cart Successfully", removed });
};

export const getNewArrival = async (req, res) => {
  try {
    const painting = await Painting.find().sort({ createdAt: -1 }).limit(4);
    if (!painting) {
      return res
        .status(400)
        .json({ message: "No Painting found in New Arrival" });
    }
    return res
      .status(200)
      .json({ message: "Successfully found New Arrival", painting });
  } catch (error) {
    return;
  }
};
