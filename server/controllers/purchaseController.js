import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
import { Course } from "../models/courseSchema.js";
import { PurchaseCourse } from "../models/purchaseCourseSchema.js";
export const purchaseCourse = async (req, res) => {
  try {
    const {userId} = req.id;
    const {courseId} = req.body;
    const course = await Course.findById(courseId);
    if( !course){
      return res.status(404).json({
        success:false,
        message:"Course not found",
      })
    }
    const newPurchase = new PurchaseCourse({
      courseId,
      userId,
      amount:course.coursePrice,
      status:pending,
    });

    
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const options = req.body;
    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(500).json({
        success: false,
        message: "Failed to create order",
      });
    }
    console.log(order);
    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to purchase course",
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

  res.status(200).json({
    success: true,
    message: "Payment verified successfully",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
};
