import React from "react";
import { Button } from "./button";
import { useParams } from "react-router";

const BuyCourseButton = ({ setPurchasedCourse }) => {
  const { courseId } = useParams();
  const amount = 500;
  const currency = "INR";
  const receipt = "qwawl";

  const handlePayment = async (e) => {
    e.preventDefault();
    console.log("Processing payment...");
  
    try {
      const response = await fetch(
        `http://localhost:8080/course-detail/${courseId}/purchase`,
        {
          method: "POST",
          body: JSON.stringify({}),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
  
      const order = await response.json();
      console.log("Order created:", order);
  
      if (!order.success || !order.order.id) {
        alert("Failed to create order. Try again.");
        return;
      }
  
      const options = {
        key: "rzp_test_82tcRjiekBQz8k",
        amount: order.order.amount,
        currency: order.order.currency,
        name: "Sharma",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.order.id,
        handler: async function (response) {
          console.log("Payment response:", response);
  
          const body = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };
  
          const validateRes = await fetch(
            `http://localhost:8080/course-detail/${courseId}/validate`,
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            }
          );
  
          const jsonRes = await validateRes.json();
          console.log("Validation Response:", jsonRes);
  
          if (jsonRes.success) {
            alert("Payment verified successfully!");
            setPurchasedCourse(true); 
          } else {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: "Himanshu Sharma",
          email: "hs@gmail.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        console.error("Payment failed:", response);
        alert(`Payment Failed: ${response.error.description}`);
      });
  
      rzp1.open();
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Something went wrong. Try again.");
    }
  };
  

  return <Button onClick={handlePayment}>Purchase Course</Button>;
};

export default BuyCourseButton;
