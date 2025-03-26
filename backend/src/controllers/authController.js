import { validationResult } from "express-validator";
import * as authService from "../services/authService.js";

/**
 * Register a new user.
 */
export const register = async (req, res, next) => {
    try {
        // Validate request using express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "fail", errors: errors.array() });
        }
        const user = await authService.registerUser(req.body);
        return res.status(201).json({ status: "success", data: { user } });
    } catch (error) {
        next(error);
    }
};

/**
 * Login a user.
 */
export const login = async (req, res, next) => {
    try {
        // Validate request using express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "fail", errors: errors.array() });
        }
        const { email, password } = req.body;
        const { token } = await authService.loginUser(email, password);
        return res.status(200).json({ status: "success", data: { token } });
    } catch (error) {
        next(error);
    }
};
