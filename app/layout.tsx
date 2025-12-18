import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Smart Tutor - Exam Mode',
  description: 'Exam Mode interface with AI helper',
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

