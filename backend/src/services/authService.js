import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

/**
 * Register a new user.
 */
export const registerUser = async (userData) => {
    // Create and save new user
    const user = new User(userData);
    await user.save();
    return user;
};

/**
 * Authenticate a user and return a JWT.
 */
export const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    // Generate a JWT; payload contains user id and email
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    return { user, token };
};
