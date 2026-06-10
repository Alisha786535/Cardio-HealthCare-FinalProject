import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CardioAI — Cardiac Health Assistant',
  description: 'AI-powered cardiac health platform for personalized heart care guidance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
