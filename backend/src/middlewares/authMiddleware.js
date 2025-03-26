// src/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // decoded contains id and email
    next();
  } catch (error) {
    return res.status(401).json({ status: "fail", message: "Invalid token" });
  }
};

export default authMiddleware;
