'use client'

import { Section } from '@/components/Section'
import { Card } from '@/components/Card'
import { Badge } from '@/components/Badge'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/motion'

export default function LegalPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-24">
        <motion.div variants={fadeInUp} className="text-center space-y-6 mb-16">
          <Badge variant="violet" animate>Legal Information</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-tight font-bold">
            Terms & Privacy
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            Legal framework governing the use of this website and our services.
          </p>
        </motion.div>
      </Section>

      {/* Terms of Use */}
      <Section title="Terms of Use">
        <motion.div variants={fadeInUp}>
          <Card className="prose prose-invert max-w-none p-8">
            <div className="space-y-6 text-muted leading-relaxed">
              <div>
                <h3 className="text-lg font-semibold text-fg mb-3">Website Terms</h3>
                <p>
                  This website is operated by Pulsar Fund Management Ltd, a company incorporated 
                  in England and Wales and authorised and regulated by the Financial Conduct Authority.
                </p>
                <p>
                  By accessing this website, you agree to be bound by these terms of use and 
                  all applicable laws and regulations. If you do not agree with any of these terms, 
                  you are prohibited from using or accessing this site.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-fg mb-3">Use License</h3>
                <p>
                  Permission is granted to temporarily access the materials on this website for 
                  personal, non-commercial transitory viewing only. This is the grant of a license, 
                  not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose or for any public display</li>
                  <li>attempt to reverse engineer any software contained on the website</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-fg mb-3">Disclaimer</h3>
                <p>
                  The materials on this website are provided on an 'as is' basis. Pulsar Fund Management Ltd 
                  makes no warranties, expressed or implied, and hereby disclaims and negates all other 
                  warranties including without limitation, implied warranties or conditions of merchantability, 
                  fitness for a particular purpose, or non-infringement of intellectual property or other 
                  violation of rights.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-fg mb-3">Limitations</h3>
                <p>
                  In no event shall Pulsar Fund Management Ltd or its suppliers be liable for any damages 
                  (including, without limitation, damages for loss of data or profit, or due to business 
                  interruption) arising out of the use or inability to use the materials on this website, 
                  even if Pulsar Fund Management Ltd or its authorised representative has been notified 
                  orally or in writing of the possibility of such damage.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* Privacy Policy */}
      <Section title="Privacy Policy" className="bg-card/30">
        <motion.div variants={fadeInUp}>
          <Card className="prose prose-invert max-w-none p-8">
            <div className="space-y-6 text-muted leading-relaxed">
              <div>
                <h3 className="text-lg font-semibold text-fg mb-3">Information We Collect</h3>
                <p>
                  We collect information you provide directly to us, such as when you contact us 
                  through our website or request information about our services. This may include 
                  your name, email address, and any other information you choose to provide.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-fg mb-3">How We Use Your Information</h3>
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Respond to your inquiries and provide customer service</li>
                  <li>Send you information about our services (with your consent)</li>
                  <li>Comply with legal and regulatory requirements</li>
                  <li>Protect our rights and prevent fraud</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-fg mb-3">Information Sharing</h3>
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as described in this policy or as required by law. 
                  We may share information with service providers who assist us in operating our website 
                  and conducting our business, provided they agree to keep this information confidential.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-fg mb-3">Data Security</h3>
                <p>
                  We implement appropriate security measures to protect your personal information 
                  against unauthorised access, alteration, disclosure, or destruction. However, 
                  no method of transmission over the internet or electronic storage is 100% secure.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-fg mb-3">Your Rights</h3>
                <p>
                  Under applicable data protection laws, you may have the right to access, update, 
                  or delete your personal information. You may also have the right to restrict or 
                  object to certain processing of your information. To exercise these rights, 
                  please contact us using the information provided below.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-fg mb-3">Contact Information</h3>
                <p>
                  If you have any questions about these terms or our privacy practices, 
                  please contact us at:
                </p>
                <div className="bg-bg/50 rounded-lg p-4 mt-3">
                  <p className="font-medium text-fg">Pulsar Fund Management Ltd</p>
                  <p>London, United Kingdom</p>
                  <p>Email: legal@pulsarfund.com</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* Updates */}
      <Section>
        <motion.div variants={fadeInUp}>
          <Card className="text-center p-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Policy Updates</h3>
              <p className="text-muted max-w-2xl mx-auto">
                We may update these terms and privacy policy from time to time. 
                Any changes will be posted on this page with an updated effective date.
              </p>
              <div className="text-sm text-muted">
                <p>Last updated: December 2024</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>
    </>
  )
}
