import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  paintingID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Painting",
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
    default: 1,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  addressID: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Address",
  },
  orderDate: {
    type: String,
    require: true,
    default: function () {
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return `${day.toString().padStart(2, "0")}/${month
        .toString()
        .padStart(2, "0")}/${year}`;
    },
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
