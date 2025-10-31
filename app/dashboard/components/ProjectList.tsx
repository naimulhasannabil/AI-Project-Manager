'use client'

import { useProjectStore } from '@/store/projectStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MoreVertical } from 'lucide-react'
import { format } from 'date-fns'

export function ProjectList() {
  const { projects } = useProjectStore()

  function hasTasks(obj: unknown): obj is { tasks: unknown[] } {
    return typeof obj === 'object' && obj !== null && Array.isArray((obj as Record<string, unknown>)['tasks'])
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card key={project.id} className="group hover:shadow-lg transition-all duration-200 border-transparent hover:border-blue-500/50 bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.name}
            </CardTitle>
            <button 
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors" 
              title="Project options"
            >
              <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors">
              {project.description || 'No description'}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700/50 px-3 py-1 rounded-full">
                <Calendar className="w-4 h-4" />
                {project.startDate && (
                  <span>{format(new Date(project.startDate), 'MMM dd')}</span>
                )}
              </div>
              
              <Badge 
                variant={
                  project.status === 'ACTIVE' ? 'default' : 
                  project.status === 'COMPLETED' ? 'secondary' : 'outline'
                }
              >
                {project.status.toLowerCase()}
              </Badge>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-600 dark:text-gray-300">
                  {hasTasks(project) ? project.tasks.length : 0} tasks
                </span>
              </div>

              {/* project color dot - use theme primary color for now to avoid inline styles */}
              <div className="w-3 h-3 rounded-full border border-border bg-primary" aria-hidden />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}