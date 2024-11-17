import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "../utils/dbConnection.js";
import dotenv from "dotenv";

dotenv.config(); // Load variables from .env

export const verifyRole = (requiredRole) => {
  return (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (
        decoded.userRole !== requiredRole &&
        requiredRole != "Any" &&
        decoded.userRole != "Dev"
      ) {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient role" });
      }

      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };
};
