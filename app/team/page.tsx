'use client'

import { Section } from '@/components/Section'
import { Card } from '@/components/Card'
import { Badge } from '@/components/Badge'
import { CTA, CTAGroup } from '@/components/CTA'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'
import Image from 'next/image'
import teamData from '@/content/team.json'

export default function TeamPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-24">
        <motion.div variants={fadeInUp} className="text-center space-y-6 mb-16">
          <Badge variant="violet" animate>Our Team</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-tight font-bold">
            Experience Meets
            <br />
            <span className="gradient-text">Systematic Discipline</span>
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            Our team combines decades of institutional experience with systematic 
            trading expertise, operating under FCA regulation from London.
          </p>
        </motion.div>
      </Section>

      {/* Culture & Principles */}
      <Section 
        title="Our Culture"
        subtitle="Decision-making principles that guide everything we do"
        centered
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {culturePrinciples.map((principle, index) => (
            <motion.div
              key={principle.title}
              variants={fadeInUp}
              custom={index}
            >
              <Card className="text-center h-full p-6">
                <div className="w-12 h-12 bg-gradient-violet rounded-lg flex items-center justify-center mx-auto mb-4">
                  {principle.icon}
                </div>
                <h3 className="font-semibold mb-2">{principle.title}</h3>
                <p className="text-sm text-muted">{principle.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Team Members */}
      <Section 
        id="team-members"
        className="bg-card/30"
        title="Leadership Team"
        subtitle="Institutional experience in systematic trading and risk management"
        centered
      >
        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {teamData.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))}
        </motion.div>
      </Section>

      {/* Advisors Section */}
      <Section 
        id="advisors"
        title="Advisory Board"
        subtitle="Strategic guidance from industry veterans"
        centered
      >
        <motion.div variants={fadeInUp}>
          <Card className="text-center p-8 lg:p-12">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-gradient-violet rounded-full flex items-center justify-center mx-auto">
                <AdvisorIcon />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Advisory Positions Available</h3>
                <p className="text-muted max-w-2xl mx-auto">
                  We are building our advisory board with experienced professionals 
                  from institutional trading, regulatory compliance, and digital assets. 
                  Positions will be announced as they are filled.
                </p>
              </div>
              <Badge variant="outline">Coming Soon</Badge>
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* CTA */}
      <Section className="text-center">
        <motion.div variants={fadeInUp} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-tight font-bold">Questions About Our Approach?</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Learn more about our systematic strategies or review our regulatory framework.
            </p>
          </div>
          
          <CTAGroup>
            <CTA href="/about" variant="primary">
              Our Approach
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

interface TeamMember {
  name: string
  role: string
  specialty: string
  bio: string
  image?: string
  linkedin?: string
}

interface TeamMemberCardProps {
  member: TeamMember
  index: number
}

function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  return (
    <motion.div variants={fadeInUp} custom={index}>
      <Card className="text-center h-full p-6" hover>
        <div className="space-y-4">
          {/* Profile Image */}
          <div className="w-24 h-24 mx-auto relative">
            {member.image ? (
              <div className="w-24 h-24 bg-gradient-violet rounded-full flex items-center justify-center p-2">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain rounded-full"
                />
              </div>
            ) : (
              <div className="w-24 h-24 bg-gradient-violet rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <UserIcon />
                </div>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-violet font-medium">{member.role}</p>
            <Badge variant="outline" size="sm" className="mt-2">
              {member.specialty}
            </Badge>
          </div>
          
          <p className="text-sm text-muted leading-relaxed">{member.bio}</p>
          
          {member.linkedin && (
            <CTA 
              href={member.linkedin} 
              variant="ghost" 
              size="sm"
              external
            >
              LinkedIn Profile
            </CTA>
          )}
        </div>
      </Card>
    </motion.div>
  )
}

const culturePrinciples = [
  {
    title: 'Evidence-Based',
    description: 'All decisions backed by quantitative analysis and empirical data.',
    icon: <DataIcon />,
  },
  {
    title: 'Risk-Conscious',
    description: 'Capital preservation through systematic risk management protocols.',
    icon: <ShieldIcon />,
  },
  {
    title: 'Transparent',
    description: 'Clear communication of methods, risks, and performance attribution.',
    icon: <TransparencyIcon />,
  },
  {
    title: 'Disciplined',
    description: 'Systematic execution without emotional interference or overrides.',
    icon: <DisciplineIcon />,
  },
]


// Icon Components
function UserIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  )
}

function AdvisorIcon() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
  )
}

function DataIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  )
}

function TransparencyIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  )
}

function DisciplineIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
    </svg>
  )
}
