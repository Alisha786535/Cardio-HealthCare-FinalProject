'use client'

import { useState } from 'react'
import { Utensils, Sun, Coffee, Moon, Droplets, CheckCircle2, RefreshCw, Info } from 'lucide-react'

const meals = {
  Monday: {
    breakfast: { name: 'Oat porridge with berries',       cal: 320, tags: ['High Fiber', 'Low Sugar'] },
    lunch:     { name: 'Grilled chicken salad',            cal: 450, tags: ['High Protein', 'Low Fat'] },
    dinner:    { name: 'Baked salmon with steamed vegs',   cal: 510, tags: ['Omega-3', 'Heart Healthy'] },
    snack:     { name: 'Handful of walnuts + green tea',   cal: 180, tags: ['Anti-inflammatory'] },
  },
  Tuesday: {
    breakfast: { name: 'Whole wheat toast + avocado',      cal: 340, tags: ['Healthy Fats', 'Fiber'] },
    lunch:     { name: 'Lentil soup with brown rice',      cal: 420, tags: ['High Fiber', 'Low GI'] },
    dinner:    { name: 'Stir-fried tofu with vegetables',  cal: 480, tags: ['Plant Protein', 'Low Sodium'] },
    snack:     { name: 'Apple slices with almond butter',  cal: 200, tags: ['Low GI'] },
  },
  Wednesday: {
    breakfast: { name: 'Greek yogurt with flaxseeds',      cal: 290, tags: ['Probiotic', 'Omega-3'] },
    lunch:     { name: 'Tuna wrap with spinach',           cal: 430, tags: ['High Protein', 'Omega-3'] },
    dinner:    { name: 'Chicken stew with chickpeas',      cal: 520, tags: ['Heart Healthy', 'Fiber'] },
    snack:     { name: 'Carrot sticks with hummus',        cal: 150, tags: ['Low Calorie'] },
  },
}

const days = Object.keys(meals)

const mealIcons: Record<string, any> = {
  breakfast: Coffee,
  lunch:     Sun,
  dinner:    Moon,
  snack:     Droplets,
}

const mealColors: Record<string, string> = {
  breakfast: '#f59e0b',
  lunch:     '#10b981',
  dinner:    '#8b5cf6',
  snack:     '#3b82f6',
}

const guidelines = [
  { icon: '🧂', text: 'Keep sodium under 1,500 mg/day — critical for your hypertension' },
  { icon: '🍬', text: 'Limit added sugars to 25g/day — adapted for your diabetes' },
  { icon: '🥑', text: 'Focus on unsaturated fats — avocado, olive oil, nuts' },
  { icon: '💧', text: 'Drink 8–10 glasses of water daily' },
  { icon: '🥦', text: 'Fill half your plate with non-starchy vegetables' },
]

export default function DietPage() {
  const [activeDay, setActiveDay] = useState('Monday')
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  const toggleCheck = (key: string) => setChecked(c => ({ ...c, [key]: !c[key] }))

  const plan = meals[activeDay as keyof typeof meals]
  const totalCal = Object.values(plan).reduce((s, m) => s + m.cal, 0)

  return (
    <div className="page-transition p-6 space-y-5 max-w-5xl">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Your Diet Plan</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Personalised for Hypertension · Diabetes · High Cholesterol
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
          style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981' }}>
          <RefreshCw size={15} /> Regenerate plan
        </button>
      </div>

      {/* Calorie summary */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Daily Target',  value: '1,800', unit: 'kcal', color: '#f43f5e' },
          { label: "Today's Total", value: totalCal.toLocaleString(), unit: 'kcal', color: '#10b981' },
          { label: 'Protein',       value: '92',    unit: 'g',    color: '#8b5cf6' },
          { label: 'Sodium limit',  value: '1,500', unit: 'mg',   color: '#f59e0b' },
        ].map(({ label, value, unit, color }) => (
          <div key={label} className="glass-card rounded-2xl p-4 text-center">
            <p className="text-xl font-bold" style={{ color }}>
              {value}<span className="text-xs ml-1" style={{ color: 'var(--text-muted)' }}>{unit}</span>
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Day tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {days.map(day => (
          <button key={day} onClick={() => setActiveDay(day)}
            className="px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
            style={{
              background: activeDay === day ? 'rgba(244,63,94,0.15)' : 'var(--bg-card)',
              border: `1px solid ${activeDay === day ? '#f43f5e' : 'var(--border)'}`,
              color: activeDay === day ? '#f43f5e' : 'var(--text-muted)',
            }}>
            {day}
          </button>
        ))}
        <span className="px-4 py-2 rounded-xl text-sm text-center" style={{ color: 'var(--text-muted)', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          + 4 more
        </span>
      </div>

      {/* Meal cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(Object.entries(plan) as [string, { name: string; cal: number; tags: string[] }][]).map(([mealKey, meal]) => {
          const Icon = mealIcons[mealKey]
          const color = mealColors[mealKey]
          const checkKey = `${activeDay}-${mealKey}`
          const done = checked[checkKey]
          return (
            <div key={mealKey} className="glass-card rounded-2xl p-5 transition-all"
              style={{ opacity: done ? 0.6 : 1 }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: `${color}20` }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color }}>
                    {mealKey}
                  </span>
                </div>
                <button onClick={() => toggleCheck(checkKey)}>
                  <CheckCircle2 size={20}
                    style={{ color: done ? '#10b981' : 'var(--border)' }}
                    fill={done ? '#10b98130' : 'none'} />
                </button>
              </div>
              <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)', textDecoration: done ? 'line-through' : 'none' }}>
                {meal.name}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5 flex-wrap">
                  {meal.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: `${color}15`, color }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                  {meal.cal} kcal
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Dietary guidelines */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Info size={16} style={{ color: '#60a5fa' }} />
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            Your Dietary Guidelines
          </h2>
        </div>
        <ul className="space-y-2.5">
          {guidelines.map((g, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="text-base">{g.icon}</span>
              <span style={{ color: 'var(--text-muted)' }}>{g.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
