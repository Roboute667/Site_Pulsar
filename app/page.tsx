'use client'

import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'
import { FeatureCard } from '@/components/Card'
import { Badge } from '@/components/Badge'
import { CTA, CTAGroup } from '@/components/CTA'
import { motion } from 'framer-motion'
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from '@/lib/motion'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="relative">
      {/* Subtle background fades - positioned behind all content */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Top right fade - behind navbar area */}
        <div className="absolute top-32 right-16 w-72 h-72 bg-violet/2 rounded-full blur-3xl" />
        {/* Left side fade - mid page */}
        <div className="absolute top-1/2 left-0 w-56 h-80 bg-purple-500/1.5 rounded-full blur-3xl transform -translate-x-16" />
        {/* Bottom right fade - near footer */}
        <div className="absolute bottom-1/3 right-12 w-64 h-64 bg-violet/1.5 rounded-full blur-3xl" />
        {/* Center left subtle fade - between sections */}
        <div className="absolute top-2/3 left-1/3 w-40 h-40 bg-indigo-400/1 rounded-full blur-2xl" />
        {/* Top center fade - very subtle */}
        <div className="absolute top-20 left-1/2 w-48 h-48 bg-violet/1 rounded-full blur-3xl transform -translate-x-1/2" />
        {/* Bottom left corner fade */}
        <div className="absolute bottom-20 left-8 w-52 h-52 bg-purple-600/1.5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10">
        <Hero />
        
        {/* Powered By Banner */}
        <motion.div 
          className="bg-card/20"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              variants={fadeInUp}
              className="text-center py-8"
            >
              <p className="text-sm text-muted mb-4 font-medium">Powered by</p>
              <div className="flex justify-center">
                <Image
                  src="/images/placeholderpowered.png"
                  alt="Powered by"
                  width={1000}
                  height={200}
                  className="opacity-70 hover:opacity-90 transition-opacity duration-300 max-w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      
      {/* Multi-Strategy Overview */}
      <Section 
        id="strategies"
        title="Five Complementary Strategies"
        subtitle="Diversified approach designed to perform across all market conditions through uncorrelated return drivers."
        centered
      >
        {/* Fund Structure Pie Chart */}
        <div className="mb-16">
          <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Pie Chart */}
              <div className="flex justify-center">
                <div className="relative w-80 h-80">
                  <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                    {/* Global Macro - 45% */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="url(#gradient-violet)"
                      strokeWidth="20"
                      strokeDasharray="226 504"
                      strokeDashoffset="0"
                      className="drop-shadow-lg"
                    />
                    {/* Options & Volatility - 20% */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#d946ef"
                      strokeWidth="20"
                      strokeDasharray="100 504"
                      strokeDashoffset="-226"
                      className="drop-shadow-lg"
                    />
                    {/* Discretionary - 15% */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="20"
                      strokeDasharray="75 504"
                      strokeDashoffset="-326"
                      className="drop-shadow-lg"
                    />
                    {/* Fund of Funds - 10% */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="20"
                      strokeDasharray="50 504"
                      strokeDashoffset="-401"
                      className="drop-shadow-lg"
                    />
                    {/* Bitcoin - 10% */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="20"
                      strokeDasharray="50 504"
                      strokeDashoffset="-451"
                      className="drop-shadow-lg"
                    />
                    
                    {/* Gradient Definition */}
                    <defs>
                      <linearGradient id="gradient-violet" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#742aa9" />
                        <stop offset="100%" stopColor="#b477e0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Center Label */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-fg">Fund</div>
                      <div className="text-sm text-muted">Structure</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Legend */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-gradient-violet"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Global Macro</span>
                      <span className="text-2xl font-bold text-violet">45%</span>
                    </div>
                    <p className="text-xs text-muted">Strategic core across all asset classes</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-fuchsia-500"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Options & Volatility</span>
                      <span className="text-2xl font-bold text-fuchsia-500">20%</span>
                    </div>
                    <p className="text-xs text-muted">Asymmetric exposure and convexity</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-indigo-400"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Discretionary</span>
                      <span className="text-2xl font-bold text-indigo-400">15%</span>
                    </div>
                    <p className="text-xs text-muted">Tactical high-potential opportunities</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-cyan-500"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Fund of Funds</span>
                      <span className="text-2xl font-bold text-cyan-500">10%</span>
                    </div>
                    <p className="text-xs text-muted">External diversification</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-orange-400"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Bitcoin</span>
                      <span className="text-2xl font-bold text-orange-400">10%</span>
                    </div>
                    <p className="text-xs text-muted">Capped at 15%, automatic rebalancing</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side: 4 traditional strategies in 2x2 grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={fadeInUp} className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-violet rounded-full"></div>
                  <Badge variant="violet">45%</Badge>
                </div>
                <h3 className="text-xl font-semibold">Global Macro</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Strategic core exploiting all asset classes (ETFs, options, equities, rates) 
                  for medium to long-term performance across macroeconomic contexts.
                </p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-fuchsia-500 rounded-full"></div>
                  <Badge variant="outline">20%</Badge>
                </div>
                <h3 className="text-xl font-semibold">Options & Volatility</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Specialized strategy leveraging implied volatility and market inefficiencies 
                  for asymmetric exposure while controlling risk.
                </p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
                  <Badge variant="outline">15%</Badge>
                </div>
                <h3 className="text-xl font-semibold">Discretionary</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Agile tactical allocation for short-term high-potential opportunities 
                  via futures, equities, and derivatives.
                </p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                  <Badge variant="outline">10%</Badge>
                </div>
                <h3 className="text-xl font-semibold">Fund of Funds</h3>
                <p className="text-muted text-sm leading-relaxed">
                  External diversification through selected third-party managers 
                  providing uncorrelated returns independent of our market view.
                </p>
              </motion.div>
            </div>
          </div>
          
          {/* Right side: Bitcoin strategy highlighted */}
          <div className="lg:col-span-1">
            <motion.div 
              variants={fadeInUp} 
              className="relative bg-gradient-to-br from-orange-500/10 via-orange-400/5 to-yellow-500/10 rounded-2xl p-6 border-2 border-orange-400/30 shadow-xl shadow-orange-500/10 hover:shadow-orange-500/20 transition-all duration-300 h-full"
            >
              {/* Bitcoin glow effect */}
              <div className="absolute inset-0 bg-gradient-radial from-orange-400/5 via-transparent to-transparent rounded-2xl" />
              
              <div className="relative space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-orange-400 rounded-full shadow-lg shadow-orange-400/50"></div>
                  <Badge variant="outline" className="border-orange-400/50 text-orange-400">10%</Badge>
                </div>
                
                <h3 className="text-2xl font-semibold text-orange-400">Bitcoin Allocation</h3>
                
                <div className="space-y-3">
                  <p className="text-muted text-sm leading-relaxed">
                    <strong className="text-orange-300">What makes us unique:</strong> Spot exposure without leverage, 
                    strictly capped at 15%. Gains automatically reallocated to main fund when allocation threshold is reached.
                  </p>
                  
                  <div className="bg-black/20 rounded-lg p-3 border border-orange-400/20">
                    <p className="text-xs text-orange-200 leading-relaxed">
                      <strong>Smart Rebalancing:</strong> When Bitcoin appreciates strongly, excess gains flow back 
                      to traditional strategies, maintaining disciplined allocation while capturing crypto upside.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Investment Philosophy Section */}
      <Section 
        id="philosophy"
        className="bg-card/30"
        title="Investment Philosophy"
        subtitle="Sustainable performance through real diversification and controlled market decorrelation"
        centered
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div variants={slideInLeft} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Opportunistic Alpha</h3>
              <p className="text-muted leading-relaxed">
                We combine systematic and discretionary approaches to capture both fundamental 
                trends and high-convexity opportunities. Dynamic allocation evolves based on 
                macroeconomic conditions, implied volatility, and proprietary signals.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-violet rounded-full"></div>
                <span className="text-sm text-muted">Performance across bull, bear, and neutral regimes</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-violet rounded-full"></div>
                <span className="text-sm text-muted">Multiple uncorrelated return drivers</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-violet rounded-full"></div>
                <span className="text-sm text-muted">Dynamic allocation without rigid constraints</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={slideInRight} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Convexity & Protection</h3>
              <p className="text-muted leading-relaxed">
                Through targeted use of options and hedging tools, we limit losses during 
                correction phases while maintaining capacity to benefit from bullish returns. 
                Our management is built around convexity: protected in downturns without 
                sacrificing upside exposure.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-violet rounded-full"></div>
                <span className="text-sm text-muted">Asymmetric risk-reward profiles</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-violet rounded-full"></div>
                <span className="text-sm text-muted">Downside protection with upside participation</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-violet rounded-full"></div>
                <span className="text-sm text-muted">Well-positioned regardless of market configuration</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* London/FCA Credibility */}
      <Section id="credibility">
        <motion.div 
          variants={fadeInUp}
          className="relative bg-gradient-to-br from-gray-900/50 via-black/30 to-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm"
        >
          {/* London Background Image */}
          <div className="absolute inset-0">
            <div className="relative w-full h-full">
              <Image
                src="/images/london.png"
                alt="London skyline"
                fill
                className="object-cover"
                 style={{
                   objectPosition: '50% calc(50% - 45px)', // Raised by 45px
                   objectFit: 'cover',
                   filter: 'grayscale(60%) brightness(0.6) contrast(1.1) saturate(0.7)',
                 }}
              />
              {/* Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
            </div>
          </div>
          
          {/* Subtle violet halo effect */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-violet/8 rounded-full blur-2xl transform -translate-x-8 -translate-y-8" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-violet/6 rounded-full blur-xl transform translate-x-6 translate-y-6" />
          
          <div className="relative z-10 py-16 px-8 text-center">
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-4">
                <span className="text-sm font-medium text-muted">ALTERNATIVE INVESTMENT FUND</span>
              </div>
              <h3 className="text-xl font-semibold text-white">London-Based — FCA Regulated</h3>
              <p className="text-gray-200 max-w-2xl mx-auto">
                FCA-regulated alternative investment fund via Appointed Representative programme. 
                Targeting UHNWI, family offices, and qualified investors with institutional-grade operations.
              </p>
              <div className="flex justify-center">
                <CTA href="/disclosures" variant="outline" size="sm">
                  View Disclosures
                </CTA>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Bitcoin Allocation Framework */}
      <Section 
        id="bitcoin"
        title="Bitcoin Allocation Framework"
        subtitle="Disciplined exposure with automatic rebalancing and strict risk controls"
        centered
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Capped Exposure */}
            <motion.div
              variants={fadeInUp}
              className="relative group h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-gray-900/60 via-black/40 to-gray-800/60 rounded-2xl p-8 backdrop-blur-sm border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300 h-full">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-violet to-violet/80 rounded-xl flex items-center justify-center shadow-lg shadow-violet/25">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold mb-3 text-white">Capped Exposure</h4>
                    <div className="mb-4">
                      <span className="text-lg font-bold text-violet">15% Maximum</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      Strictly limited to 15% of total assets. This disciplined approach captures Bitcoin's potential without compromising portfolio stability.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Automatic Rebalancing */}
            <motion.div
              variants={fadeInUp}
              className="relative group h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-gray-900/60 via-black/40 to-gray-800/60 rounded-2xl p-8 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300 h-full">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold mb-3 text-white">Automatic Rebalancing</h4>
                    <div className="mb-4 flex items-center space-x-3">
                      <span className="text-sm text-gray-300">Bitcoin ↗</span>
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                      <span className="text-sm text-gray-300">Main Fund</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      When Bitcoin appreciates strongly, excess gains are automatically reallocated to the main fund, maintaining disciplined allocation.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Progressive Support */}
            <motion.div
              variants={fadeInUp}
              className="relative group h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-green-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-gray-900/60 via-black/40 to-gray-800/60 rounded-2xl p-8 backdrop-blur-sm border border-gray-800/50 hover:border-green-500/30 transition-all duration-300 h-full">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold mb-3 text-white">Progressive Support</h4>
                    <div className="mb-4">
                      <span className="text-sm text-gray-300">Market Downturn Support</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      During crypto market downturns, the main fund progressively supports the Bitcoin allocation, enabling disciplined accumulation.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bitcoin Only */}
            <motion.div
              variants={fadeInUp}
              className="relative group h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-gray-900/60 via-black/40 to-gray-800/60 rounded-2xl p-8 backdrop-blur-sm border border-gray-800/50 hover:border-orange-500/30 transition-all duration-300 h-full">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                      <Image 
                        src="/images/bitcoin.png" 
                        alt="Bitcoin" 
                        width={32} 
                        height={32}
                        className="w-8 h-8"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold mb-3 text-white">Bitcoin Only</h4>
                    <div className="mb-4">
                      <span className="text-sm text-gray-300">No Altcoins • Long-term Focus</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      No altcoins are used. This choice reflects prudent management and a long-term view of crypto market evolution.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Why This Approach */}
      <Section 
        id="approach"
        title="Why This Approach?"
        subtitle="Combining traditional market experience with crypto-asset expertise"
        centered
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            variants={fadeInUp}
            className="relative bg-gradient-to-br from-gray-900/40 via-black/20 to-gray-800/40 rounded-lg p-6 overflow-hidden backdrop-blur-sm shadow-lg shadow-violet/5 hover:shadow-violet/15 border border-gray-800/50 hover:border-gray-700/60 transition-all duration-300 group"
          >
            <div className="absolute inset-0 bg-violet/8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <h4 className="font-semibold mb-3">Market Decorrelation</h4>
              <p className="text-sm text-muted leading-relaxed">
                Designed to function independently of traditional market directional trends. 
                Generate performance even when indices stagnate or correct through uncorrelated strategies.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            variants={fadeInUp}
            className="relative bg-gradient-to-br from-gray-900/40 via-black/20 to-gray-800/40 rounded-lg p-6 overflow-hidden backdrop-blur-sm shadow-lg shadow-violet/5 hover:shadow-violet/15 border border-gray-800/50 hover:border-gray-700/60 transition-all duration-300 group"
          >
            <div className="absolute inset-0 bg-violet/8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <h4 className="font-semibold mb-3">Multiple Alpha Sources</h4>
              <p className="text-sm text-muted leading-relaxed">
                Multiple return drivers from options derivatives to discretionary management, 
                macro trends, and Bitcoin. Diversified approaches reinforce robustness and smooth long-term performance.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            variants={fadeInUp}
            className="relative bg-gradient-to-br from-gray-900/40 via-black/20 to-gray-800/40 rounded-lg p-6 overflow-hidden backdrop-blur-sm shadow-lg shadow-violet/5 hover:shadow-violet/15 border border-gray-800/50 hover:border-gray-700/60 transition-all duration-300 group"
          >
            <div className="absolute inset-0 bg-violet/8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <h4 className="font-semibold mb-3">Dynamic Flexibility</h4>
              <p className="text-sm text-muted leading-relaxed">
                Free from rigid constraints, we adjust exposures based on macroeconomic signals, 
                volatility levels, and tactical opportunities. React quickly to brutal context changes.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

        {/* Three Pillars */}
        <Section 
          id="pillars"
          title="Three Pillars"
          subtitle="Structure, flexibility, and vision combined for sustainable performance"
          centered
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                variants={fadeInUp}
                custom={index}
                className="relative group text-center"
              >
                {/* SVG Pillar */}
                <div className="flex flex-col items-center mb-6">
                  <svg 
                    width="80" 
                    height="120" 
                    viewBox="0 0 80 120"
                    className="drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300 group-hover:scale-105"
                  >
                    <defs>
                      {/* Simple stone gradients */}
                      <linearGradient id={`stoneGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f8fafc" />
                        <stop offset="50%" stopColor="#e2e8f0" />
                        <stop offset="100%" stopColor="#cbd5e1" />
                      </linearGradient>
                      
                      <linearGradient id={`shadowGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#94a3b8" />
                        <stop offset="100%" stopColor="#64748b" />
                      </linearGradient>
                    </defs>
                    
                    {/* Pillar Base */}
                    <rect 
                      x="10" 
                      y="105" 
                      width="60" 
                      height="12" 
                      fill={`url(#stoneGradient-${index})`} 
                      stroke="#94a3b8" 
                      strokeWidth="1"
                      rx="2"
                    />
                    
                    {/* Pillar Column */}
                    <rect 
                      x="20" 
                      y="20" 
                      width="40" 
                      height="85" 
                      fill={`url(#stoneGradient-${index})`} 
                      stroke="#94a3b8" 
                      strokeWidth="1"
                    />
                    
                    {/* Column fluting (simple vertical lines) */}
                    <line x1="28" y1="20" x2="28" y2="105" stroke="#cbd5e1" strokeWidth="1" opacity="0.7"/>
                    <line x1="36" y1="20" x2="36" y2="105" stroke="#f1f5f9" strokeWidth="1" opacity="0.8"/>
                    <line x1="44" y1="20" x2="44" y2="105" stroke="#cbd5e1" strokeWidth="1" opacity="0.7"/>
                    <line x1="52" y1="20" x2="52" y2="105" stroke="#f1f5f9" strokeWidth="1" opacity="0.8"/>
                    
                    {/* Pillar Capital (Top) */}
                    <rect 
                      x="12" 
                      y="8" 
                      width="56" 
                      height="16" 
                      fill={`url(#stoneGradient-${index})`} 
                      stroke="#94a3b8" 
                      strokeWidth="1"
                      rx="2"
                    />
                    
                    {/* Capital detail line */}
                    <line x1="15" y1="16" x2="65" y2="16" stroke="#64748b" strokeWidth="1" opacity="0.6"/>
                  </svg>
                </div>
                
                {/* Title and Description below pillar */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg">{pillar.title}</h4>
                  <p className="text-sm text-muted leading-relaxed max-w-xs mx-auto">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

      {/* Final CTA */}
      <Section id="cta" className="text-center">
        <motion.div variants={fadeInUp} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-tight font-bold">
              Interested in Alternative Investment?
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Learn about our multi-strategy approach, review our regulatory framework, 
              or explore investment opportunities for qualified investors.
            </p>
          </div>
          
          <CTAGroup>
            <CTA href="/about" variant="primary" size="lg">
              Our Strategy
            </CTA>
            <CTA href="/disclosures" variant="secondary" size="lg">
              Investment Terms
            </CTA>
          </CTAGroup>
        </motion.div>
      </Section>

      {/* Contact Section */}
      <Section className="py-12">
        <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-tight font-bold">Contact Us</h2>
          </div>
          <div className="relative rounded-2xl p-px bg-gradient-to-r from-violet via-purple-400 to-violet">
            {/* Card body */}
            <div className="relative bg-black backdrop-blur-sm rounded-2xl p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              {/* Left side - Text */}
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold mb-1">Have questions or need assistance?</h3>
                <p className="text-muted text-sm">Our support team is ready to help! We aim to respond within 24 hours.</p>
              </div>
              
              {/* Right side - Contact */}
              <div className="flex flex-col items-center gap-3">
                <div className="text-center">
                  <div className="flex items-center gap-2 text-base text-fg font-medium">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    contact@pulsarfund.com
                  </div>
                </div>
                <CTA href="mailto:contact@pulsarfund.com" variant="primary" size="lg" className="px-12 py-4 min-w-[180px] w-full max-w-[220px]">
                  Email Us
                </CTA>
              </div>
            </div>
            </div>
          </div>
        </motion.div>
      </Section>
      </div>
    </div>
  )
}

const pillars = [
  {
    title: 'Structure',
    description: 'Proven strategies framed by strict risk rules. Disciplined approach to capital allocation and position management across all market conditions.'
  },
  {
    title: 'Flexibility',
    description: 'Active, reactive, and cross-asset uncorrelated management. Dynamic allocation free from rigid constraints, adapting to market opportunities.'
  },
  {
    title: 'Vision',
    description: 'Combined macro and technical analysis with fine execution capacity. Global perspective on markets with precise implementation.'
  }
]

// Icon Components
function ResearchIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
    </svg>
  )
}

function ExecutionIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  )
}

function RiskIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  )
}
