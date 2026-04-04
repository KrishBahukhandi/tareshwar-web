"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

import { createCheckoutOrder, markCheckoutFailed, verifyCheckoutPayment } from "./actions";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, callback: (response: { error?: unknown }) => void) => void;
    };
  }
}

type PaymentButtonProps = {
  courseId: string;
  isFree: boolean;
  course: {
    teacher: string;
    startDate: string | null;
    description: string | null;
  };
};

function formatCourseDate(date: string | null) {
  if (!date) {
    return "Start date will be announced";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(date));
}

export function PaymentButton({ courseId, isFree, course }: PaymentButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    setError("");
    setIsLoading(true);

    try {
      if (isFree) {
        const supabase = createSupabaseBrowserClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.access_token) {
          throw new Error("Please log in again before enrolling.");
        }

        const response = await fetch("/api/enroll-free", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ courseId }),
        });

        const payload = (await response.json().catch(() => null)) as { error?: string } | null;

        if (!response.ok) {
          throw new Error(payload?.error || "Unable to enroll in this free course.");
        }

        router.push(`/payment-success?course=${encodeURIComponent(courseId)}`);
        router.refresh();
        return;
      }

      const order = await createCheckoutOrder({ courseId });

      if (order.mode === "free") {
        router.push(`/payment-success?course=${encodeURIComponent(order.courseId)}`);
        router.refresh();
        return;
      }

      if (!window.Razorpay) {
        throw new Error("Razorpay checkout failed to load.");
      }

      const razorpay = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Tareshwar Tutorials",
        description: order.courseTitle,
        order_id: order.orderId,
        handler: async (response: Record<string, string>) => {
          try {
            const verificationResult = await verifyCheckoutPayment({
              orderId: order.orderId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature
            });

            router.push(`/payment-success?course=${encodeURIComponent(verificationResult.courseId)}`);
            router.refresh();
          } catch {
            await markCheckoutFailed({
              orderId: order.orderId,
              reason: "verification_failed"
            });
            router.push("/payment-failure");
          }
        },
        prefill: {
          name: order.studentName,
          email: order.studentEmail
        },
        notes: {
          course_id: order.courseId,
          teacher_name: order.teacherName
        },
        theme: {
          color: "#10212B"
        },
        modal: {
          ondismiss: async () => {
            await markCheckoutFailed({
              orderId: order.orderId,
              reason: "checkout_dismissed"
            });
            router.push("/payment-failure");
          }
        }
      });

      razorpay.on("payment.failed", async () => {
        await markCheckoutFailed({
          orderId: order.orderId,
          reason: "payment_failed"
        });
        router.push("/payment-failure");
      });

      razorpay.open();
    } catch (paymentError) {
      setError(paymentError instanceof Error ? paymentError.message : "Unable to start payment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <div className="mb-5 rounded-3xl border border-white/10 bg-white/5 p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-sm text-cream/60">Teacher</p>
            <p className="mt-1 font-semibold text-white">{course.teacher}</p>
          </div>
          <div>
            <p className="text-sm text-cream/60">Course start</p>
            <p className="mt-1 font-semibold text-white">{formatCourseDate(course.startDate)}</p>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-sm text-cream/60">Course notes</p>
          <p className="mt-1 font-semibold text-white">
            {course.description || "No additional course details have been published yet."}
          </p>
        </div>
      </div>
      {error ? (
        <div className="mb-4 rounded-2xl border border-coral/20 bg-coral/10 px-4 py-3 text-sm text-coral">
          {error}
        </div>
      ) : null}
      <button
        type="button"
        onClick={handlePayment}
        disabled={isLoading}
        className="inline-flex w-full justify-center rounded-full bg-coral px-6 py-3 font-semibold text-white transition hover:bg-coral/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? "Processing..." : isFree ? "Enroll Free" : "Enroll Now"}
      </button>
    </>
  );
}
