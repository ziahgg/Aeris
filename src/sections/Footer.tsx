import { Icon, type IconName } from '../components/Icon'
import { footerColumns, legalLinks, services, social, type FooterLink } from '../content/site'

export function ServiceStrip() {
  return (
    <section id="services" aria-label="Customer services" className="bg-ivory">
      <ul className="container-page grid grid-cols-2 gap-x-4 gap-y-6 py-8 lg:flex lg:justify-between lg:py-10">
        {services.map((s) => (
          <li key={s.title} className="flex items-center gap-4">
            <Icon name={s.icon} size={28} className="shrink-0" />
            <span className="flex flex-col gap-1">
              <span className="t-eyebrow">{s.title}</span>
              <span className="t-body-s text-muted">
                <span className="lg:hidden">{s.textMobile}</span>
                <span className="hidden lg:inline">{s.text}</span>
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function FooterItem({ link }: { link: FooterLink }) {
  // Entries without a destination in the design render as plain text rather than dead links.
  if (!link.href) return <span className="t-body-s">{link.label}</span>
  return (
    <a href={link.href} className="t-body-s hover:underline hover:underline-offset-4">
      {link.label}
    </a>
  )
}

const socialLinks: { name: IconName; label: string; href: string }[] = [
  { name: 'instagram', label: 'Instagram', href: social.instagram },
  { name: 'facebook', label: 'Facebook', href: social.facebook },
  { name: 'pinterest', label: 'Pinterest', href: social.pinterest },
  { name: 'tiktok', label: 'TikTok', href: social.tiktok },
]

function RegionSelector() {
  return (
    <label className="relative flex h-5 items-center gap-2">
      <span className="sr-only">Region and currency</span>
      <select
        defaultValue="us"
        className="t-body-s h-5 cursor-pointer appearance-none bg-transparent pr-6 text-white outline-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
      >
        <option value="us" className="text-ink">
          United States (USD $)
        </option>
      </select>
      <Icon name="chevron-down" size={16} className="pointer-events-none absolute right-0" />
    </label>
  )
}

export function Footer() {
  return (
    <footer id="footer" className="on-dark bg-ink text-white">
      <div className="container-page flex flex-col gap-6 pt-12 pb-8 lg:gap-16 lg:pt-24 lg:pb-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-6 lg:w-[300px]">
            <a href="#top" className="t-logo self-start" style={{ fontSize: 30 }} aria-label="AERIS home">
              Aeris
            </a>
            <p className="t-body-s">
              Considered clothing for everyday confidence.
              <span className="hidden lg:inline"> Designed in a restrained palette, made to be worn for years.</span>
            </p>
            <ul className="flex gap-3">
              {socialLinks.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`AERIS on ${s.label}`}
                    className="flex size-10 items-center justify-center rounded-full border border-white transition-colors hover:bg-white hover:text-ink"
                  >
                    <Icon name={s.name} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop columns */}
          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="hidden w-[200px] flex-col lg:flex">
              <h2 className="t-eyebrow mb-9">{col.title}</h2>
              <ul className="flex flex-col gap-4">
                {col.links.map((l) => (
                  <li key={l.label} className="flex h-5 items-center">
                    <FooterItem link={l} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Mobile accordion */}
          <div className="flex flex-col lg:hidden">
            {footerColumns.map((col) => (
              <details key={col.title} className="group border-b border-white">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 [&::-webkit-details-marker]:hidden">
                  <span className="t-eyebrow">{col.title}</span>
                  <Icon name="chevron-down" size={16} className="transition-transform group-open:rotate-180" />
                </summary>
                <ul className="flex flex-col gap-3 pb-5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <FooterItem link={l} />
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>

        <hr className="hidden border-white lg:block" />

        {/* Desktop legal row */}
        <div className="hidden items-center justify-between lg:flex">
          <p className="t-body-s">© 2026 AERIS. All rights reserved.</p>
          <ul className="flex gap-8">
            {legalLinks.map((l) => (
              <li key={l.label}>
                <FooterItem link={l} />
              </li>
            ))}
          </ul>
          <RegionSelector />
        </div>

        {/* Mobile legal stack */}
        <div className="flex flex-col gap-6 lg:hidden">
          <div className="self-start">
            <RegionSelector />
          </div>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.label}>
                <FooterItem link={{ ...l, label: l.label.replace('Terms of service', 'Terms').replace('Cookie settings', 'Cookies') }} />
              </li>
            ))}
          </ul>
          <p className="t-body-s">© 2026 AERIS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
