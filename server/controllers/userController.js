import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashPassword,
    });

    return res.status(200).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (e) {
    console.error("Register Error:", e);
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not registered",
      });
    }

    const isPassMatch = await bcryptjs.compare(password, user.password);
    if (!isPassMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    generateToken(res, user, `Welcome back ${user.name}`);
  } catch (e) {
    console.error("Login Error:", e);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
