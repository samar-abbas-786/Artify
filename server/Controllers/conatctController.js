import User from "../Models/userSchema.js";
import Contact from "../Models/contactSchema.js";

export const PostQuery = async (req, res) => {
  const { name, email, contact, message } = req.body;
  if (!name || !email || !contact || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }
  //   const isExist = await User.findOne({ email });
  //   if (!isExist) {
  //     return res.status(400).json({ message: "You need to login first" });
  //   }
  const postMessage = await Contact.create({ name, email, contact, message });
  if (!postMessage) {
    return res.status(400).json({ message: "No message is posted" });
  }
  return res.status(200).json({ message: "Message Sent", postMessage });
};
