'use server'

import { createHash } from 'node:crypto'
import { routingcat } from 'routingcat/next'

export interface ContactState {
  readonly ok: boolean
  readonly message: string
  /** What the visitor typed, handed back so a failed send does not clear the form. */
  readonly values?: { readonly name: string; readonly email: string; readonly message: string }
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DEFAULT_TO = 'vfabre@pulsar-capital-management.com'
const DEFAULT_FROM = 'Pulsar Website <onboarding@resend.dev>'

/**
 * The contact form's Server Function. It emails the message through Resend and,
 * once the email is accepted, reports the conversion to RoutingCat.
 *
 * Environment variables:
 * - RESEND_API_KEY: the Resend API key (required)
 * - CONTACT_TO_EMAIL: the inbox that receives the messages (optional, defaults to DEFAULT_TO)
 * - CONTACT_FROM_EMAIL: the sender, on a domain verified in Resend (optional)
 */
export async function sendContactMessage(
  _previous: ContactState | null,
  form: FormData,
): Promise<ContactState> {
  // Honeypot: real visitors never fill this hidden field. Its name is one browser autofill ignores.
  if (String(form.get('hp_check') ?? '') !== '') {
    console.warn('Contact form: honeypot filled, message dropped.')
    return { ok: true, message: 'Thank you. We will get back to you shortly.' }
  }

  const name = String(form.get('name') ?? '').trim().slice(0, 200)
  const email = String(form.get('email') ?? '').trim().slice(0, 320)
  const message = String(form.get('message') ?? '').trim().slice(0, 5000)

  const values = { name, email, message }

  if (!name) return { ok: false, message: 'Please enter your name.', values }
  if (!EMAIL.test(email)) return { ok: false, message: 'Please enter a valid email address.', values }
  if (message.length < 10) return { ok: false, message: 'Please enter a message of at least 10 characters.', values }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_TO
  if (!apiKey) {
    console.error('Contact form: RESEND_API_KEY is not set.')
    return { ok: false, message: 'The contact form is temporarily unavailable. Please try again later.', values }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
        to: [to],
        reply_to: email,
        subject: `Pulsar website enquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    })
    if (!response.ok) {
      console.error('Contact form: Resend answered', response.status, await response.text())
      return { ok: false, message: 'Your message could not be sent. Please try again later.', values }
    }
  } catch (error) {
    console.error('Contact form: sending failed', error)
    return { ok: false, message: 'Your message could not be sent. Please try again later.', values }
  }

  console.log('Contact form: message sent.')

  // The conversion, counted once per address without keeping it: a hash of the normalized email.
  const id = createHash('sha256').update(email.toLowerCase()).digest('hex')
  routingcat.track('contact', { id: `contact:${id}` })

  return { ok: true, message: 'Thank you. We will get back to you shortly.' }
}
