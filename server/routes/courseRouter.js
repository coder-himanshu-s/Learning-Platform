import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { createCourse, getCreatorCourses } from "../controllers/courseController.js";


const router = express.Router();
router.route("/course").post(isAuthenticated,createCourse);
router.route("/creator-course").get(isAuthenticated,getCreatorCourses);
export default router;