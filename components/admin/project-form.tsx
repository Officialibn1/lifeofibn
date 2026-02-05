"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

interface ProjectFormProps {
  project?: any
  onSuccess: () => void
  onCancel: () => void
}

export function ProjectForm({ project, onSuccess, onCancel }: ProjectFormProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const technologies = formData
      .get("technologies")
      ?.toString()
      .split(",")
      .map((t) => t.trim())

    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      technologies: JSON.stringify(technologies),
      impact: formData.get("impact") || null,
      link: formData.get("link") || null,
      featured: formData.get("featured") === "on",
      order: Number.parseInt(formData.get("order")?.toString() || "0"),
    }

    try {
      const url = project ? `/api/admin/projects/${project.id}` : "/api/admin/projects"
      const method = project ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Project ${project ? "updated" : "added"} successfully.`,
        })
        onSuccess()
      } else {
        throw new Error("Failed to save project")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const defaultTechnologies = project ? JSON.parse(project.technologies).join(", ") : ""

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={project?.title} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={project?.description} rows={3} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="technologies">Technologies (comma-separated)</Label>
        <Input
          id="technologies"
          name="technologies"
          defaultValue={defaultTechnologies}
          placeholder="React, Next.js, TypeScript"
          required
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="impact">Impact (optional)</Label>
          <Input id="impact" name="impact" defaultValue={project?.impact || ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="link">Link (optional)</Label>
          <Input id="link" name="link" type="url" defaultValue={project?.link || ""} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="featured" name="featured" defaultChecked={project?.featured} />
          <Label htmlFor="featured" className="font-normal">
            Featured Project
          </Label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="order">Display Order</Label>
          <Input id="order" name="order" type="number" defaultValue={project?.order || 0} className="w-24" required />
        </div>
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : project ? "Update" : "Add"} Project
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
