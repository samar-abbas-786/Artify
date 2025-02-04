import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  paintingID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Painting",
    require: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
