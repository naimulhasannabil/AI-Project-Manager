'use client'

import { useProjectStore } from '@/store/projectStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MoreVertical } from 'lucide-react'
import { format } from 'date-fns'

export function ProjectList() {
  const { projects } = useProjectStore()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card key={project.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">
              {project.name}
            </CardTitle>
            <button className="p-1 hover:bg-gray-100 rounded" title="Project options"
>
              <MoreVertical className="w-4 h-4" />
            </button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {project.description || 'No description'}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-1">
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
                <span className="text-gray-600">
                  {project.tasks?.length || 0} tasks
                </span>
              </div>
              
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: project.color || '#3b82f6' }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}