"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { ProjectForm } from "@/components/admin/project-form"

interface Project {
  id: string
  title: string
  description: string
  technologies: string
  impact: string | null
  link: string | null
  featured: boolean
  order: number
}

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    const response = await fetch("/api/admin/projects")
    const data = await response.json()
    setProjects(data)
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this project?")) {
      await fetch(`/api/admin/projects/${id}`, { method: "DELETE" })
      fetchProjects()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Projects</h2>
        <Button onClick={() => setIsAdding(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </div>
      {isAdding && (
        <Card className="p-6">
          <ProjectForm
            onSuccess={() => {
              setIsAdding(false)
              fetchProjects()
            }}
            onCancel={() => setIsAdding(false)}
          />
        </Card>
      )}
      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="p-6">
            {editingId === project.id ? (
              <ProjectForm
                project={project}
                onSuccess={() => {
                  setEditingId(null)
                  fetchProjects()
                }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{project.title}</h3>
                    {project.featured && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Featured</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setEditingId(project.id)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(project.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                {project.impact && <p className="text-sm font-medium">Impact: {project.impact}</p>}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
