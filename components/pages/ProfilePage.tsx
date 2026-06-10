'use client'

import { useState } from 'react'
import { User, Save, ChevronRight, CheckCircle } from 'lucide-react'

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="glass-card rounded-2xl p-5">
    <h2 className="text-sm font-semibold mb-4 pb-3 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>
      {title}
    </h2>
    {children}
  </div>
)

const Field = ({ label, type = 'text', value, onChange, options, unit }: any) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{label}</label>
    {options ? (
      <select
        value={value} onChange={e => onChange(e.target.value)}
        className="px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
        style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
      >
        {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
      </select>
    ) : (
      <div className="flex items-center gap-2">
        <input
          type={type} value={value} onChange={e => onChange(e.target.value)}
          className="flex-1 px-3 py-2.5 rounded-xl text-sm outline-none transition-all focus:ring-1"
          style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            '--tw-ring-color': '#f43f5e',
          } as any}
        />
        {unit && <span className="text-xs whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>{unit}</span>}
      </div>
    )}
  </div>
)

const ToggleChip = ({ label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
    style={{
      background: active ? 'rgba(244,63,94,0.15)' : 'var(--bg-primary)',
      border: `1px solid ${active ? '#f43f5e' : 'var(--border)'}`,
      color: active ? '#f43f5e' : 'var(--text-muted)',
    }}
  >
    {active && <CheckCircle size={12} />}
    {label}
  </button>
)

export default function ProfilePage() {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    name: 'Ahmed Khan', age: '52', gender: 'Male', weight: '88', height: '175',
    bmi: '28.7', bp: '142/88', cholesterol: '218', smoking: 'Former Smoker',
    activity: 'Sedentary', sleep: '5.5', familyHistory: true,
    conditions: ['Hypertension', 'Diabetes'],
  })

  const set = (k: string) => (v: any) => setForm(f => ({ ...f, [k]: v }))

  const conditions = ['Diabetes', 'Hypertension', 'Thyroid Disorder', 'Obesity', 'Kidney Disease', 'High Cholesterol']

  const toggleCondition = (c: string) => {
    setForm(f => ({
      ...f,
      conditions: f.conditions.includes(c)
        ? f.conditions.filter(x => x !== c)
        : [...f.conditions, c],
    }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="page-transition p-6 space-y-5 max-w-4xl">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Health Profile</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Keep your data updated for accurate risk assessment</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
          style={{ background: saved ? 'rgba(16,185,129,0.15)' : 'rgba(244,63,94,0.15)', color: saved ? '#10b981' : '#f43f5e' }}
        >
          {saved ? <CheckCircle size={16} /> : <Save size={16} />}
          {saved ? 'Saved!' : 'Save Profile'}
        </button>
      </div>

      {/* Completion badge */}
      <div className="flex items-center gap-3 p-4 rounded-2xl"
        style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(59,130,246,0.15)' }}>
          <User size={20} style={{ color: '#60a5fa' }} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Profile Completeness</p>
          <div className="h-1.5 rounded-full mt-1.5" style={{ background: 'var(--border)' }}>
            <div className="h-full rounded-full" style={{ width: '82%', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }} />
          </div>
        </div>
        <span className="text-sm font-bold" style={{ color: '#60a5fa' }}>82%</span>
      </div>

      {/* Personal Info */}
      <Section title="Personal Information">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Field label="Full Name"   value={form.name}   onChange={set('name')} />
          <Field label="Age"         value={form.age}    onChange={set('age')}    type="number" unit="years" />
          <Field label="Gender"      value={form.gender} onChange={set('gender')} options={['Male', 'Female', 'Other']} />
          <Field label="Weight"      value={form.weight} onChange={set('weight')} type="number" unit="kg" />
          <Field label="Height"      value={form.height} onChange={set('height')} type="number" unit="cm" />
          <Field label="BMI (auto)"  value={form.bmi}    onChange={set('bmi')}   type="number" unit="kg/m²" />
        </div>
      </Section>

      {/* Vitals */}
      <Section title="Vital Signs">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Field label="Blood Pressure"   value={form.bp}          onChange={set('bp')}          unit="mmHg" />
          <Field label="Total Cholesterol" value={form.cholesterol} onChange={set('cholesterol')} type="number" unit="mg/dL" />
          <Field label="Sleep Duration"    value={form.sleep}       onChange={set('sleep')}       type="number" unit="hrs/night" />
          <Field label="Smoking Status"    value={form.smoking}     onChange={set('smoking')}
            options={['Non-Smoker', 'Former Smoker', 'Current Smoker', 'Heavy Smoker']} />
          <Field label="Activity Level"   value={form.activity}    onChange={set('activity')}
            options={['Sedentary', 'Light (1–2x/week)', 'Moderate (3–4x/week)', 'Active (5+/week)']} />
        </div>
      </Section>

      {/* Conditions */}
      <Section title="Existing Medical Conditions">
        <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>Select all that apply</p>
        <div className="flex flex-wrap gap-2">
          {conditions.map(c => (
            <ToggleChip key={c} label={c} active={form.conditions.includes(c)} onClick={() => toggleCondition(c)} />
          ))}
        </div>
      </Section>

      {/* Family History */}
      <Section title="Family History">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>Family history of heart disease</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Parent or sibling diagnosed with cardiovascular disease</p>
          </div>
          <button
            onClick={() => setForm(f => ({ ...f, familyHistory: !f.familyHistory }))}
            className="relative w-12 h-6 rounded-full transition-all duration-200"
            style={{ background: form.familyHistory ? '#f43f5e' : 'var(--border)' }}
          >
            <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200"
              style={{ left: form.familyHistory ? '26px' : '2px' }} />
          </button>
        </div>
      </Section>

      {/* Next Step CTA */}
      <button
        onClick={handleSave}
        className="w-full py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-85"
        style={{ background: 'linear-gradient(135deg, #f43f5e, #be123c)', color: 'white' }}>
        Save & Run Risk Assessment <ChevronRight size={16} />
      </button>
    </div>
  )
}
