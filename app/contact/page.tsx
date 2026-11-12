import type { Metadata } from 'next'
import { Section } from '@/components/Section'
import { Badge } from '@/components/Badge'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact | Pulsar',
  description: 'Get in touch with Pulsar about our strategies or regulatory framework.',
}

export default function ContactPage() {
  return (
    <Section className="pt-24">
      <div className="text-center space-y-6 mb-12">
        <Badge variant="violet">Contact</Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-tight font-bold">
          Get in <span className="gradient-text">Touch</span>
        </h1>
        <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
          Questions about our strategies or regulatory framework? Send us a message and we will
          get back to you.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <ContactForm />
        <p className="text-center text-sm text-muted">
          Or email us directly at{' '}
          <a href="mailto:contact@pulsarfund.com" className="text-violet hover:underline">
            contact@pulsarfund.com
          </a>
        </p>
      </div>
    </Section>
  )
}
