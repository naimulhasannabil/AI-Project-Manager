import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { AIHelper } from './components/AIHelper'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto scrollbar-thin px-4 py-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <AIHelper />
    </div>
  )
}