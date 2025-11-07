'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTaskStore } from '@/store/taskStore'

export function AnalyticsDashboard() {
  const { tasks } = useTaskStore()
  const [analytics, setAnalytics] = useState({
    velocity: 0,
    completionRate: 0,
    overdueTasks: 0,
    totalHours: 0,
  })

  useEffect(() => {
    const completedTasks = tasks.filter(task => task.status === 'DONE')
    const overdueTasks = tasks.filter(task => 
      task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'DONE'
    )
    
    const totalEstimatedHours = tasks.reduce((sum, task) => sum + (task.estimatedHours || 0), 0)
    const completedHours = completedTasks.reduce((sum, task) => sum + (task.estimatedHours || 0), 0)

    setAnalytics({
      velocity: completedTasks.length,
      completionRate: tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0,
      overdueTasks: overdueTasks.length,
      totalHours: totalEstimatedHours,
    })
  }, [tasks])

  const statusData = [
    { name: 'To Do', count: tasks.filter(t => t.status === 'TODO').length },
    { name: 'In Progress', count: tasks.filter(t => t.status === 'IN_PROGRESS').length },
    { name: 'Review', count: tasks.filter(t => t.status === 'REVIEW').length },
    { name: 'Done', count: tasks.filter(t => t.status === 'DONE').length },
  ]

  const weeklyData = [
    { week: 'Week 1', completed: 3, created: 5 },
    { week: 'Week 2', completed: 7, created: 6 },
    { week: 'Week 3', completed: 12, created: 8 },
    { week: 'Week 4', completed: 8, created: 7 },
  ]

  return (
      <div className="p-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Analytics Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Track your team's performance and project progress</p>
      </div>

      {/* Key Metrics */}
      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Velocity</CardTitle>
            <span className="text-2xl bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg">🚀</span>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {analytics.velocity}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Tasks completed this week</p>
          </CardContent>
        </Card>        <Card className="hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Completion Rate</CardTitle>
            <span className="text-2xl bg-green-50 dark:bg-green-900/30 p-2 rounded-lg">📈</span>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {analytics.completionRate.toFixed(1)}%
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Of total tasks completed</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Overdue</CardTitle>
            <span className="text-2xl bg-yellow-50 dark:bg-yellow-900/30 p-2 rounded-lg">⚠️</span>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              {analytics.overdueTasks}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Tasks past deadline</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Hours</CardTitle>
            <span className="text-2xl bg-purple-50 dark:bg-purple-900/30 p-2 rounded-lg">⏱️</span>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {analytics.totalHours}h
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Estimated work hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Task Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#9ca3af' }}
                  stroke="#6b7280"
                />
                <YAxis 
                  tick={{ fill: '#9ca3af' }}
                  stroke="#6b7280"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                    color: '#f3f4f6'
                  }}
                  labelStyle={{ color: '#f3f4f6' }}
                  itemStyle={{ color: '#f3f4f6' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis 
                  dataKey="week" 
                  tick={{ fill: '#9ca3af' }}
                  stroke="#6b7280"
                />
                <YAxis 
                  tick={{ fill: '#9ca3af' }}
                  stroke="#6b7280"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                    color: '#f3f4f6'
                  }}
                  labelStyle={{ color: '#f3f4f6' }}
                  itemStyle={{ color: '#f3f4f6' }}
                />
                <Legend 
                  wrapperStyle={{ 
                    paddingTop: '20px',
                    color: '#9ca3af'
                  }}
                  iconType="line"
                />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Completed"
                />
                <Line 
                  type="monotone" 
                  dataKey="created" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Created"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}