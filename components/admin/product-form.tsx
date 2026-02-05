"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface ProductFormProps {
  product?: any
  onSuccess: () => void
  onCancel: () => void
}

export function ProductForm({ product, onSuccess, onCancel }: ProductFormProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const features = formData
      .get("features")
      ?.toString()
      .split("\n")
      .filter((f) => f.trim())

    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
      features: JSON.stringify(features),
      status: formData.get("status"),
      link: formData.get("link") || null,
      order: Number.parseInt(formData.get("order")?.toString() || "0"),
    }

    try {
      const url = product ? `/api/admin/products/${product.id}` : "/api/admin/products"
      const method = product ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Product ${product ? "updated" : "added"} successfully.`,
        })
        onSuccess()
      } else {
        throw new Error("Failed to save product")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const defaultFeatures = product ? JSON.parse(product.features).join("\n") : ""

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={product?.name} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={product?.description} rows={3} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="features">Features (one per line)</Label>
        <Textarea id="features" name="features" defaultValue={defaultFeatures} rows={4} required />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Input id="status" name="status" defaultValue={product?.status} placeholder="e.g., In Development" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="link">Link (optional)</Label>
          <Input id="link" name="link" type="url" defaultValue={product?.link || ""} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="order">Display Order</Label>
        <Input id="order" name="order" type="number" defaultValue={product?.order || 0} required />
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : product ? "Update" : "Add"} Product
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
