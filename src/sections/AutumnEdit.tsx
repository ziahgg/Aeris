import { Button } from '../components/Button'
import { images } from '../content/images'
import { selectFilter } from './events'

const scrim = 'absolute inset-x-0 top-0 -z-10 h-[300px] max-h-full bg-gradient-to-b from-ink/38 to-ink/0'

export function AutumnEdit() {
  return (
    <section id="autumn-edit" aria-labelledby="autumn-edit-title" className="bg-white pt-4 pb-16 lg:pt-6 lg:pb-28">
      <div className="container-page flex flex-col gap-3 lg:gap-10">
        <header className="flex flex-col gap-3 lg:mx-auto lg:max-w-[560px] lg:items-center lg:gap-4 lg:text-center">
          <p className="t-eyebrow text-muted">Seasonal edit</p>
          <h2 id="autumn-edit-title" className="t-h2">
            The autumn edit
          </h2>
          <p className="t-body hidden text-muted lg:block">
            Four ways into the new season: texture, easy dresses, the right accessories and a few pieces worth moving fast on.
          </p>
        </header>

        <div className="mt-4 grid grid-cols-2 gap-3 lg:mt-0 lg:grid-cols-[536fr_372fr_372fr] lg:grid-rows-[312px_312px] lg:gap-4">
          {/* Knitwear */}
          <article className="on-dark relative isolate col-span-2 h-[420px] overflow-hidden bg-muted text-white md:h-[520px] lg:col-span-1 lg:row-span-2 lg:h-auto">
            <img src={images.bentoKnit} alt="" loading="lazy" className="absolute inset-0 -z-10 size-full object-cover" />
            <div aria-hidden="true" className={scrim} />
            <div className="flex flex-col gap-2 p-5 lg:max-w-[300px] lg:gap-3 lg:p-8">
              <h3 className="t-h4 lg:t-h3">Strong knitwear</h3>
              <p className="t-body-s lg:max-w-[248px]">
                <span className="lg:hidden">Texture and warmth for everyday wear.</span>
                <span className="hidden lg:inline">Texture and warmth for confident everyday wear.</span>
              </p>
              <Button variant="link-light" href="#best-sellers" onClick={() => selectFilter('Knitwear')} className="self-start">
                Shop knitwear
              </Button>
            </div>
          </article>

          {/* Dresses */}
          <article className="on-dark relative isolate h-[230px] overflow-hidden bg-muted text-white md:h-[312px] lg:h-auto">
            <img src={images.bentoDress} alt="" loading="lazy" className="absolute inset-0 -z-10 size-full object-cover" />
            <div aria-hidden="true" className={scrim} />
            <div className="flex flex-col gap-2 p-5 lg:gap-3 lg:p-8">
              <h3 className="t-h4 lg:t-h3">
                Dresses<span className="hidden lg:inline"> for every day</span>
              </h3>
              <p className="t-body-s hidden lg:block">Easy shapes for every move.</p>
              <Button
                variant="link-light"
                href="#best-sellers"
                onClick={() => selectFilter('Dresses')}
                aria-label="Shop dresses"
                className="self-start"
              >
                <span className="lg:hidden">Shop</span>
                <span className="hidden lg:inline">Shop dresses</span>
              </Button>
            </div>
          </article>

          {/* Accessories */}
          <article className="relative isolate h-[230px] overflow-hidden bg-stone text-ink md:h-[312px] lg:h-auto">
            <img src={images.bentoAcc} alt="" loading="lazy" className="absolute inset-0 -z-10 size-full object-cover" />
            <div className="flex flex-col gap-2 p-5 lg:gap-3 lg:p-8">
              <h3 className="t-h4 lg:t-h3">Accessories</h3>
              <p className="t-body-s hidden text-ink-80 lg:block">The details that finish a look.</p>
              <Button variant="link" href="#new-arrivals" aria-label="Shop accessories" className="self-start">
                <span className="lg:hidden">Shop</span>
                <span className="hidden lg:inline">Shop accessories</span>
              </Button>
            </div>
          </article>

          {/* Offer */}
          <article className="on-dark relative isolate col-span-2 h-[280px] overflow-hidden bg-sky-deep text-white md:h-[312px] lg:h-auto">
            <img src={images.bentoSale} alt="" loading="lazy" className="absolute inset-0 -z-10 size-full object-cover" />
            <div aria-hidden="true" className={scrim} />
            <div className="flex flex-col gap-2 p-5 lg:gap-3 lg:p-8">
              <p className="t-eyebrow hidden lg:block">Limited time</p>
              <h3 className="t-display-l">Up to 30% off</h3>
              <p className="t-body-s lg:t-body">On selected styles from the new collection.</p>
              <Button variant="light" href="#best-sellers" className="mt-0 self-start lg:mt-5">
                Shop the offer
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
