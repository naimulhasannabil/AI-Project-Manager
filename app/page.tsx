'use client'

import { useAuth, SignInButton, UserButton } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Rocket, Trello, Bot, Zap } from 'lucide-react'

export default function Home() {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard')
    }
  }, [isSignedIn, router])

  if (isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Rocket className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">AI Project Manager</span>
            </div>
            <SignInButton mode="modal">
              <Button>Get Started</Button>
            </SignInButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Project Management
            <span className="text-blue-600 block">Powered by AI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Notion × Trello × ChatGPT. The intelligent workspace for modern teams to plan, 
            collaborate, and deliver projects faster with AI-driven insights.
          </p>
          
          <SignInButton mode="modal">
            <Button size="lg" className="text-lg px-8 py-3">
              <Rocket className="w-5 h-5 mr-2" />
              Launch AI Project Manager
            </Button>
          </SignInButton>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Trello className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Smart Kanban Boards</CardTitle>
              <CardDescription>
                Drag-and-drop task management with AI-powered automation and real-time collaboration.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Bot className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>AI Task Generation</CardTitle>
              <CardDescription>
                Convert project ideas into structured task breakdowns instantly with GPT-4 integration.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Zap className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Analytics & Insights</CardTitle>
              <CardDescription>
                Track progress, predict deadlines, and get intelligent recommendations for your projects.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-gray-900">10x</div>
            <div className="text-gray-600">Faster Planning</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">24/7</div>
            <div className="text-gray-600">AI Assistant</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">99.9%</div>
            <div className="text-gray-600">Uptime</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">∞</div>
            <div className="text-gray-600">Possibilities</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Rocket className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold text-gray-900">AI Project Manager</span>
            </div>
            <div className="text-sm text-gray-600">
              Built with Next.js 15, TypeScript, and AI
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}