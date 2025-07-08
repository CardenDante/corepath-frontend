import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CorePath Impact - Values Driven Parenting',
  description: 'Intentional, Deliberate, Structured Values Driven Parenting. Equipping parents to raise children of conviction, compassion, and calling.',
  keywords: 'parenting, values, children, VDC toolkit, family, spiritual parenting',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white`}>
        {children}
      </body>
    </html>
  )
}