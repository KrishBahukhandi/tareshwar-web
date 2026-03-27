"use server";

import { redirect } from "next/navigation";

import { requireStudent } from "@/lib/auth-server";
import { trackServerAnalyticsEvent } from "@/lib/analytics-server";
import { getCourseById } from "@/lib/courses";
import { createRazorpayOrder, getRazorpayPublicConfig, verifyRazorpayPaymentSignature } from "@/lib/payment";
import { createSupabaseAdminClient } from "@/lib/supabaseAdminClient";
import { createSupabaseServerClient } from "@/lib/supabaseServerClient";

type PaymentNotes = {
  batch_id: string;
  batch_name: string;
  course_id: string;
  course_title: string;
  razorpay_order_id: string;
  razorpay_payment_id?: string;
  failure_reason?: string;
};

function parsePaymentNotes(notes: string | null): PaymentNotes | null {
  if (!notes) {
    return null;
  }

  try {
    return JSON.parse(notes) as PaymentNotes;
  } catch {
    return null;
  }
}

export async function proceedToPayment(courseId: string) {
  redirect(`/checkout/${courseId}`);
}

export async function createCheckoutOrder(input: { courseId: string; batchId: string }) {
  const student = await requireStudent();
  const supabase = createSupabaseAdminClient() ?? (await createSupabaseServerClient());
  const course = await getCourseById(input.courseId);

  if (!course) {
    throw new Error("Course not found.");
  }

  const { data: batchRow, error: batchError } = await supabase
    .from("batches")
    .select("id, course_id, batch_name, is_active, start_date")
    .eq("course_id", input.courseId)
    .eq("id", input.batchId)
    .eq("is_active", true)
    .maybeSingle();

  if (batchError || !batchRow) {
    throw new Error("Selected batch is not available for this course.");
  }

  const order = await createRazorpayOrder({
    amountInRupees: course.price,
    receipt: `course_${course.id}_${student.id.slice(0, 8)}`,
    notes: {
      course_id: course.id,
      batch_id: batchRow.id,
      student_id: student.id
    }
  });

  const paymentNotes: PaymentNotes = {
    batch_id: batchRow.id,
    batch_name: batchRow.batch_name,
    course_id: course.id,
    course_title: course.title,
    razorpay_order_id: order.id
  };

  const { error: paymentError } = await supabase.from("payments").insert({
    student_id: student.id,
    course_id: course.id,
    amount: course.price,
    payment_status: "pending",
    payment_method: "razorpay",
    transaction_id: order.id,
    notes: JSON.stringify(paymentNotes)
  });

  if (paymentError) {
    throw new Error("Unable to create a pending payment record.");
  }

  const { keyId } = getRazorpayPublicConfig();

  return {
    keyId,
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    courseId: course.id,
    courseTitle: course.title,
    teacherName: course.teacherName,
    studentName: student.name,
    studentEmail: student.email,
    batchId: batchRow.id,
    batchName: batchRow.batch_name
  };
}

export async function verifyCheckoutPayment(input: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  const student = await requireStudent();
  const supabase = createSupabaseAdminClient() ?? (await createSupabaseServerClient());

  const isValid = verifyRazorpayPaymentSignature({
    orderId: input.orderId,
    paymentId: input.paymentId,
    signature: input.signature
  });

  if (!isValid) {
    throw new Error("Invalid Razorpay payment signature.");
  }

  const { data: paymentRow, error: paymentLookupError } = await supabase
    .from("payments")
    .select("id, course_id, payment_status, transaction_id, notes")
    .eq("student_id", student.id)
    .eq("transaction_id", input.orderId)
    .maybeSingle();

  if (paymentLookupError || !paymentRow) {
    throw new Error("Payment record not found for verification.");
  }

  const paymentNotes = parsePaymentNotes(paymentRow.notes);

  if (!paymentNotes?.batch_id || !paymentNotes.course_id) {
    throw new Error("Payment metadata is incomplete.");
  }

  const { data: existingEnrollment } = await supabase
    .from("enrollments")
    .select("id")
    .eq("student_id", student.id)
    .eq("batch_id", paymentNotes.batch_id)
    .maybeSingle();

  if (!existingEnrollment) {
    const { error: enrollmentError } = await supabase.from("enrollments").insert({
      student_id: student.id,
      batch_id: paymentNotes.batch_id
    });

    if (enrollmentError) {
      throw new Error("Enrollment failed after payment verification.");
    }
  }

  const completedNotes: PaymentNotes = {
    ...paymentNotes,
    razorpay_payment_id: input.paymentId
  };

  const { error: paymentUpdateError } = await supabase
    .from("payments")
    .update({
      payment_status: "completed",
      notes: JSON.stringify(completedNotes)
    })
    .eq("id", paymentRow.id);

  if (paymentUpdateError) {
    throw new Error("Payment verification succeeded, but updating the payment record failed.");
  }

  await trackServerAnalyticsEvent({
    userId: student.id,
    eventType: "checkout_completed",
    eventData: {
      course_id: paymentNotes.course_id,
      batch_id: paymentNotes.batch_id,
      razorpay_order_id: input.orderId,
      razorpay_payment_id: input.paymentId
    }
  });

  return {
    success: true,
    courseId: paymentNotes.course_id
  };
}

export async function markCheckoutFailed(input: { orderId?: string; reason?: string }) {
  const student = await requireStudent();

  if (!input.orderId) {
    return { success: true };
  }

  const supabase = createSupabaseAdminClient() ?? (await createSupabaseServerClient());
  const { data: paymentRow } = await supabase
    .from("payments")
    .select("id, notes, payment_status")
    .eq("student_id", student.id)
    .eq("transaction_id", input.orderId)
    .maybeSingle();

  if (!paymentRow || paymentRow.payment_status === "completed") {
    return { success: true };
  }

  const failedNotes: PaymentNotes = {
    ...(parsePaymentNotes(paymentRow.notes) ?? {
      batch_id: "",
      batch_name: "",
      course_id: "",
      course_title: "",
      razorpay_order_id: input.orderId
    }),
    failure_reason: input.reason ?? "payment_failed"
  };

  await supabase
    .from("payments")
    .update({
      payment_status: "failed",
      notes: JSON.stringify(failedNotes)
    })
    .eq("id", paymentRow.id);

  return {
    success: true
  };
}
