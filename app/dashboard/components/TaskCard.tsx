'use client'

import { motion } from 'framer-motion'
import { Task, TaskPriority } from '@prisma/client'
import { Calendar, Clock, AlertCircle, MoreVertical, Edit, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UpdateTaskModal } from './UpdateTaskModal'
import { TaskDetailsModal } from './TaskDetailsModal'
import { useTaskStore } from '@/store/taskStore'

interface TaskCardProps {
  task: Task
  onDragStart: (taskId: string) => void
}

const priorityConfig = {
  [TaskPriority.LOW]: { 
    color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300', 
    label: 'Low',
    icon: null 
  },
  [TaskPriority.MEDIUM]: { 
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300', 
    label: 'Medium',
    icon: null 
  },
  [TaskPriority.HIGH]: { 
    color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300', 
    label: 'High',
    icon: null 
  },
  [TaskPriority.URGENT]: { 
    color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300', 
    label: 'Urgent',
    icon: AlertCircle 
  },
}

export function TaskCard({ task, onDragStart }: TaskCardProps) {
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { deleteTask } = useTaskStore()
  const priority = priorityConfig[task.priority]

  const handleDragStart = (e: React.DragEvent) => {
    onDragStart(task.id)
    e.dataTransfer.setData('text/plain', task.id)
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true)
      try {
        await deleteTask(task.id)
      } catch (error) {
        console.error('Failed to delete task:', error)
        alert('Failed to delete task. Please try again.')
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't open details if clicking on the menu button
    if ((e.target as HTMLElement).closest('button')) {
      return
    }
    setShowDetailsModal(true)
  }

  return (
    <>
      <motion.div
        layout
        draggable
        onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent<HTMLDivElement>)}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleCardClick}
        className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200 cursor-pointer active:cursor-grabbing"
      >
        <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {task.title}
              </h3>
              {task.description && (
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3 group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors">
                  {task.description}
                </p>
              )}
            </div>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  aria-label="Open task menu"
                  disabled={isDeleting}
                >
                  <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => setShowUpdateModal(true)}
                  className="cursor-pointer"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit Task</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>{isDeleting ? 'Deleting...' : 'Delete Task'}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-3">
            {task.dueDate && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{format(new Date(task.dueDate), 'MMM dd')}</span>
              </div>
            )}
            
            {task.estimatedHours && (
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{task.estimatedHours}h</span>
              </div>
            )}
          </div>

          <Badge className={priority.color}>
            {priority.label}
          </Badge>
        </div>
      </motion.div>

      {/* Update Modal */}
      <UpdateTaskModal
        open={showUpdateModal}
        onOpenChange={setShowUpdateModal}
        task={task}
      />

      {/* Details Modal */}
      <TaskDetailsModal
        open={showDetailsModal}
        onOpenChange={setShowDetailsModal}
        task={task}
      />
    </>
  )
}