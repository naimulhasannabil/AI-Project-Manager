"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { Task, TaskPriority } from "@prisma/client"
import { Calendar, Clock, AlertCircle, FileText, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"

interface TaskDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: Task
}

const priorityConfig = {
  LOW: { 
    color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300', 
    label: 'Low Priority',
    icon: null 
  },
  MEDIUM: { 
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300', 
    label: 'Medium Priority',
    icon: null 
  },
  HIGH: { 
    color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300', 
    label: 'High Priority',
    icon: AlertCircle 
  },
  URGENT: { 
    color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300', 
    label: 'Urgent Priority',
    icon: AlertCircle 
  },
}

const statusConfig = {
  TODO: { label: '📝 To Do', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },
  IN_PROGRESS: { label: '🔄 In Progress', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
  REVIEW: { label: '👀 Review', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' },
  DONE: { label: '✅ Done', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
}

export function TaskDetailsModal({ open, onOpenChange, task }: TaskDetailsModalProps) {
  const priority = priorityConfig[task.priority as TaskPriority]
  const status = statusConfig[task.status as keyof typeof statusConfig]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3 pb-6 border-b border-gray-200 dark:border-gray-700">
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            {task.title}
          </DialogTitle>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={status.color}>
              {status.label}
            </Badge>
            <Badge className={priority.color}>
              {priority.label}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Description Section */}
          {task.description && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FileText className="w-5 h-5" />
                <h3 className="font-semibold">Description</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pl-7">
                {task.description}
              </p>
            </div>
          )}

          {/* Task Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
            {/* Due Date */}
            {task.dueDate && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-semibold">Due Date</span>
                </div>
                <p className="text-gray-900 dark:text-gray-100 pl-6">
                  {format(new Date(task.dueDate), 'MMMM dd, yyyy')}
                </p>
              </div>
            )}

            {/* Estimated Hours */}
            {task.estimatedHours !== null && task.estimatedHours !== undefined && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-semibold">Estimated Hours</span>
                </div>
                <p className="text-gray-900 dark:text-gray-100 pl-6">
                  {task.estimatedHours} hours
                </p>
              </div>
            )}

            {/* Actual Hours */}
            {task.actualHours !== null && task.actualHours !== undefined && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-semibold">Actual Hours</span>
                </div>
                <p className="text-gray-900 dark:text-gray-100 pl-6">
                  {task.actualHours} hours
                </p>
              </div>
            )}

            {/* Created Date */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-semibold">Created</span>
              </div>
              <p className="text-gray-900 dark:text-gray-100 pl-6">
                {format(new Date(task.createdAt), 'MMMM dd, yyyy')}
              </p>
            </div>

            {/* Last Updated */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-semibold">Last Updated</span>
              </div>
              <p className="text-gray-900 dark:text-gray-100 pl-6">
                {format(new Date(task.updatedAt), 'MMMM dd, yyyy')}
              </p>
            </div>
          </div>

          {/* Task IDs (for debugging/reference) */}
          <div className="space-y-2 p-3 bg-gray-50 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Task ID:</span> {task.id}
            </p>
            {task.projectId && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Project ID:</span> {task.projectId}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
