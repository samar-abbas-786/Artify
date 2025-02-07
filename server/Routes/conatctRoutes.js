import { PostQuery } from "../Controllers/conatctController.js";
import express from "express";

const router = express.Router();

router.post("/PostQuery", PostQuery);

export default router;
