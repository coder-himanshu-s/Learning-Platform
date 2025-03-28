import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  getCourseProgress,
  markAsCompleted,
  markAsInCompleted,
  updatelectureProgress,
} from "../controllers/progressController.js";

const router = express.Router();

router.route("/course-progress/:courseId").get(isAuthenticated, getCourseProgress);
router
  .route("/:courseId/lectures/:lectureId/view")
  .post(isAuthenticated, updatelectureProgress);
router.route("/:courseId/complete").post(isAuthenticated, markAsCompleted);
router.route("/:courseId/incomplete").post(isAuthenticated, markAsInCompleted);

export  default router