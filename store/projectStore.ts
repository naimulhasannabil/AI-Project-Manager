import { create } from 'zustand'
import { Project } from '@prisma/client'

interface ProjectStore {
  projects: Project[]
  selectedProject: Project | null
  isLoading: boolean
  loadProjects: () => Promise<void>
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateProject: (projectId: string, updates: Partial<Project>) => Promise<void>
  deleteProject: (projectId: string) => Promise<void>
  setSelectedProject: (project: Project | null) => void
  generateAISummary: (projectId: string) => Promise<unknown>
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  selectedProject: null,
  isLoading: false,

  loadProjects: async () => {
    set({ isLoading: true })
    try {
      const response = await fetch('/api/projects')
      if (!response.ok) throw new Error('Failed to fetch projects')
      const projects = await response.json()
      set({ projects, isLoading: false })
    } catch (error) {
      console.error('Failed to load projects:', error)
      set({ isLoading: false })
    }
  },

  createProject: async (projectData) => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      })
      if (!response.ok) throw new Error('Failed to create project')
      const newProject = await response.json()
      set((state) => ({ projects: [...state.projects, newProject] }))
      return newProject
    } catch (error) {
      console.error('Failed to create project:', error)
      throw error
    }
  },

  updateProject: async (projectId: string, updates: Partial<Project>) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error('Failed to update project')
      const updatedProject = await response.json()
      
      set((state) => ({
        projects: state.projects.map((project) =>
          project.id === projectId ? updatedProject : project
        ),
        selectedProject: state.selectedProject?.id === projectId ? updatedProject : state.selectedProject,
      }))
      return updatedProject
    } catch (error) {
      console.error('Failed to update project:', error)
      throw error
    }
  },

  deleteProject: async (projectId: string) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete project')
      
      set((state) => ({
        projects: state.projects.filter((project) => project.id !== projectId),
        selectedProject: state.selectedProject?.id === projectId ? null : state.selectedProject,
      }))
    } catch (error) {
      console.error('Failed to delete project:', error)
      throw error
    }
  },

  setSelectedProject: (project: Project | null) => {
    set({ selectedProject: project })
  },

  generateAISummary: async (projectId: string) => {
    try {
      const response = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      })
      if (!response.ok) throw new Error('Failed to generate summary')
      return await response.json()
    } catch (error) {
      console.error('Failed to generate AI summary:', error)
      throw error
    }
  },
}))