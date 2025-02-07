import mongoose from "mongoose";

const paintingSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  mode: {
    type: String,
    enum: ["portrait", "landscape"],
    require: true,
  },
  userID: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Painting = mongoose.model("Painting", paintingSchema);
export default Painting;
