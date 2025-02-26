import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  createCourse,
  getCreatorCourses,
  editCourse,
  getCourseById,
  createLecture,
  getCourseLecture,
  togglePublishCourse,
  editLecture,
  removeLecture,
  getLectureById,
} from "../controllers/courseController.js";
import upload from "../utils/multer.js";
import { get } from "mongoose";

const router = express.Router();
router.route("/course").post(isAuthenticated, createCourse);
router.route("/creator-course").get(isAuthenticated, getCreatorCourses);
router
  .route("/course/:courseId")
  .put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.route("/course/:courseId").get(isAuthenticated, getCourseById);
router.route("/course/:courseId/lecture").post(isAuthenticated, createLecture);
router
  .route("/course/:courseId/lecture")
  .get(isAuthenticated, getCourseLecture);
router
  .route("/course/edit/:courseId/lecture/:lectureId")
  .post(isAuthenticated, editLecture);
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);
router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);
router.route("/course/edit/:courseId").get(isAuthenticated, togglePublishCourse);
export default router;
