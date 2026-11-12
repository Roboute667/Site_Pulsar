import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RoutingCat } from 'routingcat/next'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pulsar | Alternative Multi-Strategy Fund',
  description: 'FCA-regulated alternative investment fund combining macro, options, discretionary, fund of funds, and Bitcoin strategies. Robust, agile, and innovative.',
  keywords: ['alternative investment', 'multi-strategy fund', 'global macro', 'options volatility', 'bitcoin allocation', 'FCA regulated', 'London'],
  authors: [{ name: 'Pulsar Fund Management' }],
  creator: 'Pulsar Fund Management',
  publisher: 'Pulsar Fund Management',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://site-pulsar-c7uq.vercel.app',
    siteName: 'Pulsar Fund Management',
    title: 'Pulsar | Alternative Multi-Strategy Fund',
    description: 'FCA-regulated alternative investment fund combining five complementary strategies for all market conditions.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pulsar | Alternative Multi-Strategy Fund',
    description: 'FCA-regulated alternative investment fund combining five complementary strategies for all market conditions.',
  },
  icons: {
    icon: [
      { url: '/images/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/images/logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/images/logo.png',
  },
  metadataBase: new URL('https://site-pulsar-c7uq.vercel.app'),
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#742aa9',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-bg text-fg">
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </div>
        <RoutingCat />
      </body>
    </html>
  )
}
