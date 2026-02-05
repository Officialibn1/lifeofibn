import { verifySession } from "@/lib/session"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function DashboardPage() {
  const admin = await verifySession()

  if (!admin) {
    redirect("/admin/login")
  }

  return <AdminDashboard admin={admin} />
}
