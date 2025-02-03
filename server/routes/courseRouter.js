import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { createCourse, getCreatorCourses,editCourse } from "../controllers/courseController.js";
import upload from "../utils/multer.js";

const router = express.Router();
router.route("/course").post(isAuthenticated,createCourse);
router.route("/creator-course").get(isAuthenticated,getCreatorCourses);
router.route("/course/:courseId").put(isAuthenticated,upload.single("courseThumbnail"),editCourse);
export default router;