// src/config/db.js
import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {});
        console.logger("info", "MongoDB", "✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.logger("error", "MongoDB", `❌ MongoDB Connection Failed! ${error}`);
        process.exit(1);
    }
};
