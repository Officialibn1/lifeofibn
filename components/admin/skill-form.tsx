"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface SkillFormProps {
  skill?: any
  onSuccess: () => void
  onCancel: () => void
}

export function SkillForm({ skill, onSuccess, onCancel }: SkillFormProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      category: formData.get("category"),
      icon: formData.get("icon") || null,
      order: Number.parseInt(formData.get("order")?.toString() || "0"),
    }

    try {
      const url = skill ? `/api/admin/skills/${skill.id}` : "/api/admin/skills"
      const method = skill ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Skill ${skill ? "updated" : "added"} successfully.`,
        })
        onSuccess()
      } else {
        throw new Error("Failed to save skill")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save skill. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" defaultValue={skill?.name} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input id="category" name="category" defaultValue={skill?.category} placeholder="e.g., Frontend" required />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="icon">Icon (optional)</Label>
          <Input id="icon" name="icon" defaultValue={skill?.icon || ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="order">Display Order</Label>
          <Input id="order" name="order" type="number" defaultValue={skill?.order || 0} required />
        </div>
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : skill ? "Update" : "Add"} Skill
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
