import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/courses", label: "My Courses" },
  { href: "/dashboard/live-classes", label: "Live Classes" }
];

type SidebarProps = {
  studentName: string;
};

export function Sidebar({ studentName }: SidebarProps) {
  return (
    <aside className="rounded-4xl border border-ink/10 bg-white p-6 shadow-glow lg:sticky lg:top-24">
      <div className="rounded-3xl bg-ink px-5 py-5 text-cream">
        <p className="text-sm uppercase tracking-[0.18em] text-cream/60">Student Space</p>
        <p className="mt-3 font-heading text-2xl font-bold">{studentName}</p>
      </div>

      <nav className="mt-6 grid gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-2xl border border-ink/10 px-4 py-3 text-sm font-semibold text-ink transition hover:border-coral/30 hover:bg-coral/5 hover:text-coral"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
