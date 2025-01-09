import express from "express";
import {
  getUserProfile,
  logout,
  register,
  updateProfile,
} from "../controllers/userController.js";
import { login } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import upload from "../utils/multer.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile").get(isAuthenticated, getUserProfile);
router.route("/profile/update").put(isAuthenticated, upload.single("profilePhoto"),updateProfile);
export default router;
