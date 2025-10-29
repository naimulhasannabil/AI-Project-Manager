'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Users, Plus, Mail, MoreVertical, Star } from 'lucide-react'

export default function TeamPage() {
  const teamMembers = [
    {
      id: 1,
      name: 'Naimul Nabil',
      email: 'naimulhasannabil@gmail.com',
      role: 'Admin',
      avatar: '',
      status: 'active',
      tasks: 12,
      projects: 3
    },
    {
      id: 2,
      name: 'Sarah Chen',
      email: 'sarah@company.com',
      role: 'Developer',
      avatar: '',
      status: 'active',
      tasks: 8,
      projects: 2
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@company.com',
      role: 'Designer',
      avatar: '',
      status: 'away',
      tasks: 6,
      projects: 2
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily@company.com',
      role: 'Project Manager',
      avatar: '',
      status: 'active',
      tasks: 15,
      projects: 4
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'Developer': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Designer': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
      case 'Project Manager': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Team</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your team members and their roles
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Team Stats */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Team Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">4</div>
                <div className="text-sm text-blue-600 dark:text-blue-400">Total Members</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">3</div>
                <div className="text-sm text-green-600 dark:text-green-400">Active Now</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">12</div>
                <div className="text-sm text-purple-600 dark:text-purple-400">Projects</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">41</div>
                <div className="text-sm text-orange-600 dark:text-orange-400">Total Tasks</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Members List */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              All members with their roles and current workload
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${getStatusColor(member.status)}`} />
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {member.name}
                        </h3>
                        {member.role === 'Admin' && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{member.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary" className={getRoleColor(member.role)}>
                      {member.role}
                    </Badge>
                    
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {member.tasks} tasks
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {member.projects} projects
                      </div>
                    </div>

                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Invite Team Member */}
        <Card>
          <CardHeader>
            <CardTitle>Invite Member</CardTitle>
            <CardDescription>
              Add new members to your team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <Input placeholder="colleague@company.com" />
              </div>
              
              <div className="space-y-2">
  <label
    htmlFor="role"
    className="text-sm font-medium text-gray-700 dark:text-gray-300"
  >
    Role
  </label>
  <select
    id="role"
    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
  >
    <option>Member</option>
    <option>Admin</option>
    <option>Viewer</option>
  </select>
</div>

              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                <Mail className="w-4 h-4 mr-2" />
                Send Invitation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}