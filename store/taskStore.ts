import { create } from 'zustand'
import { Task, TaskStatus } from '@prisma/client'

interface TaskStore {
  tasks: Task[]
  selectedTask: Task | null
  isLoading: boolean
  loadTasks: () => Promise<void>
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateTaskStatus: (taskId: string, status: TaskStatus) => Promise<void>
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>
  deleteTask: (taskId: string) => Promise<void>
  setSelectedTask: (task: Task | null) => void
  generateAITasks: (prompt: string, projectId: string) => Promise<unknown>
  getAISuggestions: (taskId: string) => Promise<unknown>
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  selectedTask: null,
  isLoading: false,

  loadTasks: async () => {
    set({ isLoading: true })
    try {
      const response = await fetch('/api/tasks')
      if (!response.ok) throw new Error('Failed to fetch tasks')
      const tasks = await response.json()
      set({ tasks, isLoading: false })
    } catch (error) {
      console.error('Failed to load tasks:', error)
      set({ isLoading: false })
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      })
      if (!response.ok) throw new Error('Failed to create task')
      const newTask = await response.json()
      set((state) => ({ tasks: [...state.tasks, newTask] }))
      return newTask
    } catch (error) {
      console.error('Failed to create task:', error)
      throw error
    }
  },

  updateTaskStatus: async (taskId: string, status: TaskStatus) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) throw new Error('Failed to update task')
      const updatedTask = await response.json()
      
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId ? updatedTask : task
        ),
      }))
      return updatedTask
    } catch (error) {
      console.error('Failed to update task status:', error)
      throw error
    }
  },

  updateTask: async (taskId: string, updates: Partial<Task>) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error('Failed to update task')
      const updatedTask = await response.json()
      
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId ? updatedTask : task
        ),
        selectedTask: state.selectedTask?.id === taskId ? updatedTask : state.selectedTask,
      }))
      return updatedTask
    } catch (error) {
      console.error('Failed to update task:', error)
      throw error
    }
  },

  deleteTask: async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete task')
      
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
        selectedTask: state.selectedTask?.id === taskId ? null : state.selectedTask,
      }))
    } catch (error) {
      console.error('Failed to delete task:', error)
      throw error
    }
  },

  setSelectedTask: (task: Task | null) => {
    set({ selectedTask: task })
  },

  generateAITasks: async (prompt: string, projectId: string) => {
    try {
      const response = await fetch('/api/ai/generate-tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, projectId }),
      })
      if (!response.ok) throw new Error('Failed to generate tasks')
      return await response.json()
    } catch (error) {
      console.error('Failed to generate AI tasks:', error)
      throw error
    }
  },

  getAISuggestions: async (taskId: string) => {
    try {
      const response = await fetch('/api/ai/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId }),
      })
      if (!response.ok) throw new Error('Failed to get suggestions')
      return await response.json()
    } catch (error) {
      console.error('Failed to get AI suggestions:', error)
      throw error
    }
  },
}))