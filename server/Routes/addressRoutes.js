import {
  createAddress,
  getAddressForUser,
} from "../Controllers/addressController.js";

import express from "express";
const router = express.Router();

router.get("/getAddressForUser", getAddressForUser);
router.post("/createAddress", createAddress);

export default router;
