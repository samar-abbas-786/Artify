import express from "express";
const router = express.Router();
import { CheckToken } from "../Middlewares/CheckToken.js";

import {
  addToCart,
  getAddtocart,
  RemovefromCart,
} from "../Controllers/paintingController.js";

router.post("/addToCart", addToCart);
router.get("/getAddtocart", getAddtocart);
router.get("/RemovefromCart", RemovefromCart);

export default router;
