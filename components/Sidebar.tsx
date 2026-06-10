'use client'

import { Heart, LayoutDashboard, User, Activity, Utensils, CheckSquare, MessageCircle, TrendingUp, Bell, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface SidebarProps {
  activePage: string
  onNavigate: (page: string) => void
}

const navItems = [
  { id: 'dashboard',  label: 'Dashboard',      icon: LayoutDashboard },
  { id: 'profile',    label: 'Health Profile',  icon: User },
  { id: 'risk',       label: 'Risk Assessment', icon: Activity },
  { id: 'diet',       label: 'Diet Plan',       icon: Utensils },
  { id: 'habits',     label: 'Habit Tracker',   icon: CheckSquare },
  { id: 'chat',       label: 'AI Chatbot',      icon: MessageCircle },
  { id: 'progress',   label: 'Progress',        icon: TrendingUp },
]

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className="flex flex-col h-screen sticky top-0 transition-all duration-300 z-20"
      style={{
        width: collapsed ? '72px' : '240px',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #f43f5e, #be123c)' }}>
          <Heart className="w-5 h-5 text-white animate-beat" fill="white" />
        </div>
        {!collapsed && (
          <div>
            <p className="font-bold text-sm tracking-wide" style={{ color: 'var(--text-primary)' }}>CardioAI</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Heart Health Platform</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto">
        <p className={`text-xs font-semibold uppercase tracking-widest mb-2 px-2 ${collapsed ? 'hidden' : ''}`}
          style={{ color: 'var(--text-muted)' }}>
          Main Menu
        </p>
        <ul className="space-y-1">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activePage === id
            return (
              <li key={id}>
                <button
                  onClick={() => onNavigate(id)}
                  title={collapsed ? label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive ? 'nav-item-active' : 'hover:bg-white/5'
                  }`}
                  style={{ color: isActive ? '#f43f5e' : 'var(--text-muted)' }}
                >
                  <Icon className="w-4.5 h-4.5 flex-shrink-0" size={18} />
                  {!collapsed && <span>{label}</span>}
                </button>
              </li>
            )
          })}
        </ul>

        {/* Bottom section */}
        <div className="mt-6">
          {!collapsed && (
            <p className="text-xs font-semibold uppercase tracking-widest mb-2 px-2" style={{ color: 'var(--text-muted)' }}>
              Account
            </p>
          )}
          <ul className="space-y-1">
            {[
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'settings',      label: 'Settings',       icon: Settings },
            ].map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  onClick={() => onNavigate(id)}
                  title={collapsed ? label : undefined}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 hover:bg-white/5"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  {!collapsed && <span>{label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* User + collapse */}
      <div className="border-t p-3" style={{ borderColor: 'var(--border)' }}>
        {!collapsed && (
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
              AK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>Ahmed Khan</p>
              <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>High Risk · Age 52</p>
            </div>
            <button className="text-red-400 hover:text-red-300 transition-colors">
              <LogOut size={15} />
            </button>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center py-1.5 rounded-lg text-xs transition-all hover:bg-white/5"
          style={{ color: 'var(--text-muted)' }}
        >
          {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span className="ml-1">Collapse</span></>}
        </button>
      </div>
    </aside>
  )
}
