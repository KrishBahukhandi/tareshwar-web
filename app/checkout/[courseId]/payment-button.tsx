"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  batches: {
    id: string;
    name: string;
    startDate: string | null;
    teacher: string;
    description: string | null;
  }[];
};

function formatBatchDate(date: string | null) {
  if (!date) {
    return "Start date will be announced";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(date));
}

export function PaymentButton({ courseId, batches }: PaymentButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedBatchId, setSelectedBatchId] = useState(batches[0]?.id ?? "");
  const selectedBatch = batches.find((batch) => batch.id === selectedBatchId) ?? null;

  const handlePayment = async () => {
    if (!selectedBatchId) {
      setError("Please select a batch before continuing.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const order = await createCheckoutOrder({
        courseId,
        batchId: selectedBatchId
      });

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
          teacher_name: order.teacherName,
          batch_name: order.batchName
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
      <div className="mb-5">
        <label htmlFor="batch" className="mb-2 block text-sm font-medium text-cream/75">
          Select batch
        </label>
        <select
          id="batch"
          value={selectedBatchId}
          onChange={(event) => setSelectedBatchId(event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white outline-none transition focus:border-coral"
        >
          {batches.map((batch) => (
            <option key={batch.id} value={batch.id} className="bg-ink text-white">
              {batch.name} • {formatBatchDate(batch.startDate)}
            </option>
          ))}
        </select>
      </div>
      {selectedBatch ? (
        <div className="mb-5 rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-sm text-cream/60">Teacher</p>
              <p className="mt-1 font-semibold text-white">{selectedBatch.teacher}</p>
            </div>
            <div>
              <p className="text-sm text-cream/60">Batch start</p>
              <p className="mt-1 font-semibold text-white">{formatBatchDate(selectedBatch.startDate)}</p>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-sm text-cream/60">Batch notes</p>
            <p className="mt-1 font-semibold text-white">
              {selectedBatch.description || "No additional batch description has been published yet."}
            </p>
          </div>
        </div>
      ) : null}
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
        {isLoading ? "Opening Razorpay..." : "Buy Course"}
      </button>
    </>
  );
}
