import { Course } from "../models/courseSchema.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        success: false,
        message: "Course Title and category is required",
      });
    }
    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });

    return res.status(201).json({
            success:true,
            message:"Course created",
    })
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Failed to create course",
    });
  }
};
