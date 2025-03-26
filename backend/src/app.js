import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

import "./utils/logger.js";
import { ENDPOINT_PREFIX } from "./config/config.js";

// Import routes
import heartBeatRoute from "./routes/heartBeatRoute.js"
import todoRoutes from "./routes/todoRoutes.js";
import authRoutes from "./routes/authRoutes.js";


const app = express();

// Define a global rate limiter
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        status: 429,
        error: "Too many requests, please try again later."
    },
});

// Middlewares
app.use(helmet());
app.use(cors());
app.use(globalLimiter);
app.use(mongoSanitize());
app.use(express.json());

// Syntax Error Handler
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        console.logger("error", req.originalUrl, "🚫 Invalid request body");
        return res.status(400).json({
            status: 0,
            message: "Put a valid request body",
        });
    }
    next();
});

// Mount routes
app.use(ENDPOINT_PREFIX, heartBeatRoute);
app.use(ENDPOINT_PREFIX + "/auth", authRoutes);
app.use(ENDPOINT_PREFIX, todoRoutes);

// 404 Handler
app.use((req, res) => {
    console.logger("error", "404 Handler", "Router not found");
    res.status(404).json({
        statusCode: 404,
        error: "The Router Not Found",
        message: "The Router doesn't exist",
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.logger("error", "Global Error Handler", err.stack);
    res.status(500).json({
        statusCode: 500,
        error: "Internal Server Error",
        message: err.message || "Something went wrong",
    });
});

export default app;
