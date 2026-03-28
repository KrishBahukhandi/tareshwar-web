import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { requireStudent } from "@/lib/auth-server";
import { createSupabaseServerClient } from "@/lib/supabaseServerClient";

export const metadata = { title: "Billing | Tareshwar Tutorials" };

const statusStyles: Record<string, string> = {
  completed: "bg-teal/10 text-teal",
  pending:   "bg-amber-500/10 text-amber-600",
  failed:    "bg-coral/10 text-coral",
};

const statusLabel: Record<string, string> = {
  completed: "Paid",
  pending:   "Pending",
  failed:    "Failed",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { dateStyle: "medium" });
}

function formatAmount(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export default async function BillingPage() {
  const student = await requireStudent();
  const supabase = await createSupabaseServerClient();

  const { data: payments } = await supabase
    .from("payments")
    .select("id, amount, payment_status, transaction_id, created_at, course:courses(title)")
    .eq("student_id", student.id)
    .order("created_at", { ascending: false });

  const firstRelation = <T,>(v: T | T[] | null | undefined): T | null =>
    Array.isArray(v) ? (v[0] ?? null) : (v ?? null);

  const totalPaid = (payments ?? [])
    .filter((p) => p.payment_status === "completed")
    .reduce((sum, p) => sum + Number(p.amount ?? 0), 0);

  return (
    <DashboardLayout
      studentName={student.name}
      studentEmail={student.email}
      title="Billing"
      description="View your payment history and transaction details for all course purchases."
    >
      <div className="mt-8 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-glow">
            <p className="text-xs font-medium uppercase tracking-widest text-slate">Total Spent</p>
            <p className="mt-2 font-heading text-2xl font-bold text-ink">
              {formatAmount(totalPaid)}
            </p>
          </div>
          <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-glow">
            <p className="text-xs font-medium uppercase tracking-widest text-slate">Transactions</p>
            <p className="mt-2 font-heading text-2xl font-bold text-ink">
              {(payments ?? []).length}
            </p>
          </div>
          <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-glow">
            <p className="text-xs font-medium uppercase tracking-widest text-slate">Courses Paid</p>
            <p className="mt-2 font-heading text-2xl font-bold text-ink">
              {(payments ?? []).filter((p) => p.payment_status === "completed").length}
            </p>
          </div>
        </div>

        {/* Transaction table */}
        <div className="rounded-4xl border border-ink/10 bg-white shadow-glow">
          <div className="border-b border-ink/8 px-8 py-5">
            <h2 className="font-heading text-xl font-semibold text-ink">Transaction History</h2>
          </div>

          {(payments ?? []).length ? (
            <div className="divide-y divide-ink/8">
              {payments!.map((payment) => {
                const course = firstRelation(payment.course);
                const status = payment.payment_status ?? "pending";

                return (
                  <div
                    key={payment.id}
                    className="flex flex-wrap items-start justify-between gap-4 px-8 py-5"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-ink">
                        {course?.title ?? "Course Purchase"}
                      </p>
                      <p className="mt-0.5 text-xs text-slate">
                        {formatDate(payment.created_at)}
                        {payment.transaction_id ? (
                          <> · <span className="font-mono">{payment.transaction_id}</span></>
                        ) : null}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          statusStyles[status] ?? "bg-ink/8 text-slate"
                        }`}
                      >
                        {statusLabel[status] ?? status}
                      </span>
                      <span className="font-heading text-base font-bold text-ink">
                        {formatAmount(Number(payment.amount ?? 0))}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 px-8 py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-3xl bg-ink/5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-slate" aria-hidden="true">
                  <rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
                </svg>
              </span>
              <p className="font-semibold text-ink">No transactions yet</p>
              <p className="text-sm text-slate">Your payment history will appear here after you enrol in a course.</p>
              <a
                href="/courses"
                className="mt-2 inline-flex rounded-full bg-coral px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-coral/90"
              >
                Browse Courses
              </a>
            </div>
          )}
        </div>

        {/* Support note */}
        <p className="text-center text-sm text-slate">
          Need help with a payment?{" "}
          <a href="/contact" className="font-semibold text-teal">
            Contact support
          </a>
        </p>
      </div>
    </DashboardLayout>
  );
}
