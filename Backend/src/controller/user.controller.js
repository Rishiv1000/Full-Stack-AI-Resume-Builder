import mongoose from "mongoose";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const start = async (req, res) => {
  const { email } = req.query; // Pass ?email=abc@example.com in frontend

  if (!email) {
    return res.status(400).json(new ApiError(400, "Email is required."));
  }

  try {
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found."));
    }

    return res.status(200).json(new ApiResponse(200, user, "User found."));
  } catch (err) {
    return res.status(500).json(new ApiError(500, "Server error.", [], err.stack));
  }
};


const registerUser = async (req, res) => {
  console.log("Registration Started");
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    console.log("Registration Failed: Missing required fields");
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          "Please provide all required fields: fullName, email, and password."
        )
      );
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("Registration Failed: User already exists");
      return res.status(409).json(new ApiError(409, "User already registered."));
    }

    const newUser = await User.create({
      fullName,
      email,
      password,
    });

    console.log("Registration Successful");
    return res.status(201).json(
      new ApiResponse(
        201,
        {
          user: {
            id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
          },
        },
        "User successfully registered."
      )
    );
  } catch (err) {
    console.error("Error during registration:", err);
    return res.status(500).json(new ApiError(500, "Internal Server Error", [], err.stack));
  }
};

const loginUser = async (req, res) => {
  console.log("Login Started");
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Login Failed: Missing required fields");
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          "Please provide all required fields: email and password."
        )
      );
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("Login Failed: User not found");
      return res.status(404).json(new ApiError(404, "User not found."));
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      console.log("Login Failed: Invalid credentials");
      return res.status(406).json(new ApiError(406, "Invalid credentials."));
    }

    console.log("Login Successful");
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
          },
        },
        "User logged in successfully."
      )
    );
  } catch (err) {
    console.error("Login Failed: Server error", err);
    return res.status(500).json(new ApiError(500, "Internal Server Error", [], err.stack));
  }
};

const logoutUser = (req, res) => {
  console.log("Logged out");
  return res.status(200).json(new ApiResponse(200, null, "User logged out successfully."));
};

export { start, loginUser, logoutUser, registerUser };
