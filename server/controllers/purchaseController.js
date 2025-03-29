import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
import { Course } from "../models/courseSchema.js";
import { PurchaseCourse } from "../models/purchaseCourseSchema.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/userSchema.js";
export const purchaseCourse = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: course.coursePrice * 100, // Convert to paisa
      currency: "INR",
      receipt: `receipt${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(500).json({
        success: false,
        message: "Failed to create order",
      });
    }
    // Create an entry in PurchaseCourse with `pending` status
    const newPurchase = await PurchaseCourse.create({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
      paymentId: order.id,
      // Store Razorpay order ID
    });
    res.json({
      success: true,
      order,
      purchaseId: newPurchase._id, // Send purchase entry ID for tracking
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in payemnt purchaseCourse",
      error: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  console.log("Received request body for validation:", req.body);

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: "Missing required parameters",
    });
  }

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");

  if (digest !== razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: "Payment verification failed",
    });
  }

  try {
    // Find the purchase entry using `razorpay_order_id`
    const purchase = await PurchaseCourse.findOne({
      paymentId: razorpay_order_id,
    }).populate("courseId");

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase record not found",
      });
    }

    // Update the purchase status to `completed`
    purchase.status = "completed";
    purchase.paymentId = razorpay_payment_id; // Store the payment ID
    await purchase.save();

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });

    if (purchase.courseId && purchase.courseId.lectures.length > 0) {
      await Lecture.updateMany(
        { _id: { $in: purchase.courseId.lectures } },
        { $set: { isPreviewFree: true } }
      );
    }
    await purchase.save();

    await User.findByIdAndUpdate(
      purchase.userId,
      { $addToSet: { enrolledCourses: purchase.courseId._id } },
      { new: true }
    );

    await Course.findByIdAndUpdate(
      purchase.courseId._id,
      { $addToSet: { enrolledStudents: purchase.userId } },
      { new: true }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update purchase status",
      error: error.message,
    });
  }
};

export const getCourseWithDetails = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.params;
    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    const purchase = await PurchaseCourse.findOne({
      courseId: courseId,
      userId: userId,
    });
    // if (!purchase) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Purchase not found",
    //   });
    // }
    return res.status(200).json({
      success: true,
      course,
      purchased: !!purchase,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get course with details",
      error: error.message,
    });
  }
};

export const getAllPurchasedCourse = async (req, res) => {
  try {
    const userId = req.id;
    const purchasedCourses = await PurchaseCourse.find({
      status: "completed",
    }).populate("courseId");
    if (!purchasedCourses || purchasedCourses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No purchased courses found",
        purchaseCourse: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: "Purchased courses found",
      purchaseCourse: purchasedCourses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get all purchased courses",
      error: error.message,
    });
  }
};
