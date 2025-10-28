'use client'

import { useEffect } from 'react'
import { ProjectList } from '../components/ProjectList'
import { useProjectStore } from '@/store/projectStore'

export default function ProjectsPage() {
  const { loadProjects } = useProjectStore()

  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
      </div>
      <ProjectList />
    </div>
  )
}