import {
  Login,
  Signup,
  getUserById,
  Logout,
} from "../Controllers/userController.js";
import express from "express";
const router = express.Router();

router.post("/Signup", Signup);
router.post("/Login", Login);
router.get("/getUserById", getUserById);
router.get("/Logout", Logout);

export default router;
