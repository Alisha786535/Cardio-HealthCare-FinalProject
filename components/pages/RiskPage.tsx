'use client'

import { AlertTriangle, CheckCircle, Info, ArrowRight, Activity, Heart } from 'lucide-react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'

const riskFactors = [
  { name: 'Blood Pressure', score: 78, status: 'high',     detail: '142/88 mmHg — Stage 1 Hypertension' },
  { name: 'Cholesterol',    score: 65, status: 'moderate', detail: '218 mg/dL — Borderline high' },
  { name: 'BMI',            score: 58, status: 'moderate', detail: '28.7 — Overweight range' },
  { name: 'Physical Activity', score: 80, status: 'high',  detail: 'Sedentary lifestyle detected' },
  { name: 'Sleep Quality',  score: 45, status: 'moderate', detail: '5.5 hrs avg — Below recommended' },
  { name: 'Smoking History', score: 35, status: 'low',     detail: 'Former smoker — Low residual risk' },
  { name: 'Family History', score: 70, status: 'high',     detail: 'Positive family history — elevated genetic risk' },
  { name: 'Diet Quality',   score: 55, status: 'moderate', detail: 'Inconsistent healthy diet patterns' },
]

const radarData = [
  { subject: 'BP',        value: 78 },
  { subject: 'Chol.',     value: 65 },
  { subject: 'BMI',       value: 58 },
  { subject: 'Activity',  value: 80 },
  { subject: 'Sleep',     value: 45 },
  { subject: 'Diet',      value: 55 },
  { subject: 'Genetics',  value: 70 },
]

const recommendations = [
  {
    priority: 'High',
    icon: Activity,
    color: '#f43f5e',
    title: 'Start Regular Physical Activity',
    detail: 'Begin with 15–20 minute walks 5 days/week. Gradually increase to 150 min of moderate exercise weekly.',
  },
  {
    priority: 'High',
    icon: Heart,
    color: '#f59e0b',
    title: 'Control Blood Pressure',
    detail: 'Take medications consistently. Reduce sodium intake to under 1,500 mg/day. Monitor BP daily.',
  },
  {
    priority: 'Medium',
    icon: Info,
    color: '#3b82f6',
    title: 'Adopt Heart-Healthy Diet',
    detail: 'Follow DASH diet principles. Increase fiber, reduce saturated fats and refined carbohydrates.',
  },
  {
    priority: 'Medium',
    icon: CheckCircle,
    color: '#10b981',
    title: 'Improve Sleep Quality',
    detail: 'Target 7–8 hours of uninterrupted sleep. Avoid screens 1 hour before bed.',
  },
]

const statusColors: Record<string, string> = {
  high:     '#f43f5e',
  moderate: '#f59e0b',
  low:      '#10b981',
}

export default function RiskPage() {
  const overall = 65

  return (
    <div className="page-transition p-6 space-y-5 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Cardiac Risk Assessment</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Based on your latest health profile · Updated 9 June 2026</p>
      </div>

      {/* Overall Risk Banner */}
      <div className="relative overflow-hidden rounded-2xl p-6"
        style={{ background: 'linear-gradient(135deg, rgba(244,63,94,0.15), rgba(190,18,60,0.08))', border: '1px solid rgba(244,63,94,0.3)' }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Gauge */}
          <div className="relative flex-shrink-0">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="45" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
              <circle cx="60" cy="60" r="45" fill="none" stroke="#f43f5e" strokeWidth="10" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - overall / 100)}`}
                style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dashoffset 1.5s ease' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold" style={{ color: '#f43f5e' }}>{overall}</span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>/100</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={18} style={{ color: '#f43f5e' }} />
              <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>High Cardiac Risk</span>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              You are in the <strong style={{ color: '#f59e0b' }}>top 35% of high-risk patients</strong> in your age group. Consistent lifestyle improvements can reduce your score significantly within 3–6 months.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {['Hypertension', 'Sedentary', 'Family History', 'Overweight'].map(tag => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(244,63,94,0.1)', color: '#f43f5e', border: '1px solid rgba(244,63,94,0.2)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Risk Factor Breakdown */}
        <div className="col-span-12 md:col-span-7 glass-card rounded-2xl p-5">
          <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Risk Factor Breakdown</h2>
          <div className="space-y-3">
            {riskFactors.map(({ name, score, status, detail }) => (
              <div key={name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: statusColors[status] }}>{score}/100</span>
                    <span className="text-xs px-2 py-0.5 rounded-full capitalize"
                      style={{ background: `${statusColors[status]}18`, color: statusColors[status] }}>
                      {status}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: 'var(--border)' }}>
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${score}%`, background: statusColors[status] }} />
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Radar */}
        <div className="col-span-12 md:col-span-5 glass-card rounded-2xl p-5 flex flex-col">
          <h2 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Risk Profile Radar</h2>
          <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>Higher values = higher risk contribution</p>
          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#7a9ab8', fontSize: 11 }} />
                <Radar name="Risk" dataKey="value" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.15} strokeWidth={2} />
                <Tooltip contentStyle={{ background: '#1e2d42', border: '1px solid #2a3f5a', borderRadius: '10px', fontSize: '12px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommendations */}
        <div className="col-span-12 glass-card rounded-2xl p-5">
          <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Personalized Recommendations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recommendations.map(({ priority, icon: Icon, color, title, detail }) => (
              <div key={title} className="flex gap-3 p-4 rounded-xl"
                style={{ background: `${color}09`, border: `1px solid ${color}22` }}>
                <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center"
                  style={{ background: `${color}20` }}>
                  <Icon size={17} style={{ color }} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{title}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full"
                      style={{ background: `${color}18`, color }}>
                      {priority}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
