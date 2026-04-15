'use client'

import { Section } from '@/components/Section'
import { Card } from '@/components/Card'
import { Badge } from '@/components/Badge'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/motion'

export default function DisclosuresPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-24">
        <motion.div variants={fadeInUp} className="text-center space-y-6 mb-16">
          <Badge variant="violet" animate>Risk Disclosures</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-tight font-bold">
            Important
            <br />
            <span className="gradient-text">Risk Information</span>
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            Comprehensive risk warnings and regulatory disclosures for our investment strategies.
          </p>
        </motion.div>
      </Section>

      {/* Risk Warning */}
      <Section>
        <motion.div variants={fadeInUp}>
          <Card className="bg-gradient-to-r from-gray-900/40 via-black/20 to-gray-800/40 border-violet/20 p-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <WarningIcon className="w-8 h-8 text-violet" />
                <h2 className="text-2xl font-bold text-fg">Risk Warning</h2>
              </div>
              <div className="text-muted space-y-3">
                <p className="font-medium">
                  Investment in our strategies involves significant risk and may not be suitable for all investors.
                </p>
                <p>
                  Past performance is not indicative of future results. The value of investments can go down as well as up, 
                  and you may not get back the amount you invested. You should carefully consider whether our investment 
                  approach is suitable for your financial situation and risk tolerance.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* Strategy Risks */}
      <Section title="Strategy-Specific Risks" className="bg-card/30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div variants={fadeInUp}>
            <Card className="h-full p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-violet rounded-lg flex items-center justify-center">
                    <OptionsRiskIcon />
                  </div>
                  <h3 className="text-xl font-semibold">Options Strategy Risks</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-violet rounded-full mt-2 flex-shrink-0" />
                    <span>Options can expire worthless, resulting in total loss of premium paid</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-violet rounded-full mt-2 flex-shrink-0" />
                    <span>Leverage inherent in options can amplify both gains and losses</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-violet rounded-full mt-2 flex-shrink-0" />
                    <span>Volatility changes can significantly impact option values</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-violet rounded-full mt-2 flex-shrink-0" />
                    <span>Time decay (theta) works against long option positions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-violet rounded-full mt-2 flex-shrink-0" />
                    <span>Liquidity risk in certain option contracts</span>
                  </li>
                </ul>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="h-full p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-violet rounded-lg flex items-center justify-center">
                    <BitcoinRiskIcon />
                  </div>
                  <h3 className="text-xl font-semibold">Bitcoin Allocation Risks</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-violet rounded-full mt-2 flex-shrink-0" />
                    <span>Extreme price volatility and potential for significant losses</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-violet rounded-full mt-2 flex-shrink-0" />
                    <span>Regulatory uncertainty and potential for adverse regulation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-violet rounded-full mt-2 flex-shrink-0" />
                    <span>Technology risks including cybersecurity and operational failures</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-violet rounded-full mt-2 flex-shrink-0" />
                    <span>Limited operating history and evolving market structure</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-violet rounded-full mt-2 flex-shrink-0" />
                    <span>Custody and safekeeping risks</span>
                  </li>
                </ul>
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* General Risks */}
      <Section title="General Investment Risks">
        <motion.div variants={fadeInUp}>
          <Card className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generalRisks.map((risk, index) => (
                <div key={risk.title} className="space-y-3">
                  <h4 className="font-semibold text-fg">{risk.title}</h4>
                  <p className="text-sm text-muted leading-relaxed">{risk.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* Regulatory Information */}
      <Section title="Regulatory Information" className="bg-card/30">
        <motion.div variants={fadeInUp}>
          <Card className="p-8">
            <div className="space-y-6 text-muted">
              <div>
                <h3 className="text-lg font-semibold text-fg mb-3">FCA Regulation</h3>
                <p>
                  Pulsar Fund Management Ltd is authorised and regulated by the Financial Conduct Authority (FCA). 
                  Our FCA registration details are available on the FCA register at www.fca.org.uk/register.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-fg mb-3">Professional Clients</h3>
                <p>
                  Our services are primarily directed at professional clients and eligible counterparties 
                  as defined under FCA rules. Different levels of regulatory protection may apply depending 
                  on your client classification.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-fg mb-3">Investor Compensation</h3>
                <p>
                  Eligible clients may be entitled to compensation from the Financial Services Compensation Scheme 
                  if we cannot meet our obligations. The level of compensation depends on the type of business 
                  and your client classification.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-fg mb-3">Complaints</h3>
                <p>
                  If you have a complaint, please contact us in writing. If we cannot resolve your complaint, 
                  you may be entitled to refer it to the Financial Ombudsman Service. Details of our complaints 
                  procedure are available on request.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* No Solicitation */}
      <Section>
        <motion.div variants={fadeInUp}>
          <Card className="bg-gradient-to-r from-g4/20 to-g3/20 border-g3/20 p-8 text-center">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">No Solicitation or Advice</h3>
              <p className="text-muted max-w-3xl mx-auto">
                The information on this website does not constitute investment advice, a recommendation, 
                or a solicitation to buy or sell any investment. We do not provide investment advice 
                to retail clients. You should seek independent financial advice before making any investment decision.
              </p>
              <div className="text-sm text-muted">
                <p>This website is not directed at persons in any jurisdiction where such distribution would be prohibited.</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>
    </>
  )
}

const generalRisks = [
  {
    title: 'Market Risk',
    description: 'Risk of losses due to adverse market movements and volatility in underlying assets.',
  },
  {
    title: 'Liquidity Risk',
    description: 'Risk that positions cannot be closed or unwound at desired prices due to market conditions.',
  },
  {
    title: 'Counterparty Risk',
    description: 'Risk of loss due to the failure of counterparties to meet their obligations.',
  },
  {
    title: 'Operational Risk',
    description: 'Risk of loss due to inadequate or failed internal processes, systems, or external events.',
  },
  {
    title: 'Model Risk',
    description: 'Risk that quantitative models may not perform as expected or may contain errors.',
  },
  {
    title: 'Concentration Risk',
    description: 'Risk arising from lack of diversification or concentration in particular assets or strategies.',
  },
]

// Icon Components
function WarningIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>
  )
}

function OptionsRiskIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
    </svg>
  )
}

function BitcoinRiskIcon() {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.546z"/>
      <path fill="#0a0a0a" d="M16.103 10.666c.227-1.518-.93-2.334-2.513-2.878l.514-2.058-1.254-.313-.5 2.005c-.329-.082-.667-.159-1.003-.236l.504-2.02-1.254-.313-.514 2.058c-.273-.062-.54-.125-.8-.19l.001-.007-1.729-.432-.333 1.337s.93.213.91.227c.508.127.6.463.584.729l-.584 2.341c.035.009.08.022.13.043l-.132-.033-.820 3.281c-.062.154-.22.385-.576.297.013.018-.91-.227-.91-.227l-.621 1.432 1.632.407c.304.076.601.156.893.231l-.520 2.088 1.254.313.514-2.061c.342.093.673.178.996.261l-.513 2.051 1.254.313.520-2.085c2.14.405 3.751.242 4.426-1.694.543-1.559-.027-2.457-1.154-3.041.820-.189 1.437-.728 1.602-1.840zm-2.87 4.025c-.388 1.56-3.014.717-3.865.505l.689-2.761c.851.212 3.581.632 3.176 2.256zm.388-4.049c-.354 1.42-2.541.699-3.246.522l.624-2.506c.705.176 2.99.504 2.622 1.984z"/>
    </svg>
  )
}
