'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import DashboardPage from '@/components/pages/DashboardPage'
import ProfilePage from '@/components/pages/ProfilePage'
import RiskPage from '@/components/pages/RiskPage'

// Placeholder pages for screens not yet built
const ComingSoon = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-full p-12 text-center">
    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
      style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)' }}>
      <span className="text-2xl">🚧</span>
    </div>
    <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{title}</h2>
    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>This screen is coming soon.</p>
  </div>
)

export default function Home() {
  const [activePage, setActivePage] = useState('dashboard')

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <DashboardPage onNavigate={setActivePage} />
      case 'profile':   return <ProfilePage />
      case 'risk':      return <RiskPage />
      case 'diet':      return <ComingSoon title="Diet Plan" />
      case 'habits':    return <ComingSoon title="Habit Tracker" />
      case 'chat':      return <ComingSoon title="AI Chatbot" />
      case 'progress':  return <ComingSoon title="Progress & Reports" />
      default:          return <ComingSoon title={activePage} />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  )
}
