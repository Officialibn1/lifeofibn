import { LoginForm } from "@/components/admin/login-form"
import { verifySession } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const admin = await verifySession()

  if (admin) {
    redirect("/admin/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-muted/30">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
          <p className="text-muted-foreground">Sign in to manage your portfolio</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
