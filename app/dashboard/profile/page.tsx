import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProfileForm } from "@/components/dashboard/ProfileForm";
import { requireStudent } from "@/lib/auth-server";

export const metadata = { title: "Profile & Settings | Tareshwar Tutorials" };

export default async function ProfilePage() {
  const student = await requireStudent();

  return (
    <DashboardLayout
      studentName={student.name}
      studentEmail={student.email}
      title="Profile & Settings"
      description="Update your display name and change your account password."
    >
      <ProfileForm name={student.name} email={student.email} />
    </DashboardLayout>
  );
}
