"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { ProductForm } from "@/components/admin/product-form"

interface Product {
  id: string
  name: string
  description: string
  features: string
  status: string
  order: number
}

export function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const response = await fetch("/api/admin/products")
    const data = await response.json()
    setProducts(data)
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this product?")) {
      await fetch(`/api/admin/products/${id}`, { method: "DELETE" })
      fetchProducts()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <Button onClick={() => setIsAdding(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>
      {isAdding && (
        <Card className="p-6">
          <ProductForm
            onSuccess={() => {
              setIsAdding(false)
              fetchProducts()
            }}
            onCancel={() => setIsAdding(false)}
          />
        </Card>
      )}
      <div className="space-y-4">
        {products.map((product) => (
          <Card key={product.id} className="p-6">
            {editingId === product.id ? (
              <ProductForm
                product={product}
                onSuccess={() => {
                  setEditingId(null)
                  fetchProducts()
                }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.status}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setEditingId(product.id)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
                <p className="text-sm">{product.description}</p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
