'use client'

import { useState } from 'react'
import { CheckCircle2, Circle, Flame, Trophy, Plus, Zap } from 'lucide-react'

const initialHabits = [
  { id: 1, label: 'Morning walk 20 min',       category: 'Exercise',  streak: 5,  done: true,  points: 20 },
  { id: 2, label: 'Take BP medication',         category: 'Medical',   streak: 12, done: true,  points: 15 },
  { id: 3, label: 'Drink 8 glasses of water',   category: 'Hydration', streak: 3,  done: false, points: 10 },
  { id: 4, label: 'Avoid processed food',       category: 'Diet',      streak: 2,  done: false, points: 15 },
  { id: 5, label: 'Blood pressure reading',     category: 'Medical',   streak: 7,  done: false, points: 10 },
  { id: 6, label: '10 min breathing exercise',  category: 'Mental',    streak: 0,  done: false, points: 10 },
  { id: 7, label: 'Sleep by 10:30 PM',          category: 'Sleep',     streak: 1,  done: false, points: 15 },
  { id: 8, label: 'No sugary drinks today',     category: 'Diet',      streak: 4,  done: true,  points: 10 },
]

const categoryColors: Record<string, string> = {
  Exercise:  '#10b981',
  Medical:   '#f43f5e',
  Hydration: '#3b82f6',
  Diet:      '#f59e0b',
  Mental:    '#8b5cf6',
  Sleep:     '#06b6d4',
}

const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const weekDone  = [true, true, true, true, false, false, false]

export default function HabitsPage() {
  const [habits, setHabits] = useState(initialHabits)

  const toggle = (id: number) =>
    setHabits(h => h.map(x => x.id === id ? { ...x, done: !x.done } : x))

  const doneCount  = habits.filter(h => h.done).length
  const totalPts   = habits.filter(h => h.done).reduce((s, h) => s + h.points, 0)
  const pct        = Math.round((doneCount / habits.length) * 100)

  return (
    <div className="page-transition p-6 space-y-5 max-w-4xl">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Habit Tracker</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
          Small daily actions that reduce your cardiac risk over time
        </p>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold" style={{ color: '#f43f5e' }}>{doneCount}<span className="text-sm text-gray-500">/{habits.length}</span></p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Done today</p>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center">
          <div className="flex items-center justify-center gap-1">
            <Flame size={18} style={{ color: '#f59e0b' }} />
            <p className="text-2xl font-bold" style={{ color: '#f59e0b' }}>12</p>
          </div>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Best streak</p>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center">
          <div className="flex items-center justify-center gap-1">
            <Zap size={18} style={{ color: '#8b5cf6' }} />
            <p className="text-2xl font-bold" style={{ color: '#8b5cf6' }}>{totalPts}</p>
          </div>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Points earned</p>
        </div>
      </div>

      {/* Weekly progress */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>This Week</h2>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>4/7 days complete</span>
        </div>
        <div className="flex gap-2 mb-4">
          {weekDays.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <div className="w-full h-8 rounded-lg flex items-center justify-center text-xs font-semibold"
                style={{
                  background: weekDone[i] ? 'rgba(16,185,129,0.2)' : 'var(--bg-primary)',
                  border: `1px solid ${weekDone[i] ? '#10b981' : 'var(--border)'}`,
                  color: weekDone[i] ? '#10b981' : 'var(--text-muted)',
                }}>
                {weekDone[i] ? '✓' : d}
              </div>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{d}</span>
            </div>
          ))}
        </div>
        {/* Progress bar */}
        <div className="h-2 rounded-full" style={{ background: 'var(--border)' }}>
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #10b981, #3b82f6)' }} />
        </div>
        <p className="text-xs mt-1.5 text-right" style={{ color: 'var(--text-muted)' }}>{pct}% of today's habits done</p>
      </div>

      {/* Habit list */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Today's Habits</h2>
          <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
            style={{ background: 'rgba(244,63,94,0.12)', color: '#f43f5e' }}>
            <Plus size={13} /> Add habit
          </button>
        </div>
        <ul className="space-y-2.5">
          {habits.map(h => {
            const color = categoryColors[h.category]
            return (
              <li key={h.id}
                className="flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer hover:bg-white/5"
                style={{ opacity: h.done ? 0.65 : 1 }}
                onClick={() => toggle(h.id)}>
                {h.done
                  ? <CheckCircle2 size={20} style={{ color: '#10b981', flexShrink: 0 }} fill="#10b98130" />
                  : <Circle      size={20} style={{ color: 'var(--border)', flexShrink: 0 }} />
                }
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium"
                    style={{ color: 'var(--text-primary)', textDecoration: h.done ? 'line-through' : 'none' }}>
                    {h.label}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: `${color}15`, color }}>
                      {h.category}
                    </span>
                    {h.streak > 0 && (
                      <span className="flex items-center gap-0.5 text-xs" style={{ color: '#f59e0b' }}>
                        <Flame size={11} /> {h.streak}d streak
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                  +{h.points}pts
                </span>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Achievement */}
      <div className="flex items-center gap-4 p-4 rounded-2xl"
        style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(245,158,11,0.2)' }}>
          <Trophy size={20} style={{ color: '#f59e0b' }} />
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            2-week consistency badge unlocked!
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            You've logged BP medication 14 days in a row. Keep it up — consistency is what lowers risk.
          </p>
        </div>
      </div>
    </div>
  )
}
