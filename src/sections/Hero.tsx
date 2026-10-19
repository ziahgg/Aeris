import { Button } from '../components/Button'
import { images } from '../content/images'

export function Hero() {
  return (
    <section id="hero" aria-label="Autumn / Winter 2026 collection" className="on-dark relative isolate overflow-hidden bg-sky text-white">
      <picture>
        <source media="(min-width: 48rem)" srcSet={images.hero} />
        <img
          src={images.heroMobile}
          alt="Three women in ivory and black tailoring standing on a rooftop under a blue sky"
          fetchPriority="high"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
      </picture>
      {/* Scrims: bottom fade on mobile, left fade on desktop */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[64%] bg-gradient-to-b from-ink/0 to-ink/60 lg:hidden" />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 -z-10 hidden w-[62.5%] bg-gradient-to-r from-[#1f2b3d]/42 to-[#1f2b3d]/0 lg:block"
      />

      <div className="flex h-[660px] flex-col justify-end px-5 pb-9 md:h-[720px] md:px-10 md:pb-16 lg:h-[780px] lg:justify-start lg:px-24 lg:pt-[156px] lg:pb-0">
        <div className="flex max-w-[500px] flex-col gap-4 lg:gap-6">
          <p className="t-eyebrow">
            <span className="lg:hidden">New collection — AW26</span>
            <span className="hidden lg:inline">New collection — Autumn / Winter 2026</span>
          </p>
          <h1 className="t-display-xl">
            Style.
            <br />
            Confidence.
            <br />
            You.
          </h1>
          <p className="t-body-l max-w-[320px] lg:max-w-[440px]">
            Clothing for people who choose quality, freedom and character.
            <span className="hidden lg:inline"> Clean lines, quiet colour and pieces made to be lived in.</span>
          </p>
          <div className="flex flex-col items-stretch gap-8 lg:mt-8 lg:flex-row lg:items-center">
            <Button variant="light" href="#best-sellers" className="md:self-start">
              Shop Now
            </Button>
            <Button variant="link-light" href="#campaign" className="max-lg:hidden">
              Discover the campaign
            </Button>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="t-eyebrow absolute bottom-[50px] left-24 hidden items-center gap-3 lg:flex">
        <span>01</span>
        <span className="h-px w-16 bg-white" />
        <span className="h-px w-16 bg-white" />
        <span>03</span>
      </div>
    </section>
  )
}
