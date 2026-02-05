"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { ExperienceForm } from "@/components/admin/experience-form"

interface Experience {
  id: string
  company: string
  role: string
  type: string
  startDate: string
  endDate: string
  description: string
  achievements: string
  order: number
}

export function ExperienceManager() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetchExperiences()
  }, [])

  async function fetchExperiences() {
    const response = await fetch("/api/admin/experience")
    const data = await response.json()
    setExperiences(data)
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this experience?")) {
      await fetch(`/api/admin/experience/${id}`, { method: "DELETE" })
      fetchExperiences()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Experience</h2>
        <Button onClick={() => setIsAdding(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>
      </div>
      {isAdding && (
        <Card className="p-6">
          <ExperienceForm
            onSuccess={() => {
              setIsAdding(false)
              fetchExperiences()
            }}
            onCancel={() => setIsAdding(false)}
          />
        </Card>
      )}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <Card key={exp.id} className="p-6">
            {editingId === exp.id ? (
              <ExperienceForm
                experience={exp}
                onSuccess={() => {
                  setEditingId(null)
                  fetchExperiences()
                }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <p className="text-muted-foreground">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">
                      {exp.startDate} - {exp.endDate} • {exp.type}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setEditingId(exp.id)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(exp.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
                <p className="text-sm">{exp.description}</p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
