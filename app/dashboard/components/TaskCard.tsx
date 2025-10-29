'use client'

import { motion } from 'framer-motion'
import { Task, TaskPriority } from '@prisma/client'
import { Calendar, Clock, AlertCircle, MoreVertical } from 'lucide-react'
import { format } from 'date-fns'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

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
  const [showMenu, setShowMenu] = useState(false)
  const priority = priorityConfig[task.priority]

  const handleDragStart = (e: React.DragEvent) => {
    onDragStart(task.id)
    e.dataTransfer.setData('text/plain', task.id)
  }

  return (
    <motion.div
      layout
      draggable
      onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent<HTMLDivElement>)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1 line-clamp-2">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
              {task.description}
            </p>
          )}
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            aria-label="Open task menu"
          >
            <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
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
  )
}