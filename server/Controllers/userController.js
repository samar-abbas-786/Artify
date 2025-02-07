import User from "../Models/userSchema.js";
import jwt from "jsonwebtoken";

export const Signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exist" });
    }
    const newUser = await User.create({ username, email, password, role });
    if (!newUser) {
      return res.status(400).json({ message: "User not created" });
    }
    const token = jwt.sign(
      { userID: newUser._id, email: newUser.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );
    // console.log("token", token);
    res.cookie("token", token, { httpOnly: true });


    res.status(201).json({ message: "Suucessfully Sign up", newUser });
  } catch (error) {
    console.log("Error occured in sinnup", error);
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const existing = await User.findOne({ email });
    if (!existing || !(await existing.comparePassword(password))) {
      return res.status(400).json({ message: "Wrong email or password" });
    }
    const token = jwt.sign(
      { userID: existing._id, email: existing.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );

    res.cookie("token", token, { httpOnly: true });

    // console.log(req.cookie.token);

    return res.status(200).json({ message: "Suucessfully Login", existing });
    // console.log(req.headers["Authorization"]);
  } catch (error) {
    console.log("Erro occured in sinnup", error);
  }
};

export const getUserById = async (req, res) => {
  const { _id } = req.query;
  if (!_id) {
    return res.status(401).json({ message: "No User ID Found" });
  }
  const user = await User.findById(_id);
  if (!user) {
    return res.status(400).json({ message: "No User  Found" });
  }

  res.status(200).json({ message: "User got successfully", user });
};

export const Logout = async (req, res) => {
  res.clearCookie("token").json({ message: "Logout Successfully" });
};
