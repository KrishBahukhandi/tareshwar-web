"use server";

import { redirect } from "next/navigation";

import { requireStudent } from "@/lib/auth-server";
import { trackServerAnalyticsEvent } from "@/lib/analytics-server";
import { getCourseById } from "@/lib/courses";
import { createRazorpayOrder, getRazorpayPublicConfig, verifyRazorpayPaymentSignature } from "@/lib/payment";
import { createSupabaseAdminClient } from "@/lib/supabaseAdminClient";

type PaymentNotes = {
  course_id: string;
  course_title: string;
  razorpay_order_id: string;
  razorpay_payment_id?: string;
  failure_reason?: string;
};

async function ensureEnrollmentForCourse(input: {
  supabase: any;
  studentId: string;
  courseId: string;
}) {
  const { data: existingEnrollment } = await input.supabase
    .from("enrollments")
    .select("id")
    .eq("student_id", input.studentId)
    .eq("course_id", input.courseId)
    .maybeSingle();

  if (existingEnrollment) {
    return existingEnrollment.id;
  }

  const { data: enrollmentRow, error: enrollmentError } = await input.supabase
    .from("enrollments")
    .insert({
      student_id: input.studentId,
      course_id: input.courseId
    })
    .select("id")
    .maybeSingle();

  if (enrollmentError) {
    throw new Error("Enrollment failed for this course.");
  }

  return enrollmentRow?.id ?? null;
}

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

function requireSupabaseAdminClient() {
  const adminClient = createSupabaseAdminClient();

  if (!adminClient) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY on the web deployment. Add it in Vercel project environment variables."
    );
  }

  return adminClient;
}

export async function proceedToPayment(courseId: string) {
  redirect(`/checkout/${courseId}`);
}

export async function createCheckoutOrder(input: { courseId: string }) {
  const student = await requireStudent();
  const adminSupabase = requireSupabaseAdminClient();
  const course = await getCourseById(input.courseId);

  if (!course) {
    throw new Error("Course not found.");
  }

  if (!course.isActive) {
    throw new Error("This course is not open for enrollment right now.");
  }

  if (course.price <= 0) {
    await ensureEnrollmentForCourse({
      supabase: adminSupabase,
      studentId: student.id,
      courseId: course.id
    });

    const freeTransactionId = `free_${course.id}_${student.id}`;
    const { data: existingPayment } = await adminSupabase
      .from("payments")
      .select("id")
      .eq("student_id", student.id)
      .eq("course_id", course.id)
      .eq("transaction_id", freeTransactionId)
      .maybeSingle();

    if (!existingPayment) {
      const { error: freePaymentError } = await adminSupabase
        .from("payments")
        .insert({
          student_id: student.id,
          course_id: course.id,
          amount: 0,
          payment_status: "completed",
          payment_method: "free",
          transaction_id: freeTransactionId,
          notes: JSON.stringify({
            course_id: course.id,
            course_title: course.title,
            razorpay_order_id: "free_course"
          } satisfies PaymentNotes)
        });

      if (freePaymentError) {
        // Enrollment is the primary action for free courses; payment logging is best-effort.
      }
    }

    await trackServerAnalyticsEvent({
      userId: student.id,
      eventType: "checkout_completed",
      eventData: {
        course_id: course.id,
        checkout_mode: "free"
      }
    });

    return {
      mode: "free" as const,
      courseId: course.id
    };
  }

  const order = await createRazorpayOrder({
    amountInRupees: course.price,
    receipt: `course_${course.id}_${student.id.slice(0, 8)}`,
    notes: {
      course_id: course.id,
      student_id: student.id
    }
  });

  const paymentNotes: PaymentNotes = {
    course_id: course.id,
    course_title: course.title,
    razorpay_order_id: order.id
  };

  const { error: paymentError } = await adminSupabase.from("payments").insert({
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
    mode: "paid" as const,
    keyId,
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    courseId: course.id,
    courseTitle: course.title,
    teacherName: course.teacherName,
    studentName: student.name,
    studentEmail: student.email
  };
}

export async function verifyCheckoutPayment(input: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  const student = await requireStudent();
  const adminSupabase = requireSupabaseAdminClient();

  const isValid = verifyRazorpayPaymentSignature({
    orderId: input.orderId,
    paymentId: input.paymentId,
    signature: input.signature
  });

  if (!isValid) {
    throw new Error("Invalid Razorpay payment signature.");
  }

  const { data: paymentRow, error: paymentLookupError } = await adminSupabase
    .from("payments")
    .select("id, course_id, payment_status, transaction_id, notes")
    .eq("student_id", student.id)
    .eq("transaction_id", input.orderId)
    .maybeSingle();

  if (paymentLookupError || !paymentRow) {
    throw new Error("Payment record not found for verification.");
  }

  const paymentNotes = parsePaymentNotes(paymentRow.notes);

  if (!paymentNotes?.course_id) {
    throw new Error("Payment metadata is incomplete.");
  }

  await ensureEnrollmentForCourse({
    supabase: adminSupabase,
    studentId: student.id,
    courseId: paymentNotes.course_id
  });

  const completedNotes: PaymentNotes = {
    ...paymentNotes,
    razorpay_payment_id: input.paymentId
  };

  const { error: paymentUpdateError } = await adminSupabase
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

  const adminSupabase = createSupabaseAdminClient();

  if (!adminSupabase) {
    return { success: true };
  }

  const { data: paymentRow } = await adminSupabase
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
      course_id: "",
      course_title: "",
      razorpay_order_id: input.orderId
    }),
    failure_reason: input.reason ?? "payment_failed"
  };

  await adminSupabase
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
