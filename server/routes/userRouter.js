import express from "express";
import { getUserProfile, logout, register } from "../controllers/userController.js";
import { login } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile").get(isAuthenticated,getUserProfile);
export default router;