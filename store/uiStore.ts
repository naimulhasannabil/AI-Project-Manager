// store/uiStore.ts
import { create } from 'zustand'

interface UIStore {
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  activeView: 'board' | 'list' | 'calendar'
  setTheme: (theme: 'light' | 'dark') => void
  setSidebarOpen: (open: boolean) => void
  setActiveView: (view: 'board' | 'list' | 'calendar') => void
}

export const useUIStore = create<UIStore>((set) => ({
  theme: 'light',
  sidebarOpen: true,
  activeView: 'board',
  setTheme: (theme) => set({ theme }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveView: (view) => set({ activeView: view }),
}))