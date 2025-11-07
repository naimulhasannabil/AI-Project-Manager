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
        actualHours: null,
        position: 0,
        userId: "", // This should be set to the current user's ID
        projectId: "", // This should be set to the current project's ID
        assigneeId: null,
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
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3 pb-6 border-b border-gray-200 dark:border-gray-700">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create New Task
          </DialogTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Add a new task to your project and track its progress
          </p>
        </DialogHeader>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 rounded-lg text-sm flex items-start gap-2">
            <span className="text-lg">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          {/* Task Title */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900 dark:text-gray-300 flex items-center gap-1">
              Task Title
              <span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="E.g., Design new landing page"
              className="h-11 text-base"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900 dark:text-gray-300">
              Description
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add details, instructions, or context..."
              rows={4}
              className="resize-none text-base"
            />
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Optional: Provide more context about this task
            </p>
          </div>

          {/* Status and Priority Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900 dark:text-gray-300">
                Status
              </label>
              <Select
                value={formData.status}
                onValueChange={(value: TaskStatus) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger className="h-11">
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
              <label className="text-sm font-semibold text-gray-900 dark:text-gray-300">
                Priority
              </label>
              <Select
                value={formData.priority}
                onValueChange={(value: TaskPriority) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger className="h-11">
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

          {/* Time and Date Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-blue-50 dark:bg-gray-800/50 rounded-lg border border-blue-200 dark:border-gray-700">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900 dark:text-gray-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Estimated Hours
              </label>
              <Input
                type="number"
                value={formData.estimatedHours}
                onChange={(e) => setFormData({ ...formData, estimatedHours: Number(e.target.value) })}
                min="0"
                step="0.5"
                placeholder="0"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900 dark:text-gray-300 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                Due Date
              </label>
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="h-11"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)} 
              disabled={isLoading}
              className="min-w-[100px] h-11"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formData.title.trim()}
              className="min-w-[120px] h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <span>✨</span>
                  <span className="ml-2">Create Task</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
