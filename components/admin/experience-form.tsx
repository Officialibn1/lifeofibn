"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface ExperienceFormProps {
  experience?: any
  onSuccess: () => void
  onCancel: () => void
}

export function ExperienceForm({ experience, onSuccess, onCancel }: ExperienceFormProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const achievements = formData
      .get("achievements")
      ?.toString()
      .split("\n")
      .filter((a) => a.trim())

    const data = {
      company: formData.get("company"),
      role: formData.get("role"),
      type: formData.get("type"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      description: formData.get("description"),
      achievements: JSON.stringify(achievements),
      order: Number.parseInt(formData.get("order")?.toString() || "0"),
    }

    try {
      const url = experience ? `/api/admin/experience/${experience.id}` : "/api/admin/experience"
      const method = experience ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Experience ${experience ? "updated" : "added"} successfully.`,
        })
        onSuccess()
      } else {
        throw new Error("Failed to save experience")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save experience. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const defaultAchievements = experience ? JSON.parse(experience.achievements).join("\n") : ""

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" name="company" defaultValue={experience?.company} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input id="role" name="role" defaultValue={experience?.role} required />
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Input id="type" name="type" defaultValue={experience?.type} placeholder="e.g., Hybrid" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input id="startDate" name="startDate" defaultValue={experience?.startDate} placeholder="2024" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input id="endDate" name="endDate" defaultValue={experience?.endDate} placeholder="Present" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={experience?.description} rows={3} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="achievements">Achievements (one per line)</Label>
        <Textarea id="achievements" name="achievements" defaultValue={defaultAchievements} rows={4} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="order">Display Order</Label>
        <Input id="order" name="order" type="number" defaultValue={experience?.order || 0} required />
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : experience ? "Update" : "Add"} Experience
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
