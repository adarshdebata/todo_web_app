import express from "express";
import { body } from "express-validator";
import * as authController from "../controllers/authController.js";

const router = express.Router();

/**
 * POST /register
 * Register a new user.
 */
router.post(
    "/register",
    [
        body("email").isEmail().withMessage("Provide a valid email"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long"),
    ],
    authController.register
);

/**
 * POST /login
 * Login an existing user.
 */
router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Provide a valid email"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    authController.login
);

export default router;
