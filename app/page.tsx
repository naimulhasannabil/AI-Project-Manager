'use client'

import { useAuth, SignInButton } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Rocket, Trello, Bot, Zap, Sparkles, Users, Clock, Target } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const [currentFeature, setCurrentFeature] = useState(0)

  const features = [
    {
      icon: Bot,
      title: "AI Task Generation",
      description: "Convert ideas into structured plans with GPT-4"
    },
    {
      icon: Trello,
      title: "Smart Kanban",
      description: "Drag-and-drop with AI-powered automation"
    },
    {
      icon: Zap,
      title: "Real-time Collaboration",
      description: "Work together seamlessly with live updates"
    },
    {
      icon: Target,
      title: "Advanced Analytics",
      description: "Track progress and predict deadlines"
    }
  ]

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard')
    }
  }, [isSignedIn, router])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  if (isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300"
          >
            Welcome to FlowPilot! Redirecting...
          </motion.p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-200/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <Rocket className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <Sparkles className="h-4 w-4 text-yellow-500 absolute -top-1 -right-1" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FlowPilot
              </span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <SignInButton mode="modal">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Rocket className="w-4 h-4 mr-2" />
                  Launch App
                </Button>
              </SignInButton>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Project Management
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Powered by AI
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Notion × Trello × ChatGPT. The intelligent workspace where AI transforms your ideas into 
            actionable plans, predicts deadlines, and supercharges team collaboration.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <SignInButton mode="modal">
              <Button size="lg" className="text-lg px-8 py-3 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Rocket className="w-5 h-5 mr-2" />
                Start Free Today
              </Button>
            </SignInButton>
            
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 h-14 border-2">
              <Users className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Animated Feature Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-20"
          >
            <div className="relative h-32 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeature}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
  <CardContent className="p-6">
    <div className="flex items-center space-x-4">
      <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
        {(() => {
          const FeatureIcon = features[currentFeature].icon
          return <FeatureIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        })()}
      </div>
      <div className="text-left">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {features[currentFeature].title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {features[currentFeature].description}
        </p>
      </div>
    </div>
  </CardContent>
</Card>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: "10x", label: "Faster Planning", icon: Zap },
            { value: "24/7", label: "AI Assistant", icon: Clock },
            { value: "99.9%", label: "Uptime", icon: Target },
            { value: "∞", label: "Possibilities", icon: Sparkles }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-2">
                <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Rocket className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">FlowPilot</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Built with ❤️ using Next.js 14, TypeScript, and AI
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}