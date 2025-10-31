"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useTaskStore } from "@/store/taskStore"
import type { TaskPriority, TaskStatus } from "@prisma/client"
import { Calendar, Clock } from "lucide-react"

interface CreateTaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateTaskModal({ open, onOpenChange }: CreateTaskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "TODO" as TaskStatus,
    priority: "MEDIUM" as TaskPriority,
    estimatedHours: 0,
    dueDate: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { createTask } = useTaskStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    setIsLoading(true)
    setError(null)
    try {
      const payload = {
        title: formData.title,
        description: formData.description || null,
        status: formData.status,
        priority: formData.priority,
        estimatedHours:
          formData.estimatedHours !== undefined && formData.estimatedHours !== null
            ? Number(formData.estimatedHours)
            : null,
        dueDate: formData.dueDate ? new Date(formData.dueDate) : null,
        // projectId will be auto-created if not provided
      }

      await createTask(payload)

      onOpenChange(false)
      setFormData({
        title: "",
        description: "",
        status: "TODO",
        priority: "MEDIUM",
        estimatedHours: 0,
        dueDate: "",
      })
    } catch (error) {
      console.error("Failed to create task:", error)
      setError("Failed to create task. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create New Task
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Task Title *</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="What needs to be done?"
              className="w-full bg-background text-foreground"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add details, instructions, or context..."
              rows={4}
              className="resize-none bg-background text-foreground"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Status</label>
              <Select
                value={formData.status}
                onValueChange={(value: TaskStatus) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODO">📝 To Do</SelectItem>
                  <SelectItem value="IN_PROGRESS">🔄 In Progress</SelectItem>
                  <SelectItem value="REVIEW">👀 Review</SelectItem>
                  <SelectItem value="DONE">✅ Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Priority</label>
              <Select
                value={formData.priority}
                onValueChange={(value: TaskPriority) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOW">💤 Low</SelectItem>
                  <SelectItem value="MEDIUM">🟡 Medium</SelectItem>
                  <SelectItem value="HIGH">🔴 High</SelectItem>
                  <SelectItem value="URGENT">🚨 Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Estimated Hours
              </label>
              <Input
                type="number"
                value={formData.estimatedHours}
                onChange={(e) => setFormData({ ...formData, estimatedHours: Number(e.target.value) })}
                min="0"
                step="0.5"
                placeholder="0"
                className="bg-background text-foreground"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Due Date
              </label>
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="bg-background text-foreground"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formData.title.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white dark:from-blue-700 dark:to-purple-700 dark:hover:from-blue-800 dark:hover:to-purple-800"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Creating...
                </>
              ) : (
                "Create Task"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
