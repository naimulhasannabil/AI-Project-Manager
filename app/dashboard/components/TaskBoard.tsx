'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TaskCard } from './TaskCard'
import { useTaskStore } from '@/store/taskStore'
import { TaskStatus } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { CreateTaskModal } from './CreateTaskModal'

const columns = [
  { id: 'TODO', title: 'To Do', color: 'bg-gray-200 dark:bg-gray-700' },
  { id: 'IN_PROGRESS', title: 'In Progress', color: 'bg-blue-200 dark:bg-blue-700' },
  { id: 'REVIEW', title: 'Review', color: 'bg-yellow-200 dark:bg-yellow-700' },
  { id: 'DONE', title: 'Done', color: 'bg-green-200 dark:bg-green-700' },
] as const

export function TaskBoard() {
  const { tasks, loadTasks, updateTaskStatus } = useTaskStore()
  const [draggedTask, setDraggedTask] = useState<string | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = async (status: TaskStatus) => {
    if (!draggedTask) return

    try {
      await updateTaskStatus(draggedTask, status)
      setDraggedTask(null)
    } catch (error) {
      console.error('Failed to update task status:', error)
    }
  }

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status)
      .sort((a, b) => a.position - b.position)
  }

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Project Board</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {tasks.length} tasks
              </span>
            </div>
          </div>
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => (
            <div
              key={column.id}
              className="flex flex-col space-y-4 min-w-[300px]"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id as TaskStatus)}
            >
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${column.color}`} />
                <h2 className="font-semibold text-lg text-gray-900 dark:text-white">{column.title}</h2>
                <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-sm">
                  {getTasksByStatus(column.id as TaskStatus).length}
                </span>
              </div>

              <motion.div
                layout
                className="min-h-[500px] space-y-4 p-4 rounded-lg border-2 border-dashed border-border bg-background/50 backdrop-blur-sm transition-colors duration-200"
              >
                {getTasksByStatus(column.id as TaskStatus).map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDragStart={handleDragStart}
                  />
                ))}
                
                {getTasksByStatus(column.id as TaskStatus).length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p>No tasks yet</p>
                    <p className="text-sm">Drag tasks here or create new ones</p>
                  </div>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <CreateTaskModal 
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </>
  )
}