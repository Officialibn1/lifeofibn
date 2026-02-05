"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  fullName: string
  email: string
  officialEmail?: string
  phoneNumber: string
  projectType: string
  projectBudget?: string
  projectTimeline?: string
  message: string
  read: boolean
  createdAt: string
}

export function MessagesManager() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    fetchMessages()
  }, [])

  async function fetchMessages() {
    const response = await fetch("/api/admin/messages")
    const data = await response.json()
    setMessages(data)
  }

  async function markAsRead(id: string) {
    await fetch(`/api/admin/messages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: true }),
    })
    fetchMessages()
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this message?")) {
      await fetch(`/api/admin/messages/${id}`, { method: "DELETE" })
      fetchMessages()
    }
  }

  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Contact Messages</h2>
        {unreadCount > 0 && <Badge>{unreadCount} unread</Badge>}
      </div>
      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message.id} className={`p-6 ${!message.read ? "border-primary" : ""}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-lg">{message.fullName}</h3>
                  {!message.read && <Badge variant="default">New</Badge>}
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground mb-3">
                  <div>
                    <span className="font-semibold">Email:</span> {message.email}
                  </div>
                  <div>
                    <span className="font-semibold">Phone:</span> {message.phoneNumber}
                  </div>
                  {message.officialEmail && (
                    <div>
                      <span className="font-semibold">Official Email:</span> {message.officialEmail}
                    </div>
                  )}
                  <div>
                    <span className="font-semibold">Project Type:</span> {message.projectType}
                  </div>
                  {message.projectBudget && (
                    <div>
                      <span className="font-semibold">Budget:</span> {message.projectBudget}
                    </div>
                  )}
                  {message.projectTimeline && (
                    <div>
                      <span className="font-semibold">Timeline:</span> {message.projectTimeline}
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{new Date(message.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                {!message.read && (
                  <Button variant="outline" size="sm" onClick={() => markAsRead(message.id)}>
                    Mark as Read
                  </Button>
                )}
                <Button variant="destructive" size="sm" onClick={() => handleDelete(message.id)}>
                  Delete
                </Button>
              </div>
            </div>
            <div className="mt-4 p-4 bg-muted rounded">
              <p className="text-sm whitespace-pre-wrap">{message.message}</p>
            </div>
          </Card>
        ))}
        {messages.length === 0 && <p className="text-center text-muted-foreground py-8">No messages yet.</p>}
      </div>
    </div>
  )
}
