export interface User {
  id: string
  clerkId: string
  email: string
  name: string | null
  avatar: string | null
  createdAt: Date
}

export interface Project {
  id: string
  name: string
  description: string | null
  color: string | null
  startDate: Date | null
  endDate: Date | null
  status: 'ACTIVE' | 'COMPLETED' | 'ARCHIVED'
  userId: string
  teamId: string | null
  createdAt: Date
  updatedAt: Date
  tasks?: Task[]
}

export interface Task {
  id: string
  title: string
  description: string | null
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  dueDate: Date | null
  estimatedHours: number | null
  actualHours: number | null
  position: number
  userId: string
  projectId: string
  assigneeId: string | null
  createdAt: Date
  updatedAt: Date
  subtasks?: Subtask[]
  assignee?: User
  project?: Project
}

export interface Subtask {
  id: string
  title: string
  completed: boolean
  position: number
  taskId: string
  createdAt: Date
  updatedAt: Date
}

export interface AISuggestion {
  id: string
  type: string
  content: string
  data: unknown
  applied: boolean
  taskId: string
  createdAt: Date
}

export interface AIInsight {
  id: string
  type: string
  content: string
  data: unknown
  projectId: string
  createdAt: Date
}

export type CreateTaskInput = {
  title: string
  description?: string | null
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  estimatedHours?: number | null
  dueDate?: Date | null
  projectId: string
  userId: string
  assigneeId?: string | null
}