import express from "express";
const app = express();
import { configDotenv } from "dotenv";
const PORT = process.env.PORT || 9000;
import { database } from "./Database/database.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import paintingRouter from "./Routes/paintingRoute.js";
import cartRouter from "./Routes/cartRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import userRouter from "./Routes/userRoutes.js";
import addressRouter from "./Routes/addressRoutes.js";
configDotenv();
database();
app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/painting", paintingRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/user", userRouter);
app.use("/address", addressRouter);

app.get("/", (req, res) => {
  res.status(200).send("Hello World!! This is Artify ❤️");
});

app.listen(PORT, () => {
  console.log(`App is connected to http://localhost:${PORT}`);
});
