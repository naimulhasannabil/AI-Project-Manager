'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  CheckSquare, 
  Folder, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Rocket,
  Users,
  Calendar
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '@clerk/nextjs'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, color: 'text-blue-600 dark:text-blue-400' },
  { name: 'Projects', href: '/dashboard/projects', icon: Folder, color: 'text-green-600 dark:text-green-400' },
  { name: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare, color: 'text-orange-600 dark:text-orange-400' },
  { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar, color: 'text-red-600 dark:text-red-400' },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, color: 'text-purple-600 dark:text-purple-400' },
  { name: 'Team', href: '/dashboard/team', icon: Users, color: 'text-indigo-600 dark:text-indigo-400' },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings, color: 'text-gray-600 dark:text-gray-400' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useUser()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <motion.div
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className="flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-full relative transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <Rocket className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FlowPilot
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 group",
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100",
                collapsed ? "justify-center" : "justify-start"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                collapsed ? "mr-0" : "mr-3",
                isActive ? "text-white" : item.color
              )} />
              
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Active indicator */}
              {isActive && !collapsed && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-2 h-2 bg-white dark:bg-gray-200 rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className={cn(
          "flex items-center space-x-3",
          collapsed ? "justify-center" : "justify-start"
        )}>
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {user?.firstName?.[0] || 'U'}
          </div>
          
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.fullName || 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}