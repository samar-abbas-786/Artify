import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  contact: {
    type: Number,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
