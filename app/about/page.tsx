'use client'

import { Section } from '@/components/Section'
import { Card } from '@/components/Card'
import { Badge } from '@/components/Badge'
import { CTA, CTAGroup } from '@/components/CTA'
import { motion } from 'framer-motion'
import { fadeInUp, slideInLeft, slideInRight } from '@/lib/motion'

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-24">
        <motion.div variants={fadeInUp} className="text-center space-y-6 mb-16">
          <Badge variant="violet" animate>About Pulsar</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-tight font-bold">
            Systematic Precision
            <br />
            <span className="gradient-text">Measured Enhancement</span>
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            We combine systematic options strategies with Bitcoin allocation overlay, 
            operating under FCA regulation from London with institutional discipline.
          </p>
        </motion.div>
      </Section>

      {/* Mission Statement */}
      <Section title="Our Mission" centered>
        <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
          <Card className="text-center p-8 lg:p-12">
            <p className="text-lg leading-relaxed text-muted">
              To deliver systematic, risk-controlled returns through disciplined options strategies 
              enhanced with strategic Bitcoin allocation. We operate with institutional rigor, 
              regulatory compliance, and transparent communication—no promises of outsized returns, 
              only measured pursuit of consistent alpha generation.
            </p>
          </Card>
        </motion.div>
      </Section>

      {/* Approach */}
      <Section 
        id="approach"
        title="Our Approach"
        subtitle="Two complementary strategies working in systematic harmony"
        centered
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div variants={slideInLeft}>
            <Card className="h-full p-8" glowBorder>
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-violet rounded-lg flex items-center justify-center">
                    <OptionsIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Systematic Options</h3>
                    <Badge variant="outline" size="sm">Intraday Strategies</Badge>
                  </div>
                </div>
                
                <p className="text-muted leading-relaxed">
                  Algorithmic execution of options strategies designed to capture time decay 
                  and volatility inefficiencies. Positions are held intraday with systematic 
                  entry and exit rules based on quantitative signals.
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Key Features:</h4>
                  <ul className="space-y-2 text-sm text-muted">
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-violet rounded-full" />
                      <span>Delta-neutral positioning with gamma management</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-violet rounded-full" />
                      <span>Volatility surface analysis and mean reversion</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-violet rounded-full" />
                      <span>Real-time risk monitoring and position limits</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={slideInRight}>
            <Card className="h-full p-8" glowBorder>
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-violet rounded-lg flex items-center justify-center">
                    <BitcoinIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Bitcoin Overlay</h3>
                    <Badge variant="outline" size="sm">Strategic Allocation</Badge>
                  </div>
                </div>
                
                <p className="text-muted leading-relaxed">
                  Systematic Bitcoin allocation designed to provide uncorrelated returns 
                  and portfolio enhancement. Not speculative trading—measured exposure 
                  based on volatility-adjusted position sizing.
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Key Features:</h4>
                  <ul className="space-y-2 text-sm text-muted">
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-violet rounded-full" />
                      <span>Volatility-adjusted position sizing</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-violet rounded-full" />
                      <span>Correlation monitoring with traditional assets</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-violet rounded-full" />
                      <span>Institutional custody and execution</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Risk & Controls */}
      <Section 
        id="risk"
        className="bg-card/30"
        title="Risk & Controls"
        subtitle="Disciplined risk management is fundamental to our approach"
        centered
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {riskControls.map((control, index) => (
            <motion.div
              key={control.title}
              variants={fadeInUp}
              custom={index}
            >
              <Card className="h-full text-center p-6">
                <div className="w-12 h-12 bg-gradient-violet rounded-lg flex items-center justify-center mx-auto mb-4">
                  {control.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3">{control.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{control.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Location & Regulation */}
      <Section id="regulation">
        <motion.div variants={fadeInUp}>
          <Card className="bg-gradient-to-r from-g4/20 to-g3/20 border-g3/20 p-8 lg:p-12 text-center">
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-4">
                <Badge variant="violet">FCA Regulated</Badge>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-tight font-bold">
                London-Based, Institutionally Regulated
              </h2>
              
              <p className="text-muted max-w-3xl mx-auto leading-relaxed">
                Pulsar Fund Management Ltd is authorised and regulated by the Financial Conduct Authority. 
                We operate under UK regulatory framework with institutional-grade compliance, 
                risk management, and investor protection standards.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-lg font-semibold">FCA Authorised</div>
                  <div className="text-sm text-muted">Regulatory compliance</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">London Based</div>
                  <div className="text-sm text-muted">UK jurisdiction</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">Institutional Grade</div>
                  <div className="text-sm text-muted">Professional standards</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* CTA */}
      <Section className="text-center">
        <motion.div variants={fadeInUp} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-tight font-bold">Learn More</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Meet our team, explore frequently asked questions, or review our regulatory disclosures.
            </p>
          </div>
          
          <CTAGroup>
            <CTA href="/team" variant="primary">
              Meet the Team
            </CTA>
            <CTA href="/faq" variant="secondary">
              FAQ
            </CTA>
            <CTA href="/disclosures" variant="outline">
              Disclosures
            </CTA>
          </CTAGroup>
        </motion.div>
      </Section>
    </>
  )
}

const riskControls = [
  {
    title: 'Drawdown Limits',
    description: 'Maximum drawdown thresholds with automatic position reduction protocols.',
    icon: <DrawdownIcon />,
  },
  {
    title: 'Position Sizing',
    description: 'Dynamic allocation based on volatility, correlation, and market conditions.',
    icon: <SizingIcon />,
  },
  {
    title: 'Real-time Monitoring',
    description: 'Continuous risk assessment with automated alerts and intervention triggers.',
    icon: <MonitoringIcon />,
  },
]

// Icon Components
function OptionsIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
    </svg>
  )
}

function BitcoinIcon() {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.546z"/>
      <path fill="#fff" d="M16.103 10.666c.227-1.518-.93-2.334-2.513-2.878l.514-2.058-1.254-.313-.5 2.005c-.329-.082-.667-.159-1.003-.236l.504-2.02-1.254-.313-.514 2.058c-.273-.062-.54-.125-.8-.19l.001-.007-1.729-.432-.333 1.337s.93.213.91.227c.508.127.6.463.584.729l-.584 2.341c.035.009.08.022.13.043l-.132-.033-.820 3.281c-.062.154-.22.385-.576.297.013.018-.91-.227-.91-.227l-.621 1.432 1.632.407c.304.076.601.156.893.231l-.520 2.088 1.254.313.514-2.061c.342.093.673.178.996.261l-.513 2.051 1.254.313.520-2.085c2.14.405 3.751.242 4.426-1.694.543-1.559-.027-2.457-1.154-3.041.820-.189 1.437-.728 1.602-1.840zm-2.87 4.025c-.388 1.56-3.014.717-3.865.505l.689-2.761c.851.212 3.581.632 3.176 2.256zm.388-4.049c-.354 1.42-2.541.699-3.246.522l.624-2.506c.705.176 2.99.504 2.622 1.984z"/>
    </svg>
  )
}

function DrawdownIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
    </svg>
  )
}

function SizingIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.254 48.254 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.589-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.589-1.202L5.25 4.971Z" />
    </svg>
  )
}

function MonitoringIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  )
}
