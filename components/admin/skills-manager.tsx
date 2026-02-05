"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import { SkillForm } from "@/components/admin/skill-form"

interface Skill {
  id: string
  name: string
  category: string
  icon: string | null
  order: number
}

export function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetchSkills()
  }, [])

  async function fetchSkills() {
    const response = await fetch("/api/admin/skills")
    const data = await response.json()
    setSkills(data)
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this skill?")) {
      await fetch(`/api/admin/skills/${id}`, { method: "DELETE" })
      fetchSkills()
    }
  }

  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Skills</h2>
        <Button onClick={() => setIsAdding(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Skill
        </Button>
      </div>
      {isAdding && (
        <Card className="p-6">
          <SkillForm
            onSuccess={() => {
              setIsAdding(false)
              fetchSkills()
            }}
            onCancel={() => setIsAdding(false)}
          />
        </Card>
      )}
      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <Card key={category} className="p-6">
            <h3 className="text-lg font-bold mb-4">{category}</h3>
            <div className="space-y-3">
              {categorySkills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between">
                  {editingId === skill.id ? (
                    <SkillForm
                      skill={skill}
                      onSuccess={() => {
                        setEditingId(null)
                        fetchSkills()
                      }}
                      onCancel={() => setEditingId(null)}
                    />
                  ) : (
                    <>
                      <Badge variant="secondary">{skill.name}</Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => setEditingId(skill.id)}>
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(skill.id)}>
                          Delete
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
