import crypto from "node:crypto";

const razorpayKeyId = process.env.RAZORPAY_KEY_ID ?? process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

function assertRazorpayConfig() {
  if (!razorpayKeyId || !razorpayKeySecret) {
    throw new Error(
      "Missing Razorpay environment variables. Set RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, and NEXT_PUBLIC_RAZORPAY_KEY_ID."
    );
  }
}

export function getRazorpayPublicConfig() {
  assertRazorpayConfig();

  return {
    keyId: razorpayKeyId!
  };
}

export async function createRazorpayOrder(input: {
  amountInRupees: number;
  receipt: string;
  notes?: Record<string, string>;
}) {
  assertRazorpayConfig();

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString("base64")}`
    },
    body: JSON.stringify({
      amount: Math.round(input.amountInRupees * 100),
      currency: "INR",
      receipt: input.receipt,
      notes: input.notes ?? {}
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Razorpay order creation failed: ${body}`);
  }

  return (await response.json()) as {
    id: string;
    amount: number;
    currency: string;
    receipt: string;
  };
}

export function verifyRazorpayPaymentSignature(input: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  assertRazorpayConfig();

  const expectedSignature = crypto
    .createHmac("sha256", razorpayKeySecret!)
    .update(`${input.orderId}|${input.paymentId}`)
    .digest("hex");

  return expectedSignature === input.signature;
}
