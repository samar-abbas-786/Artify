import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    maxLength: 20,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    maxLength: [20, "Password can have atmost 20 characters"],
    minLength: [8, "password must have atleat 8 characters"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error("Error occurred in hashing password:", error);
    next(error);
  }
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
