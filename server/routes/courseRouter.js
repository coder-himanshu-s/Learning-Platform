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
  getPublishedCourse,
  searchCourse,
} from "../controllers/courseController.js";
import upload from "../utils/multer.js";
import {
  getAllPurchasedCourse,
  getCourseWithDetails,
  purchaseCourse,
  verifyPayment,
} from "../controllers/purchaseController.js";

const router = express.Router();
router.route("/course").post(isAuthenticated, createCourse);
router.route("/search").get(isAuthenticated, searchCourse);
router.route("/published-courses").get(getPublishedCourse);
router.route("/creator-course").get(isAuthenticated, getCreatorCourses);
router
  .route("/course/allPurchased")
  .get(isAuthenticated, getAllPurchasedCourse);
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
router
  .route("/course/edit/:courseId")
  .get(isAuthenticated, togglePublishCourse);
router
  .route("/course-detail/:courseId/purchase")
  .post(isAuthenticated, purchaseCourse);
router
  .route("/course-detail/:courseId/validate")
  .post(isAuthenticated, verifyPayment);
router
  .route("/course/:courseId/detail-complete")
  .get(isAuthenticated, getCourseWithDetails)
export default router;
