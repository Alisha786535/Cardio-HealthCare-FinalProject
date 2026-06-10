'use client'

import { TrendingDown, TrendingUp, Award, Calendar } from 'lucide-react'
import {
  LineChart, Line, AreaChart, Area,
  BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts'

const riskTrend = [
  { week: 'Wk 1',  score: 74 },
  { week: 'Wk 2',  score: 72 },
  { week: 'Wk 3',  score: 71 },
  { week: 'Wk 4',  score: 68 },
  { week: 'Wk 5',  score: 67 },
  { week: 'Wk 6',  score: 65 },
]

const bpTrend = [
  { day: 'Mon', sys: 148, dia: 92 },
  { day: 'Tue', sys: 145, dia: 90 },
  { day: 'Wed', sys: 143, dia: 89 },
  { day: 'Thu', sys: 141, dia: 88 },
  { day: 'Fri', sys: 142, dia: 87 },
  { day: 'Sat', sys: 139, dia: 86 },
  { day: 'Sun', sys: 138, dia: 85 },
]

const habitAdherence = [
  { week: 'Wk 1', pct: 45 },
  { week: 'Wk 2', pct: 52 },
  { week: 'Wk 3', pct: 61 },
  { week: 'Wk 4', pct: 68 },
  { week: 'Wk 5', pct: 72 },
  { week: 'Wk 6', pct: 78 },
]

const tooltipStyle = {
  contentStyle: { background: '#1e2d42', border: '1px solid #2a3f5a', borderRadius: '10px', fontSize: '12px' },
  labelStyle: { color: '#f0f4f8' },
}

const MetricCard = ({ label, value, unit, change, positive }: any) => (
  <div className="glass-card rounded-2xl p-4">
    <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{label}</p>
    <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
      {value}<span className="text-xs ml-1 font-normal" style={{ color: 'var(--text-muted)' }}>{unit}</span>
    </p>
    <div className="flex items-center gap-1 mt-1">
      {positive
        ? <TrendingDown size={13} style={{ color: '#10b981' }} />
        : <TrendingUp   size={13} style={{ color: '#f43f5e' }} />
      }
      <span className="text-xs font-medium" style={{ color: positive ? '#10b981' : '#f43f5e' }}>
        {change}
      </span>
    </div>
  </div>
)

export default function ProgressPage() {
  return (
    <div className="page-transition p-6 space-y-5 max-w-5xl">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Progress & Reports</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            6-week overview · June 2026
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
          style={{ background: 'rgba(59,130,246,0.12)', color: '#60a5fa' }}>
          <Calendar size={15} /> Export report
        </button>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MetricCard label="Cardiac Risk Score" value="65"    unit="/100"  change="−9 pts in 6 weeks" positive={true}  />
        <MetricCard label="Avg Blood Pressure"  value="141"  unit="mmHg"  change="−7 systolic"       positive={true}  />
        <MetricCard label="Habit Adherence"     value="78%"  unit=""      change="+33% since start"  positive={true}  />
        <MetricCard label="Total Cholesterol"   value="218"  unit="mg/dL" change="−12 mg/dL"         positive={true}  />
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-12 gap-4">

        {/* Risk score trend */}
        <div className="col-span-12 md:col-span-7 glass-card rounded-2xl p-5">
          <h2 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Cardiac Risk Score — 6 Weeks</h2>
          <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>Consistently trending down ↓</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={riskTrend}>
              <defs>
                <linearGradient id="rGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f43f5e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="week" tick={{ fill: '#7a9ab8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 80]} tick={{ fill: '#7a9ab8', fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
              <Tooltip {...tooltipStyle} />
              <Area type="monotone" dataKey="score" stroke="#f43f5e" strokeWidth={2}
                fill="url(#rGrad)" dot={{ fill: '#f43f5e', r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Habit adherence */}
        <div className="col-span-12 md:col-span-5 glass-card rounded-2xl p-5">
          <h2 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Habit Adherence %</h2>
          <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>Weekly average completion</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={habitAdherence} barSize={28}>
              <XAxis dataKey="week" tick={{ fill: '#7a9ab8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: '#7a9ab8', fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="pct" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Blood pressure trend */}
        <div className="col-span-12 glass-card rounded-2xl p-5">
          <h2 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Blood Pressure — This Week</h2>
          <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>Systolic / Diastolic readings (mmHg)</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={bpTrend}>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: '#7a9ab8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[80, 155]} tick={{ fill: '#7a9ab8', fontSize: 11 }} axisLine={false} tickLine={false} width={32} />
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '12px', color: '#7a9ab8' }} />
              <Line type="monotone" dataKey="sys" stroke="#f43f5e" strokeWidth={2} dot={{ fill: '#f43f5e', r: 3 }} name="Systolic" />
              <Line type="monotone" dataKey="dia" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 3 }} name="Diastolic" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Weekly Summary */}
      <div className="glass-card rounded-2xl p-5"
        style={{ border: '1px solid rgba(244,63,94,0.2)', background: 'rgba(244,63,94,0.04)' }}>
        <div className="flex items-center gap-2 mb-3">
          <Award size={18} style={{ color: '#f43f5e' }} />
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>AI Weekly Summary</h2>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Great progress this week, Ahmed. Your cardiac risk score dropped by <strong style={{ color: '#10b981' }}>2 points</strong>, driven by improved habit adherence (78%) and lower blood pressure readings. Your systolic BP fell from 148 to 138 mmHg — a meaningful reduction. Focus area for next week: improve sleep consistency and add one more exercise session. You are on track to reach <strong style={{ color: '#f43f5e' }}>Moderate Risk</strong> within 3 weeks if you maintain this pace.
        </p>
      </div>
    </div>
  )
}
