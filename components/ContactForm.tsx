'use client'

import { useActionState } from 'react'
import { sendContactMessage, type ContactState } from '@/app/actions'

const fieldClasses =
  'w-full rounded-lg bg-bg border border-g3 px-4 py-3 text-fg placeholder:text-muted/60 ' +
  'focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent transition-colors'

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState | null, FormData>(
    sendContactMessage,
    null,
  )

  if (state?.ok) {
    return (
      <div
        role="status"
        className="rounded-2xl bg-card border border-violet/30 p-8 text-center space-y-3"
      >
        <h2 className="text-2xl font-tight font-bold">Message sent</h2>
        <p className="text-muted">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={action} className="rounded-2xl bg-card border border-g3/60 p-6 sm:p-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            defaultValue={state?.values?.name}
            type="text"
            required
            maxLength={200}
            autoComplete="name"
            className={fieldClasses}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            defaultValue={state?.values?.email}
            type="email"
            required
            maxLength={320}
            autoComplete="email"
            className={fieldClasses}
          />
        </div>
      </div>

      {/* Honeypot: hidden from visitors, filled only by bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-hp">Leave this field empty</label>
        <input id="contact-hp" name="hp_check" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          defaultValue={state?.values?.message}
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          className={fieldClasses}
        />
      </div>

      {state && !state.ok && (
        <p role="alert" className="text-sm text-red-400">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center font-medium rounded-lg px-8 py-3 bg-gradient-violet text-white shadow-lg hover:opacity-90 hover:shadow-violet/25 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet focus:ring-offset-2 focus:ring-offset-bg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
