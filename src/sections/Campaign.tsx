import { useState } from 'react'
import { Button } from '../components/Button'
import { Drawer } from '../components/Drawer'
import { Icon } from '../components/Icon'
import { images } from '../content/images'
import { campaignFilmUrl, chapters } from '../content/site'

function WatchFilm() {
  const [open, setOpen] = useState(false)
  const available = campaignFilmUrl !== ''
  return (
    <>
      <button
        type="button"
        onClick={() => available && setOpen(true)}
        aria-disabled={!available}
        title={available ? undefined : 'The campaign film is not available yet'}
        className="t-eyebrow group flex items-center gap-3 aria-disabled:cursor-default"
      >
        <span className="flex size-11 items-center justify-center rounded-full border border-white transition-colors group-hover:bg-white group-hover:text-ink group-aria-disabled:group-hover:bg-transparent group-aria-disabled:group-hover:text-white">
          <Icon name="play" size={16} />
        </span>
        Watch the film
      </button>
      {available && (
        <Drawer open={open} onClose={() => setOpen(false)} title="Open Air — the film">
          {open && <video src={campaignFilmUrl} controls autoPlay className="w-full" />}
        </Drawer>
      )}
    </>
  )
}

export function Campaign() {
  return (
    <section id="campaign" aria-labelledby="campaign-title" className="bg-white">
      <div className="on-dark relative isolate flex h-[580px] flex-col justify-end overflow-hidden bg-sand text-white md:h-[680px] lg:h-[760px]">
        <img
          src={images.campaign}
          alt="A man in a camel trench coat walking across a rooftop above the city at first light"
          loading="lazy"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[66%] bg-gradient-to-b from-ink/0 to-ink/60 lg:h-[63.4%] lg:to-ink" />
        <div className="px-5 pb-9 md:px-10 md:pb-16 lg:px-24 lg:pb-24">
          <div className="flex max-w-[520px] flex-col gap-3.5 lg:gap-4">
            <p className="t-eyebrow">The campaign — AW26</p>
            <h2 id="campaign-title" className="t-display-xl">
              Open Air
            </h2>
            <p className="t-body-l">
              <span className="lg:hidden">Shot on a rooftop at first light: a study in ivory, black and wide skies.</span>
              <span className="hidden lg:inline">
                Shot on a rooftop above the city at first light: a study in ivory, black and wide skies, and the confidence of clothes
                that let you move.
              </span>
            </p>
            <div className="flex items-center gap-8 lg:pt-2">
              <Button variant="light" href="#campaign-chapters">
                Explore the lookbook
              </Button>
              <div className="hidden lg:block">
                <WatchFilm />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="campaign-chapters" className="mx-auto max-w-[1440px] pt-10 pb-14 pl-5 md:pl-10 lg:px-16 lg:pt-24 lg:pb-28">
        <ul className="rail gap-3 pr-5 md:pr-10 lg:grid lg:grid-cols-3 lg:items-start lg:gap-6 lg:overflow-visible lg:pr-0">
          {chapters.map((c, i) => (
            <li
              key={c.no}
              className={`flex w-[260px] flex-col gap-3 md:w-[320px] lg:w-auto lg:gap-4 ${i === 1 ? 'lg:pt-24' : i === 2 ? 'lg:pt-8' : ''}`}
            >
              <img
                src={c.image}
                alt=""
                loading="lazy"
                className="aspect-[260/330] w-full bg-stone object-cover lg:aspect-[421/540]"
              />
              <div className="flex gap-3 lg:gap-4">
                <span className="t-eyebrow text-muted">{c.no}</span>
                <div className="flex flex-col gap-1">
                  <h3 className="t-h4">{c.title}</h3>
                  <p className="t-body-s text-muted">{c.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
