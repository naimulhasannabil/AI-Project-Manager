'use client'

import { motion } from 'framer-motion'
import { Task, TaskPriority } from '@prisma/client'
import { Calendar, Clock, AlertCircle, MoreVertical } from 'lucide-react'
import { format } from 'date-fns'
import { useState } from 'react'

interface TaskCardProps {
  task: Task
  onDragStart: (taskId: string) => void
}

const priorityConfig = {
  [TaskPriority.LOW]: { color: 'bg-gray-100 text-gray-700', icon: null },
  [TaskPriority.MEDIUM]: { color: 'bg-blue-100 text-blue-700', icon: null },
  [TaskPriority.HIGH]: { color: 'bg-orange-100 text-orange-700', icon: null },
  [TaskPriority.URGENT]: { color: 'bg-red-100 text-red-700', icon: AlertCircle },
}

export function TaskCard({ task, onDragStart }: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const priority = priorityConfig[task.priority]

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    onDragStart(task.id)
    e.dataTransfer.setData('text/plain', task.id)
  }

  return (
    <motion.div
      layout
      draggable
      onDragStart={handleDragStart}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1 line-clamp-2">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-xs text-gray-600 line-clamp-2 mb-2">
              {task.description}
            </p>
          )}
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-100 rounded"
            aria-label="Task options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
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

        <div className={`px-2 py-1 rounded-full text-xs font-medium ${priority.color}`}>
          {task.priority.toLowerCase()}
        </div>
      </div>
    </motion.div>
  )
}