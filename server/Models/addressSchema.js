import mongoose from "mongoose";

const adresSchema = new mongoose.Schema({
  address: {
    type: String,
    require: true,
    minLength: [8, "Address must have atleast 8 character"],
    maxLength: [80, "Address can have atmost 50 character"],
  },
  pincode: {
    type: Number,
    required: true,
    min: [100000, "Pincode must be exactly 6 digits"],
    max: [999999, "Pincode must be exactly 6 digits"],
  },
  userID: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: true,
  },
});

const Address = mongoose.model("Address", adresSchema);
export default Address;
