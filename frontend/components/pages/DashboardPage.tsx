'use client'

import { Heart, TrendingDown, Activity, Droplets, Moon, Flame, CheckCircle2, AlertCircle, ArrowRight, Bell } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const weeklyData = [
  { day: 'Mon', risk: 74, steps: 4200, sleep: 5.5 },
  { day: 'Tue', risk: 72, steps: 6100, sleep: 6.2 },
  { day: 'Wed', risk: 70, steps: 5800, sleep: 7.0 },
  { day: 'Thu', risk: 71, steps: 7200, sleep: 6.5 },
  { day: 'Fri', risk: 68, steps: 8500, sleep: 7.3 },
  { day: 'Sat', risk: 67, steps: 9100, sleep: 7.8 },
  { day: 'Sun', risk: 65, steps: 7600, sleep: 8.0 },
]

const todayHabits = [
  { label: 'Morning walk 20 min',    done: true  },
  { label: 'Take blood pressure med', done: true  },
  { label: 'Drink 8 glasses of water', done: false },
  { label: 'Avoid processed food',    done: false },
  { label: 'Sleep by 10:30 PM',       done: false },
]

const alerts = [
  { type: 'warning', text: 'Blood pressure recorded high yesterday (148/92). Monitor today.' },
  { type: 'info',    text: 'New personalized diet plan ready — adapted for Ramadan schedule.' },
]

