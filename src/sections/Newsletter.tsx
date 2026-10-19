import { useId, useState, type FormEvent } from 'react'
import { Button } from '../components/Button'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/*
 * Static site: there is no mailing-list backend, so the form validates the
 * address and confirms locally. Wire `onSubmit` to an email provider to go live.
 */
export function Newsletter() {
  const inputId = useId()
  const messageId = useId()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'error' | 'done'>('idle')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus('error')
      return
    }
    setStatus('done')
    setEmail('')
  }

  return (
    <section id="newsletter" aria-labelledby="newsletter-title" className="on-dark bg-sky-deep py-14 text-white lg:py-24">
      <div className="container-page flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="flex max-w-[460px] flex-col gap-4">
          <p className="t-eyebrow">Newsletter</p>
          <h2 id="newsletter-title" className="t-display-l">
            Join the list
          </h2>
          <p className="t-body-l">Early access to new collections, styling notes and invitations to private events.</p>
        </div>

        <form noValidate onSubmit={onSubmit} className="flex w-full flex-col gap-4 lg:max-w-[578px]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <label htmlFor={inputId} className="sr-only">
              Email address
            </label>
            <input
              id={inputId}
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (status !== 'idle') setStatus('idle')
              }}
              aria-invalid={status === 'error'}
              aria-describedby={messageId}
              placeholder="Email address"
              className="t-body h-[52px] w-full border md:flex-1 border-white bg-white px-4 text-ink outline-none placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white lg:h-[54px] lg:px-5"
            />
            <Button variant="light" type="submit" className="w-full md:w-auto">
              Subscribe
            </Button>
          </div>
          <p id={messageId} className="t-body-s lg:max-w-[520px]" aria-live="polite">
            {status === 'error' && 'Please enter a valid email address.'}
            {status === 'done' && 'Thank you — you’re on the list.'}
            {status === 'idle' && (
              <>
                By subscribing you agree to our Privacy Policy.{' '}
                <span className="lg:hidden">Unsubscribe at any time.</span>
                <span className="hidden lg:inline">You can unsubscribe at any time.</span>
              </>
            )}
          </p>
        </form>
      </div>
    </section>
  )
}
