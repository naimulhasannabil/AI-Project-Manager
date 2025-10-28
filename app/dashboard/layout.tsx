import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { AIHelper } from './components/AIHelper'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      <AIHelper />
    </div>
  )
}