'use client'

import { useEffect } from 'react'
import { TaskBoard } from './components/TaskBoard'
import { AIHelper } from './components/AIHelper'
import { useTaskStore } from '@/store/taskStore'
import { useProjectStore } from '@/store/projectStore'

export default function DashboardPage() {
  const { loadTasks } = useTaskStore()
  const { loadProjects } = useProjectStore()

  useEffect(() => {
    loadTasks()
    loadProjects()
  }, [loadTasks, loadProjects])

  return (
    <div className="flex-1 overflow-auto">
      <TaskBoard />
      <AIHelper />
    </div>
  )
}