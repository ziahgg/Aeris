import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { images } from '../content/images'
import { values } from '../content/site'

export function BrandStory() {
  return (
    <section id="our-story" aria-labelledby="our-story-title" className="bg-white py-16 lg:py-[120px]">
      <div className="container-page flex flex-col gap-5 md:gap-10 lg:flex-row lg:items-center lg:gap-24">
        <img
          src={images.brandStory}
          alt="Three people in AERIS tailoring and knitwear posed in a bright studio"
          loading="lazy"
          className="aspect-[350/420] w-full bg-stone object-cover md:max-w-[600px] lg:aspect-[600/720] lg:w-[600px] lg:shrink-0"
        />
        <div className="flex max-w-[560px] flex-col gap-5 pt-7 lg:gap-6 lg:pt-0">
          <p className="t-eyebrow text-muted">Our story</p>
          <h2 id="our-story-title" className="t-display-l">
            Designed to last.
            <br />
            Made to be worn.
          </h2>
          <p className="t-body-l text-ink-80">
            <span className="lg:hidden">
              AERIS began with a simple idea: a wardrobe should work as hard as the people wearing it. Clean, considered pieces in
              ivory, black and sky — made to move easily and stay relevant long after the season ends.
            </span>
            <span className="hidden lg:inline">
              AERIS began with a simple idea: a wardrobe should work as hard as the people wearing it. We design clean, considered
              pieces in a restrained palette of ivory, black and sky — clothes that move easily, layer effortlessly and stay relevant
              long after the season ends.
            </span>
          </p>
          <ul className="flex flex-col gap-6 pt-2 md:flex-row lg:pt-4">
            {values.map((v) => (
              <li key={v.title} className="flex flex-col gap-3.5 md:w-[170px]">
                <Icon name={v.icon} size={24} />
                <h3 className="t-h4">{v.title}</h3>
                <p className="t-body-s text-muted">{v.text}</p>
              </li>
            ))}
          </ul>
          <Button variant="link" href="#campaign" className="mt-0 self-start lg:mt-8">
            Read our story
          </Button>
        </div>
      </div>
    </section>
  )
}
