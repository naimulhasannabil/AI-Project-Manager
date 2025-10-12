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
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  selectedProject: null,
  isLoading: false,

  loadProjects: async () => {
    set({ isLoading: true })
    try {
      const response = await fetch('/api/projects')
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
      const newProject = await response.json()
      set((state) => ({ projects: [...state.projects, newProject] }))
    } catch (error) {
      console.error('Failed to create project:', error)
    }
  },

  updateProject: async (projectId: string, updates: Partial<Project>) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      const updatedProject = await response.json()
      
      set((state) => ({
        projects: state.projects.map((project) =>
          project.id === projectId ? updatedProject : project
        ),
        selectedProject: state.selectedProject?.id === projectId ? updatedProject : state.selectedProject,
      }))
    } catch (error) {
      console.error('Failed to update project:', error)
    }
  },

  deleteProject: async (projectId: string) => {
    try {
      await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      })
      
      set((state) => ({
        projects: state.projects.filter((project) => project.id !== projectId),
        selectedProject: state.selectedProject?.id === projectId ? null : state.selectedProject,
      }))
    } catch (error) {
      console.error('Failed to delete project:', error)
    }
  },

  setSelectedProject: (project: Project | null) => {
    set({ selectedProject: project })
  },
}))