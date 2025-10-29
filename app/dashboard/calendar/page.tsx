'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar as CalendarIcon, Plus, Clock, Users } from 'lucide-react'
import { useState } from 'react'

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Mock calendar events
  const events = [
    {
      id: 1,
      title: 'Team Standup',
      time: '09:00 - 09:30',
      type: 'meeting',
      project: 'Website Redesign'
    },
    {
      id: 2,
      title: 'Design Review',
      time: '14:00 - 15:00',
      type: 'review',
      project: 'Mobile App'
    },
    {
      id: 3,
      title: 'Project Planning',
      time: '16:00 - 17:00',
      type: 'planning',
      project: 'Q4 Campaign'
    }
  ]

  const getEventColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'review': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'planning': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Calendar</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View and manage your project schedule
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="w-4 h-4 mr-2" />
          New Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Schedule
              </CardTitle>
              <CardDescription>
                Upcoming events and deadlines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg border ${getEventColor(event.type)}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm opacity-75">{event.project}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{event.time}</p>
                        <p className="text-xs opacity-75">Today</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Placeholder for full calendar component */}
              <div className="mt-6 p-8 text-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Calendar View
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Full calendar integration coming soon
                </p>
                <Button variant="outline">
                  Explore Calendar Features
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { task: 'Homepage Design', due: 'Tomorrow', project: 'Website Redesign' },
                  { task: 'API Integration', due: 'In 2 days', project: 'Mobile App' },
                  { task: 'Content Writing', due: 'In 3 days', project: 'Q4 Campaign' }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div>
                      <p className="font-medium text-sm">{item.task}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.project}</p>
                    </div>
                    <span className="text-xs bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 px-2 py-1 rounded">
                      {item.due}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Meetings</span>
                  <span className="font-semibold">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Deadlines</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tasks Due</span>
                  <span className="font-semibold">12</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}