const StatCard = ({ icon: Icon, label, value, unit, change, color }: any) => (
  <div className="glass-card rounded-2xl p-4">
    <div className="flex items-center justify-between mb-3">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}22` }}>
        <Icon size={18} style={{ color }} />
      </div>
      {change && (
        <span className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ background: change > 0 ? '#10b98122' : '#f43f5e22', color: change > 0 ? '#10b981' : '#f43f5e' }}>
          {change > 0 ? '+' : ''}{change}%
        </span>
      )}
    </div>
    <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{value}<span className="text-sm font-normal ml-1" style={{ color: 'var(--text-muted)' }}>{unit}</span></p>
    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
  </div>
)

export default function DashboardPage({ onNavigate }: { onNavigate: (p: string) => void }) {
  const riskScore = 65
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (riskScore / 100) * circumference

  return (
    <div className="page-transition p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Good morning, Ahmed 👋</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Tuesday, 9 June 2026 · Your heart health summary
          </p>
        </div>
        <button className="relative w-10 h-10 rounded-xl flex items-center justify-center glass-card hover:bg-white/10 transition-colors">
          <Bell size={18} style={{ color: 'var(--text-muted)' }} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
        </button>
      </div>

      {/* Alerts */}
      {alerts.map((a, i) => (
        <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
          style={{
            background: a.type === 'warning' ? 'rgba(245,158,11,0.1)' : 'rgba(59,130,246,0.1)',
            border: `1px solid ${a.type === 'warning' ? 'rgba(245,158,11,0.25)' : 'rgba(59,130,246,0.25)'}`,
            color: a.type === 'warning' ? '#f59e0b' : '#60a5fa',
          }}>
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span>{a.text}</span>
        </div>
      ))}

      {/* Main grid */}
      <div className="grid grid-cols-12 gap-4">

        {/* Risk Gauge */}
        <div className="col-span-12 md:col-span-4 glass-card rounded-2xl p-6 flex flex-col items-center">
          <p className="text-sm font-medium mb-4" style={{ color: 'var(--text-muted)' }}>Cardiac Risk Score</p>
          <div className="relative">
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="45" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
              <circle
                cx="70" cy="70" r="45" fill="none"
                stroke={riskScore >= 70 ? '#f43f5e' : riskScore >= 40 ? '#f59e0b' : '#10b981'}
                strokeWidth="10" strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dashoffset 1.5s ease' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold" style={{ color: '#f43f5e' }}>{riskScore}</span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>/ 100</span>
            </div>
          </div>
          <div className="mt-2 text-center">
            <span className="text-sm font-semibold px-3 py-1 rounded-full"
              style={{ background: 'rgba(244,63,94,0.15)', color: '#f43f5e' }}>
              High Risk
            </span>
            <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>Down 9 pts from last month</p>
          </div>
          <button onClick={() => onNavigate('risk')}
            className="mt-4 w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all hover:opacity-80"
            style={{ background: 'rgba(244,63,94,0.12)', color: '#f43f5e' }}>
            View Full Assessment <ArrowRight size={13} />
          </button>
        </div>

        {/* Stats */}
        <div className="col-span-12 md:col-span-8 grid grid-cols-2 gap-4">
          <StatCard icon={Activity}    label="Avg Blood Pressure" value="142/88"  unit="mmHg" color="#f43f5e" change={-3} />
          <StatCard icon={Droplets}    label="Cholesterol"        value="218"     unit="mg/dL" color="#f59e0b" change={-5} />
          <StatCard icon={Moon}        label="Avg Sleep"          value="7.2"     unit="hrs"  color="#8b5cf6" change={8}  />
          <StatCard icon={Flame}       label="Calories Burned"    value="1,840"   unit="kcal" color="#10b981" change={12} />
        </div>

        {/* Weekly Risk Trend */}
        <div className="col-span-12 md:col-span-8 glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Weekly Risk Trend</h2>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Cardiac risk score over the past 7 days</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
              style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
              <TrendingDown size={12} /> −9 this week
            </span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: '#7a9ab8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 80]} tick={{ fill: '#7a9ab8', fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
              <Tooltip
                contentStyle={{ background: '#1e2d42', border: '1px solid #2a3f5a', borderRadius: '10px', fontSize: '12px' }}
                labelStyle={{ color: '#f0f4f8' }}
              />
              <Area type="monotone" dataKey="risk" stroke="#f43f5e" strokeWidth={2} fill="url(#riskGrad)" dot={{ fill: '#f43f5e', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Today's Habits */}
        <div className="col-span-12 md:col-span-4 glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Today's Habits</h2>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {todayHabits.filter(h => h.done).length}/{todayHabits.length} done
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 rounded-full mb-4" style={{ background: 'var(--border)' }}>
            <div className="h-full rounded-full transition-all" style={{
              width: `${(todayHabits.filter(h => h.done).length / todayHabits.length) * 100}%`,
              background: 'linear-gradient(90deg, #10b981, #3b82f6)'
            }} />
          </div>
          <ul className="space-y-2.5">
            {todayHabits.map((h, i) => (
              <li key={i} className="flex items-center gap-2.5 text-xs">
                <CheckCircle2 size={16} style={{ color: h.done ? '#10b981' : 'var(--border)', flexShrink: 0 }} fill={h.done ? '#10b98133' : 'none'} />
                <span style={{ color: h.done ? 'var(--text-primary)' : 'var(--text-muted)', textDecoration: h.done ? 'line-through' : 'none' }}>
                  {h.label}
                </span>
              </li>
            ))}
          </ul>
          <button onClick={() => onNavigate('habits')}
            className="mt-4 w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all hover:opacity-80"
            style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa' }}>
            Manage Habits <ArrowRight size={13} />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="col-span-12 glass-card rounded-2xl p-5">
          <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Log Blood Pressure', icon: Activity, color: '#f43f5e', page: 'profile' },
              { label: 'View Diet Plan',      icon: Heart,    color: '#10b981', page: 'diet'    },
              { label: 'Ask AI Chatbot',      icon: Heart,    color: '#8b5cf6', page: 'chat'    },
              { label: 'Weekly Report',       icon: TrendingDown, color: '#f59e0b', page: 'progress' },
            ].map(({ label, icon: Icon, color, page }) => (
              <button key={label} onClick={() => onNavigate(page)}
                className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all hover:scale-105 hover:opacity-90"
                style={{ background: `${color}11`, border: `1px solid ${color}22` }}>
                <Icon size={22} style={{ color }} />
                <span className="text-xs font-medium text-center" style={{ color: 'var(--text-primary)' }}>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
