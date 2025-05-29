import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const isUserAvailable = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json(new ApiError(401, "User not authenticated."));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decodedToken.id).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found."));
    }

    req.user = user; // Attach user object to request
    next(); // Continue to next middleware or controller
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    return res.status(401).json(new ApiError(401, "Invalid or expired token."));
  }
};

export { isUserAvailable };
