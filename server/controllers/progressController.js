import { CourseProgress } from "../models/courseProgress.js";
import { Course } from "../models/courseSchema.js";
export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    let courseProgress = await CourseProgress.findOne({
      userId: userId,
      courseId: courseId,
    }).populate("courseId");

    const courseDetails = await Course.findById(courseId).populate("lectures");
    if (!courseDetails) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (!courseProgress) {
      return res.status(200).json({
        data: {
          courseDetails,
          completed: false,
          progress: [],
        },
      });
    }

    return res.status(200).json({
      data: {
        courseDetails,
        completed: courseProgress.completed,
        progress: courseProgress.lectureProgress,
      },
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatelectureProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;
    let courseProgress = await CourseProgress.findOne({
      userId: userId,
      courseId: courseId,
    });

    if (!courseProgress) {
      courseProgress = new CourseProgress({
        userId,
        courseId,
        completed: false,
        lectureProgress: [],
      });
    }

    const lectureIndex = courseProgress.lectureProgress.findIndex(
      (lecture) => lecture.lectureId === lectureId
    );
    if (lectureIndex !== -1) {
      courseProgress.lectureProgress[lectureIndex].viewed = true;
    } else {
      courseProgress.lectureProgress.push({
        lectureId,
        viewed: true,
      });
    }
    

    const lectureProgressLength = courseProgress.lectureProgress.filter(
      (lectureProg) => lectureProg.viewed
    ).length;
    const course = await Course.findById(courseId);
    if (course.lectures.length === lectureProgressLength) {
      courseProgress.completed = true;
    }
    await courseProgress.save();
    return res.status(200).json({
      message: "Lecture progress updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const markAsCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;
    const courseProgress = await CourseProgress.findOne({
      userId,
      courseId,
    });
    if (!courseProgress) {
      return res.status(404).json({ message: "Course progress not found" });
    }
    courseProgress.lectureProgress.map(
      (lectureProgress) => (lectureProgress.viewed = true)
    );
    courseProgress.completed = true;
    await courseProgress.save();
    return res
      .status(200)
      .json({ message: "Course marked as completed", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const markAsInCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;
    const courseProgress = await CourseProgress.findOne({
      userId,
      courseId,
    });
    if (!courseProgress) {
      return res.status(404).json({ message: "Course progress not found" });
    }
    courseProgress.lectureProgress.map(
      (lectureProgress) => (lectureProgress.viewed = false)
    );
    courseProgress.completed = false;
    await courseProgress.save();
    return res
      .status(200)
      .json({ message: "Course marked as incompleted", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
