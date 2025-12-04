import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useCreateOrderMutation, useVerifyPaymentMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const [createOrder, { data: orderData, isLoading: orderLoading, isSuccess: orderSuccess, isError: orderError, error }] = useCreateOrderMutation();
  const [verifyPayment, { isLoading: verifyLoading }] = useVerifyPaymentMutation();

  const purchaseCourseHandler = async () => {
    await createOrder(courseId);
  };

  const handlePaymentResponse = async (response) => {
    try {
      const verifyData = {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      };

      const result = await verifyPayment(verifyData).unwrap();

      if (result.success) {
        toast.success("Payment verified successfully!");
        // Redirect to course progress page
        window.location.href = `/course-progress/${courseId}`;
      }
    } catch (err) {
      toast.error(err?.data?.message || "Payment verification failed");
    }
  };

  const handlePaymentError = (error) => {
    toast.error(error.description || "Payment failed. Please try again.");
  };

  useEffect(() => {
    if (orderSuccess && orderData?.order) {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "LMS Platform",
        description: "Course Purchase",
        order_id: orderData.order.id,
        handler: handlePaymentResponse,
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", handlePaymentError);
      rzp.open();
    }

    if (orderError) {
      toast.error(error?.data?.message || "Failed to create order");
    }
  }, [orderSuccess, orderData, orderError, error, courseId]);

  return (
    <Button
      disabled={orderLoading || verifyLoading}
      onClick={purchaseCourseHandler}
      className="w-full"
    >
      {orderLoading || verifyLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default BuyCourseButton;
