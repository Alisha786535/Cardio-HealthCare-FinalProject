'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Heart, User, Sparkles, AlertCircle } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  text: string
  time: string
}

const suggestions = [
  'What foods should I avoid with high BP?',
  'I have diabetes and high cholesterol — what diet suits me?',
  'How much exercise is safe for my heart?',
  'What are warning signs of a heart attack?',
]

const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: "Hello Ahmed! I'm your CardioAI health assistant. I can answer questions about heart health, diet, medication, and lifestyle changes tailored to your profile. How can I help you today?",
      time: now(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return
    setError('')
    const userMsg: Message = { role: 'user', text, time: now() }
    setMessages(m => [...m, userMsg])
    setInput('')
    setLoading(true)

    try {
      // Call FastAPI RAG endpoint
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, user_context: 'Age 52, Hypertension, Diabetes, High Cholesterol' }),
      })

      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', text: data.answer, time: now() }])
    } catch {
      // Fallback response when backend not yet connected
      const fallbacks: Record<string, string> = {
        default: "I'm your CardioAI assistant. Once the backend RAG pipeline is connected, I'll provide evidence-based cardiac health answers personalised to your profile. Please ensure the FastAPI server is running on port 8000.",
      }
      const key = Object.keys(fallbacks).find(k => text.toLowerCase().includes(k)) || 'default'
      setMessages(m => [...m, { role: 'assistant', text: fallbacks[key], time: now() }])
      setError('Backend not connected — showing fallback response. Start FastAPI server to enable real AI answers.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-transition flex flex-col h-full max-h-screen p-6 gap-4 max-w-3xl">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>AI Health Assistant</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
          Powered by RAG · Answers from verified cardiac medical guidelines
        </p>
      </div>

      {/* Backend warning */}
      {error && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs"
          style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', color: '#f59e0b' }}>
          <AlertCircle size={14} className="flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Chat window */}
      <div className="flex-1 overflow-y-auto space-y-4 glass-card rounded-2xl p-4 min-h-0"
        style={{ maxHeight: '420px' }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
              style={{
                background: msg.role === 'assistant'
                  ? 'linear-gradient(135deg, #f43f5e, #be123c)'
                  : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              }}>
              {msg.role === 'assistant'
                ? <Heart size={14} fill="white" style={{ color: 'white' }} />
                : <User  size={14} style={{ color: 'white' }} />
              }
            </div>
            {/* Bubble */}
            <div className={`max-w-[78%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              <div className="px-4 py-3 rounded-2xl text-sm leading-relaxed"
                style={{
                  background: msg.role === 'assistant' ? 'var(--bg-secondary)' : 'rgba(244,63,94,0.15)',
                  border: `1px solid ${msg.role === 'assistant' ? 'var(--border)' : 'rgba(244,63,94,0.25)'}`,
                  color: 'var(--text-primary)',
                  borderRadius: msg.role === 'assistant' ? '4px 18px 18px 18px' : '18px 4px 18px 18px',
                }}>
                {msg.text}
              </div>
              <span className="text-xs px-1" style={{ color: 'var(--text-muted)' }}>{msg.time}</span>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #f43f5e, #be123c)' }}>
              <Heart size={14} fill="white" style={{ color: 'white' }} />
            </div>
            <div className="px-4 py-3 rounded-2xl flex items-center gap-1.5"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '4px 18px 18px 18px' }}>
              <span className="typing-dot w-2 h-2 rounded-full" style={{ background: '#f43f5e' }} />
              <span className="typing-dot w-2 h-2 rounded-full" style={{ background: '#f43f5e' }} />
              <span className="typing-dot w-2 h-2 rounded-full" style={{ background: '#f43f5e' }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2">
          {suggestions.map(s => (
            <button key={s} onClick={() => sendMessage(s)}
              className="text-xs px-3 py-2 rounded-xl transition-all hover:opacity-80 text-left"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-3">
        <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-2xl"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
          <Sparkles size={16} style={{ color: '#f43f5e', flexShrink: 0 }} />
          <input
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: 'var(--text-primary)' }}
            placeholder="Ask about your heart health..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
          />
        </div>
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || loading}
          className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:opacity-80 disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg, #f43f5e, #be123c)' }}>
          <Send size={16} style={{ color: 'white' }} />
        </button>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
        CardioAI provides health information only — not medical advice. Always consult your doctor.
      </p>
    </div>
  )
}
