import { createOrder, getMyOrder } from "../Controllers/orderController.js";
import express from "express";
const router = express.Router();

router.post("/createOrder", createOrder);
router.get("/getMyOrder", getMyOrder);

export default router;
