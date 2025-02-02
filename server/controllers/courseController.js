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
      success: true,
      message: "Course created",
      course
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
    });
  }
};

export const getCreatorCourses = async ( req, res)=>{
  try{
    const userId = req.id;
    const courses = await Course.find({creator:userId})
    if( !courses ) {
      return res.status(404).json({
        courses:[],
        message: " Courses not found",
        success:false
      })
    }

    return res.status(200).json({
      success:true,
      courses
    })
  }catch(e){
    console.log(e); 
    return res.status(500).json({
      success:false,
      message:"Failed to get all course"
    })
  }
}