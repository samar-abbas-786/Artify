import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

export const database = () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB connected ");
  });
};
