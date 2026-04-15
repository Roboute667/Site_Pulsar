'use client'

import { Section } from '@/components/Section'
import { Accordion } from '@/components/Accordion'
import { Badge } from '@/components/Badge'
import { CTA, CTAGroup } from '@/components/CTA'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/motion'

export default function FAQPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-24">
        <motion.div variants={fadeInUp} className="text-center space-y-6 mb-16">
          <Badge variant="violet" animate>Frequently Asked Questions</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-tight font-bold">
            Questions &
            <br />
            <span className="gradient-text">Clear Answers</span>
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            Common questions about our systematic approach, risk management, 
            and regulatory framework.
          </p>
        </motion.div>
      </Section>

      {/* FAQ Categories */}
      <Section>
        <div className="space-y-12">
          {faqCategories.map((category) => (
            <motion.div key={category.title} variants={fadeInUp}>
              <div className="mb-8">
                <h2 className="text-2xl font-tight font-bold mb-2">{category.title}</h2>
                <p className="text-muted">{category.description}</p>
              </div>
              <Accordion items={category.items} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Contact CTA */}
      <Section className="bg-card/30 text-center">
        <motion.div variants={fadeInUp} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-tight font-bold">Still Have Questions?</h2>
            <p className="text-muted max-w-2xl mx-auto">
              For additional information about our strategies or regulatory framework, 
              please review our disclosures or contact us directly.
            </p>
          </div>
          
          <CTAGroup>
            <CTA href="mailto:contact@pulsarfund.com" variant="primary" external>
              Contact Us
            </CTA>
            <CTA href="/disclosures" variant="secondary">
              View Disclosures
            </CTA>
          </CTAGroup>
        </motion.div>
      </Section>
    </>
  )
}

const faqCategories = [
  {
    title: 'Fundamentals & Access',
    description: 'Basic information about eligibility, jurisdictions, and onboarding',
    items: [
      {
        id: 'what-is-pulsar',
        question: 'What is Pulsar Fund Management?',
        answer: 'Pulsar is an FCA-regulated fund management company based in London. We operate systematic options strategies enhanced with Bitcoin allocation overlay, focusing on disciplined risk management and institutional-grade execution.',
      },
      {
        id: 'who-can-invest',
        question: 'Who can invest with Pulsar?',
        answer: 'We work with professional investors, institutional clients, and qualified individuals who meet FCA eligibility requirements. Specific criteria depend on jurisdiction and investment size. Please contact us for detailed eligibility information.',
      },
      {
        id: 'minimum-investment',
        question: 'What is the minimum investment?',
        answer: 'Minimum investment amounts vary by fund structure and investor type. We will provide specific details during the onboarding process based on your jurisdiction and investor classification.',
      },
      {
        id: 'jurisdictions',
        question: 'Which jurisdictions do you serve?',
        answer: 'As an FCA-regulated entity, we primarily serve UK and European investors. We may accept investors from other jurisdictions subject to regulatory approval and compliance requirements.',
      },
    ],
  },
  {
    title: 'Strategy & Risk',
    description: 'Details about our systematic approach and risk management',
    items: [
      {
        id: 'options-strategy',
        question: 'How do your options strategies work?',
        answer: 'We employ systematic, intraday options strategies designed to capture time decay and volatility inefficiencies. Our algorithms execute delta-neutral positions with active gamma management, focusing on consistent risk-adjusted returns rather than directional bets.',
      },
      {
        id: 'bitcoin-overlay',
        question: 'Why include Bitcoin allocation?',
        answer: 'Bitcoin allocation serves as a portfolio enhancement tool, providing uncorrelated returns and potential diversification benefits. Our approach is systematic, not speculative—using volatility-adjusted position sizing and correlation monitoring.',
      },
      {
        id: 'risk-management',
        question: 'How do you manage risk?',
        answer: 'We employ multiple risk controls: defined maximum drawdown limits, real-time position monitoring, dynamic sizing based on volatility, and systematic stop-loss protocols. All positions are subject to automated risk management systems.',
      },
      {
        id: 'performance-expectations',
        question: 'What returns should I expect?',
        answer: 'We do not provide return projections or performance targets. Our focus is on consistent, risk-adjusted performance through systematic execution. Past performance is not indicative of future results, and all investments carry risk of loss.',
      },
    ],
  },
  {
    title: 'Operations',
    description: 'Information about reporting, custody, and operational procedures',
    items: [
      {
        id: 'reporting-frequency',
        question: 'How often do you provide performance reports?',
        answer: 'We provide monthly performance reports with detailed attribution analysis. Additional reporting may be available based on investor requirements and fund structure.',
      },
      {
        id: 'custody-prime',
        question: 'Who provides custody and prime brokerage?',
        answer: 'We work with institutional-grade custodians and prime brokers that meet FCA regulatory standards. Specific arrangements will be disclosed during the investment process.',
      },
      {
        id: 'liquidity-terms',
        question: 'What are the liquidity terms?',
        answer: 'Liquidity terms vary by fund structure and will be clearly outlined in the relevant offering documents. We aim to provide reasonable liquidity while maintaining operational efficiency.',
      },
      {
        id: 'fees-structure',
        question: 'What is your fee structure?',
        answer: 'Fee structures are detailed in the relevant fund documentation and vary based on fund type and investor classification. All fees are disclosed transparently before investment.',
      },
    ],
  },
  {
    title: 'Compliance',
    description: 'Regulatory framework and compliance information',
    items: [
      {
        id: 'fca-regulation',
        question: 'What does FCA regulation mean for investors?',
        answer: 'FCA regulation provides investor protection through capital requirements, conduct standards, and regulatory oversight. We operate under UK regulatory framework with institutional-grade compliance and risk management standards.',
      },
      {
        id: 'investor-protection',
        question: 'What investor protections are in place?',
        answer: 'As an FCA-regulated entity, we maintain segregated client assets, professional indemnity insurance, and comply with conduct of business rules. Specific protections depend on investor classification and jurisdiction.',
      },
      {
        id: 'regulatory-reporting',
        question: 'How do you handle regulatory reporting?',
        answer: 'We maintain comprehensive regulatory reporting in compliance with FCA requirements, including transaction reporting, position monitoring, and risk management documentation.',
      },
      {
        id: 'complaints-procedure',
        question: 'What is your complaints procedure?',
        answer: 'We maintain a formal complaints procedure in line with FCA requirements. Details are provided in our client agreements and are available upon request.',
      },
    ],
  },
]
