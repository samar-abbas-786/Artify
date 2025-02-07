import {
  getAllPainting,
  getSpecificModePainting,
  uploadPainting,
  getNewArrival,
} from "../Controllers/paintingController.js";

import express from "express";
const router = express.Router();
import upload from "../utils/multer.js";
import { CheckToken } from "../Middlewares/CheckToken.js";

router.post("/uploadPainting", upload.single("image"), uploadPainting);
router.get("/getAllPainting", CheckToken, getAllPainting);
router.get("/getSpecificModePainting", getSpecificModePainting);
router.get("/getNewArrival", getNewArrival);

export default router;
