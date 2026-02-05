"use client"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { ExperienceManager } from "@/components/admin/experience-manager"
import { ProjectsManager } from "@/components/admin/projects-manager"
import { SkillsManager } from "@/components/admin/skills-manager"
import { ProductsManager } from "@/components/admin/products-manager"
import { MessagesManager } from "@/components/admin/messages-manager"

interface AdminDashboardProps {
  admin: {
    id: string
    email: string
    name: string
  }
}

export function AdminDashboard({ admin }: AdminDashboardProps) {
  const router = useRouter()

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {admin.name}</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="experience" className="space-y-6">
          <TabsList>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          <TabsContent value="experience">
            <ExperienceManager />
          </TabsContent>
          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>
          <TabsContent value="skills">
            <SkillsManager />
          </TabsContent>
          <TabsContent value="products">
            <ProductsManager />
          </TabsContent>
          <TabsContent value="messages">
            <MessagesManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